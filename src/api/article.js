import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.yuque.com/api/v2/'
    // headers: {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}
});


export function getArticle(url) {
    return instance.get(url,{
      params: {
        raw: 1 //遵循yq api 会在body返回markdown源码
      }
    });
}

export function getAllRepos() {
  return instance.get('users/demaweiliya/repos')
}
