# Mern Shop | eCommerce Platform

- E-Commerce platform built with the MERN stack & Redux Toolkit.

## Features

- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method etc.)
- Database seeder (products & users)

## Usage

1)  Create a [MongoDB database](https://www.mongodb.com/cloud/atlas/register) and obtain your `MongoDB URI`.

#### Env Variables

2) Create the `.env` file with following variables:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = [MONGO_DB_URI]
JWT_SECRET = [SECRET]
PAGINATION_LIMIT = 6
```

3) Change the `JWT_SECRET` and `PAGINATION_LIMIT` to what you want.

#### Install Dependencies

```
npm install
cd frontend
npm install
```

#### Run

```

# Run frontend (:5173) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

#### Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

#### Seed Database

4) You can use the following commands to seed the database with some sample users and products as well as destroy all data.

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
# Sample User Logins

Email: admin@email.com (Admin)
Password: secret

Email: johndoe@email.com (Customer)
Password: john_secret

Email: janedoe@email.com (Customer)
Password: jane_secret
```

---

## License

This project is licensed under the [MIT License](./LICENSE).
