import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.yuque.com/api/v2/'
    // headers: {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}
});
// 获取某篇文档的数据
export function getArticle({userName, reposName, articleSlug}) {
    return instance.get(`repos/${userName}/${reposName}/docs/${articleSlug}`,{
      params: {
        raw: 1 //遵循yq api 会在body返回markdown源码
      }
    });
}
// 获取仓库下所有的文档
export function getArticlesFromRepos(userName, reposSlug) {
  return instance.get(`repos/${userName}/${reposSlug}/docs`);
}

export function getAllRepos(userName) {
  return instance.get(`users/${userName}/repos`);
}

// 获取一个仓库的目录结构
export function getDetailFromRepos(userName, reposSlug) {
  return instance.get(`repos/${userName}/${reposSlug}/toc`);
}

// getArticle({userName: 'demaweiliya', reposName: 'memory_space', articleSlug: 'bghtcm'}).then((res)=>{
//   console.log('res doc', res, res.data.data.body);
// });

// https://www.yuque.com/api/v2/repos/demaweiliya/tech_card/docs 单一仓库下所有文档
// https://www.yuque.com/api/v2/repos/demaweiliya/memory_space/docs/dc0o1d?raw=1 具体某一篇文档
// https://www.yuque.com/api/v2/users/demaweiliya/repos // 所有仓库