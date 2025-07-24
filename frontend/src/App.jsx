import { useState, useEffect } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("GET error: ", err));
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(description.trim() === ""){
        alert("Please enter a todo");
        return;
      }
    try {

      const res = await axios.post("http://localhost:3000/todos", {
        description,
      });
      setTodos([...todos, res.data]);
      setDescription("");
    } catch (err) {
      console.log("POST ERROR: ", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/todos/${id}`, {
        description: editValue,
      });

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, description: res.data.description } : todo
        )
      );

      setEditingId(null);
      setEditValue("");
    } catch (err) {
      console.error("PUT error: ", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(
        todos.filter((todo) => todo.id !== id)
      );
    }catch(err){
      console.error("DELETE error", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 mt-4">
      <h1 className="uppercase text-3xl font-bold">Todos </h1>
      <form
        onSubmit={handleSubmit}
        className=" flex items-center gap-2 w-full max-w-md mb-4 my-3"
      >
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="New Todo"
          className="flex-1 px-4 py-2 border-2 border-purple-400 p-4 rounded-md"
        />
        <button type="submit" className="px-4 py-2 bg-purple-400 rounded-md">
          <AddIcon />
        </button>
      </form>
      <div className="w-full max-w-md bg-white rounded-md">
        <ul>
          
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="w-full flex justify-between items-center border-b py-3 px-2"
              >
                {editingId === todo.id ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded mr-2"
                  />
                ) : (
                  <span className="flex-1">{todo.description}</span>
                )}

                {editingId === todo.id ? (
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="text-green-500 hover:text-green-700 mr-2"
                  >
                    <DoneIcon/>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditValue(todo.description);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <EditIcon />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <DeleteIcon/>
                </button>
              </li>
            ))}
          
        </ul>
      </div>
    </div>
  );
}

export default App;
