// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;


// let items = [
//   { id: 1, name: '', quantity: 5 },
//   { id: 2, name: '', quantity: 3 },
//   { id: 3, name: '', quantity: 4 }
// ];


// app.use(bodyParser.json());


// app.get('/items', (req, res) => {
//   res.status(200).json(items);
// });


// app.post('/items', (req, res) => {
//   const newItem = req.body;
//   newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
//   items.push(newItem);
//   res.status(201).json(newItem);
// });


// app.put('/items/:id', (req, res) => {
//   const { id } = req.params;
//   const updatedItem = req.body;
  
//   let index = items.findIndex(item => item.id === parseInt(id));
  
//   if (index !== -1) {
//     items[index] = { ...items[index], ...updatedItem };
//     res.status(200).json(items[index]);
//   } else {
//     res.status(404).json({ error: 'Item not found' });
//   }
// });


// app.delete('/items/:id', (req, res) => {
//   const { id } = req.params;
//   const index = items.findIndex(item => item.id === parseInt(id));

//   if (index !== -1) {
//     items = items.filter(item => item.id !== parseInt(id));
//     res.status(204).end();
//   } else {
//     res.status(404).json({ error: 'Item not found' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
