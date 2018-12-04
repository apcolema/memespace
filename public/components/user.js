class User {
    load() {
        console.log("User class loaded");
    }

    constructor(user) {
        console.log(user);

        this.uuid = 0;
    }

    changePassword(newPass) {
        //Todo access firebase to make the new password the password
        return;
    }
}