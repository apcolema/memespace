class Dashboard {
    load() {
        console.log("Loaded the Dashboard class");
    }

    constructor() {

        //Get and construct the user
        this.user = new User(JSON.parse(localStorage.getItem("user")));

        //Fetch memes for user
        this.userMemes = _fetchMemes(this.user.uuid);

        //Create the sidebar
        this.sidebar = new Sidebar(this.user);

        //Make a new central MemeList
        this.memeList = new MemeList(this.userMemes);

        //Create new add screen
        this.editor = new Editor(this.memeList);

    }

    showSidebar() { this.sidebar.show(); }
    hideSidebar() { this.sidebar.hide(); }
    editMeme(meme) { this.editor.edit(meme); }
    saveMemeEdit() { this.editor.saveEdit(); }
    cancelMemeEdit() { this.editor.cancelEdit(); }
    removeMeme(meme) { this.memeList.removeFromTable(meme); }
}