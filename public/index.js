function initialize() {
    const top_left_meme = new Meme();
    const top_right_meme = new Meme();
    const bottom_right_meme = new Meme();
    const bottom_left_meme = new Meme();

    document.getElementById("top_left_meme").appendChild(top_left_meme.meme);
    document.getElementById("top_right_meme").appendChild(top_right_meme.meme);
    document.getElementById("bottom_right_meme").appendChild(bottom_right_meme.meme);
    document.getElementById("bottom_left_meme").appendChild(bottom_left_meme.meme);
}

function setup_create_account() {
    //Add in the new fields
    var verify = document.getElementById("verify_text");
    verify.removeAttribute("style");
    verify.value = "";
    var pass = document.getElementById("verify_input");
    pass.removeAttribute("style");
    pass.value = "";

    //Restructure what the buttons do
    var login = document.getElementById("login_button");
    var create_account = document.getElementById("create_account_button");

    login.removeAttribute("onclick");
    login.value = "Create Account";
    login.setAttribute("onclick", "create_account()");
    create_account.removeAttribute("onclick");
    create_account.value = "Cancel";
    create_account.setAttribute("onclick", "destroy_create_account()");
}

function create_account() {
    var email = document.getElementById('email_input').value;
    var password = document.getElementById('password_input').value;
    var verify = document.getElementById('verify_input').value;

    if (verify.value != password.value) {
        alert('Password verification failed.');
        return;
    }
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }

    var userCredential = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else if (errorCode = 'auth/email-already-in-use') {
            alert('An account for this email was made previously.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });

    if (userCredential.user == undefined) {
        return;
    } else {
        /*
        var user = new User();
        user.load(userCredential.user);
        */
        //TODO redirect to home with user object
        alert("Headed home");
    }
}

function destroy_create_account() {

    //Add in the new fields
    document.getElementById("verify_text").setAttribute("style", "display: none;");
    document.getElementById("verify_input").setAttribute("style", "display: none;");

    //Restructure what the buttons do
    var login = document.getElementById("login_button");
    var create_account = document.getElementById("create_account_button");

    login.removeAttribute("onclick");
    login.value = "Login";
    login.setAttribute("onclick", "login()");
    create_account.removeAttribute("onclick");
    create_account.value = "Create Account";
    create_account.setAttribute("onclick", "setup_create_account()");
}

function verify() {
    var pass = document.getElementById("password_input");
    var verify = document.getElementById("verify_input");

    if(verify.value == "") {
        verify.removeAttribute("style");
    }
    else if(pass.value == verify.value) {
        verify.setAttribute("style", "background-color: rgba(51, 204, 51, 0.2);");
    }
    else {
        verify.setAttribute("style", "background-color: rgba(255, 0, 0, 0.2);");
    }
}

function login() {

    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    }

    var email = document.getElementById('email_input').value;
    var password = document.getElementById('password_input').value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            alert("signed in");
        } else {
            alert("not signed in");
        }
    });

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      
        if (errorCode == 'auth/user-not-found') {
            alert('Incorrect.');
        } else if (errorCode = 'auth/wrong-password') {
            alert('Incorrect.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}