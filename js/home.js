var id = "";
var arr = [];
var arr2 = [];
var userName = "";
var phoneNum = "";
 
function logout() {
    firebase.auth().signOut().then(logout => {
 
 
        document.location.href = "login.html";
    }).catch(error => {});
 
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        id = user.uid;
        getinfo();
        get_orders();
        // User is signed in.
 
    } else {
    document.location.href = "login.html";

 
    }
});
 
function getinfo() {
 
    document.getElementById("charged").innerText = "0" + "جنية";
    document.getElementById("wallet").innerText = "0" + "جنية";
    console.log(id);
    var ref = firebase.database().ref().child("Pickly").child("users").child(id);
    ref.once("value").then((snap) => {
        document.getElementById("username").innerHTML = snap.child('name').val();
        userName = snap.child('name').val();
        document.getElementById("pic").src = snap.child('ppURL').val();
 
        sessionStorage.setItem("phoneNumber", JSON.stringify(snap.child("phone").val()));
        phoneNum = snap.child("phone").val();
 
 
 
 
        if (snap.child("walletmoney").val() != null) {
 
            document.getElementById("charged").innerText = snap.child("walletmoney").val() + " جنية";
        }
        if (snap.child("packMoney").val() != null) {
 
            document.getElementById("wallet").innerText = snap.child("packMoney").val() + "جنية";
        }
 
 
 
    });
 
}
 
