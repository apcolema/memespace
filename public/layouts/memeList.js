class MemeList {
    load() {
        console.log("MemeList class loaded");
    }

    constructor(userMemes) {

        this.load();
        
        this.table = document.getElementById("meme_list");
        this.userMemes = userMemes;

        this.userMemes.forEach((el) => {
            this.appendToTable(el);
        });
    }

    _getNumRows() {
        return this.table.childNodes.length;
    }

    _isRowFull(row) {
        if( row.childNodes.length == 3 ) { return true; }
        else { return false; }
    }

    appendToTable(meme) {
        console.log("Appending a child meme to the table");

        if( this.table.childNodes.length == 0 || this._isRowFull(this.table.lastChild) ) {
            var row = document.createElement("tr");
            this.table.appendChild(row);
        }

        var el = document.createElement("td");
        el.append(meme.meme);
        this.table.lastChild.appendChild(el);

        if( this.userMemes.indexOf(meme) == -1 ) {
            this.userMemes.push(meme);
        }
 
        meme.my_email.onclick = () => {
            domtoimage.toBlob(meme.root)
                .then(function (blob) {
                    var a = document.createElement('a');
                    var a_img = document.createElement('img');
                    a_img.setAttribute("src", `${URL.createObjectURL(blob)}`);
                    a_img.setAttribute("alt", "My Meme");
                    a.appendChild(a_img);
                    a.setAttribute("rel", "noopener");
                    a.setAttribute("href", "mailto:?subject=Memes!");
                    setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4);
                    setTimeout(function () { click(a) }, 0);
                    window.saveAs(blob, `${meme.title}_memespace.png`);
            }); 
        };
        meme.my_clip.onclick = ()=>{
            domtoimage.toBlob(meme.root)
            .then(function (blob) {
                var text_el = document.createElement('textarea');
                text_el.value = `${URL.createObjectURL(blob)}`;
                document.body.appendChild(text_el);
                text_el.select();
                document.execCommand('copy');
                document.body.removeChild(text_el);
            }); 
        };
        meme.my_edit.onclick = ()=>{
            dashboard.toggleEditor();
            dashboard.editorLoadWithMeme(this.userMemes[this.userMemes.indexOf(meme)]);
        };
        meme.my_del.onclick = ()=>{
            this.userMemes[this.userMemes.indexOf(meme)].delete_from_database();
            this._removeFromList(this.userMemes.indexOf(meme));
        };
        meme.my_share.onclick = ()=>{ 
            domtoimage.toBlob(meme.root)
                .then(function (blob) {
                window.saveAs(blob, `${meme.title}_memespace.png`);
            }); 
        }
    }

    _removeFromList(idx) {
        if( idx != -1 ) {
            this.userMemes.splice(idx, 1);
        }

        this._reloadList("");
    }

    _reloadList() {
        this.table.innerHTML = "";
        var text = document.getElementById("search_bar").value;
        if (text != null && text != ""){
            this.filterForSearch(text, this.userMemes).forEach((el) => {
                this.appendToTable(el);
            });
        } else {
            this.userMemes.forEach((el) => {
                this.appendToTable(el);
            });
        }
    }
    
    filterForSearch(text, list) {
        var display_memes = [];
        if (text != null && text != ""){
            for(var i = 0; i < list.length; i++){
                var el = list[i];
                var yes = el.title.includes(text) || el.ttop.includes(text) || el.tbot.includes(text);
                if(yes){
                    display_memes.push(el);
                }
            }
            return display_memes;
        } else {
            return list;
        }
    }
}