import axios from 'axios';

const API = axios.create({baseURL : 'http://localhost:5000'});

//const url = 'https://next-exam.herokuapp.com/posts';
// API endpoint where the services are hoisted 

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts',newPost);

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);

export const deletePost = (id) =>  API.patch(`/posts/${id}`);

export const signin = (form) => API.post('/user/signin',form);

export const signup = (form) => API.post('/user/signup',form);