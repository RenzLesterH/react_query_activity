import useTodo from "../hooks/todo.hooks";

const TodoList = () => {

    const { data: todos, error, isLoading } = useTodo();

    if (error) return <p>{error.message}</p> 

    return (
        <>
            {(!isLoading)
                ?   <ul className="list-group">
                        {todos?.map((todo) => (
                            <li key={todo.id} className="list-group-item">
                                {todo.title}
                            </li>
                        ))}
                    </ul>
                :   <p>Loading...</p>
            }
        </>
    );
}

export default TodoList