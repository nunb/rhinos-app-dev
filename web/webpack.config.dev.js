const path = require('path')
const webpack = require('webpack')

const DIRECTORY = path.join(__dirname)

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  entry: [
    path.join(__dirname, '../index.web.js')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        // exclude node_modules except ES6 modules:
        exclude: /node_modules\/(?!(react-native-|apsl-react-native)).*/,
        include: [
            path.resolve(__dirname, "../App"),
            path.resolve(__dirname, "../")
        ],
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}