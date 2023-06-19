import axios from 'axios';
import { ENDPOINT_POSTS } from '../constants';
import { Post, Posts } from '../types';

export const getPosts = async () => {
  const res = await axios.get<Posts>(ENDPOINT_POSTS);
  return res.data;
};

export const getPost = async (id: number) => {
  const res = await axios.get<Post>(`http://localhost:3000/posts/${id}`);
  return res.data;
};

// export const getPostsPaginated = async (page) => {
//   return axios
//     .get('http://localhost:3000/posts', {
//       params: { _page: page, _sort: 'title', _limit: 2 },
//     })
//     .then((res) => {
//       const hasNext = page * 2 <= parseInt(res.headers['x-total-count']);
//       return {
//         nextPage: hasNext ? page + 1 : undefined,
//         previousPage: page > 1 ? page - 1 : undefined,
//         posts: res.data,
//       };
//     });
// };

// export function createPost({ title, body }) {
//   return axios
//     .post('http://localhost:3000/posts', {
//       title,
//       body,
//       userId: 1,
//       id: Date.now(),
//     })
//     .then((res) => res.data);
// }
