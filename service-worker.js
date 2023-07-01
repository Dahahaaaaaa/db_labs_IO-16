/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "c222bb6965b9f9e82580bb5e25a3653f"
  },
  {
    "url": "assets/css/0.styles.4eabde17.css",
    "revision": "be7a1f012afa217a1f00dee9bcb29e86"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.30b887d3.js",
    "revision": "9861f1acd35b8cdae58c97c641a020c0"
  },
  {
    "url": "assets/js/11.c1b62882.js",
    "revision": "7d264acc88202f94eeaff5d87f12b22b"
  },
  {
    "url": "assets/js/12.1af539b2.js",
    "revision": "1a339079912d5a752aa34cb464991195"
  },
  {
    "url": "assets/js/13.e56cff29.js",
    "revision": "329392e254b7c42877bdd9be0419daf3"
  },
  {
    "url": "assets/js/14.e77244b9.js",
    "revision": "7e6e78346124412195991dd1ef11bfae"
  },
  {
    "url": "assets/js/15.5c650a86.js",
    "revision": "21e30b797528e6510270412867bde0ba"
  },
  {
    "url": "assets/js/16.3f6d1997.js",
    "revision": "cc213b6d472a1652fbd42e8c86cbafcd"
  },
  {
    "url": "assets/js/17.3ea7ae77.js",
    "revision": "1a8f654ca74fbd9f711a86decc0f12a8"
  },
  {
    "url": "assets/js/18.369dafa6.js",
    "revision": "3a263697736dd1ef1fef2ac79ec29aaa"
  },
  {
    "url": "assets/js/19.23981e85.js",
    "revision": "980e505a48a91b081082067d2072db27"
  },
  {
    "url": "assets/js/2.cf41314b.js",
    "revision": "daa6b6ed292696bf0a2e3aa0e1b1153a"
  },
  {
    "url": "assets/js/20.3e71e2b7.js",
    "revision": "7c98e59f2e1fc9465a8208eac64a9770"
  },
  {
    "url": "assets/js/21.323cc57d.js",
    "revision": "9af88c869eec738d9d5823f33f85ac1c"
  },
  {
    "url": "assets/js/22.d2f7a915.js",
    "revision": "440169c76fb3545bd9ae3eab0a755259"
  },
  {
    "url": "assets/js/23.4b286764.js",
    "revision": "84ea8034415030012ee9aababfc55c86"
  },
  {
    "url": "assets/js/24.cae2038f.js",
    "revision": "ce7c66a9c3005a5041e3305bb0001838"
  },
  {
    "url": "assets/js/26.a388051f.js",
    "revision": "9052f0ce80ac768f33661d8b7dc67bcd"
  },
  {
    "url": "assets/js/3.11bf8a91.js",
    "revision": "9d2b51430537848cac2ea5124482a938"
  },
  {
    "url": "assets/js/4.be72248a.js",
    "revision": "668bc91fb4500762c33bec844d358f72"
  },
  {
    "url": "assets/js/5.01993805.js",
    "revision": "6d5176ba3b4c2fa125c6a9aeb57b6aa7"
  },
  {
    "url": "assets/js/6.c2160e41.js",
    "revision": "52d18539e934aaf4d345354d67942f01"
  },
  {
    "url": "assets/js/7.1f827184.js",
    "revision": "bdfef6f12cfe483be868002afeba6c65"
  },
  {
    "url": "assets/js/8.ecbf9340.js",
    "revision": "a323d6e61a5078e66e9a97db0719672c"
  },
  {
    "url": "assets/js/9.a50bcd73.js",
    "revision": "8d744c4bc62ac7fd91f68755a0f6239d"
  },
  {
    "url": "assets/js/app.9c49da8d.js",
    "revision": "e46cb9e6317c12dd30b8c8e824156c65"
  },
  {
    "url": "conclusion/index.html",
    "revision": "96417558df4fc300659e122aa6b46823"
  },
  {
    "url": "design/index.html",
    "revision": "ef47a5652bb3f806dced2f406f2f159c"
  },
  {
    "url": "index.html",
    "revision": "e26029d3de52fef315dcbb0494b9d20f"
  },
  {
    "url": "intro/index.html",
    "revision": "6ecf5db66567d9542148260be81a7a48"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "f7638486b90ea6efcdafffee3d82b6ea"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "cec1a21399a1cf50bc234e429046268c"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "7c6105e5eb0f1241f722159f53acb0f1"
  },
  {
    "url": "software/index.html",
    "revision": "7f7a3372d36ab606b274a68d7d872b06"
  },
  {
    "url": "test/index.html",
    "revision": "3f3240f4cc5ed79e178a2dacbe679b88"
  },
  {
    "url": "use cases/index.html",
    "revision": "2a0e0b54c12b9fdc7cadd1f78723d19f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
