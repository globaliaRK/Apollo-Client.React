import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const AddPost = () => {

    const history = useHistory();
    const [postTitle, setPostTitle] = useState();
    const [postMessage, setPostMessage] = useState();
    const [postImg, setPostImg] = useState();
    const [Data, setData] = useState();
    const [Error, setError] = useState();
    const [Token, setToken] = useState();
    const [addPost] = useMutation(ADDPOST, { variables: { postImg, postTitle, postMessage } });

    useEffect(() => {
        const token = window.localStorage.getItem('Token')
        if (!token) {
            history.push('/login');
        } else setToken(token)
    }, [])

    const onclick = async () => {
        try {
            const { data, loading } = await addPost()
            setData(data);
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => { history.push('/home') }, [Data])

    return (
        <>
            <div className='py-5' style={{ textAlign: "center" }}>
                <h1>Add Your Post</h1>
            </div>
            <form className="col-8 mx-auto">
                {Error && <div class="col-8 mx-auto alert alert-danger" role="alert">{Error.message.toString()}</div>}
                <div class="form-group">
                    <label for="postTitle">Post Title</label>
                    <input type="text" value={postTitle} onChange={({ target }) => setPostTitle(target.value)} class="form-control" id="postTitle" />
                </div>
                <div class="form-group">
                    <label for="postMessage">Post Message</label>
                    <input type="text" value={postMessage} onChange={({ target }) => setPostMessage(target.value)} class="form-control" id="postMessage" />
                </div>
                <div class="form-group">
                    <label for="postImg">Post Img</label>
                    <input type="text" value={postImg} onChange={({ target }) => setPostImg(target.value)} class="form-control" id="postImg" />
                </div>
                <button type="button" onClick={onclick} class="btn btn-primary">{
                    // loading ?
                    //     <div class="spinner-border text-light" role="status">
                    //         <span class="visually-hidden"></span>
                    //     </div>
                    //     : 
                    'Add Post'
                }</button>
            </form>
        </>
    );
};

const ADDPOST = gql`
mutation($postTitle:String!,$postMessage:String!,$postImg:String!){
  addPost(post:{postTitle:$postTitle,postMessage:$postMessage,postImg:$postImg}){
		_id
        postTitle
        postMessage
        postImg
  }
}
`;

export default AddPost;