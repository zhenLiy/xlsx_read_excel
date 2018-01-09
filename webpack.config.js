var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',//值可以是字符串、数组或对象
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
	      {
	        test: /\.vue$/,
	        loader: 'vue-loader',
	        options: {
	          // vue-loader options go here
	        }
	      },
	      {
	        test: /\.js$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/
	      },
	      {
	        test: /\.(png|jpg|gif|svg)$/,
	        loader: 'file-loader',
	        options: {
	          limit:0,
	          name: '[name].[ext]?[hash]'
	        }
	      },
	      {
	        test: /\.css$/,
	        loader:'style-loader!css-loader'
	      },
	      {
	        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
	        loader: "file-loader"
	      }
	    ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {//webpack-dev-server配置
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true//实时刷新
    },
    devtool: '#eval-source-map',
    performance: {
        hints: false
    },
    plugins: [
	    new HtmlWebpackPlugin({
	        template:'./src/index.html'  //模板文件  打包时用到
	    })
	]

}
//生产环境
if (process.env.NODE_ENV === 'prod') {
    module.exports.output={
	   	path: path.resolve(__dirname, './dist'),
        filename: 'build.js'
	}
}