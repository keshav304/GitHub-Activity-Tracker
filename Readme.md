# GitHub Activity Tracker

A full-stack application to track GitHub repository releases and updates. Built with React, TypeScript, Node.js, GraphQL, and PostgreSQL.

## Features

- **User Authentication**: Secure signup and login functionality
- **Repository Tracking**: Add and monitor GitHub repositories
- **Release Updates**: View the latest release information, including version numbers and release notes
- **Release Status**: Mark releases as "seen" to track which updates you've reviewed
- **Responsive Design**: Mobile-friendly interface with carousel view for repositories
- **Real-time GitHub Data**: Fetches the latest release information using the GitHub API

## Tech Stack

### Frontend
- React with TypeScript
- Apollo Client for GraphQL
- React Router for navigation
- CSS for styling
- React-Slick for mobile carousel

### Backend
- Node.js with Express
- Apollo Server for GraphQL API
- PostgreSQL for the database
- JWT for authentication
- Octokit for GitHub API integration

## Setup Instructions

### Prerequisites
Before starting, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **PostgreSQL** (v13 or higher)
- **GitHub Personal Access Token** for interacting with the GitHub API.

### Database Setup

1. **Create a PostgreSQL database**:

   ```sql
   CREATE DATABASE "aspire-demo";
   
Create the required tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
```
CREATE TABLE repositories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  latest_version VARCHAR(255),
  latest_release_date TIMESTAMP,
  release_html TEXT,
  has_seen BOOLEAN DEFAULT false
);
```

## Environment Setup

### Clone the repository:

```
git clone <repository-url>
cd github-activity-tracker
```

Create a .env file in the backend directory:

```
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/aspire-demo
JWT_SECRET=your_jwt_secret
GITHUB_TOKEN=your_github_personal_access_token
```

### Backend Setup
Navigate to the backend directory:


```cd backend
npm install
npm run dev
```


### Frontend Setup

Navigate to the frontend directory:


```cd client
npm install
npm start
```
The application should now be running at http://localhost:3000.

Implementation Notes

### Completed Features
1. Full user authentication flow with JWT
2. GitHub repository tracking with the latest release information
3. Mobile-responsive design with carousel view
4. Mark releases as seen/unseen
5. Real-time GitHub data fetching
 

### Future Improvements
1. Enhanced Security
Implement OAuth 2.0 with GitHub
Add rate limiting for API endpoints
Enhanced password requirements
2. Feature Additions
Email notifications for new releases
Multiple repository sorting options
Batch repository import
Release comparison view
Repository grouping/tagging
3. Technical Improvements
Add comprehensive test coverage
Implement CI/CD pipeline
Add data caching layer
Implement WebSocket for real-time updates
Docker containerization
4. UI/UX Enhancements
Dark mode support
Customizable dashboard layouts
Advanced filtering options
Improved mobile experience
Accessibility improvements