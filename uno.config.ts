import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
      preflight: false,
      arbitraryVariants: false,
    }),
  ],
  theme: {
    colors: {
      accent: '#954',
    },
    fontFamily: {
      sans: '"Geist Sans Variable","Noto Sans SC",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
      mono: '"Geist Mono Variable","DM Mono","IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    zIndex: {
      min: '-2147483647',
      max: '2147483647',
    },
  },
})
