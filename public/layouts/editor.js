class Editor {
    load() {
        console.log("Loaded Editor class");
    }

    constructor(memeList, user) {
        
        this.load();
        
        this.toggle = false;
        this.memeList = memeList;
        this.meme = null;
        this.uuid = user.uuid;
        this.new_meme = false;
    }

    loadWithMeme(meme) {

        if (this.toggle == false){ return; }

        if (meme != null) {
            this.meme = meme;
            this.new_meme = false;
        } else {
            this.meme = new Meme("","Title","","",0,0,false,0,this.uuid,false);
            this.new_meme = true;
        }
        
        document.getElementById("meme_content").appendChild(this.meme.meme);

        document.getElementById("editor_ttop").value = this.meme.ttop;
        document.getElementById("editor_tbot").value = this.meme.tbot;
        document.getElementById("editor_ttitle").value = this.meme.title;

    }

    toggleEditor() {
        if (this.toggle) {
            this.toggle = false;
            this._hide();
            
        } else {
            this.toggle = true;
            this._show();
        }
    }

    _show() {
        document.getElementById("editor").setAttribute("style", "display: inline");
    }

    _hide() {
        document.getElementById("meme_content").removeChild(document.getElementById("meme_content").childNodes[0]);
        document.getElementById("editor").setAttribute("style", "display: none");
    }

    saveEdit() {
        this.memeList.appendToTable(this.meme);
        if (this.new_meme) {
            this.meme.push_to_database();
        } else {
            this.meme.update_in_database();
        }

        this._hide();
    }

    uploadMeme() {

    }

    watch_ttop() {
        this.meme.ttop_node.data = document.getElementById("editor_ttop").value;
    }

    watch_tbot() {
        this.meme.tbot_node.data = document.getElementById("editor_tbot").value;
    }

    watch_ttitle() {
        this.meme.ttitle_node.data = document.getElementById("editor_ttitle").value;
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
