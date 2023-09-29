var idofuser = "";

function getUser_fromPhone() {

    var phoneNumber = document.getElementById("phoneNumber").value;
    firebase.database().ref().child("Pickly").child("users").orderByChild("phone").equalTo(phoneNumber).once("value").then((snapshot) => {

        if (snapshot.exists()) {
            snapshot.forEach(function(snap) {
                console.log(snap.val());

                idofuser = snap.child("id").val();
                getUserOrders();
            })
        } else {

            console.log("fail");
            alert("رقم الهاتف غير صحيح");

        }


    })

}

function getUserOrders() {

    var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];
    firebase.database().ref().child("Pickly").child("raya").orderByChild("statue").equalTo("readyD").once("value").then((snapshot) => {


        if (snapshot.exists()) {
            console.log("mand");
            snapshot.forEach(function(snap) {
                console.log(snap.val());



                if (snap.child("uAccepted").val() == idofuser) {
                    console.log(snap.val());
                    var newRow = table.insertRow(table.length);
                    cell1 = newRow.insertCell(0);
                    cell2 = newRow.insertCell(1);
                    cell3 = newRow.insertCell(2);

                    cell1.innerHTML = "     " + snap.child("trackid").val() + "     ";
                    cell2.innerHTML = "     " + snap.child("dname").val() + "   ";
                    cell3.innerHTML = "          ";


                }


            })

        } else {
            console.log("fail");
            alert("رقم الهاتف غير صحيح");
        }
    })

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

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'carrier_orders_sheet.xlsx');

}

function topdf() {

    var sTable = document.getElementById('PDF').innerHTML;

    var win = window.open('', '', 'height=700,width=700');

    var style = "<style>";
    style = style + "table" + "{width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";

    style = style + "</style>";

    win.document.write('<html><head>');
    win.document.write('<title>Profile</title>'); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.document.close(); // CLOSE THE CURRENT WINDOW.
    win.print();
}


/*<script>
        $(".exportToExcel").click(function(e) {
            var table = $(this).prev('.table2excel');
            var preserveColors = (table.hasClass('table2excel_with_colors') ? true : false);
            $(table).table2excel({
                exclude: ".noExl",
                name: "Excel Document",
                filename: "Envio" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
                fileext: ".csv	",
                exclude_img: true,
                exclude_links: true,
                exclude_inputs: true,
                preserveColors: preserveColors
            });


        });
    </script>*/