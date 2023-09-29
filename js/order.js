window.onbeforeunload = function(e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
};

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        // User is signed in.

    } else {

       // document.location.href = "index.html";

    }
});









var phoneNum = " ";
var userName = "";
var company="";
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


var userphone = "";
var yearselected = sessionStorage.getItem("phoneNumber");
userphone = JSON.parse(yearselected);
//console.log(userphone);

function onFormSubmit() {

    if (document.getElementById("adress2").value == "") {
        alert("قم باختيارك عنوانك لاضافة الاوردر من الاعلي")
        return
    }

    if (validate() && validate2() && validate3() && validate5() && validate6() && validate7()) {

        var formData = readFormData();
        if (selectedRow == null) {

          
            Qata[indexQ] = formData;
            console.log(Qata[indexQ]);


            indexQ++;
           // console.log(indexQ);
            document.getElementById('counter').innerHTML = indexQ;

            insertNewRecord(formData);
        } else
     
            updateRecord(formData);
        resetForm();
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


    formData["mokdm"] = document.getElementById("mokdm").value;

    formData["adress2"] = document.getElementById("adress2").value;
    //console.log("21212");



    return formData;
}




function insertNewRecord(data) {




    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Pnumber;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.mo7fza + "-" + data.mantka;

    cell5 = newRow.insertCell(3);
    cell5.innerHTML = data.adress;

    cell6 = newRow.insertCell(4);
    cell6.innerHTML = data.mokdm;
    cell7 = newRow.insertCell(5);
    cell7.innerHTML = data.onotes;



    cell12 = newRow.insertCell(6);
    cell12.innerHTML = `<a onClick="onEdit(this)"><i class ="fas fa-edit btnedit"></i></a>
                       <a onClick="onDelete(this)"><i class ="fas fa-trash-alt btndelete"></i></a>`;


}


function insertNewRecord2(data) {




    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Pnumber;
    cell3 = newRow.insertCell(2);
  cell3.innerHTML = '<input type="text" name="mo7fza" class="form-control" id="mo7fza" list="datalist1">'

    cell5 = newRow.insertCell(3);
    cell5.innerHTML = data.adress;

    cell6 = newRow.insertCell(4);
    cell6.innerHTML = data.mokdm;
    cell7 = newRow.insertCell(5);
    cell7.innerHTML = data.onotes;

  

    cell11 = newRow.insertCell(6);
    cell11.innerHTML = `<a onClick="onEdit(this)"><i class ="fas fa-edit btnedit"></i></a>
                       <a onClick="onDelete(this)"><i class ="fas fa-trash-alt btndelete"></i></a>`;




}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("Pnumber").value = "";
    document.getElementById("mo7fza").value = "";

    document.getElementById("adress").value = "";
    document.getElementById("onotes").value = "";


    document.getElementById("mokdm").value = "";
  
    //document.getElementById("adress2").value = "";
    selectedRow = null;
}



function onEdit(td) {
    //getData();	

    selectedRow = td.parentElement.parentElement;
   // console.log(selectedRow.rowIndex);
    var mo7fzaa = selectedRow.cells[2].innerHTML + '/' + selectedRow.cells[3].innerHTML;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Pnumber").value = selectedRow.cells[1].innerHTML;
    var table = document.getElementById("employeeList");
    var z = table.rows[selectedRow.rowIndex].cells[2].innerHTML;
    console.log(z);
    var x = table.rows[selectedRow.rowIndex].cells[2].childNodes[0].value;
    console.log(x);
    if (x == undefined)
        document.getElementById("mo7fza").value = z;
    else
        document.getElementById("mo7fza").value = x;

    document.getElementById("adress").value = selectedRow.cells[3].innerHTML;
    document.getElementById("mokdm").value = selectedRow.cells[4].innerHTML;
    document.getElementById("onotes").value = selectedRow.cells[5].innerHTML;


}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.Pnumber;
    selectedRow.cells[2].innerHTML = formData.mo7fza + formData.mantka;
    //console.log(selectedRow.cells[2].innerHTML);


    selectedRow.cells[3].innerHTML = formData.adress;
    selectedRow.cells[4].innerHTML = formData.mokdm;
    selectedRow.cells[5].innerHTML = formData.onotes;






    Qata[selectedRow.rowIndex - 1] = formData;
    console.log(Qata);
}


