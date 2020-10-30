# Capstone Project Title

ProjeX

### Summary

Complete any project more easily with a simple, organized structure and completion system.

### Connected Server Repository

Link: https://github.com/Phantom-Wolf/project-manager-capstone-server

## Working Prototype

You can access a working prototype of the React app here: https://project-manager-capstone-client.vercel.app/Landing

## Functionality

The app's functionality includes:

- Every User has the ability to create an account

## Technology

- Front-End: HTML5, CSS3, JavaScript ES6, React
- Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
- Development Environment: Heroku, DBeaver

## Front-end Structure - React Components Map

- **Index.js** (stateless)
  - **App.js** (stateful)
    - **LandingPage.js** (stateless)
      - **Register.js** (stateful)
    - **Login.js** (stateful)
    - **Home.js** (stateless)
      - **sideNav.js** (stateful)
    - **Project.js** (stateful)
      - **sideNav.js** (stateful)
      - **ProjectSerive.js** (stateless)
    - **Task.js** (stateful)
      - **sideNav.js** (stateful)
      - **TaskService.js** (stateless)

## Back-end Structure - Business Objects

- user (DATABASE table)

  - id (PK)
  - username
  - user_email
  - user_password

- project (DATABASE table)

  - id (PK)
  - project_name
  - user_id (FK)

- parenttask (DATABASE table)

  - id (PK)
  - project_id (FK)
  - title
  - task_level
  - completion_status

- parentnote

  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

- taskone

  - id (PK)
  - parent_id (FK)
  - project_id (FK)
  - title
  - task_level
  - completion_status

- noteone

  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

- tasktwo

  - id (PK)
  - parent_id (FK)
  - project_id (FK)
  - title
  - task_level
  - completion_status

- nottwo

  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

- taskthree

  - id (PK)
  - parent_id (FK)
  - project_id (FK)
  - title
  - task_level
  - completion_status

- notethree
  - id (PK)
  - parent_id (FK)
  - user_id (FK)
  - note
  - date_created

## API Documentation

API Documentation details:

#### Users

  - post, /api/users/, new user data
  - get, /api/users/:id, get user

#### Auth

  - post, /api/auth/login, user credentials for login

#### Project

get, /api/projects, get all projects by user id
  response: [
  {
    id: 1,
    project_name: "example project",
    user_id: 1
  }
  ]
post, /api/projects, insert project
get, /api/projects/:project_id, get project by id
delete, /api/projects/:project_id, delete project by id

#### ParentTask

  - post, /api/parentTask/getAll, get all tasks by project_id
  - post, /api/parentTask, insert task
  - get, /api/parentTask/:parentTask_id, get task by id
  - patch, /api/parentTask/:parentTask_id, update task by id
  - delete, /api/aprentTask/:parentTask_id, delete task by id

#### ParentNote

  - post, /api/parentNote/getAll, get all notes by parent_id
  - post, /api/parentNote, insert note
  - delete, /api/parentNote/:parentNote_id, delete note by id

#### taskOne

  - post, /api/taskOne/getAll, get all tasks by project_id
  - post, /api/taskOne, insert task
  - get, /api/taskOne/:taskOne_id, get task by id
  - patch, /api/taskOne/:taskOne_id, update task by id
  - delete, /api/taskOne/:taskOne_id, delete task by id

#### noteOne

  - post, /api/noteOne/getAll, get all notes by parent_id
  - post, /api/noteOne, insert note
  - delete, /api/noteOne/:noteOne_id, delete note by id

#### taskTwo

  - post, /api/taskTwo/getAll, get all tasks by project_id
  - post, /api/taskTwo, insert task
  - get, /api/taskTwo/:taskTwo_id, get task by id
  - patch, /api/taskTwo/:taskTwo_id, update task by id
  - delete, /api/taskTwo/:taskTwo_id, delete task by id

#### noteTwo

  - post, /api/noteTwo/getAll, get all notes by parent_id
  - post, /api/noteTwo, insert note
  - delete, /api/noteTwo/:noteTwo_id, delete note by id

#### taskThree

  - post, /api/taskThree/getAll, get all tasks by project_id
  - post, /api/taskThree, insert task
  - get, /api/taskThree/:taskThree_id, get task by id
  - patch, /api/taskThree/:taskThree_id, update task by id
  - delete, /api/taskThree/:taskThree_id, delete task by id

#### noteThree
  - post, /api/noteThree/getAll, get all notes by parent_id
  - post, /api/noteThree, insert note
  - delete, /api/noteThree/:noteThree_id, delete note by id

## Responsive

App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

- add more functionality

## How to run it

Use command line to navigate into the project folder and run the following in terminal

### Local React scripts

- To install the react project ===> npm install
- To run react (on port 3000) ===> npm start
- To run tests ===> npm run test
