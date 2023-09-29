

function signup() {


	
	
	
	
	
	  var phone = document.getElementById('phone').value;
    firebase.database().ref().child('Pickly').child('users').orderByChild('phone').equalTo(phone).once('value').then((snap) => {

        if (snap.exists()) {

            alert("تم استخدام رقم الهاتف من قبل");


        } 
		else {
			    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }


    today = yyyy + '-' + mm + '-' + dd;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    var phone = document.getElementById('phone').value;
    var code = document.getElementById('code').value;
		var cname = document.getElementById('company').value; 
	


        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(response) {
            console.log("sucess");
            console.log(response);

            ref = firebase.database().ref().child("Pickly").child('users').child(firebase.auth().currentUser.uid);

            ref.update({
                name: firstname + " " + lastname,
                phone: phone,
                email: email,
                date: today,
				compName:cname,
                id: firebase.auth().currentUser.uid,
                accountType: "Supplier",
                ppURL: "https://firebasestorage.googleapis.com/v0/b/shipply-fc7a0.appspot.com/o/Main%2FSup.jpg?alt=media&token=14b10726-8aec-487a-beb8-47745486a0b5",
                refer: code,
                ssnURL: "",
                mpass: password,
                canceled: "0",
                ssnNum: "",
                device: "",
                app_version: "",
                unique_id: "",
                active: "true",
                device_token: "",
                userState: "",
                userCity: "",
                ordersType: "all",
                currentDate: "none",
                sendOrderNoti: "false",
                sendOrderNotiCity: "false",
                walletmoney: 0,
                isConfirmed: "true",
                provider: "Raya",
                mySuper: "",
                mySuperId: "",
                supervisor_code: "",
                packMoney: "0",
                transType: "Motor",
                trackId: "",
                completed: "true",
                profit: "0",
            });


            window.alert("تم انشاء حسابك بنجاح الرجاء قم بتسجيل الدخول");
			window.location="../home.html";


        })

    .catch(function(error) {
        var errorcode = error.code;
        var errorMessage = error.message;
        console.log(errorcode);
        console.log(errorMessage);
    });

    sessionStorage.setItem("firstname", JSON.stringify(firstname));
    sessionStorage.setItem("lastname", JSON.stringify(lastname));
    sessionStorage.setItem("email", JSON.stringify(email));
    sessionStorage.setItem("password", JSON.stringify(password));
    sessionStorage.setItem("phone", JSON.stringify(phone));
    sessionStorage.setItem("code", JSON.stringify(code));
    sessionStorage.setItem("today", JSON.stringify(today));





            }
		
	
     

	}).catch(function(error) {
                alert(error.message);
            });
	}
/*window.onload = function() {
    render();
};







function render() {
    window.recaptchaVerifier = new
    firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}

function phoneAuth() {


  
    //get the number

}

function comfrim() {



    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    var phone = document.getElementById('phone').value;
    var code = document.getElementById('code').value;






}


function codeverify() {
    var code = document.getElementById('verificationCode').value;
    coderesult.confirm(code).then(function(result) {
        alert("Successfully registered");
        var user = result.user;
        console.log(user);

        comfrim();



    }).catch(function(error) {
        alert(error.message);
    });
}*/