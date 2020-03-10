export function shuffle(array) {
  const endIndex = array.length - 2;
  for (let i = 0; i < endIndex; i++) {
    const j = i + Math.floor(Math.random() * (array.length - i));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function matchList(str, order = false) {
  if (order) {
    return str.match(/(?<=1\. )[^\n]+/img);
  }
  return str.match(/(?<=- )[^\n]+/img);
}

export function matchTitle(str) {
  return str.match(/(?<=#{1,6} )[^\n#]+/img);
}

let str = `\n图元：WebGL 能够绘制的基本图形元素，包含三种：点、线段、三角形。\n\n片元：可以理解为像素，像素着色阶段是在片元着色器中\n\n裁剪坐标系：裁剪坐标系是顶点着色器中的 gl_Position 内置变量接收到的坐标所在的坐标系\n\n设备坐标系：又名 NDC 坐标系，是裁剪坐标系各个分量对 w 分量相除得到的坐标系，特点是 x、y、z 坐标分量的取值范围都在 【-1，1】之间，可以将它理解为边长为 2 的正方体，坐标系原点在正方体中心。`;

export function matchParagraph(str) {
  return str.match(/(?<=> )[^\n#]+/img);
}



