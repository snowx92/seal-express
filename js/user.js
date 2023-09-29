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
	
	 if (sidebarOpen){
		
		 sidebar.classList.remove("sidebar_responsive");
		 sidebarOpen = false;
	 }
}

function getuserscount() {
    var ref = firebase.database().ref().child('Pickly').child('users');

    ref.on('value', function (snapshot) {

        console.log(snapshot.numChildren());

    })

}


function getuser() {
    var table = document.getElementById("userinfo").getElementsByTagName('tbody')[0];

    var phone = document.getElementById('phonee').value;

   
    var ss;
    var ref2 = firebase.database().ref().child('Pickly').child('users');

    ref2.orderByChild('phone').equalTo(phone).on('value', function (snapshot) {

        snapshot.forEach(function (children) {

            var newRow = table.insertRow(table.length);
            var cell5;
            ref2 = firebase.database().ref().child('Pickly').child('orders');
            ref2.orderByChild('uId').equalTo(children.child('id').val()).on('value', function (sp) {
                ss = sp.numChildren();
                 //cell4 = newRow.insertCell(0);
                cell5.innerHTML = String(ss);
                console.log(ss);
            })

            

            var cell0 = newRow.insertCell(0);
            cell0.innerHTML = children.child('name').val();

            var cell1 = newRow.insertCell(1);
            cell1.innerHTML = children.child('id').val();

            var cell2 = newRow.insertCell(2);
            cell2.innerHTML = children.child('accountType').val();

            var cell3 = newRow.insertCell(3);
            cell3.innerHTML = children.child('phone').val();

            var cell5 = newRow.insertCell(4);
            cell5.innerHTML = '0';

            var cell4 = newRow.insertCell(5);
            cell4.innerHTML = children.child('userState').val();

           
            console.log('123');
        });
       

    });

}







//insert function  //


function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Pnumber;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.mo7fza;
	cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.mantka;
	cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.adress;
	cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.onotes;
	cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.wzn;
	cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.mokdm;
	cell9 = newRow.insertCell(8);
    cell9.innerHTML = data.shan;
	cell10 = newRow.insertCell(9);
    cell10.innerHTML = data.date;
	cell11 = newRow.insertCell(10);
    cell11.innerHTML = data.date2;
	cell12 = newRow.insertCell(11);
    cell12.innerHTML = data.adress2;
    cell12 = newRow.insertCell(12);
    cell12.innerHTML = `<a onClick="onEdit(this)"><i class ="fas fa-edit btnedit"></i></a>
                       <a onClick="onDelete(this)"><i class ="fas fa-trash-alt btndelete"></i></a>`;
}