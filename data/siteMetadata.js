/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Stack Junkie',
  author: 'Christopher Kvamme',
  headerTitle: 'Stack Junkie',
  description:
    'Stack Junkie is a transparent dev blog and project portfolio chronicling real experiments with AI, code, and new technology. Follow ongoing projects, deep-dive articles, and honest lessons learned.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://stack-junkie.com',
  siteRepo: 'https://github.com/stack-junkie/Stack-Junkie.com',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: '',
  email: 'stack-junkie@protonmail.com',
  github: 'https://github.com/stack-junkie',
  x: 'https://x.com/Stack_Junkie',
  // twitter: 'https://twitter.com/Twitter',
  substack: 'https://stackjunkie.substack.com/',
  facebook: '',
  youtube: '',
  linkedin: 'https://www.linkedin.com/in/christopher-c-kvamme/',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // If you are hosting your own Plausible.
    //   src: '', // e.g. https://plausible.my-domain.com/js/script.js
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    // Using Staticman for GitLab-based comment management with moderation
    // Comments are submitted as merge requests to the GitLab repository
    provider: 'staticman', // supported providers: giscus, utterances, disqus, staticman
    staticmanConfig: {
      // Staticman service endpoint for handling comment submissions
      endpoint: process.env.NEXT_PUBLIC_STATICMAN_URL,
      // GitLab repository for comment storage
      repository: 'stack-junkie/Stack-Junkie',
      // Branch for comment submissions (should match staticman.yml)
      branch: process.env.NEXT_PUBLIC_COMMENTS_BRANCH || 'main',
      // Comment form configuration
      form: 'comments',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
