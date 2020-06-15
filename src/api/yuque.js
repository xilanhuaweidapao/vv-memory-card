import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.yuque.com/api/v2/',
    // 需要配置 token
    headers: {
      'X-Auth-Token': 'NVKlMKxT6djkjGlCePzo6BmqqooNuqkRfWZUbxsr'
    }
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