import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from '../Slices/ShopingListSlice';
import { useNavigate,Link } from 'react-router-dom'; 

const ItemForm = ({ newItem, setNewItem, onSubmit, editingItem }) => {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <input 
        type="text" 
        placeholder="Item Name" 
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
        required 
        style={styles.input} 
      />
      <input 
        type="number" 
        placeholder="Quantity" 
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} 
        required 
        style={styles.input} 
      />
      <textarea 
        placeholder="Notes" 
        value={newItem.notes}
        onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })} 
        style={styles.textarea}
      />
      <button type="submit" style={styles.button}>
        {editingItem ? 'Update' : 'Add'} Item
      </button>
    </form>
  );
};

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingList.items);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', notes: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('name');

  const navigate = useNavigate(); // Add navigate hook

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();

    // Ensure quantity is a number before saving
    const updatedItem = { ...newItem, quantity: parseInt(newItem.quantity, 10) };

    if (editingItem) {
      // Update item
      dispatch(updateItem({ ...editingItem, ...updatedItem }));
      setEditingItem(null); // Clear the editing state after updating
    } else {
      // Add new item
      dispatch(addItem({ ...updatedItem, id: Date.now() }));
    }

    resetForm();
  };

  const resetForm = () => {
    setNewItem({ name: '', quantity: '', notes: '' });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, quantity: item.quantity.toString(), notes: item.notes });
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleViewMore = (id) => {
    navigate(`/ItemDetailPage/${id}`);  // Correct route path
  };
  

  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (a[sortCriteria] > b[sortCriteria] ? 1 : -1));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping List</h1>
      <input 
        type="text" 
        placeholder="Search items..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={styles.searchInput}
      />
      <select onChange={(e) => setSortCriteria(e.target.value)} style={styles.sortSelect}>
        <option value="name">Sort by Name</option>
        <option value="quantity">Sort by Quantity</option>
      </select>
      <ItemForm 
        newItem={newItem} 
        setNewItem={setNewItem} 
        onSubmit={handleAdd} 
        editingItem={editingItem}
      />
      <ul style={styles.list}>
        {filteredItems.map(item => (
          <li key={item.id} style={styles.listItem}>
            <h3 style={styles.itemName}>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Notes: {item.notes}</p>
            <div style={styles.buttonContainer}>
              <button onClick={() => handleEdit(item)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={styles.deleteButton}>Delete</button>
              {/* Add View More button */}
              {/* <button onClick={() => handleViewMore(item.id)} style={styles.viewButton}>View More</button> */}
          <Link to={`${item.id}`}>     <button style={styles.viewButton}>View More</button></Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: 'rgb(86, 182, 201)',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  searchInput: {
    padding: '10px',
    marginBottom: '15px',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid rgb(86, 182, 201)',
    borderRadius: '5px',
    fontSize: '16px',
  },
  sortSelect: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid rgb(86, 182, 201)',
    borderRadius: '5px',
    fontSize: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid rgb(86, 182, 201)',
    borderRadius: '5px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid rgb(86, 182, 201)',
    borderRadius: '5px',
    fontSize: '16px',
    minHeight: '80px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'rgb(86, 182, 201)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  viewButton: {
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'rgb(67, 155, 174)',
    color: 'white',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
  listItem: {
    width: '250px',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  itemName: {
    color: 'rgb(86, 182, 201)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  editButton: {
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'rgb(67, 155, 174)',
    color: 'white',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'red',
    color: 'white',
    cursor: 'pointer',
  },
};

export default ShoppingList;
