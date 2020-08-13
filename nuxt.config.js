export default {
  mode: 'spa',
  head: {
    title: 'Alayacare - Checkout' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata&family=Roboto&family=Ranchers',
      },
    ],
  },
  css: ['vuesax/dist/vuesax.css'],
  plugins: [
    '@/plugins/vuesax',
    { src: '@/plugins/vue-cleave.js', mode: 'client' },
    { src: '@/plugins/vue-form-wizard.js', mode: 'client' },
  ],
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/pwa'],
  build: {},
}
