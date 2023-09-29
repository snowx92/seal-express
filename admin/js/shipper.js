var arr = [];

function logout() {
    firebase.auth().signOut().then(logout => {


        document.location.href = "../login.html";
    }).catch(error => {});

}
var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar_responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    console.log("hsasah");
    if (sidebarOpen) {
        console.log("hh");
        sidebar.classList.remove("sidebar_responsive");
        sidebarOpen = false;
    }
}

function getOrders() {
    var phone = document.getElementById("phoneNumber").value;

    firebase.database().ref().child("Pickly").child("users").orderByChild("phone").equalTo(phone).once("value").then((snapshot) => {

        if (snapshot.exists()) {
            var i = 0;
            snapshot.forEach(user => {

                user.child("payments").forEach(ordersinfo => {

                    if (ordersinfo.child("isPaid").val() == "false") {

                        arr.push(ordersinfo.val());

                        console.log("false");
                    } else {
                        console.log("true");
                    }
                    i++;
                })

            });
        }
    });

    setTimeout(setorders, 3000);

}

function setorders() {
    var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];
    var mark = -1;
    for (i = 0; i < arr.length; i++) {

        for (j = 0; j < arr.length; j++) {

            if (arr[i].trackId == arr[j].trackId && arr[i].transType != arr[j].transType && arr[i].date != -1 && arr[j].date != -1) {
                //console.log(arr[i]);
                //console.log(arr[j]);
                mark = j;
            }

        }
        if (mark != -1) {
            console.log(arr[i]);
            console.log(arr[mark]);
            if (arr[i].transType == "shippingFees") {

                var newRow = table.insertRow(table.length);
                cell1 = newRow.insertCell(0);
                cell2 = newRow.insertCell(1);
                cell3 = newRow.insertCell(2);
                cell4 = newRow.insertCell(3);
                cell1.innerHTML = arr[mark].money - arr[i].money;
                cell2.innerHTML = arr[i].money;
                cell3.innerHTML = arr[mark].money;
                cell4.innerHTML = arr[i].trackId;
                arr[i].date = -1;
                arr[mark].date = -1;

            } else {
                var newRow = table.insertRow(table.length);
                cell1 = newRow.insertCell(0);
                cell2 = newRow.insertCell(1);
                cell3 = newRow.insertCell(2);
                cell4 = newRow.insertCell(3);
                cell1.innerHTML = arr[i].money - arr[mark].money;
                cell2.innerHTML = arr[mark].money;
                cell3.innerHTML = arr[i].money;
                cell4.innerHTML = arr[i].trackId;
                arr[i].date = -1;
                arr[mark].date = -1;
            }

        } else {

            if (arr[i].date != -1) {
                console.log("wqe");
                if (arr[i].transType == "shippingFees") {

                    var newRow = table.insertRow(table.length);
                    cell1 = newRow.insertCell(0);
                    cell2 = newRow.insertCell(1);
                    cell3 = newRow.insertCell(2);
                    cell4 = newRow.insertCell(3);
                    cell1.innerHTML = "لم تحسب بعد";
                    cell2.innerHTML = arr[i].money;
                    cell3.innerHTML = "لم تحسب بعد";
                    cell4.innerHTML = arr[i].trackId;
                    arr[i].date = -1;
                    //arr[mark].money = -1;

                } else {
                    var newRow = table.insertRow(table.length);
                    cell1 = newRow.insertCell(0);
                    cell2 = newRow.insertCell(1);
                    cell3 = newRow.insertCell(2);
                    cell4 = newRow.insertCell(3);
                    cell1.innerHTML = "لم تحسب بعد";
                    cell2.innerHTML = "لم تحسب بعد";
                    cell3.innerHTML = arr[i].money;
                    cell4.innerHTML = arr[i].trackId;
                    arr[i].date = -1;
                    //arr[mark].money = -1;
                }
            }
        }
        mark = -1;


    }

}

function exp() {

    console.log("lfnw");
    var wb = XLSX.utils.table_to_book(document.getElementById('mytable'), { sheet: "Sheet JS" }, { wch: "40" });
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'shipper_Orders_Payments.xlsx');

}