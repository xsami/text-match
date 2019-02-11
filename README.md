# Auth with React Router V4 and Firebase V3
This is an example repo for authenticating with Firebase and React Router.
This app will be usefull if you need to match especific words with some text, I made this code long time ago for a class project and you can test the app online on this url: https://textmatch-3e220.firebaseapp.com/. Cheers and happy coding. You may need to create a project in file base and use the keey in the /Config/ directory of this project

For more info, visit [Protected routes and authentication with React Router v4](https://tylermcginnis.com/react-router-protected-routes-authentication/)

*Using React 15.4.0, React Router 4, and Firebase 3.6.1*

#### Features:
* Protected Routes with React Router
* Register new users with Firebase
* Add new users to ```/users``` in your Firebase database
* Login/Logout Functionality
* Simple Boostrap UI

#### Instructions:
* Swap out the firebase config in ```config/constants``` with your own
* ```npm install```
* ```npm start```
* Visit ```localhost:3000```

#### Try it out in a [Docker](https://www.docker.com/) container:
* Run a container running the prod version: `docker run -p 8080:80 -d allthethings/react-router-firebase-auth`
* **Or** build a dev version, locally: `docker build -t react-router-firebase-auth .`
* Then run the image (listens for changes to src): `docker run -v "$(pwd)/src:/code/src" -p 3000:3000 -d --name react-router-firebase-auth react-router-firebase-auth`
