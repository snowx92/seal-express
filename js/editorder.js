var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar_responsive");
        sidebarOpen = true;
    }
}
console.log("eqfew");

function closeSidebar() {
    console.log("hsasah");
    if (sidebarOpen) {
        console.log("hh");
        sidebar.classList.remove("sidebar_responsive");
        sidebarOpen = false;
    }
}

var id = "";
var ownername = "";
var pnum = "";

var orderid = "";
var ordertrackid2 = "";

function getstorage() {
    var yearselected = sessionStorage.getItem("orderid");
    orderid = JSON.parse(yearselected);

  
		
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       
      getstorage();
	  getinfo();
       
	

    } else {

        document.location.href = "index.html";

    }
});


var phoneNum = " ";
var userName = "";
const ad = [
    []
];
const arr = [];
var Qata = [
    []
];
var selectedRow = null;
var indexQ = 0;
var indexing = 0;
var locations = {};
var locationindex = 0;
var titles = {};
var titlesindex = 0;
var locinfo = {};
var locinfoindex = 0;
var kys = {};
var endoftheworld = 0;

function getinfo(){
	
	var ref = firebase.database().ref().child("Pickly").child("raya").child(orderid);
    ref.once("value").then((snap) => {
		document.getElementById("fullName").value=snap.child('dname').val();    
		document.getElementById("Pnumber").value=snap.child('dphone').val();
		
		document.getElementById("mo7fza").value=snap.child('txtDState').val()+"/"+snap.child('mDRegion').val();
		document.getElementById("adress").value=snap.child('daddress').val();
		document.getElementById("mokdm").value=snap.child('gmoney').val();
		document.getElementById("onotes").value=snap.child('packType').val();
		document.getElementById("wzn").value=snap.child('packWeight').val();
		
		document.getElementById("date").value=snap.child("pDate").val();
		document.getElementById("date2").value=snap.child("ddate").val();
	
	});
	dateDisable=document.getElementById("date2").disabled = true;
	
	
	
}

function onFormSubmit() {



    if (validate() && validate2() && validate3() && validate5() && validate6() && validate7() && validate9() && validate10() && validate11()) {





        var name = document.getElementById("fullName").value;
        var phone = document.getElementById("Pnumber").value;
        var mo7fza = getmo7fza(document.getElementById('mo7fza').value);
        var mntka = getmanteka(document.getElementById('mo7fza').value);
        var address = document.getElementById("adress").value;
        var notes = document.getElementById("onotes").value;
        var wzn = document.getElementById("wzn").value;

        var money = document.getElementById("mokdm").value;
        var date1 = document.getElementById("date").value;
        var date2 = document.getElementById("date2").value;
        



        var formData = readFormData();
        if (selectedRow == null) {
            var time = new Date();

            var format = time.getFullYear() + '.' + String(time.getMonth() + 1).padStart(2, '0') + '.' + String(time.getDate()).padStart(2, '0') + ' ' + String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0') + ':' + String(time.getSeconds()).padStart(2, '0');

            ref = firebase.database().ref().child('Pickly').child('raya').child(orderid);
         
            ref.update({
                dname: name,
                dphone: phone,
                txtDState: mo7fza,
                mDRegion: mntka,
                daddress: address,
                packType: notes,
                packWeight: wzn,
                gmoney: money,
                pDate: date1,
                ddate: date2s,
                lastedit: format
            });


            //creatpdf();
            resetForm();
            alert("تم تعديل الاوردر");
			document.location.href="home.html";





        }



    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["Pnumber"] = document.getElementById("Pnumber").value;
    formData["mo7fza"] = getmo7fza(document.getElementById('mo7fza').value);
    formData["mantka"] = getmanteka(document.getElementById('mo7fza').value);
    formData["adress"] = document.getElementById("adress").value;
    formData["onotes"] = document.getElementById("onotes").value;
    formData["wzn"] = document.getElementById("wzn").value;

    formData["mokdm"] = document.getElementById("mokdm").value;
    formData["date"] = document.getElementById("date").value;
    formData["date2"] = document.getElementById("date2").value;

    console.log("21212");



    return formData;
}
dateee=document.getElementById("date");
dateee.onchange = function(){


	dateDisable=document.getElementById("date2").disabled = false;
	document.getElementById("date2").min=document.getElementById("date").value;
};
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("Pnumber").value = "";
    document.getElementById("mo7fza").value = "";

    document.getElementById("adress").value = "";

    document.getElementById("onotes").value = "";
    document.getElementById("wzn").value = "";

    document.getElementById("mokdm").value = "";
    document.getElementById("date").value = "";
    document.getElementById("date2").value = "";

    selectedRow = null;
}

