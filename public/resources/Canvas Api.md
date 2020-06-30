

:::tips
**canvasEl.toDataURL(mimeType, quality) **返回Canvas图像对应的data URI

- **mimeType **需要转换的图像的mimeType类型。默认值是image/png
- **quality **转换的图片质量。范围是0到1。mimeType需要是image/jpeg或image/webp
- **返回值** base64 data图片数据
:::



---

:::info
**canvasEl.getContext(contextType, contextAttributes)**
:::



---

:::warning
**ctx.shadowBlur = number** 可以用来指定阴影的模糊程度。默认值是`0`，表示不模糊<br />**ctx.shadowColor = color** 可以用来指定阴影的颜色。默认值是透明黑<br />**ctx.shadowOffsetX = number** 阴影的水平偏移大小 默认值是`0`<br />**ctx.shadowOffsetY = number** 阴影的垂直偏移大小 默认值是`0`
:::



---

:::danger
**ctx.fillStyle = color | gradient | pattern** 给Canvas中各种图形填充样式<br />**ctx.strokeStyle = color | gradient | pattern **设置路径 | 形状 | 文字描边的样式
:::



---

:::success
**ctx.globalCompositeOperation = type** 设置Canvas图形的混合模式
:::



---

:::info
context.globalAlpha = value (0 ~ 1) 设置全局透明度，超过范围的值会被忽略
:::

---

:::tips
context.isPointInPath() 用来检测某个点是否在当前路径中

- **context.isPointInPath(x, y)**
- **context.isPointInPath(x, y, fillRule)**
- **context.isPointInPath(path, x, y, fillRule)**
- **context.isPointInPath(path, x, y)**

**![image.png](https://cdn.nlark.com/yuque/0/2020/png/347377/1587566057640-2cee80d0-d1ac-47e1-9587-31de125c65d4.png#align=left&display=inline&height=323&margin=%5Bobject%20Object%5D&name=image.png&originHeight=383&originWidth=533&size=29384&status=done&style=none&width=449)**
:::

---

:::info
![image.png](https://cdn.nlark.com/yuque/0/2020/png/347377/1588302723399-38c866fc-b43e-438a-8357-7ac99f9dff73.png#align=left&display=inline&height=524&margin=%5Bobject%20Object%5D&name=image.png&originHeight=622&originWidth=859&size=109094&status=done&style=none&width=724)
:::

---

:::success
![image.png](https://cdn.nlark.com/yuque/0/2020/png/347377/1592207963671-6599dcfc-ea79-447f-bb71-e589cdb550f3.png#align=left&display=inline&height=424&margin=%5Bobject%20Object%5D&name=image.png&originHeight=619&originWidth=1056&size=231842&status=done&style=none&width=724)
:::
