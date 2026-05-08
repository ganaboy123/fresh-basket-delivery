# Fresh Basket Delivery

Fresh Basket Delivery is a production-oriented full-stack e-commerce platform for Palm Oil, Coconut Oil, and Gari.

## Tech Stack

- Frontend: React + Vite + Framer Motion
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT
- API: REST
- Styling: Modern custom CSS (marketplace-style UI)

## Production-Level Improvements Included

- Scalable backend structure with centralized config (`server/src/config/env.js`)
- Consistent async error handling (`AppError`, `asyncHandler`, centralized middleware)
- Product API optimized with indexes, lean queries, pagination, filtering, and sort
- Stronger request validation (body + query validation)
- Reusable React UI components (filters, pagination, skeletons, transitions, error/empty states)
- Better UX with loading skeletons and smooth transitions
- Environment variable driven config on both client and server
- Docker-ready setup with `docker-compose.yml`

## Core Features

### User Features
- Register/login with JWT
- Profile management
- Save multiple addresses + set default
- Browse products with category + price filters
- Product details with size-based ordering
- Persistent cart
- Checkout with delivery information
- Payment methods:
  - Cash on Delivery
  - MTN (mock)
  - AirtelTigo (mock)
  - Telecel (mock)
- Order placement and timeline tracking

### Admin Features
- Protected admin routes
- Dashboard analytics (orders, revenue, users, products)
- Product CRUD
- Manage users
- Manage orders and status transitions

### Delivery Workflow
- Pending -> Processing -> Out for Delivery -> Delivered
- Status history with timestamps

## Project Structure

```
/client
/server
/docker-compose.yml
```

## Environment Variables

### Server (`server/.env`)
Copy `server/.env.example`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/fresh-basket-delivery
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
API_PREFIX=/api
DEFAULT_PAGE_LIMIT=12
MAX_PAGE_LIMIT=50
```

### Client (`client/.env`)
Copy `client/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_DEFAULT_PAGE_SIZE=12
```

## Local Development

### 1. Install dependencies

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Create env files

- `server/.env` from `server/.env.example`
- `client/.env` from `client/.env.example`

### 3. Start MongoDB

Run MongoDB locally on `mongodb://127.0.0.1:27017`.

### 4. Seed data

```bash
cd server
npm run seed
npm run seed:admin
```

Admin account:
- Email: `admin@freshbasket.com`
- Password: `Admin@12345`

### 5. Run apps

Terminal 1:
```bash
cd server
npm run dev
```

Terminal 2:
```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Docker Deployment (Optional)

From project root:

```bash
docker compose up --build
```

Services:
- Client: `http://localhost:8080`
- Server: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/profile`
- `POST /api/auth/addresses`
- `PATCH /api/auth/addresses/:addressId/default`

### Products
- `GET /api/products?page=1&limit=12&category=all&search=&minPrice=&maxPrice=&sort=newest`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin soft delete)

### Cart
- `GET /api/cart`
- `POST /api/cart/items`
- `PATCH /api/cart/items/:itemId`
- `DELETE /api/cart/items/:itemId`
- `DELETE /api/cart`

### Orders
- `POST /api/orders`
- `GET /api/orders/my-orders`
- `GET /api/orders/:id`
- `GET /api/orders` (admin)
- `PATCH /api/orders/:id/status` (admin)

### Admin
- `GET /api/admin/analytics`
- `GET /api/admin/users`

## Notes for Production

- Use a strong `JWT_SECRET`
- Restrict CORS to trusted frontend domains
- Use HTTPS and managed MongoDB backups
- Replace mock payment flow with real provider integrations
- Add request rate limiting and observability for high traffic
