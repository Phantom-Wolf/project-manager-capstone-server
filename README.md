# ProjeX

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

- notetwo

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

post, /api/users/, new user data

    request:
    {
      username: String,
      user_email: String,
      user_password: String
    }

    response: [
    {
      username: String,
      user_email: String,
      user_password: String
    }
    ]

get, /api/users/:id, get user

    request:
    {
      user_id: id
    }

    response: [
    {
      username: String,
      user_email: String,
      user_password: String
    }
    ]

#### Auth

post, /api/auth/login, user credentials for login

    request:
    {
      user_email: String,
      user_password: String
    }

    response: webToken

#### Project

get, /api/projects, get all projects by user id

    response: [
    {
      id: id,
      project_name: String,
      user_id: id
    }
    ]

post, /api/projects, insert project

    request:
    {
      project_name: String,
      user_id: id
    }

    response: [
    {
      id: id,
      project_name: String,
      user_id: id
    }
    ]

get, /api/projects/:project_id, get project by id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_name: String,
      user_id: id
    }
    ]

delete, /api/projects/:project_id, delete project by id

    request:
    {
      project_id: id
    }

    response: 204

#### ParentTask

post, /api/parentTask/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/parentTask, insert task

    request:
    {
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/parentTask/:parentTask_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/parentTask/:parentTask_id, update task by id

    request:
    {
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/aprentTask/:parentTask_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### ParentNote

post, /api/parentNote/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/parentNote, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/parentNote/:parentNote_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

#### taskOne

post, /api/taskOne/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/taskOne, insert task

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/taskOne/:taskOne_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/taskOne/:taskOne_id, update task by id

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/taskOne/:taskOne_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### noteOne

post, /api/noteOne/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/noteOne, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/noteOne/:noteOne_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

#### taskTwo

post, /api/taskTwo/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/taskTwo, insert task

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/taskTwo/:taskTwo_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/taskTwo/:taskTwo_id, update task by id

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/taskTwo/:taskTwo_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### noteTwo

post, /api/noteTwo/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/noteTwo, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/noteTwo/:noteTwo_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

#### taskThree

post, /api/taskThree/getAll, get all tasks by project_id

    request:
    {
      project_id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

post, /api/taskThree, insert task

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

get, /api/taskThree/:taskThree_id, get task by id

    request:
    {
      id: id
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

patch, /api/taskThree/:taskThree_id, update task by id

    request:
    {
      project_id: id,
      parent_is: id,
      title: String,
      task_level: Integer,
      completion_status: !Boolean
    }

    response: [
    {
      id: id,
      project_id: id,
      parent_id: id,
      title: String,
      task_level: Integer,
      completion_status: Boolean
    }
    ]

delete, /api/taskThree/:taskThree_id, delete task by id

    request:
    {
      id: id
    }

    response: 204

#### noteThree

post, /api/noteThree/getAll, get all notes by parent_id

    request:
    {
      parent_id: id
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

post, /api/noteThree, insert note

    request:
    {
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }

    response: [
    {
      id: id,
      parent_id: id,
      user_id: id,
      note: String,
      date_created: TIMESTAMP
    }
    ]

delete, /api/noteThree/:noteThree_id, delete note by id

    request:
    {
      id: id
    }

    response: 204

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
