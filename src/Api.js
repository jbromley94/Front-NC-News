import axios from "axios";
const apiUrl = "https://jb-northcoder-news.herokuapp.com/api";

export const fetchArticles = () => {
  return axios.get(`${apiUrl}/articles`);
};

export const fetchTopics = () => {
  return axios.get(`${apiUrl}/topics`);
};

export const fetchUsers = () => {
  return axios.get(`${apiUrl}/users`);
};

export const fetchUser = username => {
  return axios.get(`${apiUrl}/users/${username}`);
};

export const fetchArticle = articleid => {
  return axios.get(`${apiUrl}/articles/${articleid}`);
};

export const fetchTopicArticles = topicSlug => {
  return axios.get(`${apiUrl}/topics/${topicSlug}/articles`)
}

export const voteOnArticle = (articleid, voteOption) => {
  return axios.put(`${apiUrl}/articles/${articleid}?vote=${voteOption}`);
};

export const voteOnComment = (commentid, voteOption) => {
  return axios.put(`${apiUrl}/comments/${commentid}?vote=${voteOption}`);
};

export const fetchArticleComments = articleid => {
  return axios.get(`${apiUrl}/articles/${articleid}/comments`);
};

export const postComment = (articleid, data) => {
  return axios.post(`${apiUrl}/articles/${articleid}/comments`, data);
};

export const fetchUserComments = () => {
  return axios.get(`${apiUrl}/comments`);
};

export const deleteComment = commentid => {
  return axios.delete(`${apiUrl}/comments/${commentid}`);
};

export const fetchArticlesByUser = userid => {
  return axios.get(`${apiUrl}/users/${userid}/articles`)
}
