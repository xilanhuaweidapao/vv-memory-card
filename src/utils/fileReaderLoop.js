import fileHelper from "./fileHelper";
import uuidv1 from "uuid";
const path = require("path");
const fs = window.require("fs");

// const dataList = {};
//async写的工具递归读取文件夹数据的函数如何返回数据？？？
// async function readDirDeep(paths) {

//     const info = await fs.stat(paths);
//     if(info.isDirectory()) {
//         const fileNameList = await fs.readdir(paths);
//         console.log('fileNameList', fileNameList);
//         fileNameList.forEach(name => {
//             readDirDeep(`${paths}/${name}`);
//         });
//     }else if (info.isFile()) {
//         const data = await fs.readFile(paths,{encoding:'utf-8'});
//         const fileName = path.basename(paths,'.md'); //获取路径去掉文件扩展名的文件名
//         dataList[fileName] = {
//             id:uuidv1(),
//             content:data
//         }
//         console.log('data',fileName,data);
//         //
//     }
// }

function readDirDeep(paths, dataList = {}) {
  const fileNameList = fs.readdirSync(paths);
  fileNameList.forEach(name => {
    let fullPath = `${paths}/${name}`;

    const info = fs.statSync(fullPath);

    if (info.isDirectory()) {
      !dataList[name] && (dataList[name] = {});
      readDirDeep(fullPath, dataList);
    } else if (info.isFile()) {
      const data = fs.readFileSync(fullPath, { encoding: "utf-8" });
      const fileName = path.basename(fullPath, ".md"); //获取路径去掉文件扩展名的文件名
      const dirName = path.dirname(fullPath).split("/")[
        path.dirname(fullPath).split("/").length - 1
      ];
      dataList[dirName] &&
        !dataList[dirName][fileName] &&
        (dataList[dirName][fileName] = {
          id: uuidv1(),
          content: data
        });
    }
  });
  return dataList;
}

// let res = readDirDeep(dirPath)
// console.log('res', res);

// fileHelper.readFile(`${process.env.BASE_URL}resources/web/react.md`).then((data) => {
//     console.log(data);
// });
export default readDirDeep;