function get_orders() {
 
    firebase.database().ref().child("Pickly").child("raya").orderByChild("uId").equalTo(id).once("value").then((snapshot) => {
 
        snapshot.forEach(snap => {
 
            arr.push(snap.child('id').val());
            arr.push(snap.val());
            arr2.push(snap.val());
 
            if (snap.child("statue").val() != "deniedback" && snap.child("statue").val() != "delivered" && snap.child("statue").val() != "deleted") {
 
                if (snap.child("statue").val() == "placed") {
                    var date = snap.child("date").val();
                    console.log(date);
                    date = String(date).charAt(8) + String(date).charAt(9) + "/" + String(date).charAt(5) + String(date).charAt(6) + "/" + String(date).charAt(0) + String(date).charAt(1) + String(date).charAt(2) + String(date).charAt(3);
                    console.log(date);
                    //arr.push(snap.child('id').val());
                    //arr.push(snap.val());
                    let h32 = document.createElement("h3");
                    if (snap.child("statue").val() == "placed") {
                        //alert("يتم مراجعه الشحنه");
                        h32.innerText = "يتم مراجعه الشحنه";
 
                    }
 
 
                    if (snap.child("statue").val() == "accepted") {
                        //alert("قيد الاستلام");
                        h32.innerText = "يقيد الاستلام";
                    }
 
                    if (snap.child("statue").val() == "recived") {
                        //alert("في انتظار تاكيد الاستلام");
                        h32.innerText = "في انتظار تاكيد الاستلام";
 
                    }
 
                    if (snap.child("statue").val() == "recived2") {
                        //alert("جاري تسليم الشحنه");
                        h32.innerText = "جاري تسليم الشحنه";
 
                    }
 
                    if (snap.child("statue").val() == "hubP" || snap.child("statue").val() == "hubD") {
                        //alert("في المخزن");
                        h32.innerText = "في المخزن";
 
                    }
                    if (snap.child("statue").val() == "supD" || snap.child("statue").val() == "readyD") {
                        // alert("قيد التسليم");
                        h32.innerText = "قيد التسليم";
                    }
 
                    if (snap.child("statue").val() == "delivered") {
                        //alert("تم التسليم و التحصيل");
                        h32.innerText = "تم التسليم و التحصيل";
                    }
 
                    if (snap.child("statue").val() == "deniedD") {
                        //alert("في مخزن المرتجعات");
                        h32.innerText = "في مخزن المرتجعات";
 
                    }
 
 
                    if (snap.child("statue").val() == "denied") {
                        //alert("مرتجع");
                        h32.innerText = "مرتجع";
                    }
 
 
                    if (snap.child("statue").val() == "اhub1Denied" || snap.child("statue").val() == "اsupDenied" || snap.child("statue").val() == "اhub2Denied" || snap.child("statue").val() == "capDenied") {
                        //alert("جاري استرجاع الشحنه");
                        h32.innerText = "جاري استرجاع الشحنه";
 
                    }
                    if (snap.child("statue").val() == "deniedback") {
                        //alert("تم استلام المرتجع");
                        h32.innerText = "تم استلام المرتجع";
                    }
 
 
                    let div0 = document.createElement("div");
                    div0.className = "card";
                    div0.id = snap.child("id").val();
                    let div1 = document.createElement("div");
                    div1.className = "card-header";
                    div0.appendChild(div1);
 
                    let p0 = document.createElement("p");
                    p0.className = "card-header-title";
                    p0.innerText = h32.innerText;
                    div1.appendChild(p0);
 
                    let div2 = document.createElement("div");
                    div2.className = "card-content";
                    div0.appendChild(div2);
 
                    let div3 = document.createElement("div");
                    div3.className = "content";
                    div2.appendChild(div3);
                    let p1 = document.createElement("p");
                    p1.className = "text-center";
                    p1.innerText = snap.child("trackid").val();
                    div3.appendChild(p1);
 
                    let p2 = document.createElement("p");
                    p2.className = "text-center";
                    p2.innerText = snap.child("txtPState").val() + " - " + snap.child("mPRegion").val() + " / " + snap.child("txtDState").val() + " - " + snap.child("mDRegion").val();
                    div3.appendChild(p2);
 
                    let p3 = document.createElement("p");
                    p3.className = "text-center";
                    p3.innerText = date;
                    div3.appendChild(p3);
 
                    let p4 = document.createElement("p");
                    p4.className = "text-center";
                    p4.innerText = "اسم المستلم : " + snap.child("dname").val();
                    div3.appendChild(p4);
                    let p5 = document.createElement("p");
                    p5.className = "text-center";
                    p5.innerText = "ثمن الشحنة : " + snap.child("gmoney").val();
                    div3.appendChild(p5);
 
                    let footer0 = document.createElement("footer");
                    footer0.className = "card-footer";
                    div0.appendChild(footer0);
 

 
                    let a1 = document.createElement("a");
                    a1.className = "card-footer-item";
                    a1.innerText = "تعديل";
                    a1.id = snap.child("id").val();
                    a1.setAttribute("onclick", "sendtoedit(this.id)");
                    footer0.appendChild(a1);
 
                    let a2 = document.createElement("a");
                    a2.className = "card-footer-item";
                    a2.innerText = "البوليصة";
                    a2.id = snap.child("id").val();
                    a2.setAttribute("onclick", "policy(this.id)");
                    footer0.appendChild(a2);
 

 
 
                    document.getElementById("container").appendChild(div0);
 
                    console.log(div0);
                } else {
                    var date = snap.child("date").val();
                    console.log(date);
                    date = String(date).charAt(8) + String(date).charAt(9) + "/" + String(date).charAt(5) + String(date).charAt(6) + "/" + String(date).charAt(0) + String(date).charAt(1) + String(date).charAt(2) + String(date).charAt(3);
                    console.log(date);
 
                    console.log(snap.val());
                    //arr.push(snap.child('id').val());
                    //arr.push(snap.val());
                    let h32 = document.createElement("h3");
                    if (snap.child("statue").val() == "placed") {
                        // alert("يتم مراجعه الشحنه");
                        h32.innerText = "يتم مراجعه الشحنه";
 
                    }
 
 
                    if (snap.child("statue").val() == "accepted") {
                        //alert("قيد الاستلام");
                        h32.innerText = "يقيد الاستلام";
                    }
 
                    if (snap.child("statue").val() == "recived") {
                        //alert("في انتظار تاكيد الاستلام");
                        h32.innerText = "في انتظار تاكيد الاستلام";
 
                    }
 
                    if (snap.child("statue").val() == "recived2") {
                        //alert("جاري تسليم الشحنه");
                        h32.innerText = "جاري تسليم الشحنه";
 
                    }
 
                    if (snap.child("statue").val() == "hubP" || snap.child("statue").val() == "hubD") {
                        //alert("في المخزن");
                        h32.innerText = "في المخزن";
 
                    }
                    if (snap.child("statue").val() == "supD" || snap.child("statue").val() == "readyD") {
                        //alert("قيد التسليم");
                        h32.innerText = "قيد التسليم";
                    }
 
                    if (snap.child("statue").val() == "delivered") {
                        //alert("تم التسليم و التحصيل");
                        h32.innerText = "تم التسليم و التحصيل";
                    }
 
                    if (snap.child("statue").val() == "deniedD") {
                        //alert("في مخزن المرتجعات");
                        h32.innerText = "في مخزن المرتجعات";
 
                    }
 
 
                    if (snap.child("statue").val() == "denied") {
                        //alert("مرتجع");
                        h32.innerText = "مرتجع";
                    }
 
 
                    if (snap.child("statue").val() == "اhub1Denied" || snap.child("statue").val() == "اsupDenied" || snap.child("statue").val() == "اhub2Denied" || snap.child("statue").val() == "capDenied") {
                        //alert("جاري استرجاع الشحنه");
                        h32.innerText = "جاري استرجاع الشحنه";
 
                    }
                    if (snap.child("statue").val() == "deniedback") {
                        //alert("تم استلام المرتجع");
                        h32.innerText = "تم استلام المرتجع";
                    }
 
                    let div0 = document.createElement("div");
                    div0.className = "card";
                    div0.id = snap.child("id").val();
                    let div1 = document.createElement("div");
                    div1.className = "card-header";
                    div0.appendChild(div1);
 
                    let p0 = document.createElement("p");
                    p0.className = "card-header-title";
                    p0.innerText = h32.innerText;
                    div1.appendChild(p0);
 
                    let div2 = document.createElement("div");
                    div2.className = "card-content";
                    div0.appendChild(div2);
 
                    let div3 = document.createElement("div");
                    div3.className = "content";
                    div2.appendChild(div3);
                    let p1 = document.createElement("p");
                    p1.className = "text-center";
                    p1.innerText = snap.child("trackid").val();
                    div3.appendChild(p1);
 
                    let p2 = document.createElement("p");
                    p2.className = "text-center";
                    p2.innerText = snap.child("txtPState").val() + " - " + snap.child("mPRegion").val() + " / " + snap.child("txtDState").val() + " - " + snap.child("mDRegion").val();
                    div3.appendChild(p2);
 
                    let p3 = document.createElement("p");
                    p3.className = "text-center";
                    p3.innerText = date;
                    div3.appendChild(p3);
 
                    let p4 = document.createElement("p");
                    p4.className = "text-center";
                    p4.innerText = "اسم المستلم : " + snap.child("dname").val();
                    div3.appendChild(p4);
                    let p5 = document.createElement("p");
                    p5.className = "text-center";
                    p5.innerText = "ثمن الشحنة : " + snap.child("dname").val();
                    div3.appendChild(p5);
 
                    let footer0 = document.createElement("footer");
                    footer0.className = "card-footer";
                    div0.appendChild(footer0);
 

 
                    /*let a1 = document.createElement("a");
                    a1.className = "card-footer-item";
                    a1.innerText = "تعديل";
                    a1.id = snap.child("id").val();
                    a1.setAttribute("onclick", "sendtoedit(this.id)");
                    footer0.appendChild(a1);*/
 
                    let a2 = document.createElement("a");
                    a2.className = "card-footer-item";
                    a2.innerText = "البوليصة";
                    a2.id = snap.child("id").val();
                    a2.setAttribute("onclick", "policy(this.id)");
                    footer0.appendChild(a2);
 

 
                    document.getElementById("container").appendChild(div0);
                    console.log(div0);
                }
 
            }
        });
        filterorders();
    });
}
 
