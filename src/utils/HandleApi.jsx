import axios from 'axios';

const baseurl = 'https://fullsatck-todoapp-backend.onrender.com';

// Function to fetch all todos
const getAllTodo = (setTodo) => {
    axios.get(baseurl)
        .then(({ data }) => {
            console.log('data-------', data);
            setTodo(Array.isArray(data) ? data : []);  // Ensure data is an array
        })
        .catch((err) => console.log(err));
};

// Function to add a new todo
const addTodo = (text, setText, setTodo) => {
    axios.post(`${baseurl}/save`, { text })
        .then(({ data }) => {
            console.log(data);
            setText("");  // Clear the input field after adding
            getAllTodo(setTodo);  // Refresh the todo list
        })
        .catch((err) => console.log(err));
};

// Function to update an existing todo
const updateTodo = (toDoId, text, setText, setTodo, setIsUpdating) => {
    axios.post(`${baseurl}/update`, { _id: toDoId, text })
        .then(({ data }) => {
            console.log('Updated todo:', data);
            setText("");  // Clear the input field after updating
            setIsUpdating(false);  // Exit update mode
            getAllTodo(setTodo);  // Refresh the todo list
        })
        .catch((err) => console.log(err));
};


const deleteToDo = (_id,setTodo) => {
    axios.post(`${baseurl}/delete`,{_id})
        .then(({ data }) => {
            console.log('Deleted todo:', data);
            getAllTodo(setTodo);  // Refresh the todo list after deletion
        })
        .catch((err) => console.log(err));
};

export { addTodo, getAllTodo, updateTodo ,deleteToDo};
