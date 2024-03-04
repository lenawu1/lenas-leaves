# Lena's Leaves API Documentation
Author: Lena Wu

This API allows users to retrieve information about plants for sale and to use a shopping cart. 
In this API, all error responses are returned as JSON. Any 500 errors represent a server-side issue
and have a generic error message. Any 400-level errors represent an invalid request by a client. 

## *GET /api/products*
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** 
Returns a JSON array of all available plants

**Supported Parameters** None

**Example Request:** '/api/products'

**Example Response:**
*Fill in example response in the ticks*

```json
{
    "id": 1,
    "name": "Monstera Deliciosa",
    "category": "Indoor",
    "description": "A popular indoor plant with beautiful leaves.",
    "price": 25.00,
    "image": "monstera.jpg"
},
{
    "id": 2,
    "name": "Snake Plant",
    "category": "Indoor",
    "description": "An easy to care for indoor plant.",
    "price": 15.00,
    "image": "snakeplant.jpg"
}
```

**Error Handling:**
500: Internal server error. The server encountered an unexpected condition

## *GET /api/products/:id*
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** 
Returns JSON data of a plant based on the provided plant ID

**Supported Parameters** *List any optional/required parameters and defaults*
* /:id 
  * The ID of the plant to retrieve

**Example Request:** '/api/products/1'

**Example Response:**

```json
{
    "id": 1,
    "name": "Alocasia (Elephant Ear)",
    "category": "Tropical",
    "price": "15.00",
    "image": "images/alocasia.jpg"
}
```

**Error Handling:**
404: Not found if the plant ID does not exist.
Response: 'Product not found'

## *GET /api/products/filter*
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** 
Returns JSON data with items filtered by category.

**Supported Parameters** 
category - the category name to filter by.


**Example Request:** 
'/api/products/filter?category=Succulent'

**Example Response:**

```json
{
    "id": 12,
    "name": "Epiphyllum",
    "category": "Succulent",
    "price": "19.00",
    "image": "images/epi.jpg"
},
{
    "id": 13,
    "name": "Haworthia ",
    "category": "Succelent",
    "price": "9.00",
    "image": "images/haw.jpg"
}
```

**Error Handling:**
400: Invalid request if category parameter is not provided
404: Not found if category does not exist
Example Request (without category): /api/products/filter
Example Response:
Invalid request: Missing required parameter 'category'.
Example Request (non-existing category): /api/products/filter?category=nonexistentcategory
Example Response:
No products found for the given category.

## *POST /api/feedback*
**Request Format:** POST

**Returned Data Format**: JSON

**Description:** 
Accepts and stores customer feedback received via customer service form.

**Supported Parameters** 
name (optional): The name of the person submitting the feedback.
email (required): The email of the person submitting the feedback.
message (required): The feedback message.

**Example Request:** 
{
    "name": "Lena Wu",
    "email": "lena.m.wu@gmail.com",
    "message": "Very satisfied with my plant"
}

**Example Response:**
HTTP Status 201 (Created)
'Feedback received'

**Error Handling:**
400: Bad request if email or message is not provided in the request body.
Example Response: 'Email and message are required'
500: Internal server error. The server encountered an unexpected condition.