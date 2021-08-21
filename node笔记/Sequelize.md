# Mysql

## Linux下的Mysql

- 数据库名与表名是严格区分大小写的；
- 表的别名是严格区分大小写的；
- 列名与列的别名在所有的情况下均是忽略大小写的；
- 变量名也是严格区分大小写的。

## Windows下的Mysql

- 任何情况下都不区分大小写。

# 定义

注意：使用sequelize创建表，创建出来的表名一定是小写的！但是表字段可以是大小写混合。

### timestamps

默认值：true

```js
// 不添加时间戳属性 (updatedAt, createdAt)
timestamps: false,
// 不要忘记启用时间戳！
timestamps: true,

// 我不想要 createdAt
createdAt: false,

// 我想 updateAt 实际上被称为 updateTimestamp
updatedAt: 'updateTimestamp',

// 并且希望 deletedA t被称为 destroyTime(请记住启用paranoid以使其工作)
deletedAt: 'destroyTime',
paranoid: true,
```

### underscored

默认值：false

Sequelize 允许为 Model 设置 `underscored` 选项. 当 `true` 时,此选项会将所有属性的 `field` 参数设置为其名称的下划线版本. 这也适用于关联生成的外键.

```js
// 将自动设置所有属性的字段参数为下划线命名方式.
// 不会覆盖已经定义的字段选项
// 这样 updatedAt 的字段名会是 updated_at
underscored: true,

// 将 articleId 添加到 Comment 模型,但字段将设置为 `article_id`
// 这意味着列名称将是 `article_id`
User.hasMany(Task);
Article.hasMany(Comment)

// 同样会将 articleId 添加到 Comment 模型,但字段将设置为 `article_id`
// 这意味着列名称将是 `article_id`
Comment.belongsTo(Article);
```

### freezeTableName

```js
// 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置以下内容
freezeTableName: true
```

### tableName

```js
// 定义表的名称
tableName: 'my_very_custom_table_name'
```

## Article表

```js
const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const Article = sequelize.define(
    // 这将控制自动生成的foreignKey和关联命名的名称
    'article',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(50),
        },
        type: {
            type: Sequelize.STRING(20),
        },
        img: {
            type: Sequelize.STRING(100),
            defaultValue: '无'
        },
        content: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATE,
        },
        click: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    },
    {
        freezeTableName: true,
    }
)
// .sync({ force: true })会删除并重建表
// Articlea.sync({ force: true }).then((res) => {
//     console.log('如果表存在 会删除表重新建表')
//     console.log(res)
// })
module.exports = Article
```

## Article_tag表

```js
const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const Article_tag = sequelize.define(
    'article_tag',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        article_id: {
            type: Sequelize.INTEGER,
        },
        tag_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        freezeTableName: true
    }
)
module.exports = Article_tag
```

## Tag表

```js
const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const Tag = sequelize.define(
    'tag',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        color: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true
    }
)
module.exports = Tag
```

## Show表

```js
const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const Show = sequelize.define(
    'ShowTable',
    {
        ids: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
        },
        color: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
    }
)
// Show.sync({ force: true }).then((res) => {
//     console.log('// 如果表存在 会删除表重新建表')
//     console.log(res)
// })
module.exports = Show
```

## Car表

```js
const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const Car = sequelize.define(
    'CarTable',
    {
        idc: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        names: {
            type: Sequelize.STRING,
        },
        colorx: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
    }
)
// Car.sync({ force: true }).then((res) => {
//     console.log('// 如果表存在 会删除表重新建表')
//     console.log(res)
// })
module.exports = Car
```



# 关联

## 一对一：belongsTo，hasOne 

一对一关联是由一个单一的外键，实现两个模型之间的精确关联.

```js
// Comment属于User，即User是主表，Comment是副表
// 给Comment起别名：from_user，指定Comment表的外键是from_userid,指定User的主键是id
Comment.belongsTo(User, { as: 'from_user', foreignKey: 'from_userid', targetKey: 'id' })
// 给Comment起别名：to_user，指定Comment表的外键是to_userid,指定User的主键是id
Comment.belongsTo(User, { as: 'to_user', foreignKey: 'to_userid', targetKey: 'id' })
```

## 一对多：hasMany

一对多关联将一个来源与多个目标连接起来. 而多个目标接到同一个特定的源.

可以设置外键foreignKey，但不能设置目标主键targetKey（设置了也无效），可用sourceKey代替。

```js
// 一个Show有多个Car,即Show是主表,Car是副表。Car默认外键：ShowTableIds
// Show.hasMany(Car)
// 将Car表设置别名xxx
// Show.hasMany(Car, { as:'xxx' })
// 一个Show有多个Car,即Show是主表,Car是副表。Car指定外键：idc
// Show.hasMany(Car, { foreignKey: 'idc' })
// 一个Show有多个Car,即Show是主表,Car是副表。Car指定外键：idc，Car表主键：color
// Show.hasMany(Car, { foreignKey: 'idc', sourceKey: 'color' })
```

 ## 多对多：belongsToMany