function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");

    }
    return isValid;
}

function validate2() {
    var ph = document.getElementById("Pnumber").value;
    var phn = ph.length;
    isValid = true;
    if (document.getElementById("Pnumber").value == "" || ph[0] != '0' || ph[1] != '1' || phn != 11) {
        isValid = false;
        document.getElementById("PnumberValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("PnumberValidationError").classList.contains("hide"))
            document.getElementById("PnumberValidationError").classList.add("hide");

    }
    return isValid;
}



function validate3() {
    isValid = true;
    if (document.getElementById("mo7fza").value == "") {
        isValid = false;
        document.getElementById("mo7fzaValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("mo7fzaValidationError").classList.contains("hide"))
            document.getElementById("mo7fzaValidationError").classList.add("hide");
    }
    return isValid;
}

function validate5() {

    isValid = true;
    if (document.getElementById("adress").value == "") {
        isValid = false;
        document.getElementById("adressValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("adressValidationError").classList.contains("hide"))
            document.getElementById("adressValidationError").classList.add("hide");
    }
    return isValid;
}

function validate6() {
    isValid = true;
    if (document.getElementById("onotes").value == "") {
        isValid = false;
        document.getElementById("onotesValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("onotesValidationError").classList.contains("hide"))
            document.getElementById("onotesValidationError").classList.add("hide");
    }
    return isValid;
}

function validate7() {
    isValid = true;
    if (document.getElementById("wzn").value == "") {
        isValid = false;
        document.getElementById("wznValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("wznValidationError").classList.contains("hide"))
            document.getElementById("wznValidationError").classList.add("hide");
    }
    return isValid;
}

function validate9() {
    isValid = true;
    if (document.getElementById("mokdm").value == "") {
        isValid = false;
        document.getElementById("mokdmValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("mokdmValidationError").classList.contains("hide"))
            document.getElementById("mokdmValidationError").classList.add("hide");
    }
    return isValid;
}

function validate10() {
    isValid = false;
    var da = document.getElementById("date").value;
    var today1 = new Date();
    var today2 = new Date();
    var today3 = new Date();
    var today4 = new Date();
    var today5 = new Date();
    var today6 = new Date();
    var today7 = new Date();
    var today = new Date();

    var today11 = new Date();
    var today21 = new Date();
    var today31 = new Date();
    var today41 = new Date();
    var today51 = new Date();
    var today61 = new Date();
    var today71 = new Date();
    var today001 = new Date();

    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!	
    var yyyy = today.getFullYear();
    var days = daysInMonth(mm, yyyy);
    console.log(days);

    var dd = String(today.getDate()).padStart(2, '0');
    today001 = mm + '-' + dd + '-' + yyyy;
    var dd1 = String(today.getDate() + 1).padStart(2, '0');
    var r = true;
    if (dd1 > days) {
        r = false;
        dd1 = dd1 - days;
        var z = '0';
        z += dd1;
        dd1 = z;
        var m3 = String(today.getMonth() + 2).padStart(2, '0');
        today11 = dd1 + '-' + m3 + '-' + yyyy;
    }
    if (r)
        today11 = dd1 + '-' + mm + '-' + yyyy;


    var dd2 = String(today.getDate() + 2).padStart(2, '0');
    var b = true;
    if (dd2 > days) {
        b = false;
        dd2 = dd2 - days;
        var z = '0';
        z += dd2;
        dd2 = z;
        var m3 = String(today.getMonth() + 2).padStart(2, '0');
        today21 = dd2 + '-' + m3 + '-' + yyyy;
    }
    if (b)
        today21 = dd2 + '-' + mm + '-' + yyyy;


    var dd3 = String(today.getDate() + 3).padStart(2, '0');
    var x = true;
    if (dd3 > days) {
        x = false;
        dd3 = dd3 - days;
        var z = '0';
        z += dd3;
        dd3 = z;
        var m3 = String(today.getMonth() + 2).padStart(2, '0');
        today31 = dd3 + '-' + m3 + '-' + yyyy;
    }
    if (x)
        today31 = dd3 + '-' + mm + '-' + yyyy;


    var dd4 = String(today.getDate() + 4).padStart(2, '0');
    var a = true;
    if (dd4 > days) {
        a = false;
        dd4 = dd4 - days;
        var z = '0';
        z += dd4;
        dd4 = z;
        var m3 = String(today.getMonth() + 2).padStart(2, '0');
        today41 = dd4 + '-' + m3 + '-' + yyyy;
    }
    if (a)
        today41 = dd4 + '-' + mm + '-' + yyyy;



    var dd5 = String(today.getDate() + 5).padStart(2, '0');
    var o = true;
    if (dd5 > days) {
        o = false;
        dd5 = dd5 - days;
        var z = '0';
        z += dd5;
        dd5 = z;
        var m3 = String(today.getMonth() + 2).padStart(2, '0');
        today51 = dd5 + '-' + m3 + '-' + yyyy;
    }
    if (o)
        today51 = dd5 + '-' + mm + '-' + yyyy;


    var dd6 = String(today.getDate() + 6).padStart(2, '0');
    var am = true;
    if (dd6 > days) {
        am = false;
        dd6 = dd6 - days;
        var z = '0';
        z += dd6;
        dd6 = z;
        var m3 = String(today.getMonth() + 2).padStart(2, '0');
        today61 = dd6 + '-' + m3 + '-' + yyyy;
    }
    if (am)
        today61 = dd6 + '-' + mm + '-' + yyyy;


    var dd7 = String(today.getDate() + 7).padStart(2, '0');
    var cc = true;
    if (dd7 > days) {
        cc = false;
        dd7 = dd7 - days;
        var z = '0';
        z += dd7;
        dd7 = z;
        var m3 = String(today.getMonth() + 2).padStart(2, '0');
        today71 = dd7 + '-' + m3 + '-' + yyyy;
        console.log(today71);
    }
    if (cc)
        today71 = dd7 + '-' + mm + '-' + yyyy;





    var d = String(today.getDate()).padStart(2, '0');
    var m1 = String(today.getMonth() + 1).padStart(2, '0');


    var d1 = String(today.getDate() + 1).padStart(2, '0');
    var s = true;
    if (d1 > days) {
        s = false;
        d1 = d1 - days;
        var z = '0';
        z += d1;
        d1 = z;
        var m2 = String(today.getMonth() + 2).padStart(2, '0');
        today1 = yyyy + '-' + m2 + '-' + d1;
        console.log('111');
    }
    if (s)
        today1 = yyyy + '-' + m1 + '-' + d1;;


    var d2 = String(today.getDate() + 2).padStart(2, '0');
    var u = true;
    console.log(d2 + "   " + days);
    if (d2 > days) {
        u = false;
        d2 = d2 - days;
        var z = '0';
        z += d2;
        d2 = z;
        var m2 = String(today.getMonth() + 2).padStart(2, '0');
        today2 = yyyy + '-' + m2 + '-' + d2;
    }
    if (u) {
        today2 = yyyy + '-' + m1 + '-' + d2;;
    }



    var d3 = String(today.getDate() + 3).padStart(2, '0');
    var q = true;
    if (d3 > days) {
        q = false;
        d3 = d3 - days;
        var z = '0';
        z += d3;
        d3 = z;
        var m2 = String(today.getMonth() + 2).padStart(2, '0');
        today3 = yyyy + '-' + m2 + '-' + d3;
        console.log('222');
    }
    if (q)
        today3 = yyyy + '-' + m1 + '-' + d2;;


    var d4 = String(today.getDate() + 4).padStart(2, '0');
    var k = true;
    if (d4 > days) {
        k = false;
        d4 = d4 - days;
        var z = '0';
        z += d4;
        d4 = z;
        var m2 = String(today.getMonth() + 2).padStart(2, '0');
        today4 = yyyy + '-' + m2 + '-' + d4;
    }
    if (k)
        today4 = yyyy + '-' + m1 + '-' + d4;

    var d5 = String(today.getDate() + 5).padStart(2, '0');
    var l = true;
    if (d5 > days) {
        l = false;
        d5 = d5 - days;
        var z = '0';
        z += d5;
        d5 = z;
        var m2 = String(today.getMonth() + 2).padStart(2, '0');
        today5 = yyyy + '-' + m2 + '-' + d5;

    }
    if (l)
        today5 = yyyy + '-' + m1 + '-' + d5;


    var d6 = String(today.getDate() + 6).padStart(2, '0');
    var h = true;
    if (d6 > days) {
        h = false;
        d6 = d6 - days;
        var z = '0';
        z += d6;
        d6 = z;
        var m2 = String(today.getMonth() + 2).padStart(2, '0');
        today6 = yyyy + '-' + m2 + '-' + d6;
        console.log(today6);
    }
    if (h)
        today6 = yyyy + '-' + m1 + '-' + d6;

    var d7 = String(today.getDate() + 7).padStart(1);
    var f = true;
    if (d7 > days) {
        f = false;
        d7 = d7 - days;
        var z = '0';
        z += d7;
        d7 = z;
        var m2 = String(today.getMonth() + 2).padStart(1);
        today7 = yyyy + '-' + m2 + '-' + d7;
        console.log(today7);
    }
    if (f)
        today7 = yyyy + '-' + m1 + '-' + d7;


    today = yyyy + '-' + m1 + '-' + d;


    //return;


    if (da == today) {
        da = today001;
        isValid = true;
    }
    if (da == today1) {
        da = today11;
        isValid = true;
    }
    if (da == today2) {
        da = today21;
        isValid = true;
    }

    console.log(isValid);
    console.log(da);

    if (isValid == false) {
        document.getElementById("dateValidationError").classList.remove("hide");
    } else {

        if (!document.getElementById("dateValidationError").classList.contains("hide"))
            document.getElementById("dateValidationError").classList.add("hide");
    }

da1 = da;

	
    return isValid;
}

function validate11() {
	isValid = false;
	var da = document.getElementById("date2").value;
	var today1 = new Date();
	var today2 = new Date();
	var today3 = new Date();
	var today4 = new Date();
	var today5 = new Date();
	var today6 = new Date();
	var today7 = new Date();
	var today = new Date();

	var today11 = new Date();
	var today21 = new Date();
	var today31 = new Date();
	var today41 = new Date();
	var today51 = new Date();
	var today61 = new Date();
	var today71 = new Date();
	var today001 = new Date();

	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!	
	var yyyy = today.getFullYear();
	var days = daysInMonth(mm, yyyy);
	console.log(days);

	var dd = String(today.getDate()).padStart(2, '0');
	today001 = mm + '-' + dd + '-' + yyyy;
	var dd1 = String(today.getDate() + 1).padStart(2, '0');
	var r = true;
	if (dd1 > days) {
		r = false;
		dd1 = dd1 - days;
		var z = '0';
		z += dd1;
		dd1 = z;
		var m3 = String(today.getMonth() + 2).padStart(2, '0');
		today11 = dd1 + '-' + m3 + '-' + yyyy;
	}
	if (r)
		today11 = dd1 + '-' + mm + '-' + yyyy;


	var dd2 = String(today.getDate() + 2).padStart(2, '0');
	var b = true;
	if (dd2 > days) {
		b = false;
		dd2 = dd2 - days;
		var z = '0';
		z += dd2;
		dd2 = z;
		var m3 = String(today.getMonth() + 2).padStart(2, '0');
		today21 = dd2 + '-' + m3 + '-' + yyyy;
	}
	if (b)
		today21 = dd2 + '-' + mm + '-' + yyyy;


	var dd3 = String(today.getDate() + 3).padStart(2, '0');
	var x = true;
	if (dd3 > days) {
		x = false;
		dd3 = dd3 - days;
		var z = '0';
		z += dd3;
		dd3 = z;
		var m3 = String(today.getMonth() + 2).padStart(2, '0');
		today31 = dd3 + '-' + m3 + '-' + yyyy;
	}
	if (x)
		today31 = dd3 + '-' + mm + '-' + yyyy;


	var dd4 = String(today.getDate() + 4).padStart(2, '0');
	var a = true;
	if (dd4 > days) {
		a = false;
		dd4 = dd4 - days;
		var z = '0';
		z += dd4;
		dd4 = z;
		var m3 = String(today.getMonth() + 2).padStart(2, '0');
		today41 = dd4 + '-' + m3 + '-' + yyyy;
	}
	if (a)
		today41 = dd4 + '-' + mm + '-' + yyyy;



	var dd5 = String(today.getDate() + 5).padStart(2, '0');
	var o = true;
	if (dd5 > days) {
		o = false;
		dd5 = dd5 - days;
		var z = '0';
		z += dd5;
		dd5 = z;
		var m3 = String(today.getMonth() + 2).padStart(2, '0');
		today51 = dd5 + '-' + m3 + '-' + yyyy;
	}
	if (o)
		today51 = dd5 + '-' + mm + '-' + yyyy;


	var dd6 = String(today.getDate() + 6).padStart(2, '0');
	var am = true;
	if (dd6 > days) {
		am = false;
		dd6 = dd6 - days;
		var z = '0';
		z += dd6;
		dd6 = z;
		var m3 = String(today.getMonth() + 2).padStart(2, '0');
		today61 = dd6 + '-' + m3 + '-' + yyyy;
	}
	if (am)
		today61 = dd6 + '-' + mm + '-' + yyyy;


	var dd7 = String(today.getDate() + 7).padStart(2, '0');
	var cc = true;
	if (dd7 > days) {
		cc = false;
		dd7 = dd7 - days;
		var z = '0';
		z += dd7;
		dd7 = z;
		var m3 = String(today.getMonth() + 2).padStart(2, '0');
		today71 = dd7 + '-' + m3 + '-' + yyyy;
		console.log(today71);
	}
	if (cc)
		today71 = dd7 + '-' + mm + '-' + yyyy;





	var d = String(today.getDate()).padStart(2, '0');
	var m1 = String(today.getMonth() + 1).padStart(2, '0');


	var d1 = String(today.getDate() + 1).padStart(2, '0');
	var s = true;
	if (d1 > days) {
		s = false;
		d1 = d1 - days;
		var z = '0';
		z += d1;
		d1 = z;
		var m2 = String(today.getMonth() + 2).padStart(2, '0');
		today1 = yyyy + '-' + m2 + '-' + d1;
		console.log('111');
	}
	if (s)
		today1 = yyyy + '-' + m1 + '-' + d1;;


	var d2 = String(today.getDate() + 2).padStart(2, '0');
	var u = true;
	console.log(d2 + "   " + days);
	if (d2 > days) {
		u = false;
		d2 = d2 - days;
		var z = '0';
		z += d2;
		d2 = z;
		var m2 = String(today.getMonth() + 2).padStart(2, '0');
		today2 = yyyy + '-' + m2 + '-' + d2;
	}
	if (u) {
		today2 = yyyy + '-' + m1 + '-' + d2;;
	}



	var d3 = String(today.getDate() + 3).padStart(2, '0');
	var q = true;
	if (d3 > days) {
		q = false;
		d3 = d3 - days;
		var z = '0';
		z += d3;
		d3 = z;
		var m2 = String(today.getMonth() + 2).padStart(2, '0');
		today3 = yyyy + '-' + m2 + '-' + d3;
		console.log('222');
	}
	if (q)
		today3 = yyyy + '-' + m1 + '-' + d2;;


	var d4 = String(today.getDate() + 4).padStart(2, '0');
	var k = true;
	if (d4 > days) {
		k = false;
		d4 = d4 - days;
		var z = '0';
		z += d4;
		d4 = z;
		var m2 = String(today.getMonth() + 2).padStart(2, '0');
		today4 = yyyy + '-' + m2 + '-' + d4;
	}
	if (k)
		today4 = yyyy + '-' + m1 + '-' + d4;

	var d5 = String(today.getDate() + 5).padStart(2, '0');
	var l = true;
	if (d5 > days) {
		l = false;
		d5 = d5 - days;
		var z = '0';
		z += d5;
		d5 = z;
		var m2 = String(today.getMonth() + 2).padStart(2, '0');
		today5 = yyyy + '-' + m2 + '-' + d5;

	}
	if (l)
		today5 = yyyy + '-' + m1 + '-' + d5;


	var d6 = String(today.getDate() + 6).padStart(2, '0');
	var h = true;
	if (d6 > days) {
		h = false;
		d6 = d6 - days;
		var z = '0';
		z += d6;
		d6 = z;
		var m2 = String(today.getMonth() + 2).padStart(2, '0');
		today6 = yyyy + '-' + m2 + '-' + d6;
		console.log(today6);
	}
	if (h)
		today6 = yyyy + '-' + m1 + '-' + d6;

	var d7 = String(today.getDate() + 7).padStart(1);
	var f = true;
	if (d7 > days) {
		f = false;
		d7 = d7 - days;
		var z = '0';
		z += d7;
		d7 = z;
		var m2 = String(today.getMonth() + 2).padStart(1);
		today7 = yyyy + '-' + m2 + '-' + d7;
		console.log(today7);
	}
	if (f)
		today7 = yyyy + '-' + m1 + '-' + d7;


	today = yyyy + '-' + m1 + '-' + d;


	//return;
	console.log(da);
		console.log(today001);

	if (da == today) {
		da = today001;
	
		isValid = today;
	}

	if (da == today1) {
		da = today11;
		isValid = true;
	}

	if (da == today2) {
		da = today21;
		isValid = true;
	}

	if (da == today3) {
		da = today31;
		isValid = true;
	}
	if (da == today4) {
		da = today41;
		isValid = true;
	}
	if (da == today5) {
		da = today51;
		isValid = true;
	}
	if (da == today6) {
		da = today61;
		isValid = true;
	}
	if (da == today7) {
		da = today71;
		isValid = true;
	}

	console.log(isValid);
	console.log(da);

	if (isValid == false) {
		console.log("doesnt hide");
		document.getElementById("date2ValidationError").classList.remove("hide");
	} else {
		console.log("already  hide");
		if (!document.getElementById("date2ValidationError").classList.contains("hide"))
			document.getElementById("date2ValidationError").classList.add("hide");
	}

da2 = da;
	return isValid;
}

function daysInMonth(month, year) {

    return new Date(year, month, 0).getDate();

}

function getmo7fza(mo7fza) {
    var value = '';
    for (i = 0; i < mo7fza.length; i++) {

        if (mo7fza[i] == '/') {
            break;
        }
        value += mo7fza[i]


    }



    return value;
}

function getmanteka(mo7fza) {
    var value = '';
    var f = false;
    for (i = 0; i < mo7fza.length; i++) {

        if (mo7fza[i] == '/') {
            f = true;
            continue;
        }
        if (f)
            value += mo7fza[i];
    }
    console.log(value);
    return value;

}