function filterorders() {
    let requests = 0;
    let proccecing = 0;
    let deliverd = 0;
    let deniedback = 0;
    let money = 0;
    arr2.forEach(order => {
 
 
        if (order.statue == "placed" || order.statue == "accepted") {
            requests++;
        }
        if (order.statue != "delivered" && order.statue != "deleted" && order.statue != "deniedback") {
 
 
            proccecing++;
        }
        if (order.statue == "delivered") {
            deliverd++;
            money += parseInt(order.gmoney);
        }
        if (order.statue == "deniedback") {
            deniedback++;
        }
 
    });
    document.getElementById("requests").innerText = requests;
    document.getElementById("proceccing").innerText = proccecing;
    document.getElementById("deliverd").innerText = deliverd;
    document.getElementById("deniedback").innerText = deniedback;
    document.getElementById("gmoney").innerText = money;
 
}
 
function create_UUID() {
    var dt = new Date().getTime();
 
    var dt2 = dt.toString();
    console.log(dt2);
 
    var r = (dt + Math.random() * 9000) + 1000;
    var r2 = r.toString();
    console.log(r2);
 
    var plus = r2 + dt2;
    var final = "R" + plus.substring(Math.max(plus.length - 8, 0));
    console.log(final);
 
 
    return final;
}
 
