var Mustache = {
    render: function (templateStr, data) {
        var nestedTokens = tokensToNestedTokens(parseTokens(templateStr))
        return tokensRenderDomStr(nestedTokens, data)
    }
}
// 扫描模板字符串
class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr
        this.pos = 0    //当前指针
        this.lastStr = templateStr //剩余未扫描的模板字符串
    }
    // 扫描到标记
    Scan(tag) {
        // 边界处理（只有当扫描到标记的时候才将指针往后移）
        if (this.lastStr.indexOf(tag) == 0) {
            this.pos += tag.length
            this.lastStr = this.templateStr.substring(this.pos)
        }

    }
    // 扫描到哪里标记前一个
    ScanUntil(tag) {
        var _pos = this.pos
        // 当没扫到tag的时候
        while (this.lastStr.indexOf(tag) != 0 && this.pos < this.templateStr.length) {
            this.pos++
            // str.substr(start[, length])可能废弃，不推荐。
            // this.lastStr = this.templateStr.substr(this.pos)
            this.lastStr = this.templateStr.substring(this.pos)
        }
        return this.templateStr.substring(_pos, this.pos)
    }
}

// 将扫描到的字符串转成数组
function parseTokens(templateStr) {
    var tokens = []
    var scanner = new Scanner(templateStr)
    // 当指针没有到走到模板字符串的最后一个字符时
    while (scanner.pos != templateStr.length) {
        var scan_text = scanner.ScanUntil('{{')
        tokens.push(['text', scan_text.trim()])
        // tokens.push(['text', scan_text])
        scanner.Scan('{{')
        var scan_text2 = scanner.ScanUntil('}}')
        if (scan_text2 != "") {
            if (scan_text2[0] == "#") {
                tokens.push(['#', scan_text2.substring(1)])
            } else if (scan_text2[0] == "/") {
                tokens.push(['/', scan_text2.substring(1)])
            } else {
                tokens.push(['name', scan_text2])
            }
        }
        scanner.Scan('}}')
    }
    return tokens

}


// 将数组转成嵌套数组
function tokensToNestedTokens(tokens) {
    // 最后整理好后返回的嵌套数组
    var nestedTokens = []
    // 中转数组（一开始指向最后返回的嵌套数组）
    var tempNestedTokens = nestedTokens
    // 使用栈结构保存当前正在嵌套的数组
    var stackList = []

    for (let i = 0; i < tokens.length; i++) {
        switch (tokens[i][0]) {
            case "#":
                // 先将当前的#项存到中转数组
                tempNestedTokens.push(tokens[i])
                // 改变中转数组的引用，使中转数组指向当前#项
                tempNestedTokens = tokens[i][2] = []
                // 入栈（将当前#项压入栈）
                stackList.push(tokens[i])
                break;
            case "/":
                // 出栈（将当前栈的最后一个#项弹出）
                stackList.pop()
                // 出栈后，改变中转数组的引用，使中转数组指向当前栈顶的#项
                tempNestedTokens = stackList.length > 0 ? stackList[stackList.length - 1][2] : nestedTokens
                break;
            default:
                /**
                 * 在中转数组插入#项
                 * 这里很妙，因为中转数组默认是指向返回的嵌套数组nestedTokens，
                 * 但，如果遇到#，先往中转数组插入#（如果是首次遇到#，往中转数组插入#就等
                 * 于往nestedTokens插入#），然后将中转数组（如果是首次修改中转数组的引用，
                 * 等同于修改nestedTokens的引用）的指向改为当前的#项，
                 * 而且，改变中转数组的指向并不会修改原本的nestedTokens数组，然后将#入栈。
                 * 因此，这个中转数组的指向会根据#而改变，而且这个中转数组始终指向当
                 * 前遇到的#，即没有遇到#又没遇到/时，这里就会往中转数组（当前指向的#项
                 * ）插入
                 */
                tempNestedTokens.push(tokens[i])
        }
    }
    return nestedTokens
}

// 将数据添加到整理好的嵌套数组
function tokensRenderDomStr(nestedTokens, data) {
    var domStr = ""
    for (let i = 0; i < nestedTokens.length; i++) {
        if (nestedTokens[i][0] == 'text') {
            domStr += nestedTokens[i][1]
        } else if (nestedTokens[i][0] == 'name') {
            if (String(nestedTokens[i][1]) == '.') {
                domStr += formatObject(data, nestedTokens[i][1])
            } else if (String(nestedTokens[i][1]).split('.').length > 1) {
                domStr += formatObject(data, nestedTokens[i][1])
            } else {
                domStr += data[nestedTokens[i][1]]
            }

        } else if (nestedTokens[i][0] == '#') {
            var tempStr = ""
            for (let j = 0; j < data[nestedTokens[i][1]].length; j++) {
                tempStr += tokensRenderDomStr(nestedTokens[i][2], data[nestedTokens[i][1]][j])
            }
            domStr += tempStr
        }
    }
    return domStr
}

// 将数组转成嵌套数组（复杂写法，难实现，不用这个）
function tokensToNestedTokens1(tokens) {
    // 深拷贝原数组
    var deepTokens = JSON.parse(JSON.stringify(tokens))
    // 最后整理好后返回的嵌套数组
    var nestedTokens = []
    // 当前收集到的数组
    var tempNestedTokens = nestedTokens
    // 使用栈结构保存当前正在嵌套的数组
    var stackList = []

    for (let i = 0; i < tokens.length; i++) {
        switch (tokens[i][0]) {
            case "#":
                tokens[i][2] = []
                if (stackList.length) {
                    stackList[stackList.length - 1][2].push(tokens[i])
                    // 入栈
                    // stackList.push(stackList[stackList.length - 1])
                } else {
                    nestedTokens.push(tokens[i])
                    // 入栈
                    stackList.push(nestedTokens[nestedTokens.length - 1])
                }

                break;
            case "/":
                // 出栈
                var pop = stackList.pop()
                break;
            default:
                if (stackList.length) {
                    stackList[stackList.length - 1][2].push(tokens[i])
                } else {
                    nestedTokens.push(tokens[i])
                }
        }
    }
    return nestedTokens
}

// 将var info = {name:'tom',hobby:{game:'timi'}}通过info.hobby.game获取timi
function formatObject(obj, str) {
    // 如果只有"."，则直接返回obj
    if (str == '.') {
        return obj
    }
    var arr = String(str).split('.')
    for (let i = 0; i < arr.length; i++) {
        obj = obj[arr[i]]
    }
    return obj
}
// export default Mustance