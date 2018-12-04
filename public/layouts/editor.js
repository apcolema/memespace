class Editor {
    load() {
        console.log("Loaded Editor class");
    }

    constructor(memeList) {
        this.memeList = memeList;
    }

    edit(meme) {
        this.meme = meme;
        //TODO extract and set meme title, ttop, img, etc.
    }

    saveEdit() {
        this.memeList.appendToTable(meme);
    }

    cancelEdit() {
        this.meme = null;

        //Todo get rid of ttop, title reset to blank, close editor, etc.
    }
}