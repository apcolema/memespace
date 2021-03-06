class Sidebar {
    load() {
        console.log("Loaded Sidebar class");
    }

    constructor(user) {
        this.load(); 
        this.user = user;
        this.toggle = false;
        this._changePassListener = function() {
            var pass = document.getElementById("password_input");
            var verify = document.getElementById("verify_input");

            var pass_val_clean = DOMPurify.sanitize(pass.value);
            var verify_val_clean = DOMPurify.sanitize(verify.value);

            if (verify_val_clean == "" || pass_val_clean != verify_val_clean) {
                verify.value = "";
                pass.value = "";
                alert("Password and verification do not macth, or are empty.");
                return;
            }

            user.changePassword(pass_val_clean);
            return;
        }
    }

    toggleSidebar() {
        if (this.toggle) {
            this._hide();
            this.toggle = false;
        } else {
            this._show();
            this.toggle = true;
        }
    }

    logout() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.replace("index.html");
        }, function(error) {
            // An error happened.
            alert("Unsuccessfully signed out.");
        });
    }

    _show() {
        document.getElementById('sidebar').setAttribute('style', 'display: inline;');
        document.getElementById('sidebar_cover').setAttribute('style', 'display: inline;');
    }

    _hide() {
        document.getElementById('sidebar').setAttribute('style', 'display: none;');
        document.getElementById('sidebar_cover').setAttribute('style', 'display: none;');
    }

    showPasswordChange() {
        document.getElementById("password_input").setAttribute("style", "display: inline;");
        document.getElementById("verify_input").setAttribute("style", "display: inline;");

        document.getElementById("change_password_button").value = "Save";
        document.getElementById("change_password_button").setAttribute("style", "width: 50%;");
        document.getElementById("change_password_button").addEventListener('click', this._changePassListener, true);

        document.getElementById("cancel_button").setAttribute("style", "display: inline;");
    }

    hidePasswordChange() {
        document.getElementById("password_input").setAttribute("style", "display: none;");
        document.getElementById("verify_input").setAttribute("style", "display: none;");

        document.getElementById("change_password_button").value = "Change Password";
        document.getElementById("change_password_button").setAttribute("style", "width: 100%;");
        document.getElementById("change_password_button").removeEventListener('click', this._changePassListener, true);

        document.getElementById("cancel_button").setAttribute("style", "display: none;");
    }

    verifyPasswordChange() {
        var pass = document.getElementById("password_input");
        var verify = document.getElementById("verify_input");

        if(verify.value == "") {
            verify.setAttribute("style", "background-color: rgba(255, 255, 255, 0.2); display: inline;");
        }
        else if(pass.value == verify.value) {
            verify.setAttribute("style", "background-color: rgba(51, 204, 51, 0.2); display: inline;");
        }
        else {
            verify.setAttribute("style", "background-color: rgba(255, 0, 0, 0.2); display: inline;");
        }
    }
}