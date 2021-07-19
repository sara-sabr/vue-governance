module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/vue-governance/" : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Gouvernance - Governance";
      return args;
    });
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
};
