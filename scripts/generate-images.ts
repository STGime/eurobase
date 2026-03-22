import fs from 'fs'
import path from 'path'

const API_KEY = process.env.FIREWORKS_API_KEY || 'fw_MHx6JHcemcnrDUcvRBeDr7'
const OUTPUT_DIR = path.join(import.meta.dirname, '..', 'src', 'assets', 'images')

const images = [
  {
    name: 'hero-network.webp',
    prompt: 'Abstract digital network visualization over a European map silhouette, dark navy blue background #0A1929, glowing blue connection nodes and lines, subtle gold accent highlights, modern tech aesthetic, clean minimal style, no text, 16:9 aspect ratio',
  },
  {
    name: 'platform-architecture.webp',
    prompt: 'Isometric 3D illustration of a cloud platform architecture with layered components: authentication shield, database cylinder, storage cube, serverless function nodes, all in dark navy blue #0A1929 with blue #1565C0 and gold #FFB300 accent colors, clean modern tech style, no text',
  },
  {
    name: 'eu-sovereignty.webp',
    prompt: 'European Union sovereignty badge icon, gold and dark blue color scheme, shield shape with EU stars, digital security aesthetic, dark navy background #0A1929, gold #FFB300 accents, modern flat design, no text',
  },
  {
    name: 'developer-workspace.webp',
    prompt: 'Dark themed IDE code editor workspace with code on screen, subtle European map in the background, navy blue color scheme #0A1929, blue syntax highlighting, modern developer aesthetic, atmospheric lighting, no text readable',
  },
]

async function generateImage(name: string, prompt: string): Promise<void> {
  console.log(`Generating: ${name}...`)

  const response = await fetch('https://api.fireworks.ai/inference/v1/workflows/accounts/fireworks/models/flux-1-schnell-fp8/text_to_image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'image/jpeg',
    },
    body: JSON.stringify({
      prompt,
      cfg_scale: 7,
      height: 768,
      width: 1344,
      steps: 4,
      seed: 42,
      safety_check: false,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    console.error(`Failed to generate ${name}: ${response.status} ${text}`)
    return
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const outputPath = path.join(OUTPUT_DIR, name)
  fs.writeFileSync(outputPath, buffer)
  console.log(`Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`)
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const img of images) {
    await generateImage(img.name, img.prompt)
  }

  console.log('\nDone!')
}

main().catch(console.error)
