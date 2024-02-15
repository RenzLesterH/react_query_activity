import { useState } from 'react';
import usePost from '../hooks/post.hook';

const Post = () => {
    const page_size = 10;
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = usePost({page, page_size});

    if (error) return <p>{error.message}</p> 

    return (
        <>
            {(!isLoading)
                ? <>
                    <ul className="list-group p-3">
                        {data?.map((post) => (
                            <li key={post.id} className="list-group-item">
                                {post.title}
                            </li>
                        ))}
                    </ul>
                    <button disabled={page === 1} type="button" onClick={()=> setPage(page - 1)} className="btn btn-outline-primary my-3 mx-1">Previous</button>
                    <button type="button" onClick={()=> setPage(page + 1)} className="btn btn-primary my-3 ms-1">Next</button>
                  </>
                : <p>Loading...</p>
            }
        </>
    )
}

export default Post