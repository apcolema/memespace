var user;

(() => {
    window.onload = (() => {
        user = new User(JSON.parse(localStorage.getItem("user")));
    });
})();