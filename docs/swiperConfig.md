> let mdRender = new MarkdownIt();
> let resultlalala = mdRender.render( content );

- md to html

```
 swiperOption: {
        loop: true, // 无限循环，需要队数据长度进行判断
        speed: 1000,
        on: {
          slideChange: () => {
            // console.log('isEnd',this.$refs.mySwiper.swiper.isEnd);
            // 在store里保存一个当前在展示的文档序号
          }
        },
        autoplay: {
          delay: 60000, // 切换时间开为参数
          disableOnInteraction: false,
          virtual: true
        }
      }
```
