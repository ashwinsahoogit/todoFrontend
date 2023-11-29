import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'

const ListTodoComponent = () => {

    const [todos,setTodos] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        listTodos();
    },[])

    function listTodos(){
        getAllTodos().then((response)=>{
            setTodos(response.data)
        }).catch(error =>{
            console.error(error);
        })

    }

    function addNewTodo(){
        navigate('/add-todo')

    }

    function updateTodo(id){
        console.log(id);
        navigate(`/update-todo/${id}`)
    }

    function removeTodo(id){
        deleteTodo(id).then((reponse) => {
            listTodos();
        }).catch(error =>{
            console.error(error)
        })
    }

    function markCompleteTodo(id){
        completeTodo(id).then((response) =>{
            listTodos()
        }).catch(error =>{
            console.error(error)
        })
    }

    function markIncompleteTodo(id){
        incompleteTodo(id).then((response) =>{
            listTodos();
        }).catch(error =>{
            console.error(error)
        })
    }
  return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>
        <button className='btn btn-lg btn-primary mb-2' onClick={addNewTodo} ><i class="bi bi-patch-plus"></i> Add Todo</button>
        <div><table className='table table-bordered '>
            <thead>
                <tr>
                    <th>Todo Title</th>
                    <th>Todo Description</th>
                    <th>Todo Complete</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.completed ?"Yes":"No"}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateTodo(todo.id)}> <i class="bi bi-arrow-repeat p-1"></i>Update</button>
                                <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{marginLeft:"10px"}}> <i class="bi bi-trash3 p-1"></i>Delete</button>
                                <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={{marginLeft:"10px"}}> <i class="bi bi-check-circle p-1"></i>Complete</button>
                                <button className='btn btn-info' onClick={() => markIncompleteTodo(todo.id)} style={{marginLeft:"10px"}}> <i class="bi bi-x-circle p-1"></i>Incomplete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
            </table></div>

    </div>
  )
}

export default ListTodoComponent