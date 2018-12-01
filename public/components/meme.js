class Meme {
    constructor(img_path="", title="title", ttop="What is my purpose", tbot="To be a sample meme", ttop_y=0, tbot_y=0, editable=false) {
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

        //Render the new meme html structure
        this.meme = this.render_meme();
    }

    load() {
        console.log("Meme class loaded");
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

            share = document.createElement("img");
            share.setAttribute("type", "png");
            edit = document.createElement("img");
            edit.setAttribute("type", "png");
            del = document.createElement("img");
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