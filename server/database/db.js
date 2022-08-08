import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@blog-app-shard-00-00.t67bd.mongodb.net:27017,blog-app-shard-00-01.t67bd.mongodb.net:27017,blog-app-shard-00-02.t67bd.mongodb.net:27017/test?ssl=true&replicaSet=atlas-14nfap-shard-0&authSource=admin&retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true
        })
        console.log("DB connected successfully");
    } catch (error) {
        console.log("error");
        console.log(error);
    }
}

export default Connection