function onDelete(td) {
    if (confirm('هل انت متأكد انك تريد مسح ؟ ')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);

        resetForm();
        Qata.splice(row.rowIndex - 1, 1).concat(Qata.slice(row.rowIndex - 1, Qata.length));
      //  console.log(Qata);
        indexQ -= 1;
        document.getElementById('counter').innerHTML = indexQ;

    }
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








function create_UUID() {
    var dt = new Date().getTime();

    var dt2 = dt.toString();
    //console.log(dt2);

    var r = (dt + Math.random() * 9000) + 1000;
    var r2 = r.toString();
    //console.log(r2);

    var plus = r2 + dt2;
    var final = "R" + plus.substring(Math.max(plus.length - 8, 0));
    //console.log(final);


    return final;
}





/// loction
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User logged in already or has just logged


      //  console.log(create_UUID());





        var ref = firebase.database().ref().child("Pickly").child("users").child(firebase.auth().currentUser.uid);
        ref.on("value", function(snap) {

            document.getElementById("username").innerHTML = snap.child("name").val();
            userName = snap.child("name").val();
   			company = snap.child("compName").val();
			console.log(company);
            phoneNum = snap.child("phone").val();
			 if( company==""){
				 company=snap.child("name").val();
			 }
				console.log(company);

        });



        var id = user.uid;





        var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('locations');
        ref.on('value', gotdata, errdata);

        function gotdata(data) {
            //console.log(data.val())
            var title = data.val();
            var keys = Object.keys(title);


            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var titlee = title[k].title;
                arr[i] = titlee;
            }


            var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('locations');
            ref.on('value', gotdata, errdata);

            function gotdata(data) {
                //console.log(data.val())
                var title = data.val();
                var keys = Object.keys(title);

                for (var i = 0; i < keys.length; i++) {
                    var k = keys[i];
                    var titlee = title[k].title;
                    arr[i] = titlee;
                    //console.log(titlee);
                    titles[titlesindex] = titlee;

                    titlesindex++;

                    locations[locationindex] = k;

                    locationindex++;


                }



                var val
                var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('locations');

                ref.once("value", function(snapshot) {

                    snapshot.forEach(function(child) {

                        locinfo[locinfoindex] = child.val();
        //                console.log(locinfo[locinfoindex]);
                        locinfoindex++;



                    });
                });


            }




            var select = document.getElementById("adress2");








            for (var i = 0; i < arr.length; i++) {
                if (i == 0) {
                    document.getElementById('addresid').innerHTML = locinfo[i].address;
                }
                var option = document.createElement("OPTION"),
                    txt = document.createTextNode(arr[i]);
                option.appendChild(txt);
                select.insertBefore(option, select.lastChild);

            }
        }

        function errdata(data) {
          //  console.log('erorr');
        }
    } else {
        // User not logged in or has just logged out.
    }
});




$('#input-excel').change(function(e) {

    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = function(e) {

        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, {
            type: 'array'
        });

        var htmlstr = XLSX.write(wb, {
            type: 'string',
            bookType: 'html'
        });

        //$('#employeeList')[0].innerHTML+=htmlstr;
        //console.log(htmlstr);
        //console.log(htmlstr[83] + htmlstr[84]);
        var table = '';
        var rrows = {};
        var f = false;
        var indexload = 0;
        for (i = 0; i < htmlstr.length; i++) {
            // console.log("here");
            if (!f && htmlstr[i] == '<' && htmlstr[i + 1] == 't' && htmlstr[i + 2] == 'a' && htmlstr[i + 3] == 'b' && htmlstr[i + 4] == 'l' && htmlstr[i + 5] == 'e' && htmlstr[i + 6] == '>') {
                f = true;
            }


            if (htmlstr[i] == '<' && htmlstr[i + 1] == '/' && htmlstr[i + 2] == 't' && htmlstr[i + 3] == 'a' && htmlstr[i + 4] == 'b' && htmlstr[i + 5] == 'l' && htmlstr[i + 6] == 'e' && htmlstr[i + 7] == '>') {
                table += '</table>'
                break;
            }

            if (f) {

                table += htmlstr[i];
            }

        }

        for (i = 7; i < table.length; i++) {
            //console.log("here");
            if (table[i] = '<' && table[i + 1] == '/' && table[i + 2] == 't' && table[i + 3] == 'r' && table[i + 4] == '>') {
                rrows[indexload] += '</tr>';
                //console.log(rows[index]);
                i += 5;
                indexload++;

            }
            rrows[indexload] += table[i];

        }
        splitRow(rrows, indexload);


        //console.log(words);

        rrows = {};
        indexload = 0;
        table = '';
        f = false;

    }

});