function policy(lel) {
    console.log("here " + lel);
    var index = -1;
 
    document.getElementById("PDF").innerHTML = "";
    for (i = 0; i < arr.length; i++) {
        if (i % 2 != 0) {
            continue;
        }
        if (arr[i] == lel) {
            index = i + 1;
            console.log("found?");
        }
    }
 
    if (index != -1) {
 
        console.log(arr[index]);
        console.log(arr[index - 1]);
 
        let div1 = document.createElement("div");
        div1.id = "table";
 
        var trackId = arr[index].trackid;
        var qr = new QRious({
            element: document.getElementById('qr-code'),
            size: 200,
            value: 'https://s...content-available-to-author-only...t.com'
        });
 
        var qrtext = trackId;
        //alert(qrtext);
        qr.set({
            foreground: 'black',
            size: 200,
            value: qrtext
        });
        var image = new Image();
        image.src = document.getElementById('qr-code').toDataURL("image/png");
        console.log(image);
 
 
        var im = new Image();
        im.src = "Logo BW.png";
 
        let img = document.createElement("img");
        img.src = im.src;
        img.id = "Image2";
        let img2 = document.createElement("img");
        img2.src = image.src;
        img2.id = "Image";
 
        let h5 = document.createElement("h5");
        h5.innerText = "track number : " + arr[index].trackid;
        h5.id = "trackid";
 
        div1.appendChild(img);
        div1.appendChild(img2);
 
        div1.appendChild(h5);
 
        let table = document.createElement("table");
 
        let tr1 = document.createElement("tr");
 
        table.appendChild(tr1);
 
        let th1 = document.createElement("th");
        th1.innerText = "الراسل";
        tr1.appendChild(th1);
 
        let th3 = document.createElement("th");
        th3.innerText = "الشحنه";
        tr1.appendChild(th3);
 
        let th2 = document.createElement("th");
        th2.innerText = "المرسل اليه";
        tr1.appendChild(th2);
 
 
 
 
        let tr2 = document.createElement("tr");
 
        table.appendChild(tr2);
 
        let th4 = document.createElement("td");
        th4.innerText = "اسم الراسل : " + userName;
        tr2.appendChild(th4);
 
        let th6 = document.createElement("td");
        th6.innerText = "محتوى الشحنه : " + arr[index].packType;
        tr2.appendChild(th6);
 
        let th5 = document.createElement("td");
        th5.innerText = "اسم المرسل اليه : " + arr[index].dname;
        tr2.appendChild(th5);
 
 
 
 
 
 
        let tr3 = document.createElement("tr");
 
        table.appendChild(tr3);
 
        let th7 = document.createElement("td");
        th7.innerText = "منطقه الراسل : " + arr[index].mPRegion + " - " + arr[index].txtPState;
        tr3.appendChild(th7);
 
 
        let th9 = document.createElement("td");
        th9.innerText = "وزن الشحنه : " + arr[index].packWeight;
        tr3.appendChild(th9);
 
        let th8 = document.createElement("td");
        th8.innerText = "منطقه المرسل اليه : " + arr[index].mDRegion + " - " + arr[index].txtDState;
        tr3.appendChild(th8);
 
 
 
 
        let tr4 = document.createElement("tr");
 
        table.appendChild(tr4);
 
        let th10 = document.createElement("td");
        th10.innerText = "عنوان الراسل : " + arr[index].mPAddress;
        tr4.appendChild(th10);
 
 
 
        let th12 = document.createElement("td");
        th12.innerText = "سعر الشحنه : " + arr[index].gmoney;
        tr4.appendChild(th12);
 
        let th109 = document.createElement("td");
        th109.innerText = "عنوان المرسل اليه : " + arr[index].daddress;
        tr4.appendChild(th109);
        console.log(th109);
 
 
        let tr5 = document.createElement("tr");
 
        table.appendChild(tr5);
 
        let th13 = document.createElement("td");
        th13.innerText = "رقم هاتف الراسل : " + phoneNum;
        tr5.appendChild(th13);
 
 

 
        let th14 = document.createElement("td");
        th14.innerText = "رقم هاتف المرسل اليه : " + arr[index].dphone;
        tr5.appendChild(th14);
 
 
        let tr6 = document.createElement("tr");
 
        table.appendChild(tr6);
 
        let th16 = document.createElement("td");
        th16.innerText = "   ";
        tr6.appendChild(th16);
 

 
        let th18 = document.createElement("td");
        th18.innerText = "   ";
        tr6.appendChild(th18);
 
 
 
 
 
        div1.appendChild(table);
 
        document.getElementById("PDF").appendChild(div1);
        console.log(div1);
 
 
        im.onload = function() {
 
            var sTable = document.getElementById('PDF').innerHTML;
            var win = window.open('', '', 'height=700,width=700');
 
            var style = "<style>";
 
 
 
            style = style + "#table{width: 100%;font: 17px Calibri;}";
            style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;margin-left:50px;";
            style = style + "padding: 2px 3px;text-align: center;}";
            style = style + "#Image{width: 10%; margin-bottom:14px; float : right;}";
            style = style + "#Image2{width: 150px; height :50px; margin-bottom:14px; float :left;margin-right:50%;}";
 
 
 
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
            console.log("now??");
        }
 
 
 
    }
}
 
