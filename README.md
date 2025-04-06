
# Car Collection Dashboard

A web application for car enthusiasts to keep track of their car collections. Users can sign up, login, and manage their car collections with a beautiful and responsive interface.

## Features

- User authentication (signup, login, forgot password)
- Dashboard with collection statistics
- Search and filter car catalog
- Add/remove cars from collection
- Responsive design for all devices

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- ShadCN UI for components
- Vite for development and building
- Docker for containerization

## Running with Docker

This application is containerized for easy deployment and consistent environments.

### Prerequisites

- Docker
- Docker Compose (optional, for easier management)

### Using Docker Compose

1. Clone the repository
2. Navigate to the project directory
3. Run the following command:

```bash
docker-compose up -d
```

This will build the Docker image and start the container in detached mode. The application will be available at `http://localhost:8080`.

### Using Docker directly

1. Clone the repository
2. Navigate to the project directory
3. Build the Docker image:

```bash
docker build -t car-collection-app .
```

4. Run the Docker container:

```bash
docker run -d -p 8080:80 --name car-collection-app car-collection-app
```

The application will be available at `http://localhost:8080`.

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`.

## Deployment Considerations

For production deployment, consider:

- Setting up proper authentication backend
- Configuring a database for persistent storage
- Setting up a reverse proxy for HTTPS
- Implementing API rate limiting
- Setting up monitoring and logging
