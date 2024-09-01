import { useEffect, useState } from 'react';
import ToDo from "./components/ToDo";
import { getAllTodo, addTodo, updateTodo,deleteToDo } from "./utils/HandleApi";

function App() {
  const [todo, setTodo] = useState([]);  // Initialize with an empty array
  const [text, setText] = useState("");  // String for the text input
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllTodo(setTodo);  // Fetch all todos on component mount
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);  // Ensure only the string text is set
    setToDoId(_id);
  };

  const handleAddOrUpdate = () => {
    if (isUpdating) {
      updateTodo(toDoId, text, setText, setTodo, setIsUpdating);
    } else {
      addTodo(text, setText, setTodo);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo Application</h1>
        <div className="top">
          <input
            type="text"
            placeholder='Add todos'
            value={text}  // Display the text string in the input
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={handleAddOrUpdate}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {Array.isArray(todo) && todo.length > 0 ? (
            todo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                
                deleteToDo={()=>deleteToDo(item._id,setTodo)}
              />
              
            ))
          ) : (
            <p>No todos available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
