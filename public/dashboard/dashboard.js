class Dashboard {
    load() {
        console.log("Loaded the Dashboard class");
    }

    constructor() {

        this.load();

        //Get and construct the user
        this.user = new User(JSON.parse(localStorage.getItem("user")));

        //Fetch memes
        this._fetchMemes(this.user.uuid);

        //Create the sidebar
        this.sidebar = new Sidebar(this.user);

        //Create the header
        this.header = new Header();

        //Create new add screen
        this.editor = new Editor(this.memeList);

    }

    _fetchMemes(uuid) {
        console.log("Fetching memes for user");
        firebase.database().ref('/users/' + uuid).once('value', function (snapshot) {
            var userMemesRaw = snapshot.val();
            if (userMemesRaw == null) {
                userMemesRaw = [];
            }
            console.log("userMemesRaw");
            console.log(snapshot.val());

            //Make userMemes
            var userMemes = [];
            for (var m in userMemesRaw) {
                console.log(m);
                userMemes.push(new Meme("", "title", "What is my purpose", "To be a sample meme", 0, 0, true, m, uuid));
            }
            console.log("userMemes");
            console.log(userMemes);

            //Make a new central MemeList
            this.memeList = new MemeList(userMemes);

        }, this);
    }

    showSidebar() { this.sidebar.show(); }
    hideSidebar() { this.sidebar.hide(); }
    showPasswordChange() { this.sidebar.showPasswordChange(); }
    hidePasswordChange() { this.sidebar.hidePasswordChange(); }
    verifyPasswordChange() { this.sidebar.verifyPasswordChange(); }
    growProfileIcon() { this.header.growProfileIcon(); }
    shrinkProfileIcon() { this.header.shrinkProfileIcon(); }
    editMeme(meme) { this.editor.edit(meme); }
    saveMemeEdit() { this.editor.saveEdit(); }
    cancelMemeEdit() { this.editor.cancelEdit(); }
    removeMeme(meme) { this.memeList.removeFromTable(meme); }
}