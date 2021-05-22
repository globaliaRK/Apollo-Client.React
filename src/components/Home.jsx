import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Home = () => {

    const history = useHistory();
    const [Token, setToken] = useState();
    const { loading, data, error } = useQuery(getAllPost);


    return (
        <div>
            {loading && <div class="spinner-border text-light" role="status">
                <span class="visually-hidden"></span>
            </div>}
            {data && <div className='col-8 mx-auto row p-3'>
                {data.Post.map(({ postTitle, postMessage, postImg, postComment }) => {
                    return (<div className="card m-3" style={{ width: '18rem' }}>
                        <img src='https://i.postimg.cc/cHhjnHyX/https-postimg-cc-mt3-VWXT8.jpg' className="card-img-top" alt={postImg} />
                        <div className="card-body">
                            <h5 className="card-title">{postTitle}</h5>
                            <p className="card-text">{postMessage}</p>
                            <div className='px-2 row' style={{ display: 'grid' }}>
                                <p className="card-text">Comment :- {postComment.length}</p>
                                <button href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">Add Comment</button>
                            </div>
                        </div>
                    </div>)
                })}
            </div>}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">vdfvdfv</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getAllPost = gql`
{
                    Post{
                    _id
    postTitle
    postMessage
    postImg
    postComment{
                    commentTitle
      commentBody
    }
  }
}
`;

export default Home;