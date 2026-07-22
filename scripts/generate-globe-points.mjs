// Generates src/data/globePoints.ts — dot coordinates for the hero globe.
//
// Samples real coastline geometry from the `world-atlas` dataset (Natural
// Earth) into two point sets:
//   - land:   sparse dot-matrix of all continents (context layer)
//   - europe: dense dot fill of European countries (the glowing highlight)
// plus a hand-picked list of major non-European cities (bright dots).
//
// Run with: node scripts/generate-globe-points.mjs

import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const topojson = require('topojson-client')
const world50m = require('world-atlas/countries-50m.json')
const world110m = require('world-atlas/countries-110m.json')

// Europe as a geographic silhouette, not a political membership list.
// Cyprus is politically EU but geographically Middle-Eastern (34°N,
// 33°E — south of Turkey); its dots + halo bleed visually into the
// Anatolian coast on the rotating globe. Dropped for the same reason
// we don't include French Guiana or the Azores individually.
const EUROPE = new Set([
  'Iceland', 'Norway', 'Sweden', 'Finland', 'Denmark', 'Estonia', 'Latvia',
  'Lithuania', 'Poland', 'Germany', 'Netherlands', 'Belgium', 'Luxembourg',
  'France', 'United Kingdom', 'Ireland', 'Portugal', 'Spain', 'Andorra',
  'Monaco', 'Switzerland', 'Liechtenstein', 'Austria', 'Czechia', 'Slovakia',
  'Hungary', 'Slovenia', 'Croatia', 'Bosnia and Herz.', 'Serbia', 'Montenegro',
  'Kosovo', 'Albania', 'Macedonia', 'Greece', 'Bulgaria', 'Romania', 'Moldova',
  'Ukraine', 'Belarus', 'Italy', 'San Marino', 'Malta',
])

// Bright "city lights" for the rest of the world.
const CITIES = [
  // Americas
  [40.71, -74.01], [34.05, -118.24], [37.77, -122.42], [41.88, -87.63],
  [29.76, -95.37], [25.76, -80.19], [47.61, -122.33], [39.74, -104.99],
  [33.75, -84.39], [42.36, -71.06], [43.65, -79.38], [49.28, -123.12],
  [45.5, -73.57], [19.43, -99.13], [-23.55, -46.63], [-22.91, -43.17],
  [-34.6, -58.38], [-33.45, -70.67], [-12.05, -77.04], [4.71, -74.07],
  [10.49, -66.88], [-34.9, -56.16], [23.13, -82.38], [9.0, -79.5],
  // Africa & Middle East
  [30.04, 31.24], [6.52, 3.38], [-1.29, 36.82], [-26.2, 28.05],
  [33.57, -7.59], [5.6, -0.19], [9.03, 38.75], [14.72, -17.47],
  [-4.44, 15.27], [-6.79, 39.21], [36.75, 3.06], [32.89, 13.19],
  [25.2, 55.27], [24.71, 46.68], [32.08, 34.78], [33.31, 44.36],
  [35.69, 51.39], [41.01, 28.98],
  // Asia & Oceania
  [19.08, 72.88], [28.61, 77.21], [12.97, 77.59], [13.08, 80.27],
  [24.86, 67.01], [23.81, 90.41], [6.93, 79.85], [27.72, 85.32],
  [13.76, 100.5], [1.35, 103.82], [-6.21, 106.85], [14.6, 120.98],
  [10.82, 106.63], [21.03, 105.85], [3.14, 101.69], [22.32, 114.17],
  [31.23, 121.47], [39.9, 116.4], [22.54, 114.06], [30.57, 104.07],
  [23.13, 113.26], [37.57, 126.98], [35.68, 139.69], [34.69, 135.5],
  [25.03, 121.57], [43.83, 87.62], [55.75, 37.62], [59.93, 30.36],
  [56.84, 60.65], [55.03, 82.92], [43.24, 76.89], [41.31, 69.28],
  [-33.87, 151.21], [-37.81, 144.96], [-27.47, 153.03], [-31.95, 115.86],
  [-36.85, 174.76], [-41.29, 174.78],
]

function ringContains(ring, lon, lat) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

function polygonContains(polygon, lon, lat) {
  // polygon = [exteriorRing, ...holeRings]
  if (!ringContains(polygon[0], lon, lat)) return false
  for (let i = 1; i < polygon.length; i++) {
    if (ringContains(polygon[i], lon, lat)) return false
  }
  return true
}

function featureContains(feature, lon, lat) {
  const g = feature.geometry
  if (!g) return false
  if (g.type === 'Polygon') return polygonContains(g.coordinates, lon, lat)
  if (g.type === 'MultiPolygon') {
    return g.coordinates.some((poly) => polygonContains(poly, lon, lat))
  }
  return false
}

function sampleGrid(
  features,
  stepDeg,
  { latMin = -60, latMax = 75, lonMin = -180, lonMax = 180, exclude } = {},
) {
  const points = []
  for (let lat = latMin; lat <= latMax; lat += stepDeg) {
    const cos = Math.cos((lat * Math.PI) / 180)
    if (cos < 0.05) continue
    const lonStep = stepDeg / cos
    for (let lon = lonMin; lon < lonMax; lon += lonStep) {
      if (exclude && exclude.some((f) => featureContains(f, lon, lat))) continue
      if (features.some((f) => featureContains(f, lon, lat))) {
        points.push([Math.round(lat * 100) / 100, Math.round(lon * 100) / 100])
      }
    }
  }
  return points
}

const countries50 = topojson.feature(world50m, world50m.objects.countries).features
const countries110 = topojson.feature(world110m, world110m.objects.countries).features

const missing = [...EUROPE].filter((n) => !countries50.some((f) => f.properties.name === n))
if (missing.length) console.warn('Europe countries not found in dataset:', missing)

const europe50 = countries50.filter((f) => EUROPE.has(f.properties.name))
const europe110 = countries110.filter((f) => EUROPE.has(f.properties.name))
const world110Only = countries110.filter((f) => !EUROPE.has(f.properties.name))

// Dense fill for the European glow (50m resolution keeps coastlines crisp).
// Hard longitude cap at 44°E covers Ukraine's easternmost reach without any
// leakage toward Anatolia. latMin 36 avoids sampling the Aegean-Turkish coast
// where Greek islands can host a dot inside a polygon that visually reads
// as Turkish shoreline through the halo bleed.
const europe = sampleGrid(europe50, 0.62, {
  latMin: 36,
  latMax: 72,
  lonMin: -25,
  lonMax: 44,
})
// Sparse context dots for the rest of the world (110m is plenty).
const land = sampleGrid(world110Only, 1.7, { exclude: europe110 })

const cities = CITIES.map(([lat, lon]) => [lat, lon])

const header = `// AUTO-GENERATED by scripts/generate-globe-points.mjs — do not edit by hand.
// [lat, lon] pairs sampled from Natural Earth data (world-atlas package).

export type GlobePoint = [number, number]
`

const serialize = (name, pts) =>
  `\nexport const ${name}: GlobePoint[] = ${JSON.stringify(pts)}\n`

const out =
  header +
  serialize('europePoints', europe) +
  serialize('landPoints', land) +
  serialize('cityPoints', cities)

const dest = join(dirname(fileURLToPath(import.meta.url)), '../src/data/globePoints.ts')
writeFileSync(dest, out)
console.log(`europe: ${europe.length} pts, land: ${land.length} pts, cities: ${cities.length} pts -> ${dest}`)
