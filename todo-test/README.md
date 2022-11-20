# Getting Started with My pendings

## Prerequisites

To run this app on your local machine you need to install NodeJS.
For more information about that go to [https://nodejs.org/en/](https://nodejs.org/en/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Technologies

### React

The application is written in React. The main reason for this was to get experience with it as a front end technology and because it is a powerful front end framework.
There were also some good third-party packages that could be used for it that are mentioned down below in the readme.

### React-grid-view

For the grid view the extensive module React-grid-view has been used. The reason for this was because of good native support for drag and drop which has been a requirement for the application.
The alternative to develop this functionality from scratch would not fit the tight deadline for this application.

### NanoID

IDs in the application are generated using the lightweight module NanoID. This gives an easy way to generate unique IDs without any extra dependencies and with good performance.

## Key features

To use the application you can press on the Add pending frame and you will come to a form to add a new pending. The pending will be added to the grid. You can move any pending within the grid by drag and drop.
The application does also support marking active pendings as done by pressing 'Done', or delete by pressing 'Delete'.
The number of active and done pendings can be seen in the counter down below from the main view of the app.