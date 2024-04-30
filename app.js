const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'anakin18',
    database: 'webmidterm'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL bağlandı...');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/campaigns', (req, res) => {
    db.query('SELECT * FROM campaigns', (err, results) => {
        if (err) {
            console.error('Error fetching campaigns:', err);
            res.status(500).send('Database error occurred');
            return;
        }
        res.json(results);
    });
});

app.get('/api/campaign/:id', (req, res) => {
    const campaignId = req.params.id;
    db.query('SELECT * FROM campaigns WHERE id = ?', [campaignId], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Database error occurred');
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Campaign not found');
        }
    });
});
app.get('/api/search-products', (req, res) => {
    const query = req.query.query;
    const category = req.query.category;
    const tomorrowDelivery = req.query.tomorrow_delivery;
    const shipCities = req.query.ship_cities;
    let sql = "SELECT * FROM products WHERE 1 = 1";
    let params = [];

    if (query) {
        sql += " AND description LIKE ?";
        params.push('%' + query + '%');
    }

    if (category) {
        sql += " AND category = ?";
        params.push(category);
    }

    if (tomorrowDelivery) {
        sql += " AND tomorrow_delivery = ?";
        params.push(parseInt(tomorrowDelivery));
    }

    if (shipCities) {
        
        sql += ` AND ship_cities REGEXP ?`;
        
        params.push(`(^|, )${shipCities.trim()}(,|$)`);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Database error occurred');
            return;
        }
        res.json(results);
    });
});

app.get('/api/categories', (req, res) => {
    db.query("SELECT DISTINCT category FROM products", (err, results) => {
        if (err) {
            console.error('Error querying the database for categories:', err);
            res.status(500).send('Database error occurred');
            return;
        }
        res.json(results);
    });
});


app.get('/api/product/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT * FROM products WHERE product_no = ?', [productId], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('Database error occurred');
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Product not found');
        }
    });
});



app.listen(port, () => {
    console.log(`http://localhost:${port}/ çalışır.`);
});
