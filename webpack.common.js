const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {InjectManifest} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

let data = ["nav","index","standingTeam","detail"];

let generateHtmlPlugin = function() {
    let tmp = []
    data.forEach(item => {
        
        if(item === "index") {
            tmp.push(
                new HtmlWebpackPlugin({
                    filename: `index.html`,
                    template: `./src/index.html`,
                    chunks: [`${item}`]
                })
            )
        } else if(item === "nav") {
            tmp.push(
                new HtmlWebpackPlugin({
                    filename: `${item}.html`,
                    template: `./src/${item}.html`,
                })
            )
        } else {
            tmp.push(
                new HtmlWebpackPlugin({
                    filename: `${item}/${item}.html`,
                    template: `./src/template/${item}/${item}.html`,
                    chunks: [`${item}`]
                })
            )
        }

    });
    return tmp;
}

module.exports = {
    entry: {
        index: "./src/script/view/index/index.js",
        detail: "./src/script/view/detail/detail.js"
    },
    output: {
        filename: "[name]/[name]_bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader',
                    }
                ]
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'assets/[name].[ext]'
                    }
                }]
                
            }

        ]

    },
    plugins: [
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest: './service-worker.js',
            
        }),
        new WebpackPwaManifest({
            filename:"manifest.json",
            fingerprints:false,
            inject:false,
            includeDirectory:false,
            name:"Footbal Info App",
            short_name:"Football Info",
            description:"Aplikasi informasi sepak bola",
            start_url:"./index.html",
            display:"standalone",
            background_color:"#34495e",
            theme_color:"#34495e",
            gcm_sender_id:'162402818659',
            icons:[
                {
                    src:path.resolve('./src/img/logo512.png'),
                    sizes:"512x512",
                    type:"image/png",
                    destination: path.join('assets')
                },
                {
                    src:path.resolve('./src/img/logo192.png'),
                    sizes:"192x192",
                    type:"image/png",
                    destination: path.join('assets')
                }
            ]
        })
    ].concat(generateHtmlPlugin())
}