function splitRow(rowsss, indexsplit) {
    //console.log(rowsss.length);
    var f = false;
    var words = {};
    var count = 0;
    for (i = 0; i < indexsplit; i++) {
        // console.log("here");
        for (j = 16; j < rowsss[i].length; j++) {
            //console.log("here");
            if (rowsss[i][j] == '>') {
                f = true;
                continue;
            }

            if (rowsss[i][j] == '<') {
                f = false;
            }
            if (f) {
                words[count] += rowsss[i][j];
                if (rowsss[i][j + 1] == '<') {
                    j += 5;
                    words[count] += '*';
                    f = false;
                }

            }

        }
        f = false;
        count++;

    }
    rowsss = {};
    indexsplit = 0;

    for (i = 1; i < count; i++) {
        if (words[i] == undefined)
            continue;
        words[i] = words[i].substring(9);
    }

    for (var i = 1; i < count; i++) {
        if (words[i] == undefined)
            continue;
        finalsplit(words[i], count);
    }




}

function finalsplit(words, count) {
    var reew = {};
    var indexfinal = 0;
    //console.log(words);
    for (j = 0; j < words.length; j++) {
        //console.log("here");
        if (words[j] == '*') {
            indexfinal++;
            //console.log(raw[index]);
            continue;
        }

        reew[indexfinal] += words[j];


    }
    //console.log(raw);
    for (var i = 0; i < indexfinal; i++) {
        //console.log("here");
        reew[i] = reew[i].substring(9);

        //console.log(raw[i]);
    }

    //console.log('vali');
    validation(reew, indexfinal);

}





function validation(row, indexvali) {




    //console.log(days);
    //console.log('jefewf');

    if (indexvali != 8) {
      //  console.log(row);

    }

    if (row[0].length <= 0) {
        row[0] = '';
    }

    if (row[1].length != 10 || !parseInt(row[1])) {
        row[1] = '';
    }
    //return;

    if (row[1][0] != '1') {
        row[1] = '';
    }




    /*var pornplayer = row[2]+'/'+row[3];
    var f =false;
    //console.log(pornplayer);
	
	
    for(i = 0;i<gov.length	;i++){
    	
    	if(pornplayer==gov[i]){
    		console.log(gov[i]+"    " + pornplayer);
    		f = true;
    	}
    		
    }
    if(!f){
    	console.log("المنطقه او المحافظه");
    	return;
    }
    */




    /*
    var ff = false;
    console.log(row[11]);
    for(i = 0;i<titlesindex;i++){
    	console.log(arr[i]);
    	if(arr[i]==row[11]){
    		ff = true;
    	}	
    }
	
    if(!ff){
    	console.log("العنوان");
    	return;
    }*/

    //console.log(row[6]+ "   "+row[7]+row[6]+ " "+row[8])
    //console.log(parseInt(row[6]));

    if (!parseInt(row[5]) || row[5] >= 10) {
        row[5] = '';
    }
    if (!parseInt(row[3])) {
        //console.log("الارقام");
        row[3] = '';
    }
    //console.log(row[4] ,row[5]);

   

    /*var found = false;
    var addressfrom =0; 
	
    console.log('ljqff');
    for(i = 0;i<locinfo.length;i++){
    	if(locinfo[i]==row[11]){
    		found = true;
    		addressfrom = i;
    	}
    		
    }*/


    //row[8]='';//parseInt(calculateMony(locinfo[addressfrom].state,row[3],row[6],row[7]));

    addingtoRow(row);


}




