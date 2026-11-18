// Site settings (were _config.yml under Jekyll). Interface strings are in i18n.yml.
export default {
  url: "https://evanliomain.github.io",
  baseurl: "/css-battle-blog/",
  author: "Evan Liomain",
  languages: ["en", "fr"],
  // Analytics only load in the production build (npm run build), never in the local preview.
  production: process.env.ELEVENTY_ENV === "production",
};
