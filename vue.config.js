module.exports = {
  configureWebpack: {
    module: {
      rules: [
        // added because of https://github.com/vuejs/pinia/issues/675
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};
