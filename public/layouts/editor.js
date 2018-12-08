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
        
        this.orig_title = null;
        this.orig_ttop = null;
        this.orig_tbot = null;
        this.orig_ttop_y = null;
        this.orig_tbot_y = null;
        this.img_path = null;
    }

    loadWithMeme(meme) {

        if (this.toggle == false){ return; }

        if (meme != null) {
            this.meme = meme;
            this.meme.editable = false;
            this.new_meme = false;
        } else {
            this.meme = new Meme("","Title","","",0,0,false,0,this.uuid,false);
            this.new_meme = true;
        }
        
        this.orig_title = (this.meme.title);
        this.orig_ttop = (this.meme.ttop);
        this.orig_tbot = (this.meme.tbot);
        this.orig_ttop_y = (this.meme.ttop_y);
        this.orig_tbot_y = (this.meme.tbot_y);
        this.orig_img_path = (this.meme.img_path);
        
        document.getElementById("meme_content").innerHTML = "";
        document.getElementById("meme_content").appendChild(this.meme.meme);

        document.getElementById("editor_ttop").value = this.meme.ttop;
        document.getElementById("editor_tbot").value = this.meme.tbot;
        document.getElementById("editor_ttitle").value = this.meme.title;

        this.meme.ttop_parent.setAttribute("style", "font-size: 1.0em");
        this.meme.tbot_parent.setAttribute("style", "font-size: 1.0em");

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
        document.getElementById("meme_content").innerHTML = "";
        document.getElementById("editor").setAttribute("style", "display: none");
    }

    saveEdit() {

        this.meme.ttop_parent.setAttribute("style", "font-size: 2.0em");
        this.meme.tbot_parent.setAttribute("style", "font-size: 2.0em");
        this.meme.editable = true;
        this.meme.meme = this.meme.render_meme();
        this.memeList.appendToTable(this.meme);
        if (this.new_meme) {
            this.meme.push_to_database(this.meme.img_path);
        } else {
            this.meme.update_in_database();
        }

        this._hide();
        document.getElementById("search_bar").value = "";
    }
    cancelEdit() {
        this.meme.ttop_parent.setAttribute("style", "font-size: 2.0em");
        this.meme.tbot_parent.setAttribute("style", "font-size: 2.0em");
        
        this.meme.title = this.orig_title;
        this.meme.ttop = this.orig_ttop;
        this.meme.tbot = this.orig_tbot;
        this.meme.ttop_y = this.orig_ttop_y;
        this.meme.tbot_y = this.orig_tbot_y;
        this.meme.img_path = this.orig_img_path;
        
        this.meme.meme = this.meme.render_meme();
        
        this._hide();
        document.getElementById("search_bar").value = "";
    }

    uploadMeme(event) {
        this.meme.img_path = URL.createObjectURL(event.target.files[0]);
        this.meme.meme = this.meme.render_meme();
        this.loadWithMeme(this.meme);
        this.new_meme = true;
    }

    watch_ttop() {
        this.meme.ttop_node.data = DOMPurify.sanitize(document.getElementById("editor_ttop").value);
        this.meme.ttop = this.meme.ttop_node.data;
    }

    watch_tbot() {
        this.meme.tbot_node.data = DOMPurify.sanitize(document.getElementById("editor_tbot").value);
        this.meme.tbot = this.meme.tbot_node.data;
    }

    watch_ttitle() {
        this.meme.ttitle_node.data = DOMPurify.sanitize(document.getElementById("editor_ttitle").value);
        this.meme.title = this.meme.ttitle_node.data;
    }

    shift_up_ttop() {
        this.meme.ttop_y = this.meme.ttop_y - 5;
        if (this.meme.ttop_y < 0) {
            this.meme.ttop_y = 0;
        }
        this.meme.ttop_parent.style.top = `${this.meme.ttop_y}px`;
    }

    shift_up_tbot() {
        this.meme.tbot_y = this.meme.tbot_y + 5;
        if (this.meme.tbot_y > 20) {
            this.meme.tbot_y = 20;
        }
        this.meme.tbot_parent.style.top = `calc(100% - 2*${45+this.meme.tbot_y}px)`;
    }

    shift_down_ttop() {
        this.meme.ttop_y = this.meme.ttop_y + 5;
        if (this.meme.ttop_y > 20) {
            this.meme.ttop_y = 20;
        }
        this.meme.ttop_parent.style.top = `${this.meme.ttop_y}px`;
    }

    shift_down_tbot() {
        this.meme.tbot_y = this.meme.tbot_y - 5;
        if (this.meme.tbot_y < 0) {
            this.meme.tbot_y = 0;
        }
        this.meme.tbot_parent.style.top = `calc(100% - 2*${45+this.meme.tbot_y}px)`;
    }

}
