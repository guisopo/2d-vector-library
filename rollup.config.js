import replace from 'rollup-plugin-replace';
import rimraf from 'rimraf';

rimraf.sync('dist');

const pkg = require('./package.json');
const version = pkg.version;

export default {
  input: 'src/scripts/main.js',
  output: {
    file: 'dist/scripts/main.js',
    format: 'iife'
  },
  plugins: [
    replace({
      delimiters: ['{{', '}}'],
      version
    })
  ]
}