const common = require("./webpack.comon");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//const TerserJS = require('terser-webpack-plugin')

const extractSass = new ExtractTextPlugin({
	filename: "dist/css/[name].[hash].css"
})
module.exports = merge(common, {
	output: {
		publicPath: "."
	},
	module: {
		rules: [
			{
				test:/\.scss$/,
				use:[  MiniCssExtractPlugin.loader,
				{
				  loader: 'css-loader',
				  options: {
					sourceMap: true
				  },
				 },
				  {
					loader: 'sass-loader',
					options: {
					  sourceMap: true,
					},
				  },
				]

			},
			{
				test:/\.html$/,
				use: [
					{loader: "html-loader", options: {minimize: true, attributes: false}},

				]
			}
		]
	},
	plugins: [
		extractSass,
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css'
		  }),
	]
})

