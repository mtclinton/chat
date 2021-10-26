const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',

                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
                exclude: /node_modules/,
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[fullhash].bundle.js',
        publicPath: "/"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        publicPath: "/",
        hot: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
            favicon: path.resolve(__dirname, "public/favicon.ico")
        }),
        new MiniCssExtractPlugin({
            filename: "[hash].css",
            chunkFilename: "[id]--[hash].css",
            ignoreOrder: false
        }),
    ],
    target: 'web'
};