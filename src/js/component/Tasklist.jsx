import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const Tasklist = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");


  const urlTodos =
    "https://playground.4geeks.com/apis/fake/todos/user/KitsuneDai";

    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = () => {
      fetch(urlTodos)
        .then((response) => response.json())
        .then((data) => {
          setTodos(data);
          console.log("Tareas obtenidas:", data);
        })
        .catch((err) => {
          console.error("Error al obtener las tareas:", err);
        });
    };

 
  const addTask = () => {
    let newTodo = { label: task, done: false };
    fetch(urlTodos, {
      method: "PUT", 
      body: JSON.stringify([...todos, newTodo]), // Agrega la nueva tarea al array existente
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, newTodo]);
        setTask(""); // Limpia el campo de entrada después de agregar la tarea
        console.log("PUT-> Nueva tarea añadida a la lista:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTask = (index) => {
    const updatedTasks = [...todos];
    updatedTasks.splice(index, 1);
    setTodos(updatedTasks);
  
    fetch('https://playground.4geeks.com/apis/fake/todos/user/KitsuneDai', {
      method: "PUT",
      body: JSON.stringify(updatedTasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar.');
      }
      return response.json();
    })
    .then(data => {
      // Manejar la respuesta si es necesario
    })
    .catch(error => {
      console.error(error);
    });
  };
 
  // const deleteTask = (taskId) => {
  //   fetch( urlTodos , {
  //     method: "DELETE",
  //   })
  //     .then(() => {
  //       setTodos(todos.filter((todo) => todo.id !== taskId));
  //       console.log("Eliminar:", taskId);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const buttonYes =() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/KitsuneDai", {
      method: "DELETE",
    })
    .then (()=>{
      setTodos([]);
      console.log("Todas las tareas eliminadas Y EL USUARIO!!!");
    })
    .catch((err) => {
      console.err(err);
    })
  }

  const buttonNo =()=>{
    alert("¡Pues deja de tocar cosas!");
  };

 
  return (
    <>
      <ul>
        <li> 
        <input type="text" 
             onChange={(e)=>setTask(e.target.value)} //Traemos un valor que nos proporciona el input al setTask
             value={task} // Añadimos el valor que entró desde el input a la variable llamada task
             onKeyDown={(e)=> {
              if (e.key === "Enter") {
                addTask();
                
              }
          }} 
             className="Addtask"
             placeholder="What needs to be done?">
            </input>
        </li>

        {todos.map((todo, index) => (
          //EL KEY DEL <li> sera el index del array!
          <li key={index} className="tasklist">  
            {todo.label}
            <span onClick={() => deleteTask(index)} className="tasklist"><RiDeleteBinLine className="icon" /></span>
          </li>
        ))}
        
      </ul>

      <hr />

      <div className="footer">
        {todos.length === 0 ? (<p>No hay tareas en la lista, añada una tarea</p>) : todos.length === 1 ? (`${todos.length} tarea`) : (`${todos.length} tareas`)}
      </div>

      <div className="d-grid gap-2" style={{paddingBottom: "15px"}}>
          <p className="text-center" style={{marginBottom: "0px"}}>¿Quieres mandarlo todo a la mierda?</p>
              <button onClick={buttonYes} className="btn btn-primary" type="button">Sí quiero</button>
              <button onClick={buttonNo} className="btn btn-danger buttonNo" type="button">No quiero</button>
      </div>

    </>
  );
};

export default Tasklist;

