module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.apishop.net/common/driverLicense',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}
