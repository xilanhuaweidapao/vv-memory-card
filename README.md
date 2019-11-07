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

# issues

- Blank screen on builds, but works fine on serve


# tips

- 打开应用时，从yq读取默认仓库的所有文档列表，在store里存储文章列表信息
- 每当解析一篇文章时，将所得到的markdown内容用node写入本地，如果下一次请求失败，则打开本地相同拷贝，每次初始化请求时还应当对更新时间进行对比，有更新则替换本地拷贝


