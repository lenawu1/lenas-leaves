/**
 * NAME: Lena Wu
 * DATE: June 10, 2023
 * Javascript server implementation.
 * Fetches the product details, filters products based on category 
 */

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS 
app.use(cors());
const productsData = JSON.parse(fs.readFileSync('public/products.json', 'utf8'));
app.use(express.static('public'));
app.use(express.json());

// GET endpoint for fetching details of a specific product using its ID
app.get('/api/products/:id', (req, res) => {
    const product = productsData.find(p => p.id === parseInt(req.params.id, 10));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

// GET endpoint for fetching products based on a category filter
app.get('/api/products/filter', (req, res) => {
    const category = req.query.category;
    const filteredProducts = productsData.filter(p => p.category === category);
    res.json(filteredProducts);
});

// GET endpoint for fetching all products
app.get('/api/products', (req, res) => {
    res.json(productsData);
});

// POST endpoint for receiving feedback via customer service form
app.post('/api/feedback', (req, res) => {
    const { name, email, message } = req.body;

    if (!email || !message) {
        return res.status(400).send('Email and message are required');
    }

    fs.readFile('feedback.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error reading feedback data');
        }

        let feedback = [];
        if (data) {
            feedback = JSON.parse(data);
        }
        feedback.push({ name, email, message, timestamp: new Date().toISOString() });
        fs.writeFile('feedback.json', JSON.stringify(feedback, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Error saving feedback data');
            }
            res.status(201).send('Feedback received');
        });
    });
});

app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
});