function addingtoRow(row) {
   // console.log('what');
    var formData = {};

    formData["fullName"] = row[0];
    formData["Pnumber"] = row[1];
    formData["mo7fza"] = "";
    formData["mantka"] = "";
    formData["adress"] = row[2];
    formData["onotes"] = row[4];


    formData["mokdm"] = row[3];

    //formData["adress2"] = row[11];


    insertNewRecord2(formData);

    Qata[indexQ] = formData;
    console.log(Qata[indexQ]);
    indexQ++;
   console.log(indexQ);
    document.getElementById('counter').innerHTML = indexQ;




}

function getmo7fza(mo7fza) {
    var value = '';
    for (i = 0; i < mo7fza.length; i++) {

        if (mo7fza[i] == ',') {
            break;
        }
        value += mo7fza[i]


    }


console.log(value);
    return value;
}

function getmanteka(mo7fza) {
    var value = '';
    var f = false;
    for (i = 0; i < mo7fza.length; i++) {

        if (mo7fza[i] == ',') {
            f = true;
            continue;
        }
        if (f)
            value += mo7fza[i];
    }
    console.log(value);
    return value;

}

function getValid(rows) {
    var table = document.getElementById("employeeList");
    var ind = 1;
    var red = true;
    for (var i = 1; i < table.rows.length; i++) {

        var name = table.rows[i].cells.item(0).innerHTML;
        console.log(name);
        var phone = table.rows[i].cells.item(1).innerHTML;
        console.log(phone);
        var adres = table.rows[i].cells[2].childNodes[0].value;
        console.log(adres);
        var mokdm = table.rows[i].cells.item(3).innerHTML;
        console.log(mokdm);
        var notes = table.rows[i].cells.item(4).innerHTML;
        console.log(notes);
      
      
        if (name == '') {
            red = false;
            //console.log(name);
        } else if (phone == '') {
            red = false;
          //  console.log(phone);
            //ind = i;
            //break;
        } else if (adres == '') {
            red = false;
            //console.log(adres);
            //console.log(red);
            //ind = i;
            //break;
        } else if (mokdm == '') {
           // console.log(mokdm);
            //console.log(red);
            red = false;
            //ind = i;
            //break;
        } else if (notes == '') {
            red = false;
           // console.log(notes);
            //ind = i;
            //break;
            //console.log(red);
        } 
        if (red == false) {
            //console.log("da5l al lopp");
            //console.log(table.rows[i]);
            table.rows[i].style.border = "2px solid red";
        }

        if (red == true) {
            ind++;
            //console.log("da5l al lopp true");
            table.rows[i].style.borderBottom = "1px solid #dddddd";
            table.rows[i].style.borderRight = "1px solid #dddddd";
            table.rows[i].style.borderTop = "1px solid #dddddd";
            table.rows[i].style.borderLeft = "1px solid #dddddd";

        }

        red = true;
       // console.log(red);
    }

    if (ind == table.rows.length) {


       // console.log('yeah babe');

        document.getElementById("btn3").disabled = false;
        document.getElementById("btn1").disabled = true;
        document.getElementById("exl").className = "fas fa-lock-open";

        document.getElementById("exlll").className = "fas fa-lock";

        document.getElementById("add").style.display = "inline-block";
        alert("تم التأكد من اوردراتك");
    }
	getselectedaddress();



}


console.log(Qata[0]);
console.log(Qata[1]);

