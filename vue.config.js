 module.exports = {
     // 设置全局样式调用
     css: {
         loaderOptions: {
             scss: {
                 //prependData: `@import "~@/assets/common/css/ict_global.scss";`
                 additionalData: `@import "~@/assets/common/ict_global.scss";`
             }
         },
     },
     //设置标签栏logo
     pwa: {
         iconPaths: {
             favicon32: 'logo.png',
             favicon16: 'logo.png',
             appleTouchIcon: 'logo.png',
             maskIcon: 'logo.png',
             msTileImage: 'logo.png'
         }
     },
    devServer: {
        port:8888,

    },
     publicPath: './',
     outputDir: 'dist',
     assetsDir: 'static',
}
