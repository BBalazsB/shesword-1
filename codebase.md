# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

```

# index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

# package.json

```json
{
  "name": "massage-hub",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/forms": "^0.5.9",
    "@tailwindcss/typography": "^0.5.15",
    "firebase": "^11.0.2",
    "lottie-react": "^2.4.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-hot-toast": "^2.4.1",
    "react-quill": "^2.0.0",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.13.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.11.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vite": "^5.4.10"
  }
}

```

# postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# public\vite.svg

This is a file of the type: SVG Image

# README.md

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```

# src\App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

# src\App.jsx

```jsx
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      }>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;

```

# src\assets\react.svg

This is a file of the type: SVG Image

# src\assets\scroll.json

```json
{"nm":"Main Scene","ddd":0,"h":500,"w":500,"meta":{"g":"@lottiefiles/creator 1.31.1"},"layers":[{"ty":4,"nm":"Group 3","sr":1,"st":0,"op":150,"ip":0,"hd":false,"ddd":0,"bm":0,"hasMask":false,"ao":0,"ks":{"a":{"a":0,"k":[144.01650314197843,796.5704390975111]},"s":{"a":1,"k":[{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[24.6396,23.2049],"t":0},{"s":[64.15,62.8781],"t":149}]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[40.3605,444.5606]},"r":{"a":1,"k":[{"o":{"x":0.167,"y":0.167},"i":{"x":0.833,"y":0.833},"s":[42],"t":0},{"s":[6],"t":149}]},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}},"shapes":[{"ty":"gr","bm":0,"hd":false,"nm":"Group 3","it":[{"ty":"sh","bm":0,"hd":false,"nm":"Path 3","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0.2733333333333121,-0.5333333333333788],[17.25999999999999,-11.480000000000018],[5.75333333333333,-2.8666666666666365],[20.97999999999998,-0.2866666666666333],[5.2333333333333485,0.4533333333333],[2.9066666666666756,0.5199999999999818],[16.799999999999983,10.220000000000027],[8.939999999999998,8.026666666666642],[6.540000000000002,7.133333333333364],[8.186666666666667,15.679999999999987],[1.466666666666659,3.4600000000000364],[1.3200000000000216,3.4600000000000364],[2.4933333333333203,9.766666666666728],[1.0400000000000016,7.0666666666666815],[0.013333333333340155,7.113333333333382],[-0.5066666666666606,7.2666666666666515],[-1.293333333333332,6.566666666666606],[-1.8333333333333333,6.75333333333333],[-3.2866666666666524,8.433333333333318],[-2.7199999999999895,4.426666666666695],[-10.126666666666665,5.193333333333347],[-5.800000000000011,1.27333333333335],[-9.580000000000004,-0.05333333333332272],[-11.839999999999995,-0.9799999999999803],[-9.766666666666652,-1.1066666666666833],[-23.26666666666665,0.9933333333333394],[-19.23333333333331,3.433333333333318],[-18.860000000000014,7.700000000000007],[-26.919999999999998,22.126666666666665],[-16.133333333333287,20.786666666666672],[-7.026666666666642,13.040000000000001],[-6.080000000000003,17.886666666666656],[-2.053333333333285,9.51333333333334],[0.4733333333333576,4.726666666666669],[8.039999999999964,-1.4499999999999886],[17.853333333333314,-1.8466666666666736],[6.439999999999979,-0.46666666666665907],[4.5999999999999845,0.04666666666666212],[2.4533333333333758,0.02666666666666136],[10.386666666666693,2.533333333333322],[9.379999999999995,11.153333333333345],[-1.6200000000000045,9.869999999999976],[-6.260000000000029,4.74666666666667],[-3.7800000000000105,1.6000000000000039],[-4.586666666666663,2.0533333333333323],[-4.560000000000021,3.719999999999999],[-4.313333333333351,5.506666666666661],[-4.133333333333288,5.026666666666671],[-14.360000000000051,8.266666666666671],[-13.706666666666706,0.9533333333333331],[-5.860000000000052,-1.2399999999999995],[-4.673333333333328,-2.599999999999999],[-5.170000000000073,-13.309999999999988],[-0.4066666666666758,0.346666666666664],[-6.509999999999991,-6.189999999999998],[-1.566666666666606,-3.046666666666662],[-1.2199999999999516,-10.660000000000005],[0.2400000000000091,-8.413333333333336],[2.9466666666666392,-9.686666666666667],[5.893333333333355,-7.920000000000016],[5.126666666666703,-2.3133333333333326],[2.9733333333333576,-0.8600000000000136],[1.466666666666697,0.08666666666668259],[0.05333333333336062,0.28666666666667123],[-0.06666666666660603,0.14000000000000531],[-0.1589107463740902,0.044270162049400597],[-5.680000000000064,9.02000000000001],[-2.269999999999982,11.97999999999999],[1.1999999999999698,13.939999999999998],[1.820000000000012,7.24666666666666],[3.1999999999999695,5.126666666666665],[2.7533333333333303,1.1133333333333344],[4.093333333333324,-2.9399999999999977],[0.2466666666666697,-0.3933333333333356],[-0.17999999999998786,-0.7933333333333318],[2.066666666666682,-9.580000000000004],[3.919999999999997,-5.139999999999996],[0.6199999999999667,-0.12000000000000455],[0.18307205147311834,0.7736010789332113],[-7.833333333333333,14.646666666666667],[0.2799999999999727,0.8466666666666735],[5.7333333333333485,5.86666666666667],[7.179999999999988,2.219999999999999],[7.619999999999966,-0.5666666666666629],[14.360000000000014,-10.719999999999999],[7.673333333333328,-9.046666666666672],[5.713333333333367,-6.99333333333333],[3.2200000000000273,-3.25],[1.4133333333333364,-1.0466666666666622],[7.906666666666676,-2.933333333333337],[2.853333333333353,-1.1600000000000061],[3.2099999999999795,-5.710000000000008],[0.22666666666665,-3.1066666666666642],[-5.880000000000034,-7.680000000000007],[-3.413333333333336,-3.1533333333333267],[-2.1666666666666665,-1.340000000000013],[-8.026666666666642,-1.7200000000000084],[-13.919999999999996,0.3666666666666553],[-28,3.8800000000000145],[-0.6866666666666484,0.040000000000001514],[-3.8333333333333335,-1.7800000000000107],[-1.646666666666685,-3.2666666666666706],[-0.4700000000000273,-2.7099999999999795],[0.09999999999998484,-1.1000000000000039],[0.2466666666665939,-1.5066666666666795],[5.906666666666676,-17.213333333333328],[14.573333333333267,-21.153333333333347],[7.419999999999997,-8],[1.3933333333333546,-1.4066666666666758],[41.05333333333332,-17.413333333333338],[22.900000000000034,-3.759999999999991],[18.693333333333346,0.03333333333330302],[10.133333333333326,0.6200000000000045],[8.200000000000008,1.0200000000000198],[8.413333333333336,1.0799999999999652],[10.299999999999992,0.5133333333333212],[9.806666666666652,-2.1666666666666665],[3.7999999999999923,-2.400000000000015],[2.479999999999999,-2.566666666666644],[2.4599999999999986,-3.6333333333333258],[1.2533333333333303,-2.619999999999967],[2.240000000000009,-8.773333333333312],[1.113333333333344,-13.953333333333376],[0,-7.726666666666688],[-0.6466666666666848,-5.413333333333337],[-5.820000000000012,-15],[-3.0133333333333403,-6.833333333333333],[-2.3799999999999955,-3.8533333333333153],[-7.800000000000011,-8.373333333333372],[-5.026666666666661,-4.393333333333355],[-7.226666666666669,-5.040000000000039],[-11.793333333333331,-4.153333333333346],[-13.093333333333325,-1.240000000000009],[-4.706666666666668,0.36666666666663633],[-15.646666666666684,8.086666666666664],[-5.613333333333344,3.386666666666694],[-3.1666666666666665,2.533333333333303],[-5.853333333333353,7.866666666666636],[-4.506666666666661,7.919999999999997],[0.4733333333333576,0.8133333333333516],[2.080000000000003,5.653333333333346],[1.8133333333333137,6.773333333333312],[-0.8199999999999742,15.173333333333327],[-0.12000000000000455,2.5066666666666606],[-1.6733333333333273,6.406666666666676],[-1.6266666666666652,-0.4266666666666576],[-0.8466666666666924,-1.4333333333333182],[-4.166666666666667,-7.439999999999979],[-2.1866666666666865,-5.893333333333355],[-0.806666666666653,-17.339999999999993],[4.593333333333324,-12.553333333333361],[-0.22261419787525938,-0.2595500726421278],[-4.333333333333333,-3.6266666666666274],[-6.659999999999968,-2.20666666666663],[-7.573333333333342,1.7800000000000484],[-7.8799999999999955,5.586666666666663],[-4.673333333333328,5.55333333333336],[-5.653333333333346,14.166666666666666],[3.8666666666666365,23.82000000000001],[11.75333333333333,17.393333333333356],[6.133333333333288,7.093333333333324],[7.320000000000012,7.093333333333324],[2.2800000000000105,1.8466666666666545],[1.0466666666666622,1.113333333333344],[-0.5800000000000031,0.4933333333333394],[-0.12666666666666515,0.006666666666660603],[-0.3477596140983792,-0.25360102689512587],[-4.0666666666666815,-3.0266666666666424],[-2.2466666666666697,-1.9933333333333774],[-9.199999999999969,-12.839999999999995],[-4.440000000000055,-14.449999999999932],[-1.679999999999988,-9.25333333333333],[-0.10666666666672124,-6.806666666666691],[0.7799999999999727,-5.473333333333358],[16.30000000000003,-20.406666666666677],[5.540000000000039,-4.6400000000000245],[7.653333333333346,-2.913333333333336],[8.206666666666669,0.660000000000006],[5.639999999999986,3.013333333333321],[6.906666666666676,8.74666666666667]],"o":[[-0.37333333333333485,-0.466666666666697],[-9.390000000000043,18.620000000000005],[-7.6400000000000245,5.086666666666663],[-19.580000000000002,9.760000000000067],[-1.6600000000000061,0.026666666666642413],[-3.933333333333318,-0.3333333333333333],[-19.45999999999998,-3.4400000000000546],[-10.03333333333334,-6.0999999999999845],[-4.9066666666666565,-4.406666666666676],[-11.486666666666679,-12.526666666666642],[-0.7533333333333303,-1.4399999999999789],[-1.4000000000000057,-3.3099999999999454],[-4,-10.4066666666666],[-1.4533333333333378,-5.673333333333328],[-0.853333333333334,-5.813333333333276],[-0.013333333333321207,-8.240000000000009],[0.45333333333333786,-6.646666666666685],[1.8399999999999939,-9.366666666666712],[1.2600000000000098,-4.653333333333346],[2.2933333333333508,-5.886666666666618],[6.353333333333334,-10.333333333333334],[3.273333333333331,-1.679999999999988],[8.446666666666658,-1.853333333333315],[4.313333333333333,0.02666666666668031],[3.4933333333333394,0.28666666666667123],[28.30666666666669,3.213333333333329],[12.613333333333344,-0.5333333333333409],[18.49333333333334,-3.2933333333333317],[31.299999999999994,-12.77333333333335],[20.81333333333335,-17.099999999999984],[10.140000000000024,-13.066666666666643],[8.60000000000006,-15.973333333333358],[3.4066666666666756,-10.020000000000001],[1.206666666666706,-5.593333333333324],[-0.8899999999999864,-8.810000000000002],[-18.606666666666644,3.3466666666666733],[-4.260000000000066,0.4399999999999977],[-3.726666666666688,0.26666666666667044],[-5.8933333333332785,-0.05333333333334167],[-8.74666666666667,-0.09333333333334319],[-14.753333333333293,-3.6066666666666642],[-6.5400000000000205,-7.780000000000001],[1.2533333333333303,-7.646666666666666],[3.566666666666644,-2.7000000000000077],[7.059999999999984,-2.9866666666666597],[5.186666666666686,-2.3200000000000025],[3.433333333333318,-2.800000000000002],[6.4333333333333185,-8.213333333333338],[10.913333333333336,-13.279999999999992],[11.89999999999994,-6.8466666666666685],[6.286666666666633,-0.4399999999999977],[6.993333333333339,1.4799999999999993],[12.839999999999918,7.1200000000000045],[0.19333333333330907,0.5],[6.710000000000036,-5.719999999999999],[3.126666666666703,2.960000000000008],[4.446666666666715,8.639999999999995],[0.5533333333333607,4.873333333333335],[-0.3333333333333333,11.439999999999998],[-2.980000000000018,9.826666666666654],[-4.219999999999952,5.673333333333328],[-3.6799999999999877,1.6533333333333264],[-1.146666666666609,0.3333333333333333],[-0.2866666666666333,-0.013333333333321207],[-0.026666666666642413,-0.13333333333332575],[0.07668137097766703,-0.15311782816417008],[10.240000000000009,-2.960000000000008],[6.289999999999964,-9.98999999999998],[2.586666666666664,-13.573333333333343],[-0.35333333333339095,-4.046666666666671],[-1.033333333333303,-4.100000000000004],[-2.4533333333333758,-3.913333333333336],[-3.9266666666666574,-1.5866666666666636],[-0.7266666666666879,0.5200000000000008],[-0.2733333333333121,0.4333333333333371],[2.086666666666664,9.26666666666666],[-1.3999999999999393,6.50666666666667],[-0.6133333333333818,0.806666666666672],[-0.7880437896935746,0.13928841967404537],[-3.9733333333333576,-16.73333333333333],[0.2599999999999909,-0.48666666666665986],[-2.6066666666666456,-7.806666666666662],[-5.166666666666667,-5.293333333333332],[-8.140000000000024,-2.526666666666666],[-17.300000000000068,1.3000000000000043],[-9.039999999999964,6.739999999999999],[-3.8133333333333517,4.49333333333333],[-3.099999999999909,3.8100000000000023],[-1.5399999999999636,1.5466666666666715],[-5.973333333333358,4.426666666666667],[-7.139999999999986,2.6533333333333267],[-5.860000000000014,2.3799999999999955],[-1.1000000000000227,1.9599999999999984],[-0.693333333333347,9.546666666666662],[0.8799999999999955,1.1466666666666658],[2.586666666666664,2.3933333333333358],[7.1200000000000045,4.413333333333317],[12.740000000000009,2.7333333333333294],[19.786666666666633,-0.5200000000000008],[6.84000000000007,-0.9466666666666583],[3.793333333333294,-0.22000000000000833],[3.013333333333321,1.3999999999999961],[1.080000000000041,2.1399999999999864],[0.19999999999996967,1.1400000000000052],[-0.5533333333333607,5.826666666666654],[-2.2133333333333667,13.513333333333321],[-8.473333333333358,24.653333333333347],[-8.933333333333394,12.96666666666666],[-7.866666666666636,8.47333333333332],[-31.74666666666667,32.113333333333344],[-21.319999999999993,9.039999999999964],[-18.519999999999982,3.0400000000000014],[-10.053333333333322,-0.013333333333359102],[-5.060000000000021,-0.31333333333331365],[-21.639999999999986,-2.7066666666666683],[-3.3599999999999945,-0.42666666666669545],[-7.086666666666683,-0.35333333333335304],[-5.006666666666679,1.1066666666666833],[-5.153333333333326,3.2533333333333303],[-1.1800000000000068,1.2266666666666879],[-1.7666666666666704,2.613333333333344],[-3.8999999999999964,8.140000000000024],[-3.7999999999999923,14.853333333333316],[-0.3666666666666553,4.526666666666642],[-0.006666666666679551,6.773333333333312],[1.853333333333315,15.566666666666682],[1.48666666666666,3.8200000000000123],[2.7999999999999923,6.346666666666654],[8.226666666666668,13.339999999999995],[7.413333333333337,7.9533333333333],[5.26666666666667,4.606666666666645],[9.520000000000001,6.639999999999948],[12.706666666666669,4.473333333333358],[4.793333333333332,0.4466666666666394],[18.639999999999986,-1.4533333333333758],[2.9799999999999804,-1.5399999999999636],[5.006666666666661,-3.013333333333321],[7.506666666666661,-6.013333333333397],[3.2999999999999923,-4.4333333333333185],[0.5533333333333607,-0.9733333333333576],[-4.0999999999999845,-7.039999999999964],[-1.7666666666666895,-4.813333333333351],[-4.22666666666665,-15.800000000000031],[0.5200000000000197,-9.653333333333345],[0.2666666666666515,-5.706666666666631],[0.4133333333333364,-1.5733333333333424],[0.6799999999999878,0.18666666666672427],[1.7999999999999925,3.086666666666664],[2.673333333333327,4.773333333333312],[5.666666666666667,15.259999999999991],[0.6333333333333258,13.573333333333343],[-0.11751717410061246,0.32775682492217584],[3.8133333333333135,4.526666666666718],[6.02000000000002,5.040000000000039],[7.153333333333346,2.366666666666712],[8.086666666666664,-1.9000000000000152],[5.006666666666661,-3.553333333333285],[9.173333333333327,-10.906666666666675],[8.526666666666642,-21.366666666666635],[-3.386666666666694,-20.859999999999975],[-5.506666666666661,-8.146666666666684],[-2.586666666666664,-2.980000000000018],[-2.286666666666671,-2.2066666666666683],[-3.440000000000017,-2.7666666666666515],[-0.5199999999999818,-0.5533333333333227],[0.08666666666666363,-0.07333333333334242],[0.8171629431520273,-0.05100579954716977],[1.5733333333333424,1.113333333333306],[3.2666666666666515,2.419999999999997],[12.160000000000005,10.786666666666633],[9.009999999999991,12.580000000000041],[1.7066666666666304,5.5333333333333785],[1,5.479999999999943],[0.10666666666664544,6.826666666666672],[-3.7466666666666697,26.133333333333287],[-3.6866666666666483,4.606666666666645],[-6.379999999999957,5.339999999999994],[-8.453333333333338,3.206666666666706],[-6.086666666666663,-0.4866666666666788],[-9.940000000000017,-5.313333333333351],[0,0]],"v":[[439.89,724.13],[438.92,724.23],[398.92,770.62],[378.83,782.55],[317.99,797.62],[307.65,796.98],[297.39,795.7],[242.09,775.79],[213.63,754.6],[196.46,737.29],[166.95,694.98],[163.62,687.63],[159.23,677.8],[149.49,647.54],[145.75,628.43],[144.45,609.04],[145.19,585.78],[147.81,565.96],[153.32,541.78],[160.14,522.15],[167.66,506.68],[192.38,483.39],[205.99,478.96],[233.03,476.26],[257.26,477.77],[277.15,479.86],[354.51,483.19],[402.28,477.24],[458.31,460.75],[545.64,408.4],[601.06,351.57],[626.81,312.41],[648.83,261.62],[657.02,232.32],[658.12,216.84],[639.76,206.04],[585.07,213.83],[569.02,215.19],[556.53,215.52],[544.01,215.4],[515.31,211.46],[479.11,189.32],[469.7,158.3],[480.97,139.71],[491.99,133.26],[509.46,125.7],[524.08,116.64],[535.7,104.18],[551.55,84.32],[589.46,52],[627.87,40.3],[646.09,41.5],[663.59,47.62],[688.73,78.46],[689.63,78.69],[711.51,79.1],[718.55,88.11],[727.05,117.06],[727.52,136.99],[722.6,168.68],[709.29,195.3],[695.27,207.28],[685.29,211.05],[681.37,211.42],[680.86,210.97],[680.92,210.56],[681.29,210.25],[706.58,192.35],[719.36,159.55],[721.44,118.28],[718.18,101.34],[711.83,87.5],[704.02,79.96],[691.99,81.99],[690.53,83.36],[690.39,85.2],[690.42,113.47],[682.44,130.94],[680.59,132.33],[678.86,131.2],[684.65,84.13],[684.62,82.13],[672.11,61.62],[653.59,50.35],[629.95,47.41],[582.29,66.55],[557.22,90.23],[542.93,107.46],[532.88,118.22],[528.45,122.11],[507.63,133.15],[492.64,138.87],[476.93,151.31],[474.94,158.91],[482.72,184.75],[489.16,191.2],[496.29,196.8],[519.01,206],[559,209.55],[630.68,202.95],[641.97,201.47],[653.41,203.81],[660.4,210.81],[662.24,218.82],[662.39,222.18],[661.19,233.18],[649.01,279.27],[614.44,347.98],[589.91,379.43],[576.02,394.25],[466.82,468.54],[400.08,487.59],[344.26,492.1],[313.98,491.15],[294.09,489.15],[249.01,483.47],[228.52,482.06],[203.18,484.78],[189.97,490.04],[178.52,498.77],[173.06,506.06],[168.53,513.91],[159.32,539.28],[151.95,582.49],[151.4,600.87],[152.36,619.15],[163.87,665],[170.62,680.98],[178.39,696.28],[202.43,728.85],[221.09,747.37],[239.83,761.84],[271.8,778.03],[310.5,786.6],[324.75,786.72],[376.18,772.41],[389.07,765.02],[401.33,756.7],[421.37,735.88],[433.08,717.35],[433.2,714.67],[423.93,695.63],[418.56,678.25],[413.45,631.79],[414.41,613.55],[417.32,595.38],[420.38,593.66],[422.67,596.09],[431.62,611.88],[438.91,627.88],[448.62,676.78],[442.68,715.97],[442.85,716.92],[455.07,729.15],[474.09,740.02],[496.18,740.9],[520.13,729.67],[534.65,716.01],[556.89,678.4],[563.88,610.62],[541.17,553.24],[523.71,530.38],[508.85,515.27],[502,509.19],[495.27,503.37],[495.36,501.8],[495.68,501.68],[497.52,502.00000000000006],[505.98,508.21],[514.25,514.83],[546.29,550.27],[566.97,591.53],[572.05,613.71],[573.71,632.14],[572.7,650.59],[542.63,720.4],[528.79,734.27],[507.74,746.65],[482.75,750.47],[465.16,745.22],[439.89,724.13]]}}},{"ty":"sh","bm":0,"hd":false,"nm":"Path 4","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[-0.8666666666666364,-5.75333333333333],[-0.5066666666666606,-0.07333333333332348],[-0.693333333333309,1.5066666666666606],[-0.7999999999999545,5.653333333333336],[0.8666666666666364,5.74666666666667],[0.5066666666666606,0.06666666666667236],[0.6933333333333849,-1.5066666666666702],[0.7999999999999545,-5.659999999999997]],"o":[[-0.806666666666691,5.653333333333336],[0.2400000000000091,1.6400000000000052],[0.5066666666667364,0.06666666666666288],[2.419999999999997,-5.286666666666662],[0.806666666666691,-5.659999999999997],[-0.2400000000000091,-1.6466666666666658],[-0.5066666666666606,-0.07333333333333296],[-2.419999999999997,5.2866666666666715],[0,0]],"v":[[679.72,108.67],[679.81,125.78],[680.93,128.35],[682.73,126.19],[687.56,109.78],[687.47,92.67],[686.35,90.1],[684.55,92.25],[679.72,108.67]]}}},{"ty":"sh","bm":0,"hd":false,"nm":"Path 5","d":1,"ks":{"a":0,"k":{"c":true,"i":[[0,0],[0.13999999999998636,-2.5933333333333244],[-14.073333333333343,-26.19333333333331],[-0.5133333333333212,1.1999999999999698],[-0.37999999999999545,1.5133333333333212],[-0.13333333333336364,8.160000000000005],[14.433333333333357,24.846666666666653],[0.2199999999999894,-1.2000000000000455],[0.2266666666666879,-2.1799999999999877]],"o":[[-0.7599999999999909,7.30000000000003],[-1.6000000000000227,30.32000000000001],[0.6200000000000045,1.146666666666685],[0.2400000000000091,-0.5666666666666819],[2.0066666666666606,-8.03333333333338],[0.45333333333333786,-27.846666666666653],[-0.6133333333333439,-1.0533333333333605],[-0.4266666666666576,2.2866666666666333],[0,0]],"v":[[418.34,606.91],[416.99,621.75],[435.7,706.52],[437.4,706.44],[438.33,703.32],[441.54,679.03],[420.57,599.99],[419.32,600.21],[418.34,606.91]]}}},{"ty":"fl","bm":0,"hd":false,"nm":"Fill","c":{"a":0,"k":[1,0.4,0.6]},"r":1,"o":{"a":0,"k":100}},{"ty":"tr","a":{"a":0,"k":[434.1749127689916,418.19849721140014]},"s":{"a":0,"k":[100,100]},"sk":{"a":0,"k":0},"p":{"a":0,"k":[434.1749127689916,418.19849721140014]},"r":{"a":0,"k":0},"sa":{"a":0,"k":0},"o":{"a":0,"k":100}}]}],"ind":1}],"v":"5.7.0","fr":30,"op":150,"ip":0,"assets":[]}
```

