# Events Microservice Application

A microservice-based events management application built with NestJS, featuring Kafka for inter-service communication and MongoDB for data persistence.

## 🏗️ Architecture

This application follows a microservice architecture with the following components:

- **API Gateway**: NestJS service handling HTTP requests and routing to microservices via Kafka
- **Event Service**: Core business logic service with MongoDB persistence
- **Kafka**: Message broker for inter-service communication
- **MongoDB**: Primary database with Mongoose ODM
- **Docker**: Containerized services with docker-compose

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd events-microservice-app
```

### 2. Start Infrastructure Services

Start Kafka and Zookeeper using Docker Compose:

```bash
# Start Kafka and Zookeeper
docker compose up -d

# Verify services are running
docker compose ps
```

**Available Services:**

- **Kafka**: `localhost:9092`
- **Zookeeper**: `localhost:2181`

### 3. Install Dependencies

Install dependencies for both services:

```bash
# Install API Gateway dependencies
cd api-gateway
npm install

# Install Event Service dependencies
cd ../event-service
npm install
```

### 4. Environment Configuration

Create environment files for both services:

#### API Gateway (.env)

```bash
cd api-gateway
cp .env.example .env  # if example exists
```

Create `.env` file with:

```env
PORT=3000
KAFKA_BROKERS=localhost:9092
```

#### Event Service (.env)

```bash
cd event-service
cp .env.example .env  # if example exists
```

Create `.env` file with:

```env
PORT=3001
DATABASE_URI=mongodb://localhost:27017/events
KAFKA_BROKERS=localhost:9092
```

### 5. Start the Services

#### Development Mode

**Terminal 1 - API Gateway:**

```bash
cd api-gateway
npm run start:dev
```

**Terminal 2 - Event Service:**

```bash
cd event-service
npm run start:dev
```

#### Production Mode

**Build and Start:**

```bash
# API Gateway
cd api-gateway
npm run build
npm run start:prod

# Event Service
cd event-service
npm run build
npm run start:prod
```

## 📁 Project Structure

```
events-microservice-app/
├── api-gateway/           # API Gateway service
│   ├── src/
│   │   ├── event/         # Event endpoints
│   │   ├── event-category/ # Category endpoints
│   │   ├── event-team/    # Team endpoints
│   │   ├── language/      # Language endpoints
│   │   └── common/        # Shared utilities
│   └── package.json
├── event-service/         # Event business logic service
│   ├── src/
│   │   ├── event/         # Event domain
│   │   ├── event-category/ # Category domain
│   │   ├── event-team/    # Team domain
│   │   ├── language/      # Language domain
│   │   ├── common/        # Shared utilities
│   │   └── seed.ts        # Database seeding
│   └── package.json
├── docker-compose.yml     # Infrastructure services
└── README.md
```

## 🛠️ Available Scripts

### API Gateway

```bash
npm run start:dev      # Start in development mode
npm run start:prod     # Start in production mode
npm run build          # Build the application
npm run test           # Run tests
npm run lint           # Run linting
```

### Event Service

```bash
npm run start:dev      # Start in development mode
npm run start:prod     # Start in production mode
npm run build          # Build the application
npm run test           # Run tests
npm run lint           # Run linting

# Database seeding
npm run seed           # Run all seeds
npm run seed:essential # Run essential seeds only
npm run seed:status    # Check seed status
```

## 🐳 Docker Commands

### Infrastructure Services

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs

# Stop and remove volumes (clean slate)
docker compose down --volumes
```

### Service Status

```bash
# Check running containers
docker ps

# Check service status
docker compose ps
```

## 🔧 Development

### Adding New Features

1. **API Gateway**: Add new controllers and routes in `api-gateway/src/`
2. **Event Service**: Add business logic in `event-service/src/`
3. **Communication**: Use Kafka for inter-service communication

### Database Seeding

The Event Service includes a comprehensive seeding system:

```bash
cd event-service

# Run all seeds
npm run seed

# Run essential seeds only
npm run seed:essential

# Check seed status
npm run seed:status

# Clear seed results
npm run seed:clear
```

### Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## 📊 API Endpoints

### API Gateway (Port 3000)

- `GET /health` - Health check
- `GET /events` - List events
- `POST /events` - Create event
- `GET /events/:id` - Get event by ID
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

### Event Service (Port 3001)

- Internal service endpoints for business logic
- Kafka message handling
- Database operations

## 🔍 Monitoring & Debugging

### Logs

```bash
# View all service logs
docker compose logs

# View specific service logs
docker compose logs kafka
docker compose logs zookeeper
```

### Kafka Topics

```bash
# List topics (if you have kafka tools installed)
kafka-topics --list --bootstrap-server localhost:9092
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 3000, 3001, 9092, 2181 are available
2. **Kafka Connection**: Verify Kafka is running with `docker compose ps`
3. **Database Connection**: Check MongoDB connection string in environment variables
4. **Dependencies**: Run `npm install` in both service directories

### Reset Everything

```bash
# Stop all services
docker compose down --volumes

# Remove node_modules
rm -rf api-gateway/node_modules event-service/node_modules

# Reinstall dependencies
cd api-gateway && npm install
cd ../event-service && npm install

# Restart services
docker compose up -d
```

## 📝 Environment Variables

### API Gateway

- `PORT`: Service port (default: 3000)
- `KAFKA_BROKERS`: Kafka broker addresses

### Event Service

- `PORT`: Service port (default: 3001)
- `DATABASE_URI`: MongoDB connection string
- `KAFKA_BROKERS`: Kafka broker addresses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
