:::info
图元：WebGL 能够绘制的基本图形元素，包含三种：点、线段、三角形。

片元：可以理解为像素，像素着色阶段是在片元着色器中

裁剪坐标系：裁剪坐标系是顶点着色器中的 gl_Position 内置变量接收到的坐标所在的坐标系

设备坐标系：又名 NDC 坐标系，是裁剪坐标系各个分量对 w 分量相除得到的坐标系，特点是 x、y、z 坐标分量的取值范围都在 【-1，1】之间，可以将它理解为边长为 2 的正方体，坐标系原点在正方体中心。
:::

---

:::tips
gl_Position：顶点的裁剪坐标系坐标，包含 X, Y, Z，W 四个坐标分量，顶点着色器接收到这个坐标之后，对它进行透视除法，即将各个分量同时除以 W，转换成 NDC 坐标，NDC 坐标每个分量的取值范围都在【-1, 1】之间，GPU 获取这个属性值作为顶点的最终位置进行绘制

gl_FragColor：片元（像素）颜色，包含 R, G, B, A 四个颜色分量，且每个分量的取值范围在【0,1】之间，GPU 获取这个值作为像素的最终颜色进行着色。

gl_PointSize：绘制到屏幕的点的大小，需要注意的是，gl_PointSize只有在绘制图元是点的时候才会生效。当我们绘制线段或者三角形的时候，gl_PointSize是不起作用的。:::

---

:::success
<a name="85e536ca"></a>
#### JavaScript 程序如何连接着色器程序

1. createShader：创建着色器对象
1. shaderSource：提供着色器源码
1. compileShader：编译着色器对象
1. createProgram：创建着色器程序
1. attachShader：绑定着色器对象
1. linkProgram：链接着色器程序
1. useProgram：启用着色器程序
:::

---

:::danger
<a name="121886f6"></a>
#### JavaScript 如何往着色器中传递数据

- getAttribLocation：找到着色器中的 `attribute 变量`地址。
- getUniformLocation：找到着色器中的 `uniform 变量`地址。
- vertexAttrib2f：给 `attribute 变量`传递两个浮点数。
- uniform4f：给`uniform变量`传递四个浮点数。
:::

---

:::warning
<a name="buffer"></a>
#### buffer

- gl.createBuffer( ) 创建Buffer
- gl.bindBuffer( gl.ARRAY_BUFFER, buffer ) 绑定某个缓冲区对象为当前缓冲区
- gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW ) 往缓冲区中复制数据
- gl.enableVertexAttribArray：启用顶点属性。
- gl.vertexAttribPointer：设置顶点属性从缓冲区中读取数据的方式。
:::

---

:::info
<a name="a10a3078"></a>
#### 三角形图元分类

- gl.TRIANGLES：基本三角形。
- gl.TRIANGLE_STRIP：三角带。
- gl.TRIANGLE_FAN：三角扇。
<a name="4e3ce14c"></a>
#### 线段图元分为三种：

- LINES：基本线段。
- LINE_STRIP：带状线段。
- LINE_LOOP：环状线段。
:::

---

:::success
请谨记，组成三角形的顶点要按照一定的顺序绘制。默认情况下，WebGL 会认为顶点顺序为逆时针时代表正面，反之则是背面，区分正面、背面的目的在于，如果开启了背面剔除功能的话，背面是不会被绘制的。

想要从顶点着色器传值到片断着色器，我们可以定义“可变量（varyings）”
:::

---

:::warning
![image.png](https://cdn.nlark.com/yuque/0/2020/png/347377/1579490944979-e34e9e1b-d825-49f0-a81f-37a4aafd66ae.png#align=left&display=inline&height=327&name=image.png&originHeight=457&originWidth=1011&size=213883&status=done&style=none&width=724)
:::

