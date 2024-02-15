import React from 'react';
import usePost from '../hooks/post.hook';

const Post = () => {
    const page_size = 10;
    const { data, error, isLoading, fetchNextPage, isFetching } = usePost({page_size});

    if (error) return <p>{error.message}</p> 

    return (
        <>
            {(!isLoading)
                ? <>
                    <ul className="list-group p-3">
                        {data.pages.map((page, index) => (
                            <React.Fragment key={index}>
                                {page.map((post) => (
                                    <li key={post.id} className="list-group-item">
                                        {post.title}
                                    </li>
                                ))}
                            </React.Fragment>
                        ))}
                    </ul>
                    <button type="button" onClick={()=> fetchNextPage()} className="btn btn-primary my-3 ms-1">
                        {(isFetching) ? "Loading..." : "Load More"}
                    </button>
                  </>
                : <p>Loading...</p>
            }
        </>
    )
}

export default Post