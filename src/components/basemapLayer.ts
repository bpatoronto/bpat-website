// Loaded on demand by MapPage, so MapLibre stays out of the page's own bundle.
import { setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import 'maplibre-gl/dist/maplibre-gl.css'

// MapLibre looks for its worker next to its own file, which bundling breaks,
// so point it at the copy Vite emits.
setWorkerUrl(workerUrl)

export { maplibreGL } from '@maplibre/maplibre-gl-leaflet'
