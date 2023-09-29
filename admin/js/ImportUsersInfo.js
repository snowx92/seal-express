var id = '';



function ImportUsersInformations() {
    //console.log('here');
    var s = '';
     var f = false;
    var ref = firebase.database().ref().child('Pickly').child('users');
    var table = document.getElementById("usersList").getElementsByTagName('tbody')[0];
    
    ref.on('value', function (snapshot) {

        
        snapshot.forEach(function (child) {

            
            var newRow = table.insertRow(table.length);
            
            console.log('here');
            
            child.child('locations').forEach(function (locchilds) {
                f = true;
                //console.log('1');
                s += locchilds.child('region').val() + '/' + locchilds.child('state').val();
                s += '--';
            });

            
            if (f) {
                var cell1 = newRow.insertCell(0);
                cell1.innerHTML = s;
               
            }
            

             if(!f) {
                var cell1 = newRow.insertCell(0);
                //cell1.innerHTML = "";
            }
            f = false;
            s = '';
            var cell2 = newRow.insertCell(1);
            cell2.innerHTML = child.child('name').val();

            var cell3 = newRow.insertCell(2);
            cell3.innerHTML = child.child('accountType').val();

            var cell4 = newRow.insertCell(3);
            cell4.innerHTML = child.child('active').val();

            var cell5 = newRow.insertCell(4);
            cell5.innerHTML = child.child('id').val();

            var cell6 = newRow.insertCell(5);
            cell6.innerHTML = child.child('email').val();

            var cell7 = newRow.insertCell(6);
            cell7.innerHTML = child.child('phone').val();

            var cell8 = newRow.insertCell(7);
            cell8.innerHTML = child.child('userState').val();

            //console.log(child.val());


        });
    });
}



function ImportUsersInformationsDlivaryWorker() {
    //console.log('here');
    var s = '';
    var f = false;
    var ref = firebase.database().ref().child('Pickly').child('users');
    var table = document.getElementById("usersList").getElementsByTagName('tbody')[0];

    ref.orderByChild('provider').equalTo('Raya').on('value', function (snapshot) {

        console.log('here');
        snapshot.forEach(function (child) {


            var newRow = table.insertRow(table.length);



            child.child('locations').forEach(function (locchilds) {
                f = true;
                console.log('1');
                s += locchilds.child('region').val() + '/' + locchilds.child('state').val();
                s += '--';
            });


            if (f) {
                var cell1 = newRow.insertCell(0);
                cell1.innerHTML = s;

            }


            if (!f) {
                var cell1 = newRow.insertCell(0);
                //cell1.innerHTML = "";
            }
            f = false;
            s = '';
            var cell2 = newRow.insertCell(1);
            cell2.innerHTML = child.child('name').val();

            var cell3 = newRow.insertCell(2);
            cell3.innerHTML = child.child('accountType').val();

            var cell4 = newRow.insertCell(3);
            cell4.innerHTML = child.child('active').val();

            var cell5 = newRow.insertCell(4);
            cell5.innerHTML = child.child('id').val();

            var cell6 = newRow.insertCell(5);
            cell6.innerHTML = child.child('email').val();

            var cell7 = newRow.insertCell(6);
            cell7.innerHTML = child.child('phone').val();

            var cell8 = newRow.insertCell(7);
            cell8.innerHTML = child.child('userState').val();

            //console.log(child.val());


        });
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