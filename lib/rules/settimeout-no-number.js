/**
 * @fileoverview 第二个参数禁止是数字
 */
'use strict'

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: '第二个参数禁止是数字',
    },
    fixable: 'code' // 打开修复功能
  },

  create (context) {
    return {
      'CallExpression': (node) => {
        if (node.callee.name !== 'setTimeout') return // 不是定时器即过滤
        const timeNode = node.arguments && node.arguments[1] // 获取第二个参数
        if (!timeNode) return // 没有第二个参数
        // 检测报错第二个参数是数字 报错
        if (timeNode.type === 'Literal' && typeof timeNode.value === 'number') {
          context.report({
            node,
            message: 'setTimeout第二个参数禁止是数字',
            fix (fixer) {
              const numberValue = timeNode.value
              const statementString = `const countNumber1 = ${numberValue}\n`
              return [
                // 修改数字为变量 变量名故意写错 为了让用户去修改它
                fixer.replaceTextRange(node.arguments[1].range, 'countNumber2'),
                // 在setTimeout之前增加一行声明变量的代码 用户自行修改变量名
                fixer.insertTextBeforeRange(node.range, statementString)
              ]
            }
          })
        }
      }
    }
  },
}
