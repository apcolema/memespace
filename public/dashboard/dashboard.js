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
        this.editor = new Editor(this.memeList, this.user);

    }

    //Tries to employ the technique or idea Professor taught in lecture to 
    //only download the memes/content/imgs necessary at the current time to 
    //avoid just downloading all of the content to start
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
            var md;
            for (var m in userMemesRaw) {
                md = userMemesRaw[m];
                userMemes.push(new Meme(md.im_path, md.title, md.ttop, md.tbot, md.ttop_y, md.tbot_y, md.editable, m, uuid, false));
            }
            console.log("userMemes");
            console.log(userMemes);

            //Make a new central MemeList
            this.memeList = new MemeList(userMemes);
            this.editor.memeList = this.memeList;

        }, this);
    }

    toggleSidebar() {
        if (this.editor.toggle) {
            this.editor.toggleEditor();
        }
        this.sidebar.toggleSidebar();
    }
    logout() { this.sidebar.logout(); }
    showPasswordChange() { this.sidebar.showPasswordChange(); }
    hidePasswordChange() { this.sidebar.hidePasswordChange(); }
    verifyPasswordChange() { this.sidebar.verifyPasswordChange(); }
    growProfileIcon() { this.header.growProfileIcon(); }
    shrinkProfileIcon() { this.header.shrinkProfileIcon(); }
    toggleEditor() {
        if (this.sidebar.toggle) {
            this.sidebar.toggleSidebar();
        }
        this.editor.toggleEditor();
    }
    cancelEdit() {
        this.editor.cancelEdit();
        this.memeList._reloadList();
    }
    editorLoadWithMeme(meme) { this.editor.loadWithMeme(meme); }
    saveMemeEdit() { this.editor.saveEdit(); 
                     this.memeList._reloadList();}
    uploadMeme(event) { this.editor.uploadMeme(event); 
                     this.memeList._reloadList() }
    editorWatchTtop() { this.editor.watch_ttop(); }
    editorWatchTbot() { this.editor.watch_tbot(); }
    editorWatchTtitle() { this.editor.watch_ttitle(); }
    editorShiftUpTtop() { this.editor.shift_up_ttop(); }
    editorShiftUpTbot() { this.editor.shift_up_tbot(); }
    editorShiftDownTtop() { this.editor.shift_down_ttop(); }
    editorShiftDownTbot() { this.editor.shift_down_tbot(); }
    reloadList(){ 
        this.memeList._reloadList();
    }
}
