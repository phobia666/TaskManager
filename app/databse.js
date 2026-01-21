// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getDatabase, set, get, ref} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
  //when you want to store data in database -> set
  //when you want to get data from database -> get
  //when you want to get data through the reference -> ref
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD9jzYe4gh5xyx1R5-AJp8wv9WFVr9_EMM",
    authDomain: "taskmanager-d7b17.firebaseapp.com",
    projectId: "taskmanager-d7b17",
    storageBucket: "taskmanager-d7b17.firebasestorage.app",
    messagingSenderId: "859096672114",
    appId: "1:859096672114:web:600531c4df27f833b11feb",
    measurementId: "G-CLBXFM5G9Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  console.log('firebase');

  console.log(database);


  function writeUserID(userID, name, email){
    set(ref(database, 'users/' + userID),{ //for setting the data in the database
        name: name,
        email: email
    })
  }

  writeUserID(3, 'Prince', 'princeN@gmail.com')
  console.log('GOOD');

  function readData(){
    const userRef = ref(database, 'users');

    get(userRef).then( (snapShot) => { 
        snapShot.forEach( (snapChildShot) => {
            console.log(`name : ${snapChildShot.val().name}, email : ${snapChildShot.val().email}`)
        })
    })
  }
  readData();
  //firebase is ASYNCHRONOUS takes time therefore .then is used to avoid the pending promise case that whenever the data arrives it'll do that