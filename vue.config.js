module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:4001/api',
                changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}