# src\components\Admin.jsx

```jsx
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage, auth, googleProvider } from '../firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, Toaster } from 'react-hot-toast';

const downloadImage = async (url, filename) => {
  try {
    // Direct fetch from the URL since we're on localhost
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Get the blob data
    const blob = await response.blob();
    
    // Create a blob URL and trigger download
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename.split('?')[0]; // Clean filename
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    
    return true;
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
};

const getFileExtensionFromUrl = (url) => {
  // Extract the file extension from the URL before the query parameters
  const baseUrl = url.split('?')[0];
  const match = baseUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  return match ? match[0] : '.jpg'; // Default to .jpg if no extension found
};

function Admin() {
  const [masseuses, setMasseuses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    location: '',
    phone: '',
    introduction: '',
    instagram: '',
    twitter: '',
    onlyfans: '',
    mainPicture: null,
    additionalPictures: [],
    prices: {
      thirtyMin: 50,
      sixtyMin: 80,
      ninetyMin: 110
    },
    currency: 'GBP',
    metaDescription: '',
    keywords: []
  });
  const [services, setServices] = useState([{ description: '' }]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    siteName: '',
    pageTitle: '',
    pageSubtitle: '',
    metaDescription: '',
    metaKeywords: '',
    currency: 'GBP',
    disclaimer: '',
    termsOfUse: '',
    updatedAt: null
  });
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [keywordInput, setKeywordInput] = useState('');
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === import.meta.env.VITE_FIREBASE_AUTH_EMAIL) {
        setIsAuthenticated(true);
        setAuthError(null);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(error.message);
    }
  };

  // Fetch masseuses when authenticated
  useEffect(() => {
    const fetchMasseuses = async () => {
      if (!isAuthenticated) return;
      
      try {
        const querySnapshot = await getDocs(collection(db, "masseuse"));
        setMasseuses(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (error) {
        console.error('Error fetching masseuses:', error);
      }
    };

    fetchMasseuses();
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      let mainPicUrl = null;
      let additionalPicUrls = [];

      // Handle main picture upload with progress
      if (formData.mainPicture instanceof File) {
        const storageRef = ref(storage, `masseuses/${formData.name}/${formData.mainPicture.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.mainPicture);
        
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => reject(error),
            async () => {
              mainPicUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Handle additional pictures upload with progress
      if (formData.additionalPictures?.length) {
        const totalFiles = formData.additionalPictures.length;
        let completedFiles = 0;

        for (const pic of formData.additionalPictures) {
          if (pic instanceof File) {
            const storageRef = ref(storage, `masseuses/${formData.name}/${pic.name}`);
            const uploadTask = uploadBytesResumable(storageRef, pic);

            await new Promise((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes);
                  const totalProgress = ((completedFiles + fileProgress) / totalFiles) * 100;
                  setUploadProgress(totalProgress);
                },
                (error) => reject(error),
                async () => {
                  const url = await getDownloadURL(uploadTask.snapshot.ref);
                  additionalPicUrls.push(url);
                  completedFiles++;
                  resolve();
                }
              );
            });
          } else {
            // If it's an existing URL, keep it
            additionalPicUrls.push(pic);
            completedFiles++;
            setUploadProgress((completedFiles / totalFiles) * 100);
          }
        }
      }

      // Create the custom URL-friendly ID
      const last3Digits = formData.phone.slice(-3);
      const nameForUrl = formData.name
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/[^a-z0-9_]/g, '');
      const customId = `${nameForUrl}_${last3Digits}`;

      // Prepare the data to save
      const dataToSave = {
        name: formData.name,
        slogan: formData.slogan,
        location: formData.location,
        phone: formData.phone,
        introduction: formData.introduction,
        instagram: formData.instagram,
        twitter: formData.twitter,
        onlyfans: formData.onlyfans,
        mainPicture: mainPicUrl || formData.mainPicture,
        additionalPictures: additionalPicUrls.length ? additionalPicUrls : formData.additionalPictures,
        prices: formData.prices,
        currency: formData.currency,
        services: services,
        metaDescription: formData.metaDescription,
        keywords: formData.keywords,
        updatedAt: new Date()
      };

      if (!editingId) {
        dataToSave.createdAt = new Date();
      }

      // Save to Firestore
      const docRef = doc(db, 'masseuse', customId);
      await setDoc(docRef, dataToSave);

      // Reset form and states
      setFormData({
        name: '',
        slogan: '',
        location: '',
        phone: '',
        introduction: '',
        instagram: '',
        twitter: '',
        onlyfans: '',
        mainPicture: null,
        additionalPictures: [],
        prices: {
          thirtyMin: 50,
          sixtyMin: 80,
          ninetyMin: 110
        },
        currency: 'GBP',
        metaDescription: '',
        keywords: []
      });
      setServices([{ description: '' }]);
      setEditingId(null);
      setMainImagePreview(null);
      setAdditionalImagePreviews([]);

      toast.success('Masseuse saved successfully!');

    } catch (error) {
      console.error('Error saving masseuse:', error);
      toast.error(`Error saving masseuse: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...services];
    newServices[index].description = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { description: '' }]);
  };

  const removeService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleFileChange = (e, type) => {
    if (type === 'main') {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          mainPicture: file
        }));
        setMainImagePreview(URL.createObjectURL(file));
      }
    } else {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        additionalPictures: [...prev.additionalPictures, ...files]
      }));
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, '');
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const fillWithTestData = () => {
    // Keep existing random selection helpers and arrays
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomPhone = () => `+44${Math.floor(Math.random() * 10000000000)}`;
    
    const names = ['Sophie', 'Emma', 'Isabella', 'Olivia', 'Charlotte', 'Luna', 'Victoria', 'Zara'];
    const locations = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 'Bristol', 'Edinburgh'];
    const slogans = [
      'Your relaxation journey begins here',
      'Experience pure bliss',
      'Luxury massage therapy',
      'Unwind and rejuvenate',
      'Professional massage services'
    ];
    const introductions = [
      'Professional massage therapist with over 5 years of experience. Specializing in Swedish and deep tissue massage.',
      'Certified therapist offering a blend of Eastern and Western massage techniques for ultimate relaxation.',
      'Experienced in various massage modalities, dedicated to providing a peaceful and rejuvenating experience.',
    ];

    // Add sample meta descriptions
    const metaDescriptions = [
      'Professional massage therapy services in {location}. Specializing in relaxation and therapeutic massage treatments.',
      'Experienced massage therapist offering luxury treatments in {location}. Book your relaxation session today.',
      'Discover ultimate relaxation with professional massage services in {location}. Swedish, deep tissue, and more.',
    ];

    // Add sample keywords
    const sampleKeywords = [
      'massage therapy',
      'relaxation massage',
      'professional massage',
      'therapeutic massage',
      'swedish massage',
      'deep tissue massage',
      'spa services',
      'wellness therapy',
      'body treatments'
    ];

    // Get random location first as we'll use it in meta description
    const randomLocation = getRandomItem(locations);
    
    // Get random meta description and replace {location} placeholder
    const metaDescription = getRandomItem(metaDescriptions).replace('{location}', randomLocation);
    
    // Get 3-5 random keywords
    const numberOfKeywords = Math.floor(Math.random() * 3) + 3; // Random number between 3-5
    const randomKeywords = [...sampleKeywords]
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfKeywords);

    // Set form data with all fields including new meta fields
    setFormData({
      name: getRandomItem(names),
      slogan: getRandomItem(slogans),
      location: randomLocation,
      phone: getRandomPhone(),
      introduction: getRandomItem(introductions),
      instagram: '@massage_therapy',
      twitter: '@massage_pro',
      onlyfans: 'massage_therapy',
      mainPicture: null,
      additionalPictures: [],
      prices: {
        thirtyMin: Math.floor(Math.random() * 50) + 50,
        sixtyMin: Math.floor(Math.random() * 50) + 80,
        ninetyMin: Math.floor(Math.random() * 50) + 110
      },
      currency: 'GBP',
      metaDescription: metaDescription,
      keywords: randomKeywords
    });

    // Keep existing services setup
    const numberOfServices = Math.floor(Math.random() * 3) + 3;
    const randomServices = Array.from({ length: numberOfServices }, () => ({
      description: getRandomItem(sampleServices)
    }));
    setServices(randomServices);
  };

  const handleDelete = async (masseuse) => {
    if (!window.confirm(`Are you sure you want to delete ${masseuse.name}?`)) {
      return;
    }

    try {
      // Delete main picture from storage if it exists
      if (masseuse.mainPicture) {
        const mainPicRef = ref(storage, masseuse.mainPicture);
        await deleteObject(mainPicRef).catch(error => console.log('Error deleting main picture:', error));
      }

      // Delete additional pictures from storage if they exist
      if (masseuse.additionalPictures && masseuse.additionalPictures.length > 0) {
        for (const picUrl of masseuse.additionalPictures) {
          const picRef = ref(storage, picUrl);
          await deleteObject(picRef).catch(error => console.log('Error deleting additional picture:', error));
        }
      }

      // Delete the Firestore document
      await deleteDoc(doc(db, "masseuse", masseuse.id));
      
      // Update the local state
      setMasseuses(prev => prev.filter(m => m.id !== masseuse.id));
      
      toast.success('Masseuse deleted successfully!');
    } catch (error) {
      console.error('Error deleting masseuse:', error);
      toast.error(`Error deleting masseuse: ${error.message}`);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      return;
    }

    try {
      for (const id of selectedItems) {
        const masseuse = masseuses.find(m => m.id === id);
        if (masseuse) {
          await handleDelete(masseuse);
        }
      }
      setSelectedItems([]);
    } catch (error) {
      console.error('Error in bulk delete:', error);
      toast.error(`Error in bulk delete: ${error.message}`);
    }
  };

  const handleSiteConfigSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'siteConfig', 'main'), {
        ...siteConfig,
        updatedAt: new Date().toISOString()
      });
      toast.success('Site configuration updated successfully!');
    } catch (error) {
      console.error('Error updating site configuration:', error);
      toast.error(`Error updating site configuration: ${error.message}`);
    }
  };

  // Add this useEffect after your other useEffects
  useEffect(() => {
    const fetchSiteConfig = async () => {
      if (!isAuthenticated) return;
      
      try {
        const docSnap = await getDoc(doc(db, 'siteConfig', 'main'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSiteConfig(data);
        }
      } catch (error) {
        console.error('Error fetching site configuration:', error);
      }
    };

    fetchSiteConfig();
  }, [isAuthenticated]);

  const handleEdit = async (masseuse) => {
    // Set form data while preserving existing image URLs
    setFormData({
      ...masseuse,
      // Keep the existing image URLs instead of setting to null
      mainPicture: masseuse.mainPicture || null,
      additionalPictures: masseuse.additionalPictures || [],
      prices: masseuse.prices || {
        thirtyMin: 50,
        sixtyMin: 80,
        ninetyMin: 110
      },
      metaDescription: masseuse.metaDescription || '',
      keywords: masseuse.keywords || []
    });
    
    // Set image previews using existing URLs
    if (masseuse.mainPicture) {
      setMainImagePreview(masseuse.mainPicture);
    }
    if (masseuse.additionalPictures && masseuse.additionalPictures.length > 0) {
      setAdditionalImagePreviews(masseuse.additionalPictures);
    }
    
    setServices(masseuse.services || [{ description: '' }]);
    setEditingId(masseuse.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeywordInput = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const keyword = keywordInput.trim();
      if (keyword && !formData.keywords.includes(keyword)) {
        setFormData(prev => ({
          ...prev,
          keywords: [...prev.keywords, keyword]
        }));
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const removeMainImage = () => {
    setFormData(prev => ({ ...prev, mainPicture: null }));
    setMainImagePreview(null);
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalPictures: prev.additionalPictures.filter((_, i) => i !== index)
    }));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownloadAllPhotos = async (masseuse) => {
    const loadingToast = toast.loading('Downloading images...');
    
    try {
      let successCount = 0;
      let totalFiles = 0;

      // Count total files
      if (masseuse.mainPicture) totalFiles++;
      if (masseuse.additionalPictures) totalFiles += masseuse.additionalPictures.length;

      // Download main picture
      if (masseuse.mainPicture) {
        try {
          const extension = getFileExtensionFromUrl(masseuse.mainPicture);
          const mainFileName = `${masseuse.name}_main${extension}`;
          await downloadImage(masseuse.mainPicture, mainFileName);
          successCount++;
        } catch (error) {
          console.error('Error downloading main picture:', error);
        }
      }

      // Download additional pictures
      if (masseuse.additionalPictures?.length > 0) {
        for (let i = 0; i < masseuse.additionalPictures.length; i++) {
          try {
            const url = masseuse.additionalPictures[i];
            const extension = getFileExtensionFromUrl(url);
            const fileName = `${masseuse.name}_additional_${i + 1}${extension}`;
            await downloadImage(url, fileName);
            successCount++;
          } catch (error) {
            console.error(`Error downloading additional picture ${i + 1}:`, error);
          }
        }
      }

      // Update toast based on success
      if (successCount === totalFiles) {
        toast.success('All images downloaded successfully!', { id: loadingToast });
      } else {
        toast.error(`Downloaded ${successCount}/${totalFiles} images`, { id: loadingToast });
      }

    } catch (error) {
      console.error('Error in download process:', error);
      toast.error('Error downloading images', { id: loadingToast });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
          {authError && (
            <div className="mt-4 text-red-600">
              Error: {authError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Add/Edit Masseuse</h2>
          
          {/* Test Data Button */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={fillWithTestData}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Fill with Test Data
            </button>
          </div>
          
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Slogan</label>
                <input
                  type="text"
                  name="slogan"
                  value={formData.slogan}
                  onChange={(e) => setFormData(prev => ({ ...prev, slogan: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Location and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="+44 XXXX XXXXXX"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Introduction - back to textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Introduction</label>
              <textarea
                value={formData.introduction}
                onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your introduction..."
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
              {services.map((service, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Service description"
                  />
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addService}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Service
              </button>
            </div>

            {/* Social Media */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">OnlyFans</label>
                <input
                  type="text"
                  name="onlyfans"
                  value={formData.onlyfans}
                  onChange={(e) => setFormData(prev => ({ ...prev, onlyfans: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Main Picture</label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'main')}
                    accept="image/*"
                    className="hidden"
                    id="mainPicture"
                  />
                  <label
                    htmlFor="mainPicture"
                    className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Choose File
                  </label>
                  
                  {mainImagePreview && (
                    <div className="relative w-24 h-32">
                      <img
                        src={mainImagePreview}
                        alt="Main preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Pictures</label>
                <div className="mt-1">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, 'additional')}
                    accept="image/*"
                    className="hidden"
                    id="additionalPictures"
                  />
                  <label
                    htmlFor="additionalPictures"
                    className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Add Pictures
                  </label>
                </div>
                
                {additionalImagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {additionalImagePreviews.map((preview, index) => (
                      <div key={index} className="relative w-full aspect-[3/4]">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Prices Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Prices</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">30 Minutes</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">£</span>
                    </div>
                    <input
                      type="number"
                      value={formData.prices?.thirtyMin || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prices: {
                          ...prev.prices,
                          thirtyMin: Number(e.target.value)
                        }
                      }))}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">60 Minutes</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">£</span>
                    </div>
                    <input
                      type="number"
                      value={formData.prices?.sixtyMin || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prices: {
                          ...prev.prices,
                          sixtyMin: Number(e.target.value)
                        }
                      }))}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">90 Minutes</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">£</span>
                    </div>
                    <input
                      type="number"
                      value={formData.prices?.ninetyMin || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        prices: {
                          ...prev.prices,
                          ninetyMin: Number(e.target.value)
                        }
                      }))}
                      className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Enter SEO meta description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <div className="mt-1 flex flex-wrap gap-2 p-2 border rounded-md">
                  {formData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordInput}
                    className="flex-1 min-w-[200px] outline-none border-none"
                    placeholder="Type and press comma or enter to add keywords..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-full h-2 bg-white/20 rounded-full">
                      <div 
                        className="h-full bg-white transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-sm">
                      Uploading... {Math.round(uploadProgress)}%
                    </span>
                  </div>
                ) : (
                  <span>
                    {editingId ? 'Update Masseuse' : 'Add Masseuse'}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Site Config Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Site Configuration</h2>
          <form onSubmit={handleSiteConfigSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Name</label>
                <input
                  type="text"
                  value={siteConfig.siteName}
                  onChange={(e) => setSiteConfig(prev => ({ ...prev, siteName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                <input
                  type="text"
                  value={siteConfig.pageTitle}
                  onChange={(e) => setSiteConfig(prev => ({ ...prev, pageTitle: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Page Subtitle</label>
              <input
                type="text"
                value={siteConfig.pageSubtitle}
                onChange={(e) => setSiteConfig(prev => ({ ...prev, pageSubtitle: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                value={siteConfig.metaDescription}
                onChange={(e) => setSiteConfig(prev => ({ ...prev, metaDescription: e.target.value }))}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Keywords</label>
              <input
                type="text"
                value={siteConfig.metaKeywords}
                onChange={(e) => setSiteConfig(prev => ({ ...prev, metaKeywords: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Comma-separated keywords"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Disclaimer</label>
                <div className="mt-1">
                  <ReactQuill
                    theme="snow"
                    value={siteConfig.disclaimer}
                    onChange={(content) => setSiteConfig(prev => ({ ...prev, disclaimer: content }))}
                    className="bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Terms of Use</label>
                <div className="mt-1">
                  <ReactQuill
                    theme="snow"
                    value={siteConfig.termsOfUse}
                    onChange={(content) => setSiteConfig(prev => ({ ...prev, termsOfUse: content }))}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Site Configuration
            </button>
          </form>
        </div>

        {/* Masseuses Table Container */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Existing Masseuses</h2>
            {selectedItems.length > 0 && (
              <div className="space-x-4">
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Selected ({selectedItems.length})
                </button>
                <button
                  onClick={handleBulkDownloadPhotos}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Download Photos ({selectedItems.length})
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(masseuses.map(m => m.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {masseuses.map((masseuse) => (
                  <tr key={masseuse.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(masseuse.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, masseuse.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== masseuse.id));
                          }
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{masseuse.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{masseuse.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{masseuse.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleEdit(masseuse)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(masseuse)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => handleDownloadAllPhotos(masseuse)}
                        className="text-green-600 hover:text-green-900"
                        title="Download all photos"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 inline" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin; 
```

# src\components\Collection.jsx

```jsx
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage, performance } from '../firebase';
import Lottie from 'lottie-react';
import scrollAnimation from '../assets/scroll.json';
import { HelmetProvider, Helmet } from 'react-helmet-async';

function Collection({ initialData }) {
  const { id } = useParams();
  const [masseuse, setMasseuse] = useState(initialData?.masseuse || null);
  const [siteConfig, setSiteConfig] = useState(initialData?.siteConfig || null);
  
  // Add missing state declarations
  const [showTerms, setShowTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [currentImage, setCurrentImage] = useState(null);
  const lottieRef = useRef(null);

  // Add missing function for opening image modal
  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  // Add scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (lottieRef.current) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = window.pageYOffset / scrollHeight;
        const totalFrames = lottieRef.current.getDuration(true);
        const frame = Math.min(Math.floor(currentProgress * totalFrames * 0.95), totalFrames * 0.95);
        lottieRef.current.goToAndStop(frame, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add currency helper function if not imported
  const getCurrencySymbol = (currency) => {
    const symbols = {
      GBP: '£',
      EUR: '€',
      USD: '$',
      // Add more currencies as needed
    };
    return symbols[currency] || currency;
  };

  // Only fetch if no initial data
  useEffect(() => {
    if (!initialData?.masseuse) {
      const fetchData = async () => {
        try {
          const masseuseDoc = await getDoc(doc(db, 'masseuse', id));

          if (masseuseDoc.exists()) {
            const data = masseuseDoc.data();
            setMasseuse({ id: masseuseDoc.id, ...data });
          } else {
            setMasseuse(null);
          }
        } catch (error) {
          setMasseuse(null);
        }
      };
      fetchData();
    }
    if (!initialData?.siteConfig) {
      const fetchSiteConfig = async () => {
        try {
          const configDoc = await getDoc(doc(db, 'siteConfig', 'main'));
          if (configDoc.exists()) {
            setSiteConfig(configDoc.data());
          }
        } catch (error) {
        }
      };
      fetchSiteConfig();
    }
  }, [id, initialData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-white">
      {masseuse && (
        <>
          <HelmetProvider>
            <Helmet>
              <title>{`${masseuse.name} | ${masseuse.location} | ${siteConfig?.pageTitle || 'MassageHub'}`}</title>
              <meta 
                name="description" 
                content={
                  masseuse.metaDescription || 
                  `${masseuse.name} - ${masseuse.slogan || 'Professional massage services'} in ${masseuse.location}. ${siteConfig?.metaDescription || ''}`
                } 
              />
              <meta 
                name="keywords" 
                content={
                  (masseuse.keywords?.length > 0 
                    ? masseuse.keywords 
                    : (siteConfig?.metaKeywords || '').split(',')
                  ).join(', ')
                } 
              />
            </Helmet>
          </HelmetProvider>
        </>
      )}

      <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              {siteConfig?.siteName || 'Home'}
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-8 max-w-2xl mx-auto">
            <img
              src={masseuse?.mainPicture || '/placeholder.jpg'}
              alt={`${masseuse?.name} - ${masseuse?.location} massage services`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openImageModal(masseuse?.mainPicture)}
              fetchpriority="high"
              loading="eager"
              decoding="async"
            />
          </div>

          {masseuse?.additionalPictures && masseuse.additionalPictures.length > 0 && (
            <div className="grid grid-cols-6 gap-4 mb-8 max-w-2xl mx-auto">
              <div
                className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer ${
                  masseuse?.mainPicture === masseuse.mainPicture ? 'ring-2 ring-pink-500' : ''
                }`}
                onClick={() => setCurrentImage(masseuse.mainPicture)}
              >
                <img
                  src={masseuse.mainPicture}
                  alt={`${masseuse.name} - ${masseuse.location} main profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              {masseuse.additionalPictures.map((pic, index) => (
                <div
                  key={index}
                  className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer ${
                    masseuse?.mainPicture === pic ? 'ring-2 ring-pink-500' : ''
                  }`}
                  onClick={() => setCurrentImage(pic)}
                >
                  <img
                    src={pic}
                    alt={`${masseuse.name} - ${masseuse.location} massage therapy ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{masseuse?.name}</h1>
              <p className="text-lg text-gray-600">{masseuse?.slogan}</p>
              
              <div className="mt-4 space-y-3">
                <a 
                  href={`tel:${masseuse?.phone}`}
                  className="inline-flex items-center text-2xl font-semibold text-pink-600 hover:text-pink-700 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  {masseuse?.phone}
                </a>

                <div className="flex items-center text-lg text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                  <span>{masseuse?.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(masseuse?.prices || {}).filter(([_, price]) => price && price !== 0).map(([duration, price]) => (
                  <div
                    key={duration}
                    className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-lg font-medium text-gray-900">{duration}</div>
                    <div className="text-2xl font-bold text-pink-600 mt-2">
                      {`${getCurrencySymbol(masseuse?.currency)}${price}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About Me</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {masseuse?.introduction}
              </div>
            </div>

            {masseuse?.services && masseuse.services.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Services</h2>
                <ul className="space-y-2">
                  {masseuse.services.map((service, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {service.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(masseuse?.instagram || masseuse?.twitter || masseuse?.onlyfans) && (
              <div className="pt-4 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Social Media</h2>
                <div className="flex space-x-4">
                  {masseuse?.instagram && (
                    <a 
                      href={`https://instagram.com/${masseuse.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}

                  {masseuse?.twitter && (
                    <a 
                      href={`https://twitter.com/${masseuse.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}

                  {masseuse?.onlyfans && (
                    <a 
                      href={`https://onlyfans.com/${masseuse.onlyfans}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-15.5c-3.038 0-5.5 2.462-5.5 5.5s2.462 5.5 5.5 5.5 5.5-2.462 5.5-5.5-2.462-5.5-5.5-5.5z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {siteConfig?.disclaimer && (
          <div 
            className="prose prose-pink max-w-none text-gray-500 text-sm"
            dangerouslySetInnerHTML={{ __html: siteConfig.disclaimer }}
          />
        )}

        {siteConfig?.termsOfUse && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowTerms(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              View Terms & Conditions
            </button>
          </div>
        )}
      </div>

      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-t-xl shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Terms & Conditions</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div 
                className="prose prose-pink max-w-none"
                dangerouslySetInnerHTML={{ __html: siteConfig?.termsOfUse }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 w-24 h-24 z-50 pointer-events-none">
        <div className="w-full h-full transform scale-x-[-1]">
          <Lottie
            lottieRef={lottieRef}
            animationData={scrollAnimation}
            loop={false}
            autoplay={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={modalImage}
              alt={`${masseuse?.name} - ${masseuse?.location} full size image`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collection; 
```

# src\components\Home.jsx

```jsx
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import scrollAnimation from '../assets/scroll.json';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db, auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function Home({ initialData }) {
  const [masseuses, setMasseuses] = useState(initialData?.masseuses || []);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [user, setUser] = useState(null);
  const [siteConfig, setSiteConfig] = useState(initialData?.siteConfig || {});
  const [error, setError] = useState(null);
  const lottieRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [firstMasseuse, setFirstMasseuse] = useState(null);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Fetch masseuses
  useEffect(() => {
    if (!initialData?.masseuses) {
      const fetchMasseuses = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "masseuse"));
          const masseuseData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setMasseuses(masseuseData);
          
          // Set the first masseuse for preloading
          if (masseuseData.length > 0) {
            setFirstMasseuse(masseuseData[0]);
          }
        } catch (error) {
          console.error('Error fetching masseuses:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchMasseuses();
    }
  }, [initialData]);

  // Add preload link effect
  useEffect(() => {
    if (firstMasseuse?.mainPicture) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = firstMasseuse.mainPicture;
      document.head.appendChild(link);
    }
  }, [firstMasseuse]);

  // Get unique locations
  const locations = [...new Set(masseuses.map(m => m.location))];

  // Filter masseuses
  const filteredMasseuses = selectedLocation
    ? masseuses.filter(m => m.location === selectedLocation)
    : masseuses;

  const visibleMasseuses = filteredMasseuses.slice(0, visibleCount);

  // Fetch site config
  useEffect(() => {
    if (!initialData?.siteConfig) {
      const fetchSiteConfig = async () => {
        try {
          const configDoc = await getDoc(doc(db, 'siteConfig', 'main'));
          if (configDoc.exists()) {
            const data = configDoc.data();
            setSiteConfig(data);
            if (data.pageTitle) {
              document.title = data.pageTitle;
            }
          }
        } catch (error) {
          console.error('Error fetching site config:', error);
          setError(error.message);
        }
      };

      fetchSiteConfig();
    }
  }, [initialData]);

  // Add this useEffect after the site config fetch useEffect
  useEffect(() => {
    if (siteConfig?.pageTitle) {
      document.title = siteConfig.pageTitle;
    }
  }, [siteConfig?.pageTitle]);

  // Add this useEffect after your other useEffects
  useEffect(() => {
    // Debug logs
    console.log('Meta update triggered');
    console.log('Current siteConfig:', siteConfig);
    console.log('Description:', siteConfig?.metaDescription);
    console.log('Keywords:', siteConfig?.metaKeywords);
    
    // Check if we can find the elements
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    
    console.log('Found description meta?', !!descriptionMeta);
    console.log('Found keywords meta?', !!keywordsMeta);

    if (siteConfig?.metaDescription) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', siteConfig.metaDescription);
    }
    if (siteConfig?.metaKeywords) {
      document.querySelector('meta[name="keywords"]')?.setAttribute('content', siteConfig.metaKeywords);
    }
  }, [siteConfig.metaDescription, siteConfig.metaKeywords]);

  useEffect(() => {
    console.log('Current siteConfig:', siteConfig); // Debug log
  }, [siteConfig]);

  // Add scroll event listener with animation control
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / scrollHeight);
      setScrollProgress(currentProgress * 100);

      if (lottieRef.current) {
        const totalFrames = lottieRef.current.getDuration(true);
        const frame = Math.min(Math.floor(currentProgress * totalFrames * 0.95), totalFrames * 0.95);
        lottieRef.current.goToAndStop(frame, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (error) {
    return <div className="text-red-600">Error loading site configuration: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-white">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                {siteConfig?.siteName || 'MassageHub'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-pink-200"
                  />
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign Out
                  </button>
                  {user.email === 'bbalazsb@gmail.com' && (
                    <a
                      href="/admin"
                      className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Admin Panel
                    </a>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07"
                    />
                  </svg>
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Add this header section */}
      <div className="container mx-auto pt-24 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
            {siteConfig?.pageTitle || 'Welcome'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {siteConfig?.pageSubtitle || ''}
          </p>
        </header>

        {/* Location selector */}
        <div className="max-w-xs mx-auto mb-12">
          <select
            className="w-full p-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="container mx-auto px-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleMasseuses.map((masseuse) => (
              <a
                key={masseuse.id}
                href={`/ladies/${masseuse.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl">
                  <div className="relative h-0 pb-[133.33%]">
                    <img
                      src={masseuse.mainPicture || '/placeholder.jpg'}
                      alt={masseuse.name || 'Masseuse'}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                        e.target.onerror = null;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h2 className="text-xl font-semibold">{masseuse.name || 'Unknown'}</h2>
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {masseuse.location || 'Location not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      {filteredMasseuses.length > visibleCount && (
        <div className="text-center mt-8 pb-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="bg-white px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Load More
            <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Simplified Lottie container */}
      <div className="fixed bottom-4 left-4 w-24 h-24 z-50 pointer-events-none">
        <div className="w-full h-full">
          <Lottie
            lottieRef={lottieRef}
            animationData={scrollAnimation}
            loop={false}
            autoplay={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Disclaimer and Terms */}
      <div className="container mx-auto px-4 py-12">
        {siteConfig?.disclaimer && (
          <div className="mb-8">
            <div 
              className="prose prose-pink max-w-none text-gray-500 text-sm"
              dangerouslySetInnerHTML={{ __html: siteConfig.disclaimer }}
            />
          </div>
        )}
        
        {siteConfig?.termsOfUse && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowTerms(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              View Terms & Conditions
            </button>
          </div>
        )}
      </div>

      {/* Add the Terms Modal */}
      {showTerms && siteConfig?.termsOfUse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-t-xl shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Terms & Conditions</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div 
                className="prose prose-pink max-w-none"
                dangerouslySetInnerHTML={{ __html: siteConfig.termsOfUse }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home; 
```

# src\firebase.js

```js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getPerformance } from 'firebase/performance';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const performance = typeof window !== 'undefined' ? getPerformance(app) : null;
const googleProvider = new GoogleAuthProvider();

export { db, auth, storage, googleProvider, performance };
```

# src\index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
:root {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: #ffffff;
  color: #213547;
}

/* Image loading styles */
img {
  transition: opacity 0.3s ease-in-out;
}

img[src=""] {
  opacity: 0;
}

/* Let Tailwind handle these */
button {
  all: revert;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Optional: Add custom styles that don't conflict with Tailwind */
@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text;
  }
}

/* Add these rules after your existing styles */
@layer base {
  /* Reset form element styles */
  input[type="text"],
  input[type="number"],
  input[type="file"],
  textarea,
  select {
    @apply w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500;
  }

  /* Remove button reset that might be causing issues */
  button {
    all: revert;
  }
}

/* Remove the generic button reset */
button {
  all: revert;
  cursor: pointer;
}

```

# src\main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

# src\routes.jsx

```jsx
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Admin = lazy(() => import('./components/Admin'));
const Collection = lazy(() => import('./components/Collection'));

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/ladies/:id',
    element: <Collection />
  },
  // Redirect old URLs to new format
  {
    path: '/collection/:id',
    element: <Navigate to={location => `/ladies/${location.pathname.split('/').pop()}`} replace />
  }
]; 
```

# src\utils\currency.js

```js
export const getCurrencySymbol = (currency) => {
  const symbols = {
    GBP: '£',
    EUR: '€',
    USD: '$',
    AUD: 'A$',
    CAD: 'C$',
    JPY: '¥',
    CNY: '¥',
    INR: '₹',
    // Add more as needed
  };
  return symbols[currency] || currency;
}; 
```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

```

# vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

