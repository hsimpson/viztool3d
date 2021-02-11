import { commonConfig } from './webpack.common';
import { merge } from 'webpack-merge';

const devConfig = merge(commonConfig, {
  mode: 'development',
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'inline-source-map',
  watch: true,
  devServer: {
    contentBase: './dist',
    open: false,
    port: 8080,
  },
});

export default devConfig;
