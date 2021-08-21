function parse(templateStr) {
    // 当前遍历到的位置
    var index = 0
    // 栈1保存标签
    var stack1 = []
    // 栈2保存结果
    var stack2 = [{ children: [] }]
    // 剩余的模板字符串（即没遍历到的）
    var lastStr = templateStr
    // 匹配开始标签(注意这里的正则最后不要加全局的g,否则会出现问题)
    var startTagReg = /^<([a-z]+[1-6]?)>/
    // 匹配结束标签(注意这里的正则最后不要加全局的g,否则会出现问题)
    var endTagReg = /^<\/([a-z]+[1-6]?)>/
    // 这里只匹配开始标签到结束标签之间的文字，不匹配结束标签到开始标签之间的文字
    var wordTagReg = /^([^\>]+)<\/([a-z]+[1-6]?)>/
    // var wordTagReg = /^>([^\>]+)<\/([a-z]+[1-6]?)>/

    while (index < templateStr.length) {
        if (startTagReg.test(lastStr)) {
            var startTag = lastStr.match(startTagReg)[1]
            console.log('找到开始标签', startTag)
            // console.log(index)
            index += startTag.length + 2
            stack1.push({ tag: startTag, children: [], isRoot: true })
            stack2.push({ tag: startTag, children: [] })
        } else if (endTagReg.test(lastStr)) {
            var endTag = lastStr.match(endTagReg)[1]
            console.log('找到结束标签', endTag)
            var c = stack2.pop()
            stack2[stack2.length - 1].children.push(c)
            index += endTag.length + 3
        } else if (wordTagReg.test(lastStr)) {
            var wordTag = lastStr.match(wordTagReg)[1]
            index += wordTag.length
            if (!/^\s+$/.test(wordTag)) {
                stack2[stack2.length - 1].children.push({ text: wordTag })
            } else {
                // console.log('全是空字符串')
            }
        } else {
            // 啥都没找到
            console.log('没匹配到标签以及开始到结束标签之间的文字', lastStr)
            index++
        }
        lastStr = templateStr.substring(index)
    }
    console.log(stack1)
    console.log(stack2)
}