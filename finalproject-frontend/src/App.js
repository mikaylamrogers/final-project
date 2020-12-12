import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

// Styles
import './App.css';

// Pages
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import UserProfile from './containers/UserProfile';
import Home from './containers/Home';

// Components
import Header from './components/Header';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY, // Replace with .env file API reference
  authDomain: "exercise-five-91f00.firebaseapp.com",
  databaseURL: "https://exercise-five-91f00.firebaseio.com",
  projectId: "exercise-five-91f00",
  storageBucket: "exercise-five-91f00.appspot.com",
  messagingSenderId: "179151166872",
  appId: "1:179151166872:web:1c6045b85d001fa257dfed"
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // boolean to determine if logged in 
  const [loading, setLoading] = useState(true); // is page loading
  const [userInformation, setUserInformation] = useState({});

  // Ensure app is initialized when it is ready
  useEffect(() => {
    // Initializes Firebase
    // if firebase is not already initialized...
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  // Check to see if user is logged in...
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        // user is logged in
        setLoggedIn(true);
        setUserInformation(user);
      } else {
        // no user
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  // Function for logging in 
  function LoginFunction(e) {
    // This is what you will run when you want to login
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log('LOGIN RESPONSE', response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("LOGIN ERROR", error);
      });
  }

  // Function for logging out
  function LogoutFunction() {
    // Function to run when you want to logout
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false);
        setUserInformation({});
      })
      .catch(function (error) {
        console.log("LOGOUT ERROR", error);
      });
  }


  // Function for creating an account
  function CreateAccountFunction(e) {
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log('VALID ACCOUNT CREATED FOR:', email, response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("ACCOUNT CREATION FAILED", error);
      });
  }

  if (loading) return null;


  return (
    <div className="App">
      <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction} />
        <Router>

          <Route exact path="/login">
            {/* if someone is logged in, do not take them to login page 
            - take them to user profile */}

            {!loggedIn ? (
              <Login LoginFunction={LoginFunction}  />
            ) : (
              <Redirect to="/"  />
            )}
          </Route>

          <Route exact path="/create-account">
            {/* if someone is logged in , do not take them to createaccount 
            - take them to user profile */}

            {!loggedIn ? (
              <CreateAccount CreateAccountFunction={CreateAccountFunction} />
            ) : (
              <Redirect to="/"  />
            )}
          </Route>

          <Route exact path="/">
            {/* if someone is not logged in, do not take them to user profile page 
            - take them to login */}

            {!loggedIn ? (
              <Redirect to="/login"  />
            ) : (
              <UserProfile userInformation={userInformation} />
            )}  
          </Route>
          
        </Router>
    </div>
  );
}


export default App;

