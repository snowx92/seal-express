var email = '';

(function($) {
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }



    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


})(jQuery);
"use strict";


/*==================================================================
[ Focus Contact2 ]*/
$('.input100').each(function() {
    $(this).on('blur', function() {
        if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
        } else {
            $(this).removeClass('has-val');
        }
    })
})


/*==================================================================
[ Validate ]*/
var input = document.getElementById("enter");

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("enter").click();
  }
});


function forgettt() {
   
    var auth = firebase.auth();
    var emailAddress = document.getElementById('email2').value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        window.alert("please check ypur email");
        document.location.href = "login.html";

    }).catch(function(error) {
        // An error happened.

    });

}

var x = document.getElementById('login');
var y = document.getElementById('forget');
var h1 = document.getElementById('h1');
var p = document.getElementById('ppp');

function forgett() {
    x.style.left = "-420px";
    y.style.left = "5px";
    h1.innerHTML = 'Forget your Passowrd?';
    ppp.style.marginTop = "80px";

}

function findemail(phone, password) {
    console.log('hare');

    var ref = firebase.database().ref().child('Pickly').child('users');
    ref.orderByChild('phone').equalTo(phone).on('value', function(snap) {

        console.log('llllll');
        snap.forEach(function(childs) {


            email = childs.child('email').val();
            return email;

        });



    });

}



function signIn(e) {
    e.preventDefault();
    var userEmail = document.getElementById('email').value;
    var userPass = document.getElementById('password').value;
    var mm = '';
    if (parseInt(userEmail) && userEmail.length == 11 && userEmail[0] == '0' && userEmail[1] == '1') {

        withphone(userEmail, userPass);

    } else {
        withemail(userEmail, userPass);
    }





}

function withphone(userEmail, userPass) {



    var ref = firebase.database().ref().child('Pickly').child('users');
    ref.orderByChild('phone').equalTo(userEmail).on('value', function(snap) {

        console.log('llllll');
        snap.forEach(function(childs) {

            email = childs.child('email').val();
            sessionStorage.setItem("phoneNumber", JSON.stringify(userEmail));
            console.log(childs.child('mpass').val());

        });


        firebase
            .auth()
            .signInWithEmailAndPassword(email, userPass)
            .then(function() {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                window.alert('Error : ' + errorMessage);
            });




    });
}

function withemail(userEmail, userPass) {

    firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPass)
        .then(function() {

            var ref = firebase.database().ref().child('Pickly').child('users');
            ref.orderByChild('email').equalTo(userEmail).on('value', function(snap) {

                snap.forEach(function(shot) {

                    console.log(shot.val());
                    sessionStorage.setItem("phoneNumber", JSON.stringify(shot.child("phone").val()));

                })


            })

            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.


            window.localStorage.setItem('emailForSignIn', userEmail);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert('Error : ' + errorMessage);
        });

}


firebase.auth().onAuthStateChanged(function(user) {
 var width = document.getElementById('width').offsetWidth;
    if (user) {
        var id = user.uid;

        var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('accountType');

        ref.on('value', gotdata, errdata);

        function gotdata(data) {
            console.log(data.val())
            var type = data.val();
console.log(width);		
            if (type == "Supplier" && width > 500) {
                document.location.href = "home.html";
            }
			  if (type == "Supplier" && width<=500) {
                document.location.href = "soon.html";
				  
            }
            if (type == "Radmin") {
                document.location.href = "admin/Admin.html";

            } else {
                console.log("Dfd");
            }



        }

        function errdata(data) {
            console.log('erorr');
        }
    } else {
        // No user is signed in.


    }
});
$(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});