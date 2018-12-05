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
        //Todo access firebase to make the new password the password
        return;
    }
}