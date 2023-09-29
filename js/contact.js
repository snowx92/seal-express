var messagesRef = firebase.database().ref('messages');



// Submit form
function send(){


  // Get values
  var name = getInputVal('name');
  
  var email = getInputVal('email');
  var phone = getInputVal('pnum');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, phone, message);



alert("تم ارسال رسالتك");
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
 
    email:email,
    phone:phone,
    message:message
  });
}