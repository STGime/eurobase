<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { cityPoints, europePoints, landPoints } from '@/data/globePoints'

// European hub cities get a brighter, pulsing gold dot inside the glow.
const EU_HUBS: Array<[number, number]> = [
  [59.44, 24.75], // Tallinn
  [52.52, 13.41], // Berlin
  [48.86, 2.35], // Paris
  [52.37, 4.9], // Amsterdam
  [40.42, -3.7], // Madrid
  [59.33, 18.07], // Stockholm
  [45.46, 9.19], // Milan
  [52.23, 21.01], // Warsaw
  [53.35, -6.26], // Dublin
  [51.51, -0.13], // London
  [50.85, 4.35], // Brussels
  [38.72, -9.14], // Lisbon
  [48.21, 16.37], // Vienna
  [60.17, 24.94], // Helsinki
]

const canvasRef = ref<HTMLCanvasElement | null>(null)

const DEG = Math.PI / 180
const TILT = 0.52 // tip the north pole toward the viewer so Europe sits center stage
const ROT_START = -14 * DEG // start with Europe facing the viewer
const ROT_SPEED = 0.18 // rad/s — one revolution ≈ 35 seconds

interface Layer {
  vx: Float32Array
  vy: Float32Array
  vz: Float32Array
  n: number
}

function buildLayer(points: Array<[number, number]>): Layer {
  const n = points.length
  const vx = new Float32Array(n)
  const vy = new Float32Array(n)
  const vz = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const [latDeg, lonDeg] = points[i]!
    const lat = latDeg * DEG
    const lon = lonDeg * DEG
    const cosLat = Math.cos(lat)
    vx[i] = cosLat * Math.sin(lon)
    vy[i] = Math.sin(lat)
    vz[i] = cosLat * Math.cos(lon)
  }
  return { vx, vy, vz, n }
}

function makeSprite(size: number, stops: Array<[number, string]>): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  for (const [offset, color] of stops) grad.addColorStop(offset, color)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

