# PAL example

## Setup


```bash
# Backend
cd frontend
yarn install

# Frontend
cd backend
composer install

# Fill database info at .env and run migrations
artisan migrate
```

## Development

Start the development server on `http://localhost:3000`:

```bash
# Frontend
yarn dev

# Backend
artisan serve
```
