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
          <button onClick={() => setEditMode(true)} style={styles.button}>
            Edit
          </button>
          <button onClick={handleDelete} style={styles.button}>
            Delete
          </button>
          <button onClick={() => navigate('/ShoppingList')} style={styles.button}>
            Back to Shopping List
          </button>
        </>
      )}
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
};

export default ItemDetailPage;
