const { gitDescribe, gitDescribeSync } = require("git-describe");
process.env.VUE_APP_VERSION = require("./package.json").version;
process.env.VUE_APP_GIT_HASH = gitDescribe().hash;
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;

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
