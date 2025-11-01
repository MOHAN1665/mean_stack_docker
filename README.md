
 ## Employee Management System

 A modern, full-stack Employee Management System built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) and containerized with Docker.


## 🚀 Features

### 👥 Employee Management

- **Complete CRUD Operations** - Add, view, edit, and delete employees
- **Advanced Search** - Search employees by name, position, ID, or department
- **Department Assignment** - Assign employees to specific departments
- **Experience Levels** - Categorize employees as Junior, Mid-Level, or Senior
- **Professional UI** - Modern Angular Material design with responsive layout


### 🏢 Department Management

- **Department Organization** - Create and manage organizational departments
- **Employee Count Tracking** - Automatic tracking of employees per department
- **Department Descriptions** - Add detailed descriptions for each department


### 💼 Professional Features

- **Real-time Statistics** - Live employee and department counts in sidebar
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Professional Dashboard** - Clean, enterprise-grade user interface
- **Form Validation** - Comprehensive client and server-side validation


## 🛠️ Technology Stack
### Frontend
- **Angular 17** - Latest version with standalone components
- **Angular Material** - Professional UI components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Signals** - Modern state management


### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling


### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server and reverse proxy


## 📋 Prerequisites
Before running this application, ensure you have the following installed:
- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)


## 🏃‍♂️ Quick Start
### Using Docker (Recommended)
1. **Clone the repository**
&nbsp;  ```bash
&nbsp;  git clone https://github.com/MOHAN1665/mean\_stack\_docker.git
&nbsp;  cd mean\_stack\_docker
&nbsp;  ```

2. **Build and start the application**
&nbsp;  ```bash
&nbsp;	docker compose up --build
&nbsp;  ```

3. **Access the application**
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5200

### Manual Development Setup

1. **Start the backend**
   ```bash
   cd server
   npm install
   npm start
   ```
   
2. **Start the frontend**
   ```bash
   cd client
   npm install
   ng serve
   ```
   
3. **Access the application**
- **Frontend:** http://localhost:4200
- **Backend:** http://localhost:5200


### 🗂️ Project Structure
```bash

mean-stack-example/

├── client/                 # Angular frontend

│   ├── src/

│   │   ├── app/

│   │   │   ├── employees-list/     # Employee management

│   │   │   ├── employee-form/      # Add/edit employee forms

│   │   │   ├── departments/        # Department management

│   │   │   └── services/           # API services

│   │   └── environments/           # Environment configurations

│   └── Dockerfile

├── server/                 # Express.js backend

│   ├── models/            # MongoDB models

│   ├── routes/            # API routes

│   └── server.js          # Server entry point

├── nginx/                 # Nginx configuration

├── docker-compose.yml     # Docker composition

└── README.md

```


### 🎯 API Endpoints

### Employees
- GET /employees - Get all employees
- GET /employees/:id - Get employee by ID
- POST /employees - Create new employee
- PUT /employees/:id - Update employee
- DELETE /employees/:id - Delete employee

### Departments
- GET /departments - Get all departments
- GET /departments/:id - Get department by ID
- POST /departments - Create new department
- PUT /departments/:id - Update department
- DELETE /departments/:id - Delete department


### 🐳 Docker Configuration
The application uses a multi-container Docker setup:
- client: Angular frontend served by Nginx
- server: Node.js/Express backend API
- mongodb: MongoDB database


### Environment Variables
Create a .env file in the root directory:
env
   MONGODB\_URI=mongodb://mongodb:27017/employee\_management
   API\_URL=http://localhost:5200


### 🎨 UI/UX Features
- Modern Material Design - Clean, professional interface
- Responsive Layout - Optimized for all screen sizes
- Real-time Updates - Live data synchronization
- Intuitive Navigation - Sidebar with quick access to all features
- Loading States - Professional loading indicators
- Empty States - Helpful messages when no data exists
- Form Validation - Comprehensive error handling and user feedback


### 🔧 Development
### Adding New Features

1. Backend (API)
- Add new routes in server/routes/
- Create models in server/models/
- Update API documentation

2. Frontend (Angular)
- Generate components: ng generate component component-name
- Create services: ng generate service service-name
- Update routing in app.routes.ts


### Code Style
- TypeScript - Strict typing enabled
- Angular Style Guide - Follows Angular best practices
- Responsive Design - Mobile-first approach
- Accessibility - WCAG compliant components


### 🚀 Deployment
## Production Build
```bash
# Build production images

docker compose -f docker-compose.prod.yml up --build


# Or build individually

docker build -t employee-frontend ./client

docker build -t employee-backend ./server

```


### Environment Configuration

**Update environment.prod.ts for production:**
```bash
export const environment = {
&nbsp; production: true,
&nbsp; apiUrl: 'https://your-api-domain.com'
};
```

### 🐛 Troubleshooting
## Common Issues

1. **Docker build fails**
- Ensure Docker is running
- Check available disk space
- Verify network connectivity

2. **Database connection issues**
- Check MongoDB container status
- Verify environment variables
- Check network configuration in docker-compose



3.**Frontend not loading**
- Check Nginx configuration
- Verify Angular build process
- Check browser console for errors


### Logs
View container logs:
```bash
# All services
docker compose logs

# Specific service
docker compose logs client
docker compose logs server
docker compose logs mongodb
```


### 🤝 Contributing
1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feature/amazing-feature
5. Open a Pull Request


### 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
For questions or support, please open an issue in the GitHub repository.

