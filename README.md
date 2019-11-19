# vv-memory-card

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

* 绝对路径还是 @ = src
* public目录的路径是__static
* 要想绑定事件在dom元素上，添加css样式 -webkit-app-region: no-drag 
* 使用正则replace掉####
* browserwindow中设置 webSecurity: false ，不然请求会跨域
* 字体设置为 Consolas 好看很多
* this.$refs.mySwiper.swiper 需要的属性在swiper上
* fisher洗牌算法

# issues

- Blank screen on builds, but works fine on serve
- 在mounted里面使用fs.writeFile会导致重复渲染页面？？？
> 因为当前目录被监听了，所以fs改写会导致应用刷新，从而进行重复

# tips

- 打开应用时，从yq读取默认仓库的所有文档列表，在store里存储文章列表信息
- 每当解析一篇文章时，将所得到的markdown内容用node写入本地，如果下一次请求失败，则打开本地相同拷贝，每次初始化请求时还应当对更新时间进行对比，有更新则替换本地拷贝
- 自定义的请求参数应该在调用的时候给axios作为参数传入
- 初始化先确认是否有用户名，没有提示进行配置，仓库，文档同上
- 单词支持翻转，鼠标移动上去，翻转出释义
- 不同的类型有不同的切换时间

