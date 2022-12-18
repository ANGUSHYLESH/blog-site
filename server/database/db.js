import mongoose from "mongoose";

async function Connection() {
    const URL = `mongodb://localhost:27017/blog-site`;

    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log("error");
        console.log(error);
    }
}



export default Connection