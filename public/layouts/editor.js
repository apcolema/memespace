class Editor {
    load() {
        console.log("Loaded Editor class");
    }

    constructor(memeList) {
        
        this.load();
        
        this.toggle = false;
        this.memeList = memeList;
        this.meme = null;
    }

    loadWithMeme(meme) {
        this.meme = meme;   //TODO make a new meme if null, add a push boolean to meme constructor()
    }

    toggleEditor() {
        if (this.toggle) {
            this._hide();
            this.toggle = false;
        } else {
            this._show();
            this.toggle = true;
        }
    }

    _show() {
        document.getElementById("editor").setAttribute("style", "display: inline");
    }

    _hide() {
        document.getElementById("editor").setAttribute("style", "display: none");
    }

    saveEdit() {
        this.memeList.appendToTable(meme);
    }

    uploadMeme() {

    }

    watch_ttop() {

    }

    watch_tbot() {

    }

    watch_ttitle() {

    }

    shift_up_ttop() {

    }

    shift_up_tbot() {
        
    }

    shift_down_ttop() {

    }

    shift_down_tbot() {
        
    }

}
