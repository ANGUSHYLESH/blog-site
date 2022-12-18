import { Box, FormControl, InputBase, styled, Button, TextareaAutosize } from "@mui/material"

import { useState, useEffect, useContext } from "react"

import { AddCircle } from "@mui/icons-material"
import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled(Box)
    `
    margin:50px 100px
`

const StyledFormControl = styled(FormControl)
    `
    margin-top:10px;
    display:flex;
    flex-direction: row;
`

const InputTextField = styled(InputBase)
    `
flex:1;
margin: 0 30px;
font-size:20px;
`
const TextArea = styled(TextareaAutosize)
    `
width:100%;
margin-top:50px;
font-size:18px;
border:none;
&:focus-visible{
    outline:none;
}

`

const Image = styled("img")({
    width: '100%',
    height: "50vh",
    objectFit: "cover"
})

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}


const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const URL = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'


    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                post.picture = response.data;

            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])


    const handleChange = (e) => {
        console.log("Post started");
        setPost({ ...post, [e.target.name]: e.target.value })
    };

    const savePost = async () => {
        console.log(post);
        let response = await API.createPost(post)
        if (response.isSuccess) {
            navigate('/');
        }


    }

    return (
        <Container>
            <Image src={URL} alt="Post_images" />

            <StyledFormControl>

                <label htmlFor="fileInput">
                    <AddCircle fontSize="large" color="action" />
                </label>

                <input
                    type="file" name="" id="fileInput" style={{ display: "none" }} onChange={(e) => { setFile(e.target.files[0]) }} />

                <InputTextField placeholder="Enter your Title" onChange={(e) => handleChange(e)} name="title" />
                <Button variant="contained" onClick={() => savePost()} >Publish</Button>
            </StyledFormControl>
            <TextArea
                minRows={5}
                placeholder="...Enter Your Views..."
                onChange={(e) => handleChange(e)} name="description"
            />
        </Container>
    )
}


export default CreatePost