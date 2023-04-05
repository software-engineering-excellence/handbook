const githubRepoUrl = 'https://github.com/software-engineering-excellence/handbook';
const title = 'Software Engineering Excellence';

module.exports = {
  title,
  tagline: 'Proven practices for developing software effectively',
  url: 'https://software-engineering-excellence.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'software-engineering-excellence',
  projectName: 'handbook',
  staticDirectories: ['static', 'docs/images'],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true, // `hashed` is recommended as long-term-cache of index file is possible.
        language: ['en'],
      }),
    ],
  ],
  themeConfig: {
    navbar: {
      title,
      logo: {
        alt: 'Software Engineering Excellence Handbook Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          href: githubRepoUrl,
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
              label: 'Twitter',
              href: 'https://twitter.com/tobiasbueschel',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: githubRepoUrl,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tobias Büschel and contributors`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: 'G-JPJLFTD0Z4',
          anonymizeIP: true,
        },
        docs: {
          routeBasePath: '/',
          path: './docs',
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          breadcrumbs: false,
          editUrl: `${githubRepoUrl}/edit/main/website/`,
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
