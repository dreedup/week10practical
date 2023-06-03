const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Create an array to hold the items
let items = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// GET /items: Return a list of items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items: Add a new item to the list
app.post('/items', (req, res) => {
  const newItem = req.body;
  if (!newItem.name || !newItem.price) {
    res.status(400).json({ error: 'Name and price fields are required' });
  } else {
    newItem.id = generateId(); // Assuming you have a function to generate a unique id
    items.push(newItem);
    res.json(newItem);
  }
});

// GET /items/:id: Return the item with the given id
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// PUT /items/:id: Update the item with the given id
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    if (!updatedItem.name || !updatedItem.price) {
      res.status(400).json({ error: 'Name and price fields are required' });
    } else {
      items[itemIndex] = { ...items[itemIndex], ...updatedItem };
      res.json(items[itemIndex]);
    }
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE /items/:id: Delete the item with the given id
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});