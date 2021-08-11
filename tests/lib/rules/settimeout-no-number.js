/**
 * @fileoverview setTimeout 第二个参数禁止是数字
 */

'use strict'
const rule = require('../../../lib/rules/settimeout-no-number') // 引入rule
const { RuleTester } = require('eslint')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    Reflect: 'readonly'
  }
})
// 运行测试用例
ruleTester.run('settimeout-no-number', rule, {
  valid: [   // 正确的测试用例
    "import React from 'react'; mod.prop = 0",
    "import mod from 'mod'; mod.prop += 0",
    'let someNumber = 1000; setTimeout(()=>{ console.log(11) },someNumber)',
    'setTimeout(()=>{ console.log(11) },someNumber)'
  ],
  invalid: [   // 错误的测试用例
    {
      code: 'setTimeout(()=>{ console.log(11) },1000)',
      errors: [{
        message: 'setTimeout第二个参数禁止是数字', // 与rule抛出的错误保持一致
        type: 'CallExpression' // rule监听的对应钩子
      }]
    }
  ]
})