多对多关联用于将源与多个目标相连接. 此外,目标也可以连接到多个源.

`foreignKey` 将允许你在 **through** 关系中设置 **source model** 键.

`otherKey` 将允许你在 **through** 关系中设置 **target model** 键.

```js
// 不使用别名的话，默认为article生成articles，使用后：ArticleList
Article.belongsToMany(Tag, { as: 'ArticleList' })
// 不使用别名的话，默认生成tag生成tags，使用后：TagList
Tag.belongsToMany(Article, { as: 'TagList' })

// 将article_id添加到Article_tag，即article_id是外键,不指定Article_tag主键，默认为tagId
// Article.belongsToMany(Tag, { through: Article_tag, foreignKey: 'article_id' })

// 将tag_id添加到Article_tag，即tag_id是外键,不指定Article_tag主键，默认为ArticleId
// Tag.belongsToMany(Article, { through: Article_tag, foreignKey: 'tag_id' })

// Article属于多个Tag,即Tag是主表，Article是副表，指定Article_tag是中间表，将article_id添加到Article_tag作为Article的外键,并指定Article_tag主键为tag_id
Article.belongsToMany(Tag, { through: Article_tag, foreignKey: 'article_id', otherKey: 'tag_id' })
// Tag属于多个Article,即Article是主表，Tag是副表，指定Article_tag是中间表，将tag_id添加到Article_tag里面的作为Tag的外键,并指定Article_tag主键为tag_id
Tag.belongsToMany(Article, { through: Article_tag, foreignKey: 'tag_id', otherKey: 'article_id' })
```



## 区别

```js
// Tag是主键表，Article_tag是外键表，Tag带多个Article_tag
Tag.hasMany(Article_tag)

// Article_tag是主键表，Tag是外键表，Article_tag带多个Tag
Tag.belongsTo(Article_tag)
```

# CURD

## 普通方式

### 创建

- create

```js
await Article.create({
    title, type, img, content, date, click
})
```

### 更新

- update

```js
await Article.update(
{
    title, type, img, content, date, click
},
{
    where: { id:1 }
})
```

### 查找

- findOne
- findAll
- findAndCountAll

```js
await Car.findAndCountAll({
    where: { id:1 }
})
```

### 删除

- destroy

```js
await Article.destroy({
    where: { id:1 }
})
```

## 关联

### 创建

方式一：

```js
await Article.create(
    {
        title: 'Sequelize入门',
        type: '后端',
        img: 'null',
        content: 'Sequelize 是一个基于 promise 的 Node.js ORM',
        date: '2020-07-03 19:00:00',
        click: '999',
        // 这里写Tag模型定义时的名字+复数
        tags: [
            { name: 'Sequelize', color: '#2379bd' },
            { name: 'Orm库', color: '#2f406a' },
        ]
    },
    {
        include: [
            {
                model: Tag,
            }
        ]
    }
)
// 上述操作会在article表添加一条{title: 'Sequelize入门'...}记录
// 同时在tag添加两条记录
// 同时在article_tag添加两条记录
```

方式二：

```js
let aaa = await Article.create({
    title: 'Sequelize入门',
    type: '后端',
    img: 'null',
    content: 'Sequelize 是一个基于 promise 的 Node.js ORM',
    date: '2020-07-03 19:00:00',
    click: '999'
})
let bbb = await Tag.findAll({ where: { id: [1, 2] } })
let ccc = aaa.setTags(bbb)
res.json({
    ccc
})

// 上述操作会在article表添加一条{title: 'Sequelize入门'...}记录
// 且同时在article_tag添加两条记录
```

### 更新

```js
let update_tags = await Tag.findAll({ where: { id: [1, 2] } })
let find_article = await Article.findByPk(355)
let update_article = await find_article.update({
    title: 'Sequelize入门',
    type: '后端',
    img: 'null',
    content: 'Sequelize 是一个基于 promise 的 Node.js ORM',
    date: '2020-07-03 19:00:00',
    click: '999',
})
let update_article_result = await find_article.setTags(update_tags)
res.json(update_article_result)

// 上述操作即修改文章id为355的数据
// 且同时自动修改article_tag的数据（该删除的删除，该增加的增加）
```

### 查找

```js
await Article_tag.findAndCountAll({
    include: [
        {
            model: Article,
            include: [
                {
                    model: Comment,
                },
                {
                    model: Tag,
                }
            ],
        }
    ]
})
```

### 删除

```js
let find_article = await Article.findByPk(id)
let delelte_tag = await find_article.setTags([])
let delelte_article = await find_article.destroy()

// 上述操作会删除article表中主键为361的数据
// 且同时自动删除article_tag表中所有和article主键为361有关联的数据
```

