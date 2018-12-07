class Meme {
    load() {
        console.log("Meme made");
    }

    constructor(img_path="", title="title", ttop="What is my purpose", tbot="To be a sample meme",
        ttop_y=0, tbot_y=0, editable=false, timestamp=0, uuid, push=true) {

        this.load();

        if(img_path == "") {
            this.img_path = "assets/img/default_meme.jpg";
        } else {
            this.img_path = img_path;
        }

        this.title = title;
        this.ttop = ttop;
        this.tbot = tbot;
        this.ttop_y = ttop_y;
        this.tbot_y = tbot_y;
        this.editable = editable;
        this.uuid = uuid;

        this.ttop_node = null;
        this.tbot_node = null;
        this.ttitle_node = null;

        //If we know a timestamp then load the meme from the DB
        if(timestamp != 0) {
            console.log("Previously made meme");
            this.timestamp = timestamp;
            this._load_from_database();
            this.meme = this.render_meme();
            return;
        }

        //Create a new timestamp
        this.timestamp = (new Date().valueOf());

        //Push new meme
        if(push) {
            this.push_to_database();
        }

        //Render the new meme html structure
        this.meme = this.render_meme();
    }

    _load_from_database() {
        var ret = firebase.database().ref('/users/' + this.uuid + "/" + this.timestamp).on('value', function(snapshot) {

            var ret = snapshot.val();

            console.log("Setting values of loaded meme");
            console.log(ret);

            this.title = ret.title;
            this.ttop = ret.ttop;
            this.tbot = ret.tbot;
            this.ttop_y = ret.ttop_y;
            this.tbot_y = ret.tbot_y;
            this.editable = ret.editable;
            this.img_path = ret.img_path;

            this.meme = this.render_meme();

        }, this);
    }

    push_to_database() {
        firebase.database().ref('/users/' + this.uuid + "/" + this.timestamp).set({
            img_path: this.img_path,
            title: this.title,
            ttop: this.ttop,
            tbot: this.tbot,
            ttop_y: this.ttop_y,
            tbot_y: this.tbot_y,
            editable: this.editable
        });
    }

    update_in_database() {
        var updates = {};
        uodates['/users/' + this.uuid + "/" + this.timestamp] = {
            img_path: this.img_path,
            title: this.title,
            ttop: this.ttop,
            tbot: this.tbot,
            ttop_y: this.ttop_y,
            tbot_y: this.tbot_y,
            editable: this.editable
        };

        firebase.database().ref().update(updates);
    }

    delete_from_database() {
        firebase.database().ref('/users/' + this.uuid + "/" + this.timestamp).remove();
    }

    render_meme() {
        /* 
         * Renders a meme structure:
         
         <div>
            <div>
                <img type="png" src="assets/img/share.png">
                <img type="png" src="assets/img/edit.png">
                <img type="png" src="assets/img/delete.png">
                <span>top text</span>
                <span>bottom text</span>
            </div>
            <span>title</span>
        </div>

        */
        var table_data_container = document.createElement("div");
        table_data_container.setAttribute("class", "table_data_container");
        
        var container = document.createElement("div");
        container.setAttribute("class", "container");
        container.setAttribute("style", `background-image: url("${this.img_path}");`)

        var image_frame = document.createElement("div");
        image_frame.setAttribute("class", "image_frame");

        var text_top = document.createElement("span");
        this.ttop_node = document.createTextNode(this.ttop);
        text_top.appendChild(this.ttop_node);
        text_top.setAttribute("class", "ttop");

        var text_bottom = document.createElement("span");
        this.tbot_node = document.createTextNode(this.tbot);
        text_bottom.appendChild(this.tbot_node);
        text_bottom.setAttribute("class", "tbot");

        var image_title = document.createElement("p");
        this.ttitle_node = document.createTextNode(this.title);
        image_title.appendChild(this.ttitle_node);

        //If it is a meme that can be editted
        if(this.editable) {
            
            var overlay_container = document.createElement("div");
            overlay_container.setAttribute("class", "overlay_container");
            
            var share = document.createElement("img");
            share.setAttribute("type", "png");
            var edit = document.createElement("img");
            edit.setAttribute("type", "png");
            var del = document.createElement("img");
            del.setAttribute("type", "png");
            var test = document.createElement("span");
            test.appendChild(document.createTextNode("kitties"));

            overlay_container.appendChild(test);
            overlay_container.appendChild(share);
            overlay_container.appendChild(edit);
            overlay_container.appendChild(del);
            
        }

        //Form the structure
        image_frame.appendChild(text_top);
        image_frame.appendChild(text_bottom);

        container.appendChild(image_frame);
        container.appendChild(image_title);
        
        table_data_container.appendChild(container);
        
        if(this.editable){
            table_data_container.appendChild(overlay_container);
        }

        return table_data_container;
    }
}