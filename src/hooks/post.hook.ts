import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface PostQuery {
    page_size: number;
    page: number;
}

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const usePost = (query: PostQuery) => useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () => axios
        .get("https://jsonplaceholder.typicode.com/posts", {
            params: {
                _start: (query.page - 1) * query.page_size,
                _limit: query.page_size
            }
        })
        .then(res => res.data),
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true
});

export default usePost;