# Property Search Application

A full-stack property search and listing website built with modern technologies.

## Tech Stack

### Frontend
- Next.js (React framework with SSR/SSG)
- TypeScript
- Tailwind CSS
- React Query
- Mapbox/Google Maps API

### Backend
- Node.js with Express
- GraphQL (Apollo)
- MySQL database
- Prisma ORM
- Redis for caching
- Elasticsearch for property search

### Infrastructure
- Docker & Docker Compose
- CI/CD with GitHub Actions

## Features

- Property listing and searching
- Advanced filtering (price, bedrooms, location, etc.)
- User authentication
- Property details with images
- Map-based property visualization
- Save favorite properties
- Responsive design for all devices

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd property-search-app
```

2. Start the application with Docker Compose
```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/graphql

## Development

### Frontend Development

```bash
# Enter the frontend container
docker-compose exec frontend sh

# Install a new package
npm install package-name
```

### Backend Development

```bash
# Enter the backend container
docker-compose exec backend sh

# Run database migrations
npx prisma migrate dev --name your_migration_name

# Generate Prisma client
npx prisma generate
```

## Project Structure

```
property-search-app/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # Reusable React components
│   │   └── lib/            # Utility functions and hooks
│   ├── public/             # Static assets
│   └── Dockerfile          # Frontend Docker configuration
│
├── backend/                # Express/GraphQL API
│   ├── src/
│   │   ├── models/         # GraphQL type definitions
│   │   ├── resolvers/      # GraphQL resolvers
│   │   ├── middlewares/    # Express middlewares
│   │   └── index.ts        # Server entry point
│   ├── prisma/             # Prisma schema and migrations
│   └── Dockerfile          # Backend Docker configuration
│
└── docker-compose.yml      # Docker Compose configuration
```

## Troubleshooting

### Common Issues

1. **Docker build failing for backend:**
   - Ensure all dependencies are correctly listed in package.json
   - Try removing the node_modules volume and rebuilding: `docker-compose down -v && docker-compose up --build`

2. **Database connection issues:**
   - Check if MySQL is running: `docker-compose ps`
   - Verify database credentials in .env match docker-compose.yml
   - Wait for database to fully initialize (can take up to a minute)

3. **TypeScript errors:**
   - Run `docker-compose exec backend sh -c "npm install --save-dev @types/node @types/express"`
   - Check tsconfig.json for proper configuration

4. **Prisma migration errors:**
   - Manually run migrations: `docker-compose exec backend npx prisma migrate deploy`
   - Reset database if needed: `docker-compose exec backend npx prisma migrate reset --force`

### Fixing "npm ci" errors:
If you encounter "npm ci" errors during build:

```bash
# Rebuild with clean cache
docker-compose build --no-cache
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
