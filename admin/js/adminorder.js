var id = '';
var arr = [];


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        id = user.uid;



    } else {
        // User not logged in or has just logged out.
    }
});


function getReports() {
    var index = 0;

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
        window.alert("ÇáÑÌÇÁ ÇÏÎÇá ÇáÊæÇÑíÎ ÈÔßá ÕÍíÍ");
        return;

    }

    var ref = firebase.database().ref().child('Pickly').child('raya');
    ref.on('value', function (snapshot) {


        snapshot.forEach(function (child) {

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

            if (arr[i].statue == 'placed')
                placed++;


            if (arr[i].statue == 'accepted')
                accepted++;

            if (arr[i].statue == 'recived')
                recived++;

            if (arr[i].statue == 'recived2')
                recived2++;

            if (arr[i].statue == 'delivered')
                delivered++;

            if (arr[i].statue == 'denied') {
                denied++;
                console.log(denied);
            }

            if (arr[i].statue == 'deniedback') {
                deniedback++;
                console.log(deniedback);
            }

            if (arr[i].statue == 'deleted')
                deleted++;

            mokadm += parseInt(arr[i].gmoney);
            sha7n += parseInt(arr[i].gget);

            console.log(arr[i].gget);
            console.log(sha7n);
        }

        total = arr.length;
        console.log(parseInt(sha7n) + "   "+ mokadm + "  " + deleted + " " + deniedback + " " + denied + " " + delivered);
        console.log(recived2 + "  " + recived + " " + placed + " " + accepted + " "+ total);
		var money = sha7n*0.20;
        
		document.getElementById("shan").innerHTML=String(sha7n);
		document.getElementById("total").innerHTML=String(total);
		document.getElementById("avalibl").innerHTML=String(placed);
		document.getElementById("accpeted").innerHTML=String(accepted);
		document.getElementById("kedaltslem").innerHTML=String();
		document.getElementById("dilvered").innerHTML=String(delivered);
		document.getElementById("deleted").innerHTML=String(deleted);
		document.getElementById("back").innerHTML=String(deniedback);
		document.getElementById("mokdam").innerHTML=String(mokadm);
		document.getElementById("money").innerHTML=String(money);
		


    });


}
function logout(){
firebase.auth().signOut().then(logout =>{
	
	
	document.location.href="../login.html";
}).catch(error=>{
});
	
}