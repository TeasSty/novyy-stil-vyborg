import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import http from 'node:http'

const root = process.cwd()
const out = path.join(root, 'public', 'images')
const raw = path.join(root, 'public', '_raw')
fs.mkdirSync(out, { recursive: true })

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Referer: 'https://vk.ru/newstilevbg',
  Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
}

function hi(url) {
  return url
    .replace(/cs=\d+x\d+/g, 'cs=1280x0')
    .replace(/cs=\d+x0/g, 'cs=1280x0')
    .replace(/size=\d+x\d+/g, 'size=1920x768')
}

function fetchBin(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBin(res.headers.location).then(resolve, reject)
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    })
    req.on('error', reject)
  })
}

async function save(name, url) {
  const targets = [hi(url), url]
  for (const u of targets) {
    try {
      const buf = await fetchBin(u)
      if (buf.length < 2000) throw new Error('too small')
      const dest = path.join(out, name)
      fs.writeFileSync(dest, buf)
      console.log('OK', name, buf.length, u.slice(0, 80))
      return true
    } catch (e) {
      console.log('FAIL', name, e.message)
    }
  }
  return false
}

const assets = [
  [
    'cover.jpg',
    'https://sun9-37.vkuserphoto.ru/impf/eIsfVh1-qQnalz5r4J_4rUtQrnC5hLkPaKO_7Q/Fg3egBt7FUo.jpg?size=1920x768&quality=95&crop=0,0,960,383&sign=3945f62f96468dc641cc4d758ab11d9b&c_uniq_tag=p6EV9UispdqiESsaHflO4izct8qu1st1dQdyPOcEpeU&type=cover_group',
  ],
  [
    'logo.jpg',
    'https://sun1-19.vkuserphoto.ru/s/v1/ig2/n5HYBkruGSw-dMxnC12laFdVO8hpRBJzvH-mELIqenWNvefB-9L3A0Wx-qcVxt2ABj1i3XUV5Iu4RVPwqMbaPkV9.jpg?quality=95&crop=23,24,958,958&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=m8KHIkpuV7whTuqcyspIzDpy4B2VXhqyT1ADvT_M6ww&cs=720x720',
  ],
  [
    'work-1.jpg',
    'https://sun9-61.vkuserphoto.ru/s/v1/ig2/Chx9cA6x4JIChjudxE_WpxOnmhYciui02eTp4jSiBXa_E84evJzisaBSBBmhAjbC44b65qaWhyLXDG2lsEQsOczB.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&u=evPysYrcz9zrWsDeM211MewPIM0Ss6x7YGsNxinUKMU&cs=1280x0',
  ],
  [
    'work-2.jpg',
    'https://sun9-26.vkuserphoto.ru/s/v1/ig2/JYM7M5NKNxQyYDptMwWXQcWo8fpcXFYBgOiexMc6nRAhjANWHh2VwLMoG5R-5hetmZOua0wsVf7cOozParh5uAvY.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&cs=1280x0',
  ],
  [
    'work-3.jpg',
    'https://sun9-76.vkuserphoto.ru/s/v1/ig2/vf1i12A2Grjp-wB6GeUlaBS7_BzLNScq1tjIoPL_wtHBCoZ-sQrw6nk0-d_-KR5itjVKTFQLOWbLRGUmD6LQt4Q4.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2048x2048&from=bu&u=VEatwEO1E5NgRjyQ9m32nWNSIgUSX3BlbG-kEMP_K_Q&cs=1280x0',
  ],
  [
    'work-4.jpg',
    'https://sun9-46.vkuserphoto.ru/s/v1/ig2/rNIV_fZ4BpElbyRjJuWOxQ_qg3qe8IWK7J_eaxM8Y0AFfp-FgA6SUvvxfChrx2s5-2lh3vXe6AVpT3qrdMpEE4JF.jpg?quality=95&as=32x42,48x63,72x95,108x143,160x211,240x317,360x476,480x634,540x713,640x845,720x951,897x1185&from=bu&u=JNf6P89bmUNufLw8VwhcY51wC2kGiZ5NWOEgGdHRy9c&cs=1280x0',
  ],
  [
    'work-5.jpg',
    'https://sun9-40.vkuserphoto.ru/s/v1/ig2/G2B7KW6VF-aYTCr_7R-Wo9KA9HEUa1uYHwZhOtKuIaV6ty2TRJh-0wdFTt71rbwu9UQbSWjM-ByKsibJU6GDgtpH.jpg?quality=95&as=32x42,48x62,72x93,108x140,160x208,240x311,360x467,480x623,540x701,640x830,720x934,881x1143&from=bu&u=OQFUK-zsXPCzH0q4mh53Bf0JTcHW9JClDkf4jvmFeDY&cs=1280x0',
  ],
  [
    'work-6.jpg',
    'https://sun9-27.vkuserphoto.ru/s/v1/ig2/kwC0KeXW5tjEppnKd6PaJ-en2OTSlod-bgcmZZebdlG2pxc-qWOb66vb0M_byOQTaoniLEibtsPtohViJoyZWAoy.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=ZOK6sLd4k1i9wVdPnZSIgsFBOwkt6ZM9cn9fr1pGZBI&cs=1280x0',
  ],
  [
    'work-7.jpg',
    'https://sun9-16.vkuserphoto.ru/s/v1/ig2/UXClDN_N2aU3f7G4Y0eSuLsJLM9h_rwdFsArzY8zeqth8NrQDmM1hyQaNgVcZKmKRhastQ3BC4jwgqk1_fW2jCAA.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x854,720x960,1080x1441,1280x1708,1440x1921,1919x2560&from=bu&u=_DWRNchOUPl-aBqJNcb1HG2hXD-qhF4b8-ZfIz-D2mU&cs=1280x0',
  ],
]

for (const [name, url] of assets) {
  await save(name, url)
}

console.log('done')
