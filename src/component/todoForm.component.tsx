import { useRef } from 'react';
import useAddTodo from '../hooks/useAddTodo.hook';

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodo(() => {
      if(ref.current){
        ref.current.value = "";
      }
  });

  return (
    <>
      <form 
          className="row mb-3 mt-2 ms-1" 
          onSubmit={(event)=> {
              event.preventDefault();
              if(ref.current && ref.current.value){
                  addTodo.mutate({
                      id: 0,
                      title: ref.current.value,
                      completed: false,
                      userId: 1,
                  })
              }
          }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">{(addTodo.isLoading) ? "Adding..." : "Add"}</button>
        </div>
      </form>

      {addTodo.error &&
        <div className="alert alert-danger ms-2 p-2" role="alert">
            {addTodo.error.message}
        </div>
      }

    </>
  );
};

export default TodoForm;