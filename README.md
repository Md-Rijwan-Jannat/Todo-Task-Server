# Todo Task CRUD Server

This is a simple CRUD (Create, Read, Update, Delete) application for managing Todo tasks. The backend server is built using Node.js, Express, and MongoDB.

## Features

- Create a new todo task
- Read all todo tasks
- Update a todo task
- Delete a todo task

## Prerequisites

- Node.js installed
- MongoDB installed and running

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Md-Rijwan-Jannat/Todo-Task-Server.git
    cd Todo-Task-Server
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add the following:

    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/todoapp
    ```

4. Start the server:

    ```bash
    yarn start
    ```

## Deploy link

### Api endpoints

- **URL:** http://todo-server-app.vercel.app
