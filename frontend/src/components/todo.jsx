import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

function todo(props) {
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("DELETE error:", error);
    }
  };
  return (
    <li
      key={props.id}
      className="w-full flex justify-between items-center border-b border-b-purple-400 py-3 px-2  mb-3"
    >
      <span className="">{props.description}</span>

      <button onClick={() => setEditMode(!editMode)}>
        <EditIcon />
      </button>

      <button
        onClick={() => handleDelete(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        <DeleteOutlineIcon />
      </button>
    </li>
  );
}

export default todo;
