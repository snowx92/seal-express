var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");
var id = '';
var order = [];
var sender = [];
var i = 0;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        id = user.uid;



    } else {
        // User not logged in or has just logged out.
    }
});


function toggleSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar_responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    console.log("hsasah");
    if (sidebarOpen) {
        console.log("hh");
        sidebar.classList.remove("sidebar_responsive");
        sidebarOpen = false;
    }
}


var trackid = "";
var order = [];
var locphone = "";

/*function on_load() {

	var storage2 = sessionStorage.getItem('trackid');
	trackid = JSON.parse(storage2);
	console.log(trackid)
	trackorder();
	
}*/

//var myLatlng = { lat: -25.363, lng: 131.044 };

/*function initMap() {
	
	x = navigator.geolocation;
	x.getCurrentPosition(success , fail);
  	function success(position){
  	
		//addlocation(position.coords.latitude ,position.coords.longitude);
		
		myLatlng = { lat: position.coords.latitude, lng: position.coords.longitude };
		lati = position.coords.latitude;
		long = position.coords.longitude;
		console.log(lati,long);
	
		
  }
   function fail(){}
	
	
	console.log(myLatlng);

  
	
 
}*/

/*function addlocation(){
	
	var storage3 = sessionStorage.getItem('phone');
	locphone = JSON.parse(storage3);
	console.log(locphone);
	
	
	firebase.database().ref().child("Pickly").child("clientsLocations").child(locphone).set({
		_lat : lati ,
		_long : long,
		phone : locphone
		
	})
	
}
*/

