drawImage 放大图片不会导致失真

- 哪些操作会导致图片失真？

electron 默认支持 canvas

// 指定宽高比的计算
const ratio = imgWidth / imgHeight;
// let dHeight = window.innerWidth / ratio;
// let dWidth = window.innerHeight \* ratio;
