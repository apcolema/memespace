class User {
    load() {
        console.log("User class loaded");
    }

    constructor(user) {

        this.load();

        console.log(user);

        //Set to Guest uuid initially
        this.uuid = "Bbr3IUUpFJd1MDm9fLTxuaHWHBI3";

        if (user != undefined) {
            console.log("User is defined");
            this.uuid = user["uid"];
        }

    }

    changePassword(newPass) {
        var tmp_user = firebase.auth().currentUser;
        tmp_user.updatePassword(newPassword).then(function() {
            // Update successful.
            alert("Password was successfully changed.");
        }).catch(function(error) {
            // An error happened.
            alert("Password could not be changed at this time.");
        });
          
        return;
    }
}