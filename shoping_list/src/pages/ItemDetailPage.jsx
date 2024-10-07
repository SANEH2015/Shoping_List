import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemById, updateItem, deleteItem } from '../Slices/ShopingListSlice';  // Import the actions

const ItemDetailPage = () => {
  const { id } = useParams(); // Get the item id from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { itemDetail, status, error } = useSelector((state) => state.shoppingList);

  const [editMode, setEditMode] = useState(false); // To toggle between view and edit mode
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    notes: '',
  });

  // To-Do List State
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    dispatch(fetchItemById(id)); // Fetch item details
  }, [dispatch, id]);

  // If item is not found, display an error message
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // If loading, show a loading message
  if (status === 'loading') {
    return <div>Loading item details...</div>;
  }

  // When itemDetail is not available, show an item not found message
  if (!itemDetail) {
    return <div>Item not found!</div>;
  }

  // Handle changes to the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update item
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({ ...itemDetail, ...formData }));
    setEditMode(false); // Switch back to view mode after saving
  };

  // Handle item deletion
  const handleDelete = () => {
    dispatch(deleteItem(id));
    navigate('/ShoppingList'); // Redirect to shopping list after deleting
  };

  // Add a new task to the To-Do list
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask) {
      setTodoList([...todoList, { id: Date.now(), task: newTask }]);
      setNewTask('');
    }
  };

  // Delete a task from the To-Do list
  const handleDeleteTask = (taskId) => {
    setTodoList(todoList.filter(task => task.id !== taskId));
  };

  // Edit a task in the To-Do list
  const handleEditTask = (taskId, newDescription) => {
    setTodoList(todoList.map(task => 
      task.id === taskId ? { ...task, task: newDescription } : task
    ));
  };

  return (
    <div style={styles.container}>
      {editMode ? (
        // Edit Mode
        <form onSubmit={handleSubmit}>
          <h1 style={styles.title}>Edit Item</h1>
          <div style={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || itemDetail.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity || itemDetail.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes || itemDetail.notes}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Save</button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            style={styles.button}
          >
            Cancel
          </button>
        </form>
      ) : (
        // View Mode
        <>
          <h1 style={styles.title}>Item Details</h1>
          <h3>Name: {itemDetail.name}</h3>
          <p>Quantity: {itemDetail.quantity}</p>
          <p>Notes: {itemDetail.notes}</p>
          {/* <button onClick={() => setEditMode(true)} style={styles.button}>
            Edit
          </button>
          <button onClick={handleDelete} style={styles.button}>
            Delete
          </button> */}
          <button onClick={() => navigate('/ShoppingList')} style={styles.button}>
            Back to Shopping List
          </button>
        </>
      )}

      {/* new item List Section */}
      <div style={styles.todoContainer}>
        <h2>Add new item</h2>
        <form onSubmit={handleAddTask} style={styles.formGroup}>
          <input
            type="text"
            placeholder="Enter new item..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Item</button>
        </form>

        {todoList.length > 0 ? (
          <ul style={styles.todoList}>
            {todoList.map((task) => (
              <li key={task.id} style={styles.todoItem}>
                <input
                  type="text"
                  value={task.task}
                  onChange={(e) => handleEditTask(task.id, e.target.value)}
                  style={styles.todoInput}
                />
                <button onClick={() => handleDeleteTask(task.id)} style={styles.button}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items added yet.</p>
        )}
      </div>
    </div>
  );
};

// Styles for the To-Do List section
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: 'rgb(86, 182, 201)',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formGroup: {
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'rgb(86, 182, 201)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  todoContainer: {
    marginTop: '30px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    width:"30%",
    fontFamily: 'Arial, sans-serif'
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  todoList: {
    listStyleType: 'none',
    padding: 0,
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '5px 0',
  },
  todoInput: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
};

export default ItemDetailPage;