document.getElementById('add').onclick = function() {

    var uidd;


    firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User logged in already or has just logged in.
                uidd = user.uid;
            } else {
                // User not logged in or has just logged out.
            }

            indexQ = 0;
         //   console.log(uidd);
            var ids = {};
            var idsindex = 0;
            var userphone = "";
            var yearselected = sessionStorage.getItem("phoneNumber");
            userphone = JSON.parse(yearselected);
            document.getElementById("PDF").innerHTML = " ";
            let x = document.getElementById("PDF");
            for (i = 0; i < Qata.length; i++) {

                let div1 = document.createElement("div");
                div1.id = "table" + String(i);

                ref = firebase.database().ref().child('Pickly').child('raya').push();
                kys[endoftheworld] = ref.key;
           //     console.log(kys[endoftheworld]);
                endoftheworld++;
                var index = 0;
                for (j = 0; j < titlesindex; j++) {
                    //console.log("second");
                    if (Qata[i].adress2 == titles[j]) {
                        index = j;

                    }
                }

                var trackId = create_UUID();
                var qr = new QRious({
                    element: document.getElementById('qr-code'),
                    size: 200,
                    value: 'https://studytonight.com'
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
             //   console.log(image);


                var im = new Image();
                im.src = "Logo BW.png";

                let img = document.createElement("img");
                img.src = im.src;
                img.id = "Image2" + String(i);
                let img2 = document.createElement("img");
                img2.src = image.src;
                img2.id = "Image" + String(i);

                let h51 = document.createElement("h5");
                h51.innerText = "track number : " + trackId;
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
                th6.innerText = "محتوى الشحنه : " + Qata[i].onotes;
                tr2.appendChild(th6);

                let th5 = document.createElement("td");
                th5.innerText = "اسم المرسل اليه : " + Qata[i].fullName;
                tr2.appendChild(th5);






                let tr3 = document.createElement("tr");

                table.appendChild(tr3);

                let th7 = document.createElement("td");
                th7.innerText = "منطقه الراسل : " + locinfo[index].region + " - " + locinfo[index].state;
                tr3.appendChild(th7);

             

                let th8 = document.createElement("td");
                th8.innerText = "منطقه المرسل اليه" + Qata[i].mo7fza + " - " + Qata[i].mantka;
                tr3.appendChild(th8);




                let tr4 = document.createElement("tr");

                table.appendChild(tr4);

                let th10 = document.createElement("td");
                th10.innerText = "عنوان الراسل : " + locinfo[index].address;
                tr4.appendChild(th10);

                let th12 = document.createElement("td");
                th12.innerText = "سعر الشحنه : " + Qata[i].mokdm;
                tr4.appendChild(th12);

                let th109 = document.createElement("td");
                th109.innerText = "عنوان المرسل اليه : " + Qata[i].adress;
                tr4.appendChild(th109);
               // console.log(th109);





                let tr5 = document.createElement("tr");

                table.appendChild(tr5);

                let th13 = document.createElement("td");
                th13.innerText = "رقم هاتف الراسل : " + phoneNum;
                tr5.appendChild(th13);


                let th14 = document.createElement("td");
                th14.innerText = "رقم هاتف المرسل اليه : " + Qata[i].Pnumber;
                tr5.appendChild(th14);


                let tr6 = document.createElement("tr");

                table.appendChild(tr6);

                let th131 = document.createElement("td");
                th131.innerText = " ";
                tr6.appendChild(th131);



                let th141 = document.createElement("td");
                th141.innerText = " ";
                tr6.appendChild(th141);



                div1.appendChild(table);
                x.appendChild(div1);
                //console.log(x);


               // console.log(Qata[i]);
                var time = new Date();
                console.log(ref.key);
                var format = time.getFullYear() + '.' + String(time.getMonth() + 1).padStart(2, '0') + '.' + String(time.getDate()).padStart(2, '0') + ' ' + String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0') + ':' + String(time.getSeconds()).padStart(2, '0');
               // console.log(format);
                var uName = document.getElementById("username").innerHTML;

                console.log(Qata[i].mantka);
				   console.log(Qata[i].mo7fza);

                ref.set({
                    uId: uidd,
                    id: ref.key,
                    dname: Qata[i].fullName,
                    dphone: String(Qata[i].Pnumber),
                    txtDState: Qata[i].mo7fza,
                    mDRegion: Qata[i].mantka,
                    daddress: Qata[i].adress,
                    packType: Qata[i].onotes,
                    packWeight:"1",
                    gget: "0",
                    gmoney: String(Qata[i].mokdm),
                    pDate: "",
                    ddate: "",
                    mPAddress: locinfo[index].address,
                    lat: String(locinfo[index].lattude),
                    _long: String(locinfo[index].lontude),
                    mPRegion: locinfo[index].state,
                    txtPState: locinfo[index].region,
                    platform: 'web',
                    date: format,
                    type: "Bid",
                    mPShop: "",
                    isTrans: "",
                    isMetro: "",
                    isMotor: "",
                    isCar: "",
                    statue: "placed",
                    uAccepted: "",
                    srated: "false",
                    srateid: "",
                    drated: "false",
                    drateid: "",
                    acceptedTime: "",
                    dilverTime: "",
                    notes: "",
					tries:"0",
					owner: company,
                    priority: "1",
                    provider: "Raya",
                   
                    trackid: trackId,
                    lastedit: format


                });

                refff = firebase.database().ref().child('Pickly').child('users').child(firebase.auth().currentUser.uid).child("clients").child(String(Qata[i].Pnumber));

                refff.set({
                    clientPhone: String(Qata[i].Pnumber),
                    clientName: Qata[i].fullName,
                    clientCity: Qata[i].mantka,
                    clientGov: Qata[i].mo7fza,
                    clientAddress: Qata[i].adress

                });


                document.getElementById('add').style.display = "none";


            }


            im.onload = function() {

                var sTable = document.getElementById('PDF').innerHTML;
                var win = window.open('', '', 'height=700,width=700');

                var style = "<style>";

               // console.log(Qata.length);
                for (k = 0; k < Qata.length; k++) {
                   // console.log(k);
                    if (k + 1 == Qata.length) {
                        style = style + "#table" + String(k) + "{width: 100%;font: 17px Calibri;}";
                        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;margin-left:50px;";
                        style = style + "padding: 2px 3px;text-align: center;}";
                        style = style + "#Image" + String(k) + "{width: 10%; margin-bottom:14px; float : right;}";
                        style = style + "#Image2" + String(k) + "{width: 150px; height :50px; margin-bottom:14px; float :left;margin-right:50%;}";
                        break;
                    }
                    style = style + "#table" + String(k) + "{width: 100%;font: 17px Calibri;margin-bottom:1000px;margin-left:50px;}";
                    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
                    style = style + "padding: 2px 3px;text-align: center;}";
                    style = style + "#Image" + String(k) + "{width: 10%; margin-bottom:14px; float : right; }";
                    style = style + "#Image2" + String(k) + "{width: 150px; height :50px; margin-bottom:14px; float : left; margin-right:50%;}";
                    //console.log(style);
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







            alert("تم اضافة اوردراتك");

          //  console.log(locationindex);
          //  console.log(titlesindex);

            //Putlocation();

            indexQ = 0;

            document.getElementById('counter').innerHTML = 0;
            var table = document.getElementById("employeeList");
            for (i = 1; i <= table.rows.length; i++) {
                table.deleteRow(1);
                //sQata.splice(i, 1).concat(Qata.slice(i, Qata.length));
            }

            document.getElementById("btn3").disabled = false;

            document.getElementById("btn1").disabled = false;


            document.getElementById("exl").className = "fas fa-lock-open";

            document.getElementById("exlll").className = "fas fa-lock-open";


        }


    )
};

function getselectedaddress() {
	    var table = document.getElementById("employeeList");

    for (var i = 1; i < table.rows.length; i++) {
	var importmo7fza = getmo7fza(table.rows[i].cells[2].childNodes[0].value);
	var importmantka = getmanteka(table.rows[i].cells[2].childNodes[0].value);
		console.log(importmo7fza);
		console.log(importmantka);
	
		Qata[i-1].mantka=importmantka;
		Qata[i-1].mo7fza=importmo7fza;
			console.log(Qata[i-1]);
	}
}

window.onload = function() {
    var eSelect = document.getElementById('mm');
    //var optOtherReason = document.getElementById('otherdetail');
    eSelect.onchange = function() {
        var value = document.getElementById('adress2').value;
        console.log(value);

        for (i = 0; i < locinfoindex; i++) {
            if (locinfo[i].title == value) {
                document.getElementById("addresid").innerHTML = locinfo[i].address;
                break;
            }
        }


    }
}



function clearAll() {
    //inde

   // console.log(indexQ);
    var table = document.getElementById("employeeList");
    for (i = 1; i <= table.rows.length; i++) {
        table.deleteRow(1);
        Qata.splice(i, 1).concat(Qata.slice(i, Qata.length));
    }
    Qata = [
        []
    ];
    indexQ = 0
    document.getElementById('counter').innerHTML = indexQ;
    console.log(Qata.length);
    console.log(Qata);


}

