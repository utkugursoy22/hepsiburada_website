# Webmidterm (Hepsiburada) Overview

Google Drive Video Link: https://drive.google.com/file/d/1ZgHg6zBlojTOf7NfQrvO_wv-56YB5C7A/view?usp=sharing

This project is a web-based application designed to showcase and manage campaigns and product details dynamically. It uses MySQL for database management, Express.js as the server framework, and HTML/CSS/JavaScript for the front end.

## Project Structure

- `index.html`: Main page displaying campaigns and product categories.
- `product-detail.html`: Detailed view for individual products.
- `search-result.html`: Displays search results based on user queries.
- `styles.css`: Contains the styling for the web pages.
- `app.js`: Sets up the Express server and routes for API endpoints.
- `product-detail.js`, `search.js`: JavaScript files handling dynamic content loading and interaction in respective HTML pages.
 - `search.js`: Handles the logic for filtering and displaying products based on search queries and categories on the search results page.


## Data Model

The application utilizes MySQL for storing and managing data with two main tables:
1. `campaigns`: Stores campaign information with fields like `id`, `text`, and `image_url`.
2. `products`: Stores product details including `product_no`, `description`, `price`, `image_url`, `category`, `color`, `ship_cities`, and `tomorrow_delivery`.

### Sample Database Operations

#### Campaigns
- Fetch all campaigns: `SELECT * FROM campaigns;`
- Add a new campaign:
  ```sql
  INSERT INTO campaigns (text, image_url) VALUES
  ('New Campaign', 'https://example.com/new_campaign.jpg');
#### Products
Fetch all products: SELECT * FROM webmidterm.products;
Insert a new product:

INSERT INTO products (description, price, image_url, category, color, ship_cities, tomorrow_delivery) VALUES
('New Product', 100.00, 'https://example.com/new_product.jpg', 'Category', 'Color', 'Cities', TRUE);

#### Assumptions
The web application is expected to run in a modern web browser with JavaScript enabled.
MySQL server must be properly configured and running to handle requests from the Express.js application.
Setup and Installation
Clone the repository to your local machine.
Navigate to the project directory and install dependencies:

npm install


Start the server:

npm start


#### API Endpoints
/api/campaigns: Returns all campaigns.
/api/campaign/:id: Returns a specific campaign by ID.
/api/products: Returns all products.
/api/product/:id: Returns a specific product by product number.
/api/search-products: Returns products based on search criteria (query, category, tomorrow delivery, city)
