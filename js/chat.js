console.log("dsads");
function on_load() {
 
	var ref = firebase.database().ref().child("messages");
	ref.on("value", function (snap) {
 
		snap.forEach(function (snapshot) {
console.log("sdkjdsak");
 
			let x = document.getElementById("bodyy");
 
			let cardBody = document.createElement('div');
			cardBody.className = "inbox_chat";
 
 
			let card = document.createElement('div');
			card.className = "chat_list";
			cardBody.appendChild(card);
 
			let card0 = document.createElement('div');
			card0.className = "chat_people";
			card.appendChild(card0);
 
			let img = document.createElement("div");
			img.className = "chat_img";
			card0.appendChild(img);
 
			let card2 = document.createElement('img');
			card2.src = "https://p...content-available-to-author-only...s.com/images/user-profile.png"
			img.appendChild(card2);
 
			let card3 = document.createElement('div');
			card3.className = "chat_ib";
			card0.appendChild(card3);
 
			let h51 = document.createElement('h5');
			h51.innerText=snapshot.child("name").val();
			card3.appendChild(h51);
 
			let p1 = document.createElement('p');
			p1.innerText=snapshot.child("email").val();
			card3.appendChild(p1);
 
			let p2 = document.createElement('p');
			p2.innerText=snapshot.child("phone").val();
			card3.appendChild(p2);
 
			let p3 = document.createElement('p');
			p3.innerText=snapshot.child("message").val()
			card3.appendChild(p3);
 
 
			x.appendChild(cardBody);
console.log(cardBody);
 
 
 
		})
 
 
	});
 
 
}
 

 
 
function logout() {
	firebase.auth().signOut().then(logout => {
 
		window.alert("signed out");
		document.location.href = "../login.html";
	}).catch(error => {});
}
 