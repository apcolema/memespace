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
            this.meme = new Meme("","Title","What is my purpose","To be a sample meme",0,0,true,0,this.uuid,false);
            this.new_meme = true;
        }
        
        document.getElementById("meme_content").appendChild(this.meme.meme);

        document.getElementById("editor_ttop").value = this.meme.ttop;
        document.getElementById("editor_tbot").value = this.meme.tbot;
        var e_ttitle = document.getElementById("editor_ttitle");
        if (e_ttitle.value == undefined || e_ttitle.value == null) {
            e_ttitle.value = "Title";
        } else {
            e_ttitle.value = this.meme.ttitle;
        }

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
        this.meme.ttop_node.innerHTML = document.getElementById("editor_ttop").value;
    }

    watch_tbot() {
        this.meme.tbot_node.innerHTML = document.getElementById("editor_tbot").value;
    }

    watch_ttitle() {
        this.meme.ttitle_node.innerHTML = document.getElementById("editor_ttitle").value;
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
