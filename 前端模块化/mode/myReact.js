// es6模块化 myReact.js
var myReact = {
    name: 'hss-react',
    Component: function () {
        console.log('hss-Component');
    }
}

export var hello = 'hello world'
export var Component = myReact.Component
export default myReact