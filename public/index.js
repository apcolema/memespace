function initialize() {
    const top_left_meme = new Meme();
    const top_right_meme = new Meme();
    const bottom_right_meme = new Meme();
    const bottom_left_meme = new Meme();

    document.getElementById("top_left_meme").appendChild(top_left_meme.meme);
    document.getElementById("top_right_meme").appendChild(top_right_meme.meme);
    document.getElementById("bottom_right_meme").appendChild(bottom_right_meme.meme);
    document.getElementById("bottom_left_meme").appendChild(bottom_left_meme.meme);
}

/*
document.addEventListener('DOMContentLoaded', function() {
        
    //TODO initAuth(firebase.auth());
    //TODO initDatabase(firebase.database())

});
*/