function trackorder() {

    console.log("here");

    //trackid = document.getElementById("trackid").value;
    firebase.database().ref().child("Pickly").child("raya").orderByChild("trackid").equalTo(document.getElementById("trackid").value).once("value").then((snapshot) => {
        console.log("cxcxzcx")


        if (snapshot.exists()) {
			
			document.getElementById('show').style.display="block";
			setTimeout(function(){ document.getElementById('show').style.display="none";  }, 3000);
			
			
            trackid = document.getElementById("trackid").value;
            snapshot.forEach(function(snap) {
                console.log("cxcxzcx")
                console.log(snap.val());
                order.push(snap.val());
                document.getElementById('order_state').innerText = snap.child("statue").val();
                //document.getElementById('date_droped').innerText = snap.child("pDate").val();
                //document.getElementById('dlivared_to').innerText = snap.child("dname").val();
                //document.getElementById('dlivared_phone').innerText = snap.child("dphone").val();

                //document.getElementById('order_price').innerText = snap.child("gmoney").val();

                document.getElementById('Address').innerText = snap.child("mPAddress").val();

                document.getElementById('dlivaryRegin/state').innerText =
                    snap.child("txtDState").val() + "/" + snap.child("mDRegion").val();

                console.log(snap.child("txtDState").val());
                console.log(snap.child("mDRegion").val());

                document.getElementById('pakageWight').innerText = snap.child("packWeight").val();

                document.getElementById('qpacktype').innerText = " نوع الشحنه : " + snap.child("packType").val();
                document.getElementById('wight').innerText = " وزن الشحنه : " + snap.child("packWeight").val();
                document.getElementById('packprice').innerText = " ثمن الشحنه : " + snap.child("gmoney").val();
                document.getElementById('ddate2').innerText = " تاريخ تسليم الشحنه : " + snap.child("ddate").val();


                document.getElementById('rname').innerText = " اسم المرسل اليه : " + snap.child("dname").val();
                document.getElementById('rphone').innerText = " رقم هاتف المرسل اليه : " + snap.child("dphone").val()
                document.getElementById('rlocation').innerText = " موقع المرسل اليه  : " + snap.child("txtDState").val() + " - " + snap.child("mDRegion").val();
                document.getElementById('raddress').innerText = " عنوان المرسل اليه  : " + snap.child("daddress").val();


                document.getElementById('slocation').innerText = " موقع الراسل  : " + snap.child("txtPState").val() + " - " + snap.child("mPRegion").val();
                document.getElementById('saddress').innerText = " عنوان الراسل  : " + snap.child("mPAddress").val();

                document.getElementById("em1").innerText = " ";
                document.getElementById("em2").innerText = " ";
                document.getElementById("h51").innerText = "track number : " + snap.child("trackid").val();
                document.getElementById("pdate").innerText = "تاريخ استلام الشحنه  : " + snap.child("pDate").val();






                firebase.database().ref().child("Pickly").child("users").orderByChild("id").equalTo(snap.child("uId").val()).once("value").then((userinfo) => {

                    userinfo.forEach(function(user) {
                        console.log(user.val());
                        //document.getElementById('suppliername').innerText = user.child("name").val();

                        var rate = 0;
                        var sum = 0;
                        if (parseInt(user.child("rating").child("five").val())) {
                            rate += parseInt(user.child("rating").child("five").val()) * 5;
                            sum += parseInt(user.child("rating").child("five").val());
                        }

                        //console.log(rate);
                        if (parseInt(user.child("rating").child("four").val())) {
                            rate += parseInt(user.child("rating").child("four").val()) * 4;
                            sum += parseInt(user.child("rating").child("four").val());
                        }
                        //console.log(rate);
                        if (parseInt(user.child("rating").child("three").val())) {
                            rate += parseInt(user.child("rating").child("three").val()) * 3;
                            sum += parseInt(user.child("rating").child("three").val());
                        }
                        if (parseInt(user.child("rating").child("two").val())) {
                            rate += parseInt(user.child("rating").child("two").val()) * 2;
                            sum += parseInt(user.child("rating").child("two").val());
                        }
                        if (parseInt(user.child("rating").child("one").val())) {
                            rate += parseInt(user.child("rating").child("one").val()) * 1;
                            sum += parseInt(user.child("rating").child("one").val());
                        }



                        //document.getElementById('rating').innerText = parseFloat(rate / sum);
                        //document.getElementById('suppPhone').innerText = user.child("phone").val();


                        document.getElementById('sname').innerText = " اسم الراسل : " + user.child("name").val();
                        document.getElementById('sphone').innerText = " رقم هاتف الراسل : " + user.child("phone").val()

                        sender.push(user.val());
                        appendTables();

                    })


                })



                if (snap.child("statue").val() == "placed") {
                    //alert("يتم مراجعه الشحنه");
                    document.getElementById('order_state').innerText = "يتم مراجعه الشحنه";

                }


                if (snap.child("statue").val() == "accepted") {
                    //alert("قيد الاستلام");
                    document.getElementById('order_state').innerText = "يقيد الاستلام";
                }

                if (snap.child("statue").val() == "recived") {
                    //alert("في انتظار تاكيد الاستلام");
                    document.getElementById('order_state').innerText = "في انتظار تاكيد الاستلام";

                }

                if (snap.child("statue").val() == "recived2") {
                    //alert("جاري تسليم الشحنه");
                    document.getElementById('order_state').innerText = "جاري تسليم الشحنه";

                }

                if (snap.child("statue").val() == "hubP" || snap.child("statue").val() == "hubD") {
                    //alert("في المخزن");
                    document.getElementById('order_state').innerText = "في المخزن";

                }
                if (snap.child("statue").val() == "supD" || snap.child("statue").val() == "readyD") {
                    //alert("قيد التسليم");
                    document.getElementById('order_state').innerText = "قيد التسليم";
                }

                if (snap.child("statue").val() == "delivered") {
                    //alert("تم التسليم و التحصيل");
                    document.getElementById('order_state').innerText = "تم التسليم و التحصيل";
                }

                if (snap.child("statue").val() == "deniedD") {
                    //alert("في مخزن المرتجعات");
                    document.getElementById('order_state').innerText = "في مخزن المرتجعات";

                }


                if (snap.child("statue").val() == "denied") {
                    //alert("مرتجع");
                    document.getElementById('order_state').innerText = "مرتجع";
                }


                if (snap.child("statue").val() == "اhub1Denied" || snap.child("statue").val() == "اsupDenied" || snap.child("statue").val() == "اhub2Denied" || snap.child("statue").val() == "capDenied") {
                    //alert("جاري استرجاع الشحنه");
                    document.getElementById('order_state').innerText = "جاري استرجاع الشحنه";

                }
                if (snap.child("statue").val() == "deniedback") {
                    //alert("تم استلام المرتجع");
                    document.getElementById('order_state').innerText = "تم استلام المرتجع";
                }

                if (snap.child("statue").val() == "accepted" || snap.child("statue").val() == "recived" || snap.child("statue").val() == "readyD" || snap.child("statue").val() == "capDenied" || snap.child("statue").val() == "delivered") {


                    firebase.database().ref().child("Pickly").child("users").orderByChild("id").equalTo(snap.child("uAccepted").val()).once("value").then((delivaryworkers) => {

                        delivaryworkers.forEach(function(worker) {
                            console.log(worker.val());




                            document.getElementById('workerPhone').innerText = worker.child("phone").val();
                            document.getElementById('workername').innerText = worker.child("name").val();

                            document.getElementById('display1').style.display = "block";
                            document.getElementById('display2').style.display = "block";
                        })


                    })



                }


            });
        }



    });

}


var image = new Image();
var im = new Image();



function creatpdf() {

    var doc = new window.jspdf.jsPDF();;


    var qr = new QRious({
        element: document.getElementById('qr-code'),
        size: 200,
        value: 'https://studytonight.com'
    });

    var qrtext = trackid;
    //alert(qrtext);
    qr.set({
        foreground: 'black',
        size: 200,
        value: qrtext
    });
    image.src = document.getElementById('qr-code').toDataURL("image/png");
    console.log(image);
    im.src = 'Logo BW.png';
    document.getElementById("Image2").src = im.src;


    document.getElementById("Image").src = image.src;

    im.onload = function() {
        var sTable = document.getElementById('PDF').innerHTML;
        console.log(document.getElementById('PDF'));
        var win = window.open('', '', 'height=700,width=700');

        var style = "<style>";
        style = style + "#table" + "{width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;margin-left:50px;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "#Image" + "{width: 10%; margin-bottom:14px; float : right;}";
        style = style + "#Image2" + "{width: 150px; height :50px; margin-bottom:14px; float :left;margin-right:50%;}";
        style = style + "</style>";

        win.document.write('<html><head>');
        win.document.write('<title>Profile</title>'); // <title> FOR PDF HEADER.
        win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');
        win.document.close(); // CLOSE THE CURRENT WINDOW.
        win.print();

    }



}


function printALLPacks() {

}


function logout() {
    firebase.auth().signOut().then(logout => {


        document.location.href = "../login.html";
    }).catch(error => {});

}


function appendTables() {

    console.log(sender);
    console.log(order);

    let x = document.getElementById("PFF");
    let div1 = document.createElement("div");
    div1.id = "table" + String(i);
    var qr = new QRious({
        element: document.getElementById('qr-code2'),
        size: 200,
        value: 'https://studytonight.com'
    });

    var qrtext = order[i].trackid;
    //alert(qrtext);
    qr.set({
        foreground: 'black',
        size: 200,
        value: qrtext
    });
    var image = new Image();
    image.src = document.getElementById('qr-code2').toDataURL("image/png");
    console.log(image);


    var im = new Image();
    im.src = "Logo BW.png";

    let img = document.createElement("img");
    img.src = im.src;
    img.id = "Image2" + String(i);
    let img2 = document.createElement("img");
    img2.src = image.src;
    img.style.width = '250px';
    img2.style.width = '100px';
    img.style.height = '100px';
    img2.style.height = '100px';
    img2.style.float = 'right';
    img.style.float = 'left';
    img2.id = "Image" + String(i);

    let h51 = document.createElement("h5");
    h51.innerText = "track number : " + order[i].trackid;
    h51.id = "h5" + String(i);
    div1.appendChild(img);
    div1.appendChild(img2);
    div1.appendChild(h51);
    let table = document.createElement("table");

    let tr1 = document.createElement("tr");

    table.appendChild(tr1);

    let th1 = document.createElement("th");
    th1.innerText = "الراسل";
    tr1.appendChild(th1);

    let th3 = document.createElement("th");
    th3.innerText = "الشحنه";
    //th3.innerHTML = image.src;
    tr1.appendChild(th3);

    let th2 = document.createElement("th");
    th2.innerText = "المرسل اليه";
    tr1.appendChild(th2);




    let tr2 = document.createElement("tr");

    table.appendChild(tr2);

    let th4 = document.createElement("td");
    th4.innerText = "اسم الراسل : " + sender[i].name;
    tr2.appendChild(th4);

    let th6 = document.createElement("td");
    th6.innerText = "محتوى الشحنه : " + order[i].packType;
    tr2.appendChild(th6);

    let th5 = document.createElement("td");
    th5.innerText = "اسم المرسل اليه : " + order[i].dname;
    tr2.appendChild(th5);






    let tr3 = document.createElement("tr");

    table.appendChild(tr3);

    let th7 = document.createElement("td");
    th7.innerText = "منطقه الراسل : " + order[i].txtPState + " - " + order[i].mPRegion;
    tr3.appendChild(th7);

    let th9 = document.createElement("td");
    th9.innerText = "وزن الشحنه : " + order[i].packWeight;
    tr3.appendChild(th9);

    let th8 = document.createElement("td");
    th8.innerText = "منطقه المرسل اليه : " + order[i].txtDState + " - " + order[i].mDRegion;
    tr3.appendChild(th8);




    let tr4 = document.createElement("tr");

    table.appendChild(tr4);

    let th10 = document.createElement("td");
    th10.innerText = "عنوان الراسل : " + order[i].mPAddress;
    tr4.appendChild(th10);

    let th12 = document.createElement("td");
    th12.innerText = "سعر الشحنه : " + order[i].gmoney;
    tr4.appendChild(th12);

    let th109 = document.createElement("td");
    th109.innerText = "عنوان المرسل اليه : " + order[i].daddress;
    tr4.appendChild(th109);
    console.log(th109);





    let tr5 = document.createElement("tr");

    table.appendChild(tr5);

    let th13 = document.createElement("td");
    th13.innerText = "رقم هاتف الراسل : " + sender[i].phone;
    tr5.appendChild(th13);

    let th15 = document.createElement("td");
    th15.innerText = "تاريخ تسليم الشحنه : " + order[i].ddate;
    tr5.appendChild(th15);

    let th14 = document.createElement("td");
    th14.innerText = "رقم هاتف المرسل اليه : " + order[i].dphone;
    tr5.appendChild(th14);


    let tr6 = document.createElement("tr");

    table.appendChild(tr6);

    let th131 = document.createElement("td");
    th131.innerText = " ";
    tr6.appendChild(th131);

    let th151 = document.createElement("td");
    th151.innerText = "تاريخ استلام الشحنه: " + order[i].pDate;
    tr6.appendChild(th151);

    let th141 = document.createElement("td");
    th141.innerText = " ";
    tr6.appendChild(th141);



    div1.appendChild(table);
    x.appendChild(div1);
    i++;
}

function printAllorders() {


    var sTable = document.getElementById('PFF').innerHTML;
    var win = window.open('', '', 'height=700,width=700');

    var style = "<style>";

    console.log(order.length);
    for (k = 0; k < order.length; k++) {
        console.log(k);
        if (k + 1 == order.length) {
            style = style + "#table" + String(k) + "{width: 100%;font: 17px Calibri;}";
            style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;margin-left:50px;";
            style = style + "padding: 2px 3px;text-align: center;}";
            style = style + "#Image" + String(k) + "{width: 10%; margin-bottom:14px; float : right;}";
            style = style + "#Image2" + String(k) + "{width: 150px; height :50px; margin-bottom:14px; float :left;margin-right:50%;}";
            break;
        }
        style = style + "#table" + String(k) + "{width: 100%;font: 17px Calibri; margin-bottom:1000px}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;margin-left:50px;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "#Image" + String(k) + "{width: 10%; margin-bottom:14px; float : right; }";
        style = style + "#Image2" + String(k) + "{width: 150px; height :50px; margin-bottom:14px; float : left; margin-right:50%;}";
        console.log(style);
    }
    style = style + "</style>";

    win.document.write('<html><head>');
    win.document.write('<title>Policy</title>'); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.document.close(); // CLOSE THE CURRENT WINDOW.
    win.print();
}