import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface Post {
    userId: number;
    id: Number;
    title: String;
    body: String;
}

// Get all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// Get a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the post id from the request
    let id: string = req.params.id;

    // Get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// Update a single post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the post id from the request.params
    let id: string = req.params.id;
    // Get the post from the request body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // Update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });

    // Return response
    return res.status(200).json({
        message: response.data
    });
};


// Delete a single post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the post id from the request.params
    let id: string = req.params.id;
    // Delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // Return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};


// Adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the data from the request body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // Add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
        });
    // Return response
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };
