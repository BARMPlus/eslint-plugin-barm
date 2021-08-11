'use strict'
const requireIndex = require('requireindex')

/*
   学习ESLint插件开发
  [手摸手教你写个ESLint 插件以及了解ESLint的运行原理](http://obkoro1.com/web_accumulate/accumulate/tool/ESLint%E6%8F%92%E4%BB%B6.html)
*/

const output = {
  rules: requireIndex(__dirname + '/rules'), // 导出所有规则
  configs: {
    // 导出自定义规则 在项目中直接引用
    barmRule: {
      plugins: ['barm'], // 引入插件
      rules: {
        // 开启规则
        'barm/settimeout-no-number': 'error'
      }
    }
  }
}
module.exports = output
