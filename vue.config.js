module.exports = {
    publicPath: './',
    assetsDir: 'assets',
    productionSourceMap: false,
    configureWebpack: {
        performance: {
            hints:'warning',
            maxEntrypointSize: 50000000,
            maxAssetSize: 30000000,
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    
    devServer: {
        inline: true,
        open: true,
        // proxy: 'http://192.168.2.132:8082'
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}