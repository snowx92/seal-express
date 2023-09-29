firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     logout();
 
    } else {
   // document.location.href = "login.html";

 
    }
});
 function logout() {
    firebase.auth().signOut().then(logout => {
 
 
     
    }).catch(error => {});
 
}