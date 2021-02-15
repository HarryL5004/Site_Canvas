Step-by-step guide for using p5 in Typescript with Webpack
==================

Install the necessary libraries
-------------------
* `npm install --save-dev typescript webpack webpack-cli ts-loader`  
    * Install `typescript` library
    * Install `webpack` and `webpack-cli`: for webpack command line functionalities
    * Install `ts-loader`: to connect typescript compiler to webpack's build process to process typescript files
* `npm install p5 @types/p5`
    * Install `p5` (self-explanatory)
    * Install `@types/p5`: for p5 type definitions

Create `tsconfig.json` & `webpack.config.js` files in root directory
----------------------------------
* Use a template for `tsconfig.json`  
* [Webpack Config Guide for Typescript](https://webpack.js.org/guides/typescript/)
    * Ensure the entry point for webpack is: `./src/index.ts`

Creating `index.ts` & `index.html` files
-------------------
* Create a `src` directory in root directory and create `index.ts` inside of `src/`
    * `index.ts` is the entry point for webpack
* Create `index.html` at the `root` directory and include `<script src="./dist/bundle.js"></script>` in the `head` of the document

Building & running the p5 application
----------------------
* Run `npm run build`
* Open the `index.html` file in a web browser