let raf = 0
let running = false
let inView = true
let reducedMotion = false
let cleanup: (() => void) | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const land = buildLayer(landPoints)
  const europe = buildLayer(europePoints)
  const cities = buildLayer(cityPoints)
  const hubs = buildLayer(EU_HUBS)

  const S = 32
  const landSprite = makeSprite(S, [
    [0, 'rgba(121, 152, 181, 0.85)'],
    [0.35, 'rgba(96, 125, 153, 0.32)'],
    [1, 'rgba(96, 125, 153, 0)'],
  ])
  const europeHalo = makeSprite(S, [
    [0, 'rgba(255, 179, 0, 0.09)'],
    [0.5, 'rgba(255, 179, 0, 0.04)'],
    [1, 'rgba(255, 179, 0, 0)'],
  ])
  const europeCore = makeSprite(S, [
    [0, 'rgba(255, 224, 130, 0.9)'],
    [0.35, 'rgba(255, 179, 0, 0.4)'],
    [1, 'rgba(255, 143, 0, 0)'],
  ])
  const citySprite = makeSprite(S, [
    [0, 'rgba(227, 242, 253, 0.95)'],
    [0.25, 'rgba(100, 181, 246, 0.5)'],
    [1, 'rgba(100, 181, 246, 0)'],
  ])
  const hubSprite = makeSprite(S, [
    [0, 'rgba(255, 236, 179, 1)'],
    [0.3, 'rgba(255, 179, 0, 0.6)'],
    [1, 'rgba(255, 179, 0, 0)'],
  ])

  let width = 0
  let height = 0
  let dpr = 1

  const resize = () => {
    const rect = canvas.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = rect.width
    height = rect.height
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
  }
  resize()

  const cosT = Math.cos(TILT)
  const sinT = Math.sin(TILT)

  const drawLayer = (
    layer: Layer,
    rot: number,
    cx: number,
    cy: number,
    r: number,
    sprite: HTMLCanvasElement,
    baseSize: number,
    alphaFn?: (i: number) => number,
  ) => {
    const cosR = Math.cos(rot)
    const sinR = Math.sin(rot)
    for (let i = 0; i < layer.n; i++) {
      // rotate around the polar axis, then tilt toward the viewer
      const px = layer.vx[i]!
      const py = layer.vy[i]!
      const pz = layer.vz[i]!
      const x = px * cosR + pz * sinR
      const z0 = pz * cosR - px * sinR
      const y = py * cosT - z0 * sinT
      const z = py * sinT + z0 * cosT
      if (z < 0.02) continue
      const fade = Math.min(1, z * 1.6)
      const size = baseSize * (0.55 + 0.45 * z) * dpr
      ctx.globalAlpha = alphaFn ? fade * alphaFn(i) : fade
      ctx.drawImage(sprite, (cx + x * r) * dpr - size / 2, (cy - y * r) * dpr - size / 2, size, size)
    }
  }

  let t0 = performance.now()
  let elapsed = 0

  const frame = (now: number) => {
    const dt = Math.min((now - t0) / 1000, 0.1)
    t0 = now
    elapsed += dt
    render(ROT_START + elapsed * ROT_SPEED, elapsed)
    if (running) raf = requestAnimationFrame(frame)
  }

  const render = (rot: number, time: number) => {
    const cx = width / 2
    const cy = height / 2
    const r = Math.min(width, height) * 0.42

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1

    // atmosphere halo
    const atmo = ctx.createRadialGradient(cx * dpr, cy * dpr, r * 0.9 * dpr, cx * dpr, cy * dpr, r * 1.25 * dpr)
    atmo.addColorStop(0, 'rgba(21, 101, 192, 0.28)')
    atmo.addColorStop(0.55, 'rgba(21, 101, 192, 0.08)')
    atmo.addColorStop(1, 'rgba(21, 101, 192, 0)')
    ctx.fillStyle = atmo
    ctx.beginPath()
    ctx.arc(cx * dpr, cy * dpr, r * 1.25 * dpr, 0, Math.PI * 2)
    ctx.fill()

    // sphere body, lit from the upper left
    const body = ctx.createRadialGradient(
      (cx - r * 0.35) * dpr,
      (cy - r * 0.45) * dpr,
      r * 0.1 * dpr,
      cx * dpr,
      cy * dpr,
      r * 1.05 * dpr,
    )
    body.addColorStop(0, '#16324e')
    body.addColorStop(0.55, '#0d2137')
    body.addColorStop(1, '#081627')
    ctx.fillStyle = body
    ctx.beginPath()
    ctx.arc(cx * dpr, cy * dpr, r * dpr, 0, Math.PI * 2)
    ctx.fill()

    // dots are additive so the Europe halos accumulate into a continent-wide glow
    ctx.globalCompositeOperation = 'lighter'
    drawLayer(land, rot, cx, cy, r, landSprite, 3.4)
    // Halo is what makes Europe read as "glowing", but too large a base
    // size means each dot's soft edge bleeds past its country polygon
    // — most visible at the Turkish and Levantine coasts. 9 keeps the
    // continent-wide glow intact without leaking beyond the silhouette.
    drawLayer(europe, rot, cx, cy, r, europeHalo, 9)
    drawLayer(europe, rot, cx, cy, r, europeCore, 3.1)
    drawLayer(cities, rot, cx, cy, r, citySprite, 6.5, (i) => 0.55 + 0.45 * Math.sin(time * 1.7 + i * 2.4))
    drawLayer(hubs, rot, cx, cy, r, hubSprite, 8, (i) => 0.7 + 0.3 * Math.sin(time * 2.1 + i * 1.9))

    // soft rim to settle the limb back into the page
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    const rim = ctx.createRadialGradient(cx * dpr, cy * dpr, r * 0.82 * dpr, cx * dpr, cy * dpr, r * dpr)
    rim.addColorStop(0, 'rgba(8, 22, 39, 0)')
    rim.addColorStop(1, 'rgba(8, 22, 39, 0.55)')
    ctx.fillStyle = rim
    ctx.beginPath()
    ctx.arc(cx * dpr, cy * dpr, r * dpr, 0, Math.PI * 2)
    ctx.fill()
  }

  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = media.matches

  const start = () => {
    if (running || reducedMotion || !inView || document.hidden) return
    running = true
    t0 = performance.now()
    raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  const onMotionChange = () => {
    reducedMotion = media.matches
    if (reducedMotion) {
      stop()
      render(ROT_START, 0)
    } else {
      start()
    }
  }
  media.addEventListener('change', onMotionChange)

  const onVisibility = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVisibility)

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? true
    inView ? start() : stop()
  })
  observer.observe(canvas)

  const resizeObserver = new ResizeObserver(() => {
    resize()
    if (!running) render(ROT_START + elapsed * ROT_SPEED, elapsed)
  })
  resizeObserver.observe(canvas)

  render(ROT_START, 0)
  start()

  cleanup = () => {
    stop()
    media.removeEventListener('change', onMotionChange)
    document.removeEventListener('visibilitychange', onVisibility)
    observer.disconnect()
    resizeObserver.disconnect()
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div class="relative w-[420px] h-[420px] max-w-full" role="img" aria-label="Rotating globe with Europe glowing in gold and major world cities shown as bright dots">
    <canvas ref="canvasRef" class="w-full h-full block" />
  </div>
</template>
