# Z Media App

Z Media App is a social media platform where users can register, log in, upload media posts, and manage their content. The application consists of a **Node.js backend** with **MongoDB** and a **React Native frontend**.

## Features

### **User Authentication**
- Register 
- Login/logout functionality
- Secure authentication using JWT

### **Media Upload**
- Upload images and posts
- View and manage uploaded media
- Cloud-based storage using Cloudinary

<!-- ### **Admin Dashboard**
- Manage users
- Moderate uploaded content -->

---

## Project Structure

### **Backend (`zmedia-backend`)**
- **Framework:** Node.js (Express.js)
- **Database:** MongoDB
- **Directory Structure:**
  ```
  Bakend/
  ├── controllers  # Handles business logic
  ├── models       # Mongoose schemas
  ├── routes       # API endpoints
  ├── middleware   # Auth & upload handling
  ├── config       # Environment variables & cloud setup
  ├── server.js    # Main server entry point
  ```

### **Mobile Frontend (`zmedia-mobile`)**
- **Framework:** React Native
- **Directory Structure:**
  ```
  app/src/
  ├── components   # Reusable UI components
  ├── screens      # App screens/views
  ├── Public       # Assets
  ├── context      # API calls & authentication
  ```

---

## Installation & Setup

### **Backend**
1. Navigate to the backend directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
<!-- 3. Create a `.env` file and add:
   ```sh
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ``` -->
4. Start the backend server:
   ```sh
   npm start
   ```

### **Mobile Frontend**
1. Navigate to the mobile app directory:
   ```sh
   cd app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React Native application:
   ```sh
   npm react-native run-android
   ```

---

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React Native
- **Storage:** Multer
- **Authentication:** JWT (JSON Web Token)

## Status
This project is **currently under development**.
