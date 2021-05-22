import { gql, useMutation } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const AddPost = () => {

    const history = useHistory();
    const [postDetail, setPostDetail] = useState({ postTitle: null, postMessage: null, postImg: null });

    const [addPost, { data, loading, error }] = useMutation(ADDPOST, { variables: { ...postDetail } });

    const onclick = async () => {
        const { postTitle, postMessage, postImg } = postDetail;
        if (!postTitle) {
            toast.error("postTitle cann't empty", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
        } else if (!postMessage) {
            console.log({ postTitle, postMessage, postImg });
            toast.error("postMessage cann't empty", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
        } else if (!postImg || !postImg.match(/\.(jpe?g|png)$/i)) {
            toast.error("postImg cann't empty or not a image file.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
            });
        } else {
            try {
                await addPost();
            } catch (err) {
                toast.error('Post Title already userd.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            }
        }
    }

    useEffect(() => { console.log(data) }, [data])

    return (
        <Fragment>
            <div className='py-5' style={{ textAlign: "center" }}>
                <h1>Add Your Post</h1>
            </div>
            <form className="col-8 mx-auto">
                <div class="form-group">
                    <label for="postTitle">Post Title</label>
                    <input type="text" name="postTitle" value={postDetail.postTitle} onChange={({ target }) => setPostDetail({ ...postDetail, [target.name]: target.value })} class="form-control" id="postTitle" />
                </div>
                <div class="form-group">
                    <label for="postMessage">Post Message</label>
                    <input type="text" name="postMessage" value={postDetail.postMessage} onChange={({ target }) => setPostDetail({ ...postDetail, [target.name]: target.value })} class="form-control" id="postMessage" />
                </div>
                <div class="form-group">
                    <label for="postImg">Post Img</label>
                    <input type="text" name="postImg" value={postDetail.postImg} onChange={({ target }) => setPostDetail({ ...postDetail, [target.name]: target.value })} class="form-control" id="postImg" />
                </div>
                <button type="button" onClick={onclick} class="btn btn-primary">Add Post</button>
            </form>
            <ToastContainer />
        </Fragment>
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