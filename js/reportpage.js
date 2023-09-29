var total = 0;
var id = '';
var arr = [];

var oplaced = [];
var oaccepted = [];
var orecived = [];
var orecived2 = [];
var odelivered = [];
var odenied = [];
var odeniedback = [];
var odeleted = [];
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        // User is signed in.
           id = user.uid;

    } else {

        document.location.href = "index.html";

    }
});

function getReports() {
    var index = 0;
    arr = [];
    console.log(id);
    var startdate = document.getElementById('mn').value;
    var enddate = document.getElementById('ela').value;

    var startyear = startdate[0] + startdate[1] + startdate[2] + startdate[3];
    var startmonth = startdate[5] + startdate[6];
    var startday = startdate[8] + startdate[9];

    /*if(startday[0]=='0')
    	startday = startday[1];
	
    if(startmonth[0]=='0')
    	startmonth = startmonth[1];*/

    var endyear = enddate[0] + enddate[1] + enddate[2] + enddate[3];
    var endmonth = enddate[5] + enddate[6];
    var endday = enddate[8] + enddate[9];

    /*if(endday[0]=='0')
    	endday = endday[1];
	
    if(endmonth[0]=='0')
    	endmonth = endmonth[1];*/


    var yearstart = parseInt(startyear);
    var yearend = parseInt(endyear);

    var monthstart = parseInt(startmonth);
    var monthend = parseInt(endmonth);

    var daystart = parseInt(startday);
    var dayend = parseInt(endday);

    console.log(daystart);
    console.log(monthstart);
    console.log(yearstart);

    if (yearend < yearstart || monthend < monthstart || dayend < daystart) {

        console.log('not valid date');
        window.alert("الرجاء ادخال التواريخ بشكل صحيح");
        return;

    }

    var ref = firebase.database().ref().child('Pickly').child('raya');
    ref.orderByChild('uId').equalTo(id).on('value', function(snapshot) {


        snapshot.forEach(function(child) {

            var date = child.child('date').val();
            var year = date[0] + date[1] + date[2] + date[3];
            var month = date[5] + date[6];
            var day = date[8] + date[9];

            /*if(day[0]=='0'){
				
				day = day[1];
			}
				
	
			if(month[0]=='0'){
				month = month[1];
			}*/


            var day1 = parseInt(day);
            var month1 = parseInt(month);
            var year1 = parseInt(year);


            if (year1 >= yearstart && month1 >= monthstart && day1 >= daystart) {

                //console.log(date);
                if (year1 <= yearend && month1 <= monthend && day1 <= dayend) {

                    arr[index] = child.val();
                    index++;






                }

            }



        });

        console.log(arr[0]);

        var placed = 0;
        var accepted = 0;
        var recived = 0;
        var recived2 = 0;
        var delivered = 0;
        var denied = 0;
        var deniedback = 0;
        var deleted = 0;
        var mokadm = 0;
        var sha7n = 0;
        for (i = 0; i < arr.length; i++) {

            if (arr[i].statue == 'placed') {
                oplaced[placed] = arr[i];
                placed++;
            }



            if (arr[i].statue == 'accepted') {
                oaccepted[accepted] = arr[i];
                accepted++;
            }


            if (arr[i].statue == 'recived') {
                orecived[recived] = arr[i];
                recived++;
            }


            if (arr[i].statue == 'recived2') {
                orecived2[recived2] = arr[i];
                recived2++;
            }


            if (arr[i].statue == 'delivered') {
                odelivered[delivered] = arr[i];
                delivered++;
            }


            if (arr[i].statue == 'denied') {
                odenied[denied] = arr[i];
                denied++;
                console.log(denied);
            }

            if (arr[i].statue == 'deniedback') {

                odeniedback[deniedback] = arr[i];
                deniedback++;

                console.log(deniedback);
            }

            if (arr[i].statue == 'deleted') {
                odeleted[deleted] = arr[i];
                deleted++;
            }


            mokadm += parseInt(arr[i].gmoney);
            sha7n += parseInt(arr[i].gget);


        }
        total = arr.length;

        document.getElementById("shan").innerHTML = String(sha7n);
        document.getElementById("mokdam").innerHTML = String(mokadm);
        document.getElementById("deleted").innerHTML = String(deleted);
        document.getElementById("mortg3").innerHTML = String(deniedback);
        document.getElementById("moslma").innerHTML = String(delivered);
        document.getElementById("t7ttsleem").innerHTML = String(recived + recived2 + denied);
        document.getElementById("accpeted").innerHTML = String(accepted);
        document.getElementById("total").innerHTML = String(total);



        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];
        for (i = 0; i < oaccepted.length; i++) {

            var newRow = table.insertRow(table.length);

            cell1 = newRow.insertCell(0);
            cell1.innerHTML = oaccepted[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = oaccepted[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = oaccepted[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = oaccepted[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = oaccepted[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = oaccepted[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = oaccepted[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = oaccepted[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = oaccepted[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = oaccepted[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = oaccepted[i].mPRegion + '/' + oaccepted[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = oaccepted[i].txtDState + '/' + oaccepted[i].mDRegion;

        }

        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];


        for (i = 0; i < oplaced.length; i++) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = oplaced[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = oplaced[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = oplaced[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = oplaced[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = oplaced[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = oplaced[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = oplaced[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = oplaced[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = oplaced[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = oplaced[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = oplaced[i].mPRegion + '/' + oplaced[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = oplaced[i].txtDState + '/' + oplaced[i].mDRegion;

        }

        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];

        for (i = 0; i < orecived.length; i++) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = orecived[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = orecived[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = orecived[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = orecived[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = orecived[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = orecived[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = orecived[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = orecived[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = orecived[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = orecived[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = orecived[i].mPRegion + '/' + orecived[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = orecived[i].txtDState + '/' + orecived[i].mDRegion;

        }



        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];

        for (i = 0; i < odelivered.length; i++) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = odelivered[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = odelivered[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = odelivered[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = odelivered[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = odelivered[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = odelivered[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = odelivered[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = odelivered[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = odelivered[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = odelivered[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = odelivered[i].mPRegion + '/' + odelivered[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = odelivered[i].txtDState + '/' + odelivered[i].mDRegion;

        }


        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];

        for (i = 0; i < odenied.length; i++) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = odenied[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = odenied[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = odenied[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = odenied[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = odenied[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = odenied[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = odenied[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = odenied[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = odenied[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = odenied[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = odenied[i].mPRegion + '/' + odenied[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = odenied[i].txtDState + '/' + odenied[i].mDRegion;

        }


        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];

        for (i = 0; i < odeleted.length; i++) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = odeleted[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = odeleted[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = odeleted[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = odeleted[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = odeleted[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = odeleted[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = odeleted[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = odeleted[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = odeleted[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = odeleted[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = odeleted[i].mPRegion + '/' + odeleted[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = odeleted[i].txtDState + '/' + odeleted[i].mDRegion;

        }


        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];

        for (i = 0; i < odeniedback.length; i++) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = odeniedback[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = odeniedback[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = odeniedback[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = odeniedback[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = odeniedback[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = odeniedback[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = odeniedback[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = odeniedback[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = odeniedback[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = odeniedback[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = odeniedback[i].mPRegion + '/' + odeniedback[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = odeniedback[i].txtDState + '/' + odeniedback[i].mDRegion;

        }

        var table = document.getElementById("employeeList2").getElementsByTagName('tbody')[0];

        for (i = 0; i < orecived2.length; i++) {
            var newRow = table.insertRow(table.length);
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = orecived2[i].statue;

            cell2 = newRow.insertCell(1);
            cell2.innerHTML = orecived2[i].date;

            cell3 = newRow.insertCell(2);
            cell3.innerHTML = orecived2[i].dname;

            cell4 = newRow.insertCell(3);
            cell4.innerHTML = orecived2[i].dphone;

            cell5 = newRow.insertCell(4);
            cell5.innerHTML = orecived2[i].pDate;

            cell6 = newRow.insertCell(5);
            cell6.innerHTML = orecived2[i].ddate;

            cell7 = newRow.insertCell(6);
            cell7.innerHTML = orecived2[i].gmoney;

            cell8 = newRow.insertCell(7);
            cell8.innerHTML = orecived2[i].gget;

            cell9 = newRow.insertCell(8);
            cell9.innerHTML = orecived2[i].notes;

            cell10 = newRow.insertCell(9);
            cell10.innerHTML = orecived2[i].mPAddress;

            cell11 = newRow.insertCell(10);
            cell11.innerHTML = orecived2[i].mPRegion + '/' + orecived2[i].txtPState;

            cell12 = newRow.insertCell(11);
            cell12.innerHTML = orecived2[i].txtDState + '/' + orecived2[i].mDRegion;

        }


    });


}