module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    watchOptions: {
      ignored: "/public/", //忽略对某些文件夹的监听
    },
  },
  pluginOptions: {
    electronBuilder: { // 自动更新
      builderOptions: {
        publish: ["github"],
      },
    },
  },
};
