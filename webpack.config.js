var path = require("path")
var webpack = require("webpack")

let exportObject = {
	entry: "./src/index.js",

	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},

	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		host: '0.0.0.0',
		disableHostCheck: true
	},

	// historyApiFallback: true,

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					 presets: ['react', 'es2015']
				}
			}
			// }, {
			// 	test: /\.css$/,
			// 	loader: "style!css"
			// }, {
			// 	test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
			// 	loader: 'url-loader?limit=100000'
			// }
		]
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules']
	},
	plugins: []
}

if (process.env.NODE_ENV === 'production') {
	exportObject.devtool = ""
	exportObject.plugins.push(
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true
			},
			comments: false,
			// sourceMap: false // For some reason this makes uglify fail
		}),
		new webpack.optimize.AggressiveMergingPlugin()
	)
}

module.exports = exportObject