## E-COMMERCE API DOCUMENTATION

***INSTALLATION COMMAND:***

```npm install```

***TEST ACCOUNTS:***
- Regular User:
     - email: user@mail.com
     - pwd: user123
- Admin User:
    - email: admin@mail.com
    - pwd: admin123
    

***USER ROUTES:***

- User registration (POST)
	- http://localhost:4000/users/register
    - auth header required: NO
    - request body: 
        - firstName (string)
        - lastName (string)
        - email (string)
        - password (string)
        - mobileNo (string)

- User authentication (POST)
	- http://localhost:4000/users/login
    - auth header required: NO
    - request body: 
        - email (string)
        - password (string)

- User Details Request (Get)
	- http://localhost:4000/users/:userId/user-details
    - auth header required: YES
    - request body: none

- All User Details Request (Get) (Admin Only)
	- http://localhost:4000/users/
    - auth header required: YES 
    - request body: none

- Change role to Admin (PUT) (Admin Only)
    - http://localhost:4000/users/:userId/setAdmin
    - auth header required: YES
    - request body: none

***PRODUCT ROUTES:***

- Create Product (Admin only) (POST)
	- http://localhost:4000/products/create
    - auth header required: YES
    - request body: 
        - name (string)
        - description (string)
        - price (number)

- Retrieve all products (GET)
	- http://localhost:4000/products/all
    - auth header required: NO
    - request body: none

- Retrieve all active products (GET)
	- http://localhost:4000/products/active
    - auth header required: NO
	- request body: none

- Retrieve a specific product (GET) 
    - http://localhost:4000/products/:productId
    - auth header required: NO
	- request body: none    

- Update product details (POST) (Admin Only)
	- http://localhost:4000/products/:productId
    - auth header required: YES
	- request body: 
        - name (string)
        - description (string)
        - price (number)

- Archive Product (PUT) (Admin Only)
	- http://localhost:4000/products/:productId/archive
    - auth header required: YES
	- request body: none

- Activate Product (PUT) (Admin Only)
	- http://localhost:4000/products/:productId/activate
    - auth header required: YES
	- request body: none

- Add Stocks to product (PATCH) (Admin Only)
    - http://localhost:4000/products/:productId/update-stock
    - auth header required: YES
	- request body: 
        - stock (number)

***ORDER ROUTES:***

- Create Orders (POST) (Users Only)
    - http://localhost:4000/orders/
    - auth header required: YES
    - request body: 
        - userId (String)
        - Products(Array of Objects)
            - productId (String)
            - Quantity (Number)
- Get All Order (GET) (Admin Only)
    - http://localhost:4000/orders/all
    - auth header required: YES
    - request body: none

- Get Specific Order (GET) (User Only)
    - http://localhost:4000/orders/:orderId
    - auth header required: YES
    - request body: none

- Update Order Status (POST) (Admin Only)
    - http://localhost:4000/orders/:orderId
    - auth header required: YES
    - request body:
        - status (Sting)
        
***CART ROUTES:***

- Add Product to Cart (POST)
    - http://localhost:4000/cart/add
    - auth header required: NO
    - request body:
        - productId (Sting)
        
<!-- Add the rest of your routes here -->