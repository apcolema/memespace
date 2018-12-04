var dashboard;

function loadDashboard() {
    //Todo do I need to add firebase object to constructor here?
    dashboard = new Dashboard();
}

//TODO on destruction go through everything in 
//dashboard.memeList.userMemes and add it to the db for dashboard.user