function deleteOrder(id) {
    firebase.database().ref().child("Pickly").child("raya").child(id).update({
        statue: "deleted"
    });
    firebase.database().ref().child("Pickly").child("raya").child(id).update({
        uAccepted: ""
    });
    firebase.database().ref().child("Pickly").child("raya").child(id).update({
        acceptedTime: ""
    });
    document.getElementById(id).innerHTML = "";
    let count = 0;
    arr2.forEach(snap => {
 
        if (snap.id == id) {
            snap.statue = "deleted";
 
        }
        count++;
    })
    alert("تم حذف الاوردر الخاص بك بنجاح");
    filterorders();
}
 

function importorders() {
    arr2.forEach(snap => {
        if (snap.statue != "deniedback" && snap.statue != "delivered" && snap.statue != "deleted") {
 
            if (snap.statue == "placed") {
                var date = snap.date;
                console.log(date);
                date = String(date).charAt(8) + String(date).charAt(9) + "/" + String(date).charAt(5) + String(date).charAt(6) + "/" + String(date).charAt(0) + String(date).charAt(1) + String(date).charAt(2) + String(date).charAt(3);
                console.log(date);
                //console.log(snap.val());
                //arr.push(snap.child('id').val());
                //arr.push(snap.val());
                let h32 = document.createElement("h3");
                if (snap.statue == "placed") {
                    // alert("يتم مراجعه الشحنه");
                    h32.innerText = "يتم مراجعه الشحنه";
 
                }
 
 
                if (snap.statue == "accepted") {
                    //alert("قيد الاستلام");
                    h32.innerText = "يقيد الاستلام";
                }
 
                if (snap.statue == "recived") {
                    //alert("في انتظار تاكيد الاستلام");
                    h32.innerText = "في انتظار تاكيد الاستلام";
 
                }
 
                if (snap.statue == "recived2") {
                    //alert("جاري تسليم الشحنه");
                    h32.innerText = "جاري تسليم الشحنه";
 
                }
 
                if (snap.statue == "hubP" || snap.statue == "hubD") {
                    //alert("في المخزن");
                    h32.innerText = "في المخزن";
 
                }
                if (snap.statue == "supD" || snap.statue == "readyD") {
                    //alert("قيد التسليم");
                    h32.innerText = "قيد التسليم";
                }
 
                if (snap.statue == "delivered") {
                    //alert("تم التسليم و التحصيل");
                    h32.innerText = "تم التسليم و التحصيل";
                }
 
                if (snap.statue == "deniedD") {
                    //alert("في مخزن المرتجعات");
                    h32.innerText = "في مخزن المرتجعات";
 
                }
 
 
                if (snap.statue == "denied") {
                    //alert("مرتجع");
                    h32.innerText = "مرتجع";
                }
 
 
                if (snap.statue == "اhub1Denied" || snap.statue == "اsupDenied" || snap.statue == "اhub2Denied" || snap.statue == "capDenied") {
                    //alert("جاري استرجاع الشحنه");
                    h32.innerText = "جاري استرجاع الشحنه";
 
                }
                if (snap.statue == "deniedback") {
                    //alert("تم استلام المرتجع");
                    h32.innerText = "تم استلام المرتجع";
                }
 
                let div0 = document.createElement("div");
                div0.className = "card";
                div0.id = snap.id;
                let div1 = document.createElement("div");
                div1.className = "card-header";
                div0.appendChild(div1);
 
                let p0 = document.createElement("p");
                p0.className = "card-header-title";
                p0.innerText = h32.innerText;
                div1.appendChild(p0);
 
                let div2 = document.createElement("div");
                div2.className = "card-content";
                div0.appendChild(div2);
 
                let div3 = document.createElement("div");
                div3.className = "content";
                div2.appendChild(div3);
                let p1 = document.createElement("p");
                p1.className = "text-center";
                p1.innerText = snap.trackid;
                div3.appendChild(p1);
 
                let p2 = document.createElement("p");
                p2.className = "text-center";
                p2.innerText = snap.txtPState + " - " + snap.mPRegion + " / " + snap.txtDState + " - " + snap.mDRegion;
                div3.appendChild(p2);
 
                let p3 = document.createElement("p");
                p3.className = "text-center";
                p3.innerText = date;
                div3.appendChild(p3);
 
                let p4 = document.createElement("p");
                p4.className = "text-center";
                p4.innerText = "اسم المستلم : " + snap.dname;
                div3.appendChild(p4);
                let p5 = document.createElement("p");
                p5.className = "text-center";
                p5.innerText = "ثمن الشحنة : " + snap.gmoney;
                div3.appendChild(p5);
 
                let footer0 = document.createElement("footer");
                footer0.className = "card-footer";
                div0.appendChild(footer0);
 

 
                let a1 = document.createElement("a");
                a1.className = "card-footer-item";
                a1.innerText = "تعديل";
                a1.id = snap.id;
                a1.setAttribute("onclick", "sendtoedit(this.id)");
                footer0.appendChild(a1);
 
                let a2 = document.createElement("a");
                a2.className = "card-footer-item";
                a2.innerText = "البوليصة";
                a2.id = snap.id;
                a2.setAttribute("onclick", "policy(this.id)");
                footer0.appendChild(a2);

 
                document.getElementById("container").appendChild(div0);
                console.log(div0);
            } else {
 
                var date = snap.date;
                console.log(date);
                date = String(date).charAt(8) + String(date).charAt(9) + "/" + String(date).charAt(5) + String(date).charAt(6) + "/" + String(date).charAt(0) + String(date).charAt(1) + String(date).charAt(2) + String(date).charAt(3);
                console.log(date);
                //console.log(snap.val());
                //arr.push(snap.child('id').val());
                //arr.push(snap.val());
                let h32 = document.createElement("h3");
                if (snap.statue == "placed") {
                    // alert("يتم مراجعه الشحنه");
                    h32.innerText = "يتم مراجعه الشحنه";
 
                }
 
 
                if (snap.statue == "accepted") {
                    //alert("قيد الاستلام");
                    h32.innerText = "يقيد الاستلام";
                }
 
                if (snap.statue == "recived") {
                    //alert("في انتظار تاكيد الاستلام");
                    h32.innerText = "في انتظار تاكيد الاستلام";
 
                }
 
                if (snap.statue == "recived2") {
                    //alert("جاري تسليم الشحنه");
                    h32.innerText = "جاري تسليم الشحنه";
 
                }
 
                if (snap.statue == "hubP" || snap.statue == "hubD") {
                    //alert("في المخزن");
                    h32.innerText = "في المخزن";
 
                }
                if (snap.statue == "supD" || snap.statue == "readyD") {
                    //alert("قيد التسليم");
                    h32.innerText = "قيد التسليم";
                }
 
                if (snap.statue == "delivered") {
                    //alert("تم التسليم و التحصيل");
                    h32.innerText = "تم التسليم و التحصيل";
                }
 
                if (snap.statue == "deniedD") {
                    //alert("في مخزن المرتجعات");
                    h32.innerText = "في مخزن المرتجعات";
 
                }
 
 
                if (snap.statue == "denied") {
                    //alert("مرتجع");
                    h32.innerText = "مرتجع";
                }
 
 
                if (snap.statue == "اhub1Denied" || snap.statue == "اsupDenied" || snap.statue == "اhub2Denied" || snap.statue == "capDenied") {
                    //alert("جاري استرجاع الشحنه");
                    h32.innerText = "جاري استرجاع الشحنه";
 
                }
                if (snap.statue == "deniedback") {
                    //alert("تم استلام المرتجع");
                    h32.innerText = "تم استلام المرتجع";
                }
 
                let div0 = document.createElement("div");
                div0.className = "card";
                div0.id = snap.id;
                let div1 = document.createElement("div");
                div1.className = "card-header";
                div0.appendChild(div1);
 
                let p0 = document.createElement("p");
                p0.className = "card-header-title";
                p0.innerText = h32.innerText;
                div1.appendChild(p0);
 
                let div2 = document.createElement("div");
                div2.className = "card-content";
                div0.appendChild(div2);
 
                let div3 = document.createElement("div");
                div3.className = "content";
                div2.appendChild(div3);
                let p1 = document.createElement("p");
                p1.className = "text-center";
                p1.innerText = snap.trackid;
                div3.appendChild(p1);
 
                let p2 = document.createElement("p");
                p2.className = "text-center";
                p2.innerText = snap.txtPState + " - " + snap.mPRegion + " / " + snap.txtDState + " - " + snap.mDRegion;
                div3.appendChild(p2);
 
                let p3 = document.createElement("p");
                p3.className = "text-center";
                p3.innerText = date;
                div3.appendChild(p3);
 
                let p4 = document.createElement("p");
                p4.className = "text-center";
                p4.innerText = "اسم المستلم : " + snap.dname;
                div3.appendChild(p4);
                let p5 = document.createElement("p");
                p5.className = "text-center";
                p5.innerText = "ثمن الشحنة : " + snap.gmoney;
                div3.appendChild(p5);
 
                let footer0 = document.createElement("footer");
                footer0.className = "card-footer";
                div0.appendChild(footer0);
 

 
                /*let a1 = document.createElement("a");
                a1.className = "card-footer-item";
                a1.innerText = "تعديل";
                a1.id = snap.child("id").val();
                a1.setAttribute("onclick", "sendtoedit(this.id)");
                footer0.appendChild(a1);*/
 
                let a2 = document.createElement("a");
                a2.className = "card-footer-item";
                a2.innerText = "البوليصة";
                a2.id = snap.id;
                a2.setAttribute("onclick", "policy(this.id)");
                footer0.appendChild(a2);
 
                let a3 = document.createElement("a");

 
                document.getElementById("container").appendChild(div0);
                console.log(div0);
            }
 
        }
    })
}
 
function sendtoedit(id) {
    sessionStorage.setItem("orderid", JSON.stringify(id));
    window.document.location = "editorder.html";
}