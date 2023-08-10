1. Configure package.json -> npm i webpack webpack-cli webpack-server as DevDependecies 
2. Configure webpack
    2.1.1 Install loader dependencies (as DevDependencies) -> npm i css-loader sass sass-loader style-loader
    2.1.2 Install html-webpack plugin -> npm i html-webpack-plugin
    2.1.3 Install "serve" -> npm i serve

3. Set-up project structure: src(folder) -> assets(folder) -> images(folder), styles(folder), js(folder), index.html

4. Index.js 
    4.1 Import styles

5. Styles:
    5.1 Create colors.scss where we'll store color vars;
    5.2 Create/copy reset.scss and import it to index.js
    5.3 Import colors to styles.scss