'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // BASE_API: '"http://10.10.10.11:8080/mock"'
  BASE_API: '"http://10.10.0.1:9087"'
  // BASE_API: '"http://10.10.10.12"'
  // BASE_API: '"http://117.50.56.135"'
  // BASE_API: '"http://10.10.0.44:9087"'
  // BASE_API: '"http://39.106.175.132"'
})
