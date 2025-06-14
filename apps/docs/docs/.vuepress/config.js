import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Build to Learn',
  description: 'Build to Learn Project Documentation',

  theme: defaultTheme({
    logo: 'https://res.cloudinary.com/diyh9o7eo/image/upload/v1749939087/logo-main_rwmqlq.png',

    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'Research', link: '/research/' },
    ],

    sidebar: {
      '/notes/': [
        {
          text: 'Notes',
          children: [
            '/notes/gantt-charts.md',
            '/notes/high-low-level-design.md',
            '/notes/srs.md',
          ],
        },
      ],
      '/research/': [
        {
          text: 'Research',
          children: [
            '/research/case-studies.md',
            '/research/technology-stack.md',
          ],
        },
      ],
    },
  }),

  bundler: viteBundler(),
})
