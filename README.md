# Real_estate_Application
Application that allow users to Create , Add , Update , View &amp; Delete the Real Estate Properties 

# Real Estate Property Management App

This is a full-stack web application designed to help users manage real estate properties online. It includes features for user signup, login, adding new properties, searching existing listings, and editing or deleting their own listings. Only authenticated users can access the dashboard and manage listings, making the system secure and personalized.

## Project Overview

This application allows users to:

- Register and log in with email and password
- View a personalized dashboard with their property listings
- Create, edit, or delete their own properties
- Search for properties based on title or location
- Log out and clear session securely

It is built to simulate a real-world property listing platform where each user manages their own data securely.

## Setup Instructions

# Step 1: Clone the Repository
git clone https://github.com/your-username/RealEstate.git
cd RealEstate

# Step 2: Set Up the Backend
cd backend
npm install

## Now, create a file named .env inside the backend folder and add the following variables:
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000

## Start your MongoDB server locally (default port 27017), then run the backend:
node server.js

## The backend will run at => http://localhost:8000

##  Step 3: Set Up the Frontend
cd ../frontend
npm install
npm start

## The frontend will run at:
http://localhost:3000

## Make sure both frontend and backend are running for the application to work properly.

## Tech Stack Used

 Frontend -> React.js                       
 Backend  -> Node.js, Express.js            
 Database -> MongoDB                       
 Auth     -> JWT (JSON Web Tokens), Cookies 

## Features
 -User signup & login with secure cookie-based JWT authentication
 -Role-based access — each user sees and manages only their own properties
 -Dashboard for viewing, editing, and deleting your property listings
 -Search functionality to filter properties by location or title
 -Clean and responsive user interface
 -Proper error handling for login/signup and invalid routes
 
## Assumptions
 -Each user only sees their own properties in the dashboard
 -Add/edit/delete routes are protected and require authentication
 -Properties are stored as text only (no image uploads)
 -App is run locally, with MongoDB on the default port (27017)

