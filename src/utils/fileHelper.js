const fs = window.require('fs').promises

const publicPath = `${__static}/test.md`;

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf8'})
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, { encoding: 'utf8'})
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  }
}

fileHelper.readFile(publicPath).then((data) => {
  console.log('data',data);
})

export default fileHelper