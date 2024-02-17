import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from '../hooks/useTodo.hooks';
import { CACHE_KEY_TODOS } from "../assets/constants";

interface AddTodoContext {
    previous_todos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: (todo: Todo) => 
            axios
                .post<Todo>(
                    "https://jsonplaceholder.typicode.com/todosx", 
                    todo
                )
                .then((res) => res.data),
        onMutate: (new_todo: Todo) => {
            const previous_todos = queryClient.getQueriesData<Todo[]>(CACHE_KEY_TODOS) || [];

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
                new_todo,
                ...todos,
            ]);

            onAdd();

            return { previous_todos };
        },
        onSuccess: (saved_todo, new_todo) => {
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, todos => 
                todos?.map((todo) => 
                    todo === new_todo ? saved_todo : todo
                )
            );
        },
        onError: (error, new_todo, context) => {
            if (!context) return;

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previous_todos)
        }
    });
}

export default useAddTodo;