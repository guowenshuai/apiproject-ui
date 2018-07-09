module.exports = {
    devServer: {
        port: 8088,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:38080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

}
