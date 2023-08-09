const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    // Задаём точку входа
    entry: {
        app: "./src/assets/js/index.js"
    },
    output: {
        // Каждый раз будет очищаться
        clean: true,
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    // Конфигурируем дев-сервер
    devServer: {
        static: "./src",
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        
        rules: [
            // Правила для loader-ов стилей (например, scss)
            {
                // Регулярное выражение проверяет или sass, или scss, или css
                test: /\.(s[ac]ss|css)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            // Правила для картинок
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ]
    },
    // Устанавливаем плагин для HTML
    plugins: [
        new HtmlWebpackPlugin({
            title: "God of War",
            template: 'src/index.html',
        })
    ]
}