# Personal Finance App

A full-stack personal finance management application built as a learning project to explore and master modern web development technologies.

## Overview

This application allows users to track their income and expenses with an intuitive interface, visual analytics, and filtering capabilities. It's designed to be a practical learning ground for experimenting with contemporary development tools and frameworks.

## 🎓 Technologies & Learning Focus

This project was created to gain hands-on experience with:

### Frontend

-   **React** - Building modern, component-based user interfaces
-   **TypeScript** - Type-safe JavaScript for better code reliability
-   **Material-UI (MUI)** - Professional component library and theming system
-   **Zustand** - Lightweight state management solution
-   **React Query (TanStack Query)** - Server-state management and data synchronization
-   **Chart.js & React-ChartJS-2** - Data visualization and analytics
-   **CSS Modules** - Scoped styling and modular CSS architecture
-   **Vite** - Modern build tool and development server

### Backend

-   **Node.js & Express** - Server-side JavaScript runtime and web framework
-   **Prisma** - Modern ORM for database operations
-   **PostgreSQL** - Powerful relational database

### DevOps & Infrastructure

-   **Docker** - Containerization for consistent development and deployment environments

## 🚀 Features

-   ✅ **Transaction Management** - Create, read, and delete income/expense transactions
-   ✅ **Dark Mode** - Theme switching with persistent preference using MUI
-   ✅ **Filtering** - Filter transactions by type (income/expense)
-   ✅ **Analytics** - Visual charts showing income vs. expense trends
-   ✅ **Responsive Design** - Mobile-friendly interface with Material-UI
-   ✅ **Type Safety** - Full TypeScript implementation
-   ✅ **Real-time Updates** - Optimistic UI updates with React Query

## 📁 Project Structure

```
Personal_Finance/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API route definitions
│   │   ├── db.js             # Database initialization
│   │   ├── index.js          # Express server entry point
│   │   └── prismaClient.js   # Prisma client instance
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   ├── Dockerfile            # Backend containerization
│   ├── package.json          # Dependencies
│   └── prisma.config.ts      # Prisma configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── stores/           # Zustand stores (state management)
│   │   ├── api/              # API client functions
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # React entry point
│   ├── Dockerfile            # Frontend containerization
│   ├── package.json          # Dependencies
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json         # TypeScript configuration
│
├── docker-compose.yml        # Multi-container setup
└── README.md                 # This file
```

## 🛠️ Getting Started

### Prerequisites

-   Docker and Docker Compose
-   Node.js 18+ (for local development)
-   npm or yarn

### Quick Start with Docker

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Personal_Finance
    ```

2. **Start the application**

    ```bash
    docker-compose up -d --build
    ```

3. **Access the application**
    - Frontend: http://localhost:4000
    - Backend API: http://localhost:3000

### Local Development Setup

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📚 Learning Outcomes

Through this project, I've gained experience with:

1. **State Management** - Comparing Zustand's simplicity versus Redux complexity
2. **Database Design** - Prisma schema modeling and migrations
3. **Theme Implementation** - MUI theming system for dark/light modes
4. **TypeScript Patterns** - Type-safe component props and API contracts
5. **Containerization** - Docker for reproducible development environments
6. **Data Visualization** - Charting libraries for analytics
7. **Form Management** - Controlled components and validation

## 📝 API Endpoints

### Transactions

-   `GET /api/transactions` - Fetch all transactions
-   `POST /api/transactions` - Create new transaction
-   `DELETE /api/transactions/:id` - Delete transaction

## 📜 License

This project is open source and available under the MIT License.
