
import Post from "../model/post.js";


export const createPost = async (request, response) => {
    try {
       const post= new Post(request.body);
       post.save();
        response.status(200).json('Post saved successfully');

    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAllPosts = async(request, response)=>{

    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if (username)
            posts = await Post.find({ username: username });
        else if (category)
            posts = await Post.find({ categories: category });
        else
            posts = await Post.find({});

        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }

}