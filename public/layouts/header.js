class Header {
    load() {
        console.log("Loaded Header class");
    }

    constructor() {
        this.load();
    }

    growProfileIcon() {
        document.getElementById("hover_line").classList.add("show_hover_line");
        document.getElementById("profile_icon").setAttribute("style", "height: 50px; width: 50px;");
    }

    shrinkProfileIcon() {
        document.getElementById("hover_line").classList.remove("show_hover_line");
        document.getElementById("profile_icon").setAttribute("style", "height: 40px; width: 40px;");
    }
}