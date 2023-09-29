var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon= document.getElementById("sidebarIcon");

function toggleSidebar(){
	if (!sidebarOpen){
		sidebar.classList.add("sidebar_responsive");
		sidebarOpen=true;
	}
}

function closeSidebar(){
	 console.log("hsasah");
	 if (sidebarOpen){
		 console.log("hh");
		 sidebar.classList.remove("sidebar_responsive");
		 sidebarOpen = false;
	 }
}

var id = '';
var suppliers = [];
var worker = [];
var workerindex = 0;
var suppliersindex = 0;
function send_suppliers() {


    var text = document.getElementById('text').value;
    var time = new Date();
    var format = time.getFullYear() + '.' + String(time.getMonth() + 1).padStart(2, '0') + '.' + String(time.getDate()).padStart(2, '0') + ' ' + String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0') + ':' + String(time.getSeconds()).padStart(2, '0');

    var Action = document.getElementById('Actions').value;
    var ref = firebase.database().ref().child('Pickly').child('users');

    
    ref.orderByChild('provider').equalTo('Raya').on('value', function (snapshot) {
		
	

        var a = snapshot.exists();

        console.log(a);

        if (a) {

            snapshot.forEach(function (childSnapshot) {

                var key = firebase.database().ref().child('Pickly').child('notificationRequests').push();

                suppliers[suppliersindex] = childSnapshot.child('id').val();
                suppliersindex++;

                var map2 = {
                    action: Action, datee: format, from: id, isRead: "false", orderid: "", statue: text, to: childSnapshot.child('id').val(), uName: "Envio", ppURL: "https://firebasestorage.googleapis.com/v0/b/shipply-fc7a0.appspot.com/o/Main%2Ferw.jpg?alt=media&token=f6bacaaa-dcd7-41c1-8ae9-40991bf4eca7&fbclid=IwAR1hufVQrG5RFt8H36Nz8_pT7C4gRZVb3l9zrzLNQfCjo-t1zy3RlSs4ybw"
                };


                ref = firebase.database().ref().child('Pickly').child('notificationRequests').child(childSnapshot.child('id').val()).child(key.key).set(map2); 
                console.log(childSnapshot.child('id').val());
                console.log(key.key);
               
            });

        }
		alert("تم ارسال الاشعار")

        


    });



    
}


function send_workers() {

    var text2 = document.getElementById('text').value;
    var time = new Date();
    var format = time.getFullYear() + '.' + String(time.getMonth() + 1).padStart(2, '0') + '.' + String(time.getDate()).padStart(2, '0') + ' ' + String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0') + ':' + String(time.getSeconds()).padStart(2, '0');

    var Action2 = document.getElementById('Actions').value;
    var ref = firebase.database().ref().child('Pickly').child('users');

    console.log(text2);
    console.log(Action2);
    ref.orderByChild('accountType').equalTo('Delivery Worker').on('value', function (snapshot) {

        var a = snapshot.exists();

        console.log(23)

        if (a) {

            snapshot.forEach(function (childSnapshot) {
                console.log(23)
                var key2 = firebase.database().ref().child('Pickly').child('notificationRequestsfortest2').child(childSnapshot.child('id').val()).push();

                worker[workerindex] = childSnapshot.child('id').val();
                workerindex++;

                var map3 = {
                    action: Action2, datee: format, from: id, isRead: "false", orderid: "", statue: text2, to: childSnapshot.child('id').val(), uName: "Envio", ppURL: "https://firebasestorage.googleapis.com/v0/b/pickly-ed2f4.appspot.com/o/ppUsers%2Ficon.png?alt=media&token=4dce9f34-2794-4690-b888-10e5b0cb7865"
                };


               ref = firebase.database().ref().child('Pickly').child('notificationRequestsfortest2').child(childSnapshot.child('id').val()).child(key2.key).set(map3);
                //console.log(childSnapshot.child('id').val());
                //console.log(key2.key);

            });

        }




    });



}


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        id = user.uid;

        //var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('accountType');

    }


});
function logout(){
firebase.auth().signOut().then(logout =>{
	
	
	document.location.href="../login.html";
}).catch(error=>{
});
	
}