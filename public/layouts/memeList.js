class MemeList {
    load() {
        console.log("MemeList class loaded");
    }

    constructor(userMemes) {
        this.table = document.getElementById("meme_list");
        this.userMemes = userMemes;

        this.userMemes.forEach((el) => {
            this.table.appendToTable(el);
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
        if( this._isRowFull(this.table.lastChild) ) {
            this.table.appendChild(document.createElement("tr"));
        }
        var el = document.createElement("td");
        el.appendChild(meme);
        this.table.lastChild.appendChild(el);

        if( this.userMemes.indexOf(meme) == -1 ) {
            this.userMemes.push(meme);
        }
    }

    removeFromTable(meme) {
        //First delete the meme from the list
        this.userMemes.splice( this.userMemes.indexOf(meme), 1 );

        this.userMemes.childNodes.forEach((c) => {
            this.table.removeChild(c);
        });

        this.userMemes.forEach((el) => {
            this.table.appendToTable(el);
        });
    }
}