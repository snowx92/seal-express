var trackid = "";
var order = [];
var locphone = "";

function on_load() {

    var storage2 = sessionStorage.getItem('trackid');
    trackid = JSON.parse(storage2);
    console.log(trackid)
    trackorder();

}

var myLatlng = { lat: -25.363, lng: 131.044 };

function initMap() {

    x = navigator.geolocation;
    x.getCurrentPosition(success, fail);

    function success(position) {

        //addlocation(position.coords.latitude ,position.coords.longitude);

        myLatlng = { lat: position.coords.latitude, lng: position.coords.longitude };
        lati = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lati, long);


    }

    function fail() {}


    console.log(myLatlng);




}

function addlocation() {

    var storage3 = sessionStorage.getItem('phone');
    locphone = JSON.parse(storage3);
    console.log(locphone);


    firebase.database().ref().child("Pickly").child("clientsLocations").child(locphone).set({
        _lat: String(lati),
        _long: String(long),
        phone: locphone

    })
    alert(" تم اضافه موقعك الحالي بنجاح");

}


function trackorder() {


    firebase.database().ref().child("Pickly").child("raya").orderByChild("trackid").equalTo(trackid).once("value").then((snapshot) => {


        snapshot.forEach(function(snap) {
            console.log(snap.val());
            document.getElementById('order_state').innerText = snap.child("statue").val();
            //document.getElementById('date_droped').innerText = snap.child("pDate").val();
            //document.getElementById('dlivared_to').innerText = snap.child("dname").val();
            //document.getElementById('dlivared_phone').innerText = snap.child("dphone").val();

            //document.getElementById('order_price').innerText = snap.child("gmoney").val();

            document.getElementById('Address').value = snap.child("mPAddress").val();

            document.getElementById('dlivaryRegin/state').innerText = snap.child("txtDState").val() + "/" + snap.child("mDRegion").val();

            document.getElementById('pakageWight').innerText = snap.child("packWeight").val();

            document.getElementById('qpacktype').innerText = " نوع الشحنه : " + snap.child("packType").val();
            document.getElementById('wight').innerText = " وزن الشحنه : " + snap.child("packWeight").val();
            document.getElementById('packprice').innerText = " ثمن الشحنه : " + snap.child("gmoney").val();
            document.getElementById('ddate2').innerText = " تاريخ تسليم الشحنه : " + snap.child("ddate").val();
            document.getElementById('pdate').innerText = " تاريخ استلام الشحنه : " + snap.child("pDate").val();


            document.getElementById('rname').innerText = " اسم المرسل اليه : " + snap.child("dname").val();
            document.getElementById('rphone').innerText = " رقم هاتف المرسل اليه : " + snap.child("dphone").val()
            document.getElementById('rlocation').innerText = " موقع المرسل اليه  : " + snap.child("txtDState").val() + " - " + snap.child("mDRegion").val();
            document.getElementById('raddress').innerText = " عنوان المرسل اليه  : " + snap.child("daddress").val();
            document.getElementById('em1').innerText = " ";
            document.getElementById('em2').innerText = " ";

            document.getElementById('slocation').innerText = " موقع الراسل  : " + snap.child("txtPState").val() + " - " + snap.child("mPRegion").val();
            document.getElementById('saddress').innerText = " عنوان الراسل  : " + snap.child("mPAddress").val();
            document.getElementById("h51").innerText = "tracl id  : " + trackid;



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



                })


            })



            if (snap.child("statue").val() == "placed") {
               
                document.getElementById('order_state').innerText = "يتم مراجعه الشحنه";

            }


            if (snap.child("statue").val() == "accepted") {
              
                document.getElementById('order_state').innerText = "يقيد الاستلام";
            }

            if (snap.child("statue").val() == "recived") {
              
                document.getElementById('order_state').innerText = "في انتظار تاكيد الاستلام";

            }

            if (snap.child("statue").val() == "recived2") {
               
                document.getElementById('order_state').innerText = "جاري تسليم الشحنه";

            }

            if (snap.child("statue").val() == "hubP" || snap.child("statue").val() == "hubD") {
               
                document.getElementById('order_state').innerText = "في المخزن";

            }
            if (snap.child("statue").val() == "supD" || snap.child("statue").val() == "readyD") {
              
                document.getElementById('order_state').innerText = "قيد التسليم";
            }

            if (snap.child("statue").val() == "delivered") {
               
                document.getElementById('order_state').innerText = "تم التسليم و التحصيل";
            }

            if (snap.child("statue").val() == "deniedD") {
                
                document.getElementById('order_state').innerText = "في مخزن المرتجعات";

            }


            if (snap.child("statue").val() == "denied") {
                
                document.getElementById('order_state').innerText = "مرتجع";
            }


            if (snap.child("statue").val() == "اhub1Denied" || snap.child("statue").val() == "اsupDenied" || snap.child("statue").val() == "اhub2Denied" || snap.child("statue").val() == "capDenied") {
            
                document.getElementById('order_state').innerText = "جاري استرجاع الشحنه";

            }
            if (snap.child("statue").val() == "deniedback") {
               
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


    });

}


var image = new Image();
var im = new Image();

var l = 0;

function creatpdf() {

    //var doc = new window.jspdf.jsPDF();;
    if (l > 0) {
        policy_only();
    }
    l++;

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

    //document.getElementById('trackidd').innerText = trackid;

    im.onload = function() {
        var sTable = document.getElementById('PDF').innerHTML;

        var win = window.open('', '', 'height=700,width=700');

        var style = "<style>";
        style = style + "table" + "{width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
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

function policy_only() {


    im.onload = function() {
        var sTable = document.getElementById('PDF').innerHTML;

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