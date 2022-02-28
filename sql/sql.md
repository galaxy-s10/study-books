今天发现了 sql 语句使用连接(join)时的一个从来没有了解到的写法，写个范例语句：

```
SELECT * FROM student LEFT JOIN sc USING(sno)

就是连接的条件用的是USING而不是ON，呵呵，我结合数据表结构想了下感觉可能如果当两个数据表中关联的字段名都一样时，就可以这样用USING(字段名)代替ON语句了，上面的sql语句等同于下面的sql语句
SELECT * FROM student LEFT JOIN sc ON student.sno=sc.sno

感慨一下，发现新的知识，感觉真的很不错，希望自己能不断的学到新的东西，加油！！！！！！！
```
