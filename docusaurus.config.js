module.exports = {
  title: 'Software Engineering Excellence',
  tagline: 'Proven practices for developing software effectively',
  url: 'https://software-engineering-excellence.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'software-engineering-excellence',
  projectName: 'handbook',
  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        language: 'en',
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Software Engineering Excellence',
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          to: 'handbook/',
          activeBasePath: 'handbook',
          label: 'Handbook',
          position: 'right',
        },
        { to: 'blog', label: 'Blog', position: 'right' },
        {
          href: 'https://github.com/software-engineering-excellence/handbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/software-engineering-excellence',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/tobiasbueschel',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/software-engineering-excellence/handbook',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tobias Büschel and contributors`,
    },
    googleAnalytics: {
      trackingID: 'G-JPJLFTD0Z4',
      anonymizeIP: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: 'handbook',
          path: './docs',
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          editUrl:
            'https://github.com/software-engineering-excellence/handbook/edit/master/website/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/software-engineering-excellence/handbook/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
