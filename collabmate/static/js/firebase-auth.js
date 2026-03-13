// Register user
function registerUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {

        alert("Registration successful!");
        window.location.href = "/"; // go back to home

    })
    .catch((error) => {
        alert(error.message);
    });
}


// Login user
function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

        alert("Login successful!");
        window.location.href = "/"; // go back to home

    })
    .catch((error) => {
        alert(error.message);
    });
}


// Logout
function logoutUser() {

    firebase.auth().signOut()
    .then(() => {

        alert("Logged out");
        window.location.href = "/";

    });
}