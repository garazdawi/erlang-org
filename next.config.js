module.exports = {
    trailingSlash: true,

    /*
     * basePath: process.env.BASE_PATH,
     * Ideally we would like to use the basePath setting
     * of next.js here in order to be able to
     * view the exported html using file:/// prefix in the
     * browser.... however there are as of right now lots
     * of problems with images and prefixing them with
     * the correct route, so we don't do that. See
     * https://github.com/vercel/next.js/issues/4998
     * for more details
     */


    webpack: function(config) {
        /* Add .md and .html to the 'raw-loader' */
        config.module.rules.push({
            test: /\.md|\.html$/,
            use: 'raw-loader'
        })
        return config;
    }
}