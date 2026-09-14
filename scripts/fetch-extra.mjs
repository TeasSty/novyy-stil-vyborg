import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import http from 'node:http'

const out = path.join(process.cwd(), 'public', 'images')
fs.mkdirSync(out, { recursive: true })

const headersVK = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Referer: 'https://vk.ru/newstilevbg',
  Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
}

function fetchBin(url, headers = headersVK) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBin(res.headers.location, headers).then(resolve, reject)
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    })
    req.on('error', reject)
  })
}

async function save(name, url, headers) {
  try {
    const buf = await fetchBin(url, headers)
    fs.writeFileSync(path.join(out, name), buf)
    console.log('OK', name, buf.length)
  } catch (e) {
    console.log('FAIL', name, e.message)
  }
}

const vk = [
  [
    'svc-depilation.jpg',
    'https://sun9-19.vkuserphoto.ru/impg/vV4CTxP9p65QggiibAced9zF_5eGzdLlVJ9yEw/ntBOny3EEUo.jpg?size=800x800&quality=95&sign=03075bd1e9903ba26c6ae85a41edf1b3&type=album',
  ],
  [
    'svc-manicure.jpg',
    'https://sun9-39.vkuserphoto.ru/impg/mph5NCmK6HPsWiNhV6tZ8C883dXwqp6grVG2yA/Ac-fY-_VjqE.jpg?size=800x800&quality=95&sign=8aa78e093977219ca03792411f1e0652&type=album',
  ],
  [
    'svc-perm.jpg',
    'https://sun9-17.vkuserphoto.ru/impg/x4NdkE6iTrCR-UN-Ijyu2kPX_Yq7M7rtKiLqiQ/yBRK2usDomU.jpg?size=800x800&quality=95&sign=208bbd5055f70070a26562743da59b6a&type=album',
  ],
]

for (const [n, u] of vk) await save(n, u, headersVK)

// Atmospheric references (Unsplash) — clearly labeled on site
const atmos = [
  [
    'atmosphere-loft.jpg',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
  ],
  [
    'atmosphere-nails.jpg',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
  ],
  [
    'atmosphere-hair.jpg',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
  ],
]

const headersUS = {
  'User-Agent': headersVK['User-Agent'],
  Accept: 'image/*,*/*;q=0.8',
}

for (const [n, u] of atmos) await save(n, u, headersUS)
console.log('extra done')
