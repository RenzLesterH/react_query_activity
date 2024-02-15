import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface PostQuery {
    page_size: number;
}

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const usePost = (query: PostQuery) => useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({pageParam = 1}) => axios
        .get("https://jsonplaceholder.typicode.com/posts", {
            params: {
                _start: (pageParam - 1) * query.page_size,
                _limit: query.page_size
            }
        })
        .then(res => res.data),
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: ( last_page, all_pages ) => {
        return last_page.length > 0 ? all_pages.length + 1 : undefined;
    }
});

export default usePost;