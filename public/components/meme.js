class Meme {
    load() {
        console.log("Meme made");
    }

    constructor(img_path="", title="title", ttop="What is my purpose", tbot="To be a sample meme",
        ttop_y=0, tbot_y=0, editable=false, timestamp=0, uuid) {

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
        this._push_to_database();

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

    _push_to_database() {
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

        var container = document.createElement("div");
        container.setAttribute("class", "container");
        container.setAttribute("style", `background-image: url("${this.img_path}");`)

        var image_frame = document.createElement("div");
        image_frame.setAttribute("class", "image_frame");

        var text_top = document.createElement("span");
        text_top.appendChild(document.createTextNode(this.ttop));
        text_top.setAttribute("class", "ttop");

        var text_bottom = document.createElement("span");
        text_bottom.appendChild(document.createTextNode(this.tbot));
        text_bottom.setAttribute("class", "tbot");

        //If it is a meme that can be editted
        if(this.editable) {

            var image_title = document.createElement("p");
            image_title.appendChild(document.createTextNode(this.title));

            var share = document.createElement("img");
            share.setAttribute("type", "png");
            var edit = document.createElement("img");
            edit.setAttribute("type", "png");
            var del = document.createElement("img");
            del.setAttribute("type", "png");

            image_frame.appendChild(share);
            image_frame.appendChild(edit);
            image_frame.appendChild(del);

            //TODO Set on hover listener for meme

        }

        //Form the structure
        image_frame.appendChild(text_top);
        image_frame.appendChild(text_bottom);

        container.appendChild(image_frame);

        if(this.editable) {
            container.appendChild(image_title);
        }

        return container;
    }
}