function track2() {
	var string = document.getElementById('trackid').value;
	sessionStorage.setItem("trackid", JSON.stringify(string));


	window.location.href = 'track.html';
}


function track() {
	id = document.getElementById('trackid').value;
	phone = document.getElementById('pnum').value;
	var checknum = false;
	var checkid = false;
	var found = false;
	var ref = firebase.database().ref().child('Pickly').child('raya');

	console.log(phone);
	ref.orderByChild('dphone').equalTo(phone).once('value')
		.then(function (snapshot) {


			if (snapshot.exists()) {

				
				snapshot.forEach(function (snap) {
					
					console.log(snap.val());
					if (snap.child("trackid").val() == id) {
						found = true;
						var string = document.getElementById('trackid').value;
						sessionStorage.setItem("trackid", JSON.stringify(string));
						var phone = document.getElementById('pnum').value;
						sessionStorage.setItem("phone", JSON.stringify(phone));
						window.location.href = 'track.html';
					}
					

				})
				if(!found){
					alert("الرجاء التأكد رقم الشحنه");
				}
				
			}
		else{
			alert("الرجاء التأكد من رقم الهاتف");
		}

		});


}
