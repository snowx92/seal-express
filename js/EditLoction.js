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
var swapid = '';

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        // User is signed in.

    } else {

        document.location.href = "index.html";

    }
});
var gov = [

    "اسوان/مدينة أسوان", "اسوان/ابو الريش", "اسوان/ابو سمبل", "اسوان/ادفو", "اسوان/البصيلية", "اسوان/الرديسية", "اسوان/السباعية", "اسوان/دراو", "اسوان/صحارى", "اسوان/كلابشة", "اسوان/كوم امبو", "اسوان/نصر النوبة", "اسيوط/مدينة أسيوط", "اسيوط/أبنوب", "اسيوط/أبو تيج", "اسيوط/أسيوط الجديدة", "اسيوط/البدارى", "اسيوط/الغنايم", "اسيوط/الفتح", "اسيوط/القوصيه", "اسيوط/ديروط", "اسيوط/ساحل سليم", "اسيوط/صدفا", "اسيوط/منفلوط", "الاسكندرية/أبو قير", "الاسكندرية/الإبراهيمية - الاسكندرية", "الاسكندرية/الجمرك", "الاسكندرية/الحضرة", "الاسكندرية/الدخيلة", "الاسكندرية/السيوف", "الاسكندرية/الظاهرية", "الاسكندرية/العامرية", "الاسكندرية/العصافرة", "الاسكندرية/العوايد", "الاسكندرية/المعمورة", "الاسكندرية/المنتزه", "الاسكندرية/المندرة", "الاسكندرية/المنشية", "الاسكندرية/النخيل", "الاسكندرية/النزهة - الاسكندرية", "الاسكندرية/الورديان", "الاسكندرية/باكوس", "الاسكندرية/بولكلي", "الاسكندرية/جليم", "الاسكندرية/سابا باشا", "الاسكندرية/سان ستيفانو", "الاسكندرية/سبورتنج", "الاسكندرية/ستانلي", "الاسكندرية/سموحة", "الاسكندرية/سيدي بشر", "الاسكندرية/سيدي جابر", "الاسكندرية/شدس", "الاسكندرية/عجمي", "الاسكندرية/فلمنج", "الاسكندرية/فيكتوريا", "الاسكندرية/كامب شيزار", "الاسكندرية/كفر عبدو", "الاسكندرية/كليوباترا", "الاسكندرية/لوران", "الاسكندرية/محرّم بيك", "الاسكندرية/محطة الرمل", "الاسكندرية/ميامي", "الاسكندرية/برج العرب", "الاسماعيلية/مدينة الإسماعيلية", "الاسماعيلية/أبوصوير", "الاسماعيلية/التل الكبير", "الاسماعيلية/القصاصين", "الاسماعيلية/القنطرة شرق", "الاسماعيلية/القنطرة غرب", "الاسماعيلية/فايد", "الاقصر/مدينة الأقصر", "الاقصر/أرمنت", "الاقصر/إسنا", "الاقصر/البياضية", "الاقصر/الزينية", "الاقصر/الطود", "الاقصر/القرنه", "البحر الاحمر/الغردقة", "البحر الاحمر/الجونة", "البحر الاحمر/القصير", "البحر الاحمر/رأس غارب", "البحر الاحمر/سفاجا", "البحر الاحمر/سهل حشيش", "البحر الاحمر/شلاتين", "البحر الاحمر/مرسى علم", "البحيرة/دمنهور", "البحيرة/أبو المطامير", "البحيرة/أبو حمص", "البحيرة/إدكو", "البحيرة/الدلنجات", "البحيرة/الرحمانية", "البحيرة/المحمودية", "البحيرة/النوبارية الجديدة", "البحيرة/ايتاي البارود", "البحيرة/بدر", "البحيرة/حوش عيسى", "البحيرة/رشيد", "البحيرة/شبراخيت", "البحيرة/كفر الدوار", "البحيرة/كوم حمادة", "البحيرة/وادي النطرون", "الجيزة/أوسيم", "الجيزة/إمبابة", "الجيزة/الدقى", "الجيزة/الرماية", "الجيزة/الصحفيين", "الجيزة/العجوزة", "الجيزة/العزيزية", "الجيزة/العمرانية", "الجيزة/القرية الفرعونية", "الجيزة/الكيت كات", "الجيزة/المنيب", "الجيزة/المهندسين", "الجيزة/الهرم", "الجيزة/الوراق", "الجيزة/بشتيل", "الجيزة/بولاق الدكرور", "الجيزة/ترسا", "الجيزة/حدائق الاهرام", "الجيزة/حى الجيزة", "الجيزة/دهشور", "الجيزة/ساقية مكى", "الجيزة/سقارة", "الجيزة/صفط", "الجيزة/فيصل - الجيزة", "الجيزة/كرداسة", "الجيزة/كفر طهرمس", "الجيزة/مريوطية", "الجيزة/ميت عقبة", "الجيزة/ناهيا", "الجيزة/اكتوبر - المنطقة الصناعية", "الجيزة/اكتوبر-  الاحياء", "الجيزة/أكتوبر - منطقة الحصري", "الجيزة/اكتوبر - المتميز والسياحية", "الجيزة/اكتوبر - مدينة الشيخ زايد", "الجيزة/الشيخ زايد- الاحياء", "الجيزة/مدينة الخمايل", "الجيزة/طريق الواحات", "الجيزة/مدينة الفردوس", "الجيزة/دريم لاند", "الجيزة/حى الاشجار", "الجيزة/مدينة الانتاج الاعلامى", "الجيزة/هرم سيتى", "الجيزة/القرية الذكية", "الجيزة/ابورواش الصناعية", "الجيزة/الطريق الصحراوي الى ال كيلو 28", "الجيزة/البدرشين", "الجيزة/البراجيل", "الجيزة/الحوامدية", "الجيزة/الصف", "الجيزة/المنصورية", "الجيزة/جزيرة الدهب وكولدير", "الدقهلية/المنصورة", "الدقهلية/أجا", "الدقهلية/أخطاب", "الدقهلية/الجمالية", "الدقهلية/السنبلاوين", "الدقهلية/المطرية - الدقهلية", "الدقهلية/المنزلة", "الدقهلية/بلقاس", "الدقهلية/بني عبيد", "الدقهلية/تمى الامديد", "الدقهلية/جمصه", "الدقهلية/دكرنس", "الدقهلية/شربين", "الدقهلية/طلخا", "الدقهلية/منية النصر", "الدقهلية/ميت سلسيل", "الدقهلية/ميت غمر", "الدقهلية/نبروه", "السويس/حي السويس", "السويس/فيصل - السويس", "السويس/العين السخنة", "السويس/حى الجناين", "السويس/حي الأربعين", "السويس/حي عتاقة", "الشرقية/العاشر من رمضان", "الشرقية/الزقازيق", "الشرقية/أبو حماد", "الشرقية/أبو كبير", "الشرقية/أولاد صقر", "الشرقية/الإبراهيمية - الشرقية", "الشرقية/الحسينية", "الشرقية/الصالحية الجديدة", "الشرقية/بلبيس", "الشرقية/ديرب نجم", "الشرقية/فاقوس", "الشرقية/كفر صقر", "الشرقية/مشتول السوق", "الشرقية/منيا القمح", "الشرقية/ههيا", "الغربية/طنطا", "الغربية/المحلة الكبرى", "الغربية/بسيون", "الغربية/السنطة", "الغربية/زفتى", "الغربية/سمنود", "الغربية/قطور", "الغربية/كفر الزيات", "الفيوم/مدينة الفيوم", "الفيوم/أطسا", "الفيوم/إبشواي", "الفيوم/الفيوم الجديدة", "الفيوم/سنورس", "الفيوم/طامية", "الفيوم/يوسف الصديق", "القاهرة/الحلمية", "القاهرة/الزمالك", "القاهرة/الزيتون", "القاهرة/الساحل", "القاهرة/السيدة زينب", "القاهرة/العباسية", "القاهرة/المرج", "القاهرة/المطرية - القاهرة", "القاهرة/المعادي", "القاهرة/المقطم", "القاهرة/المنيل", "القاهرة/النزهة - القاهرة", "القاهرة/الوايلي", "القاهرة/حدائق القبة", "القاهرة/دار السلام", "القاهرة/زهراء المعادى", "القاهرة/شبرا", "القاهرة/شيراتون", "القاهرة/عزبة النخل", "القاهرة/عين شمس", "القاهرة/قصر النيل", "القاهرة/مدينة السلام", "القاهرة/مدينة نصر", "القاهرة/مصر الجديدة", "القاهرة/وسط البلد", "القاهرة/القاهرة الجديدة - التجمع الأول", "القاهرة/القاهرة الجديدة - التجمع الثالث", "القاهرة/القاهرة الجديدة - التجمع الخامس", "القاهرة/القاهرة الجديدة - مدينة الرحاب", "القاهرة/حدائق حلوان", "القاهرة/حلوان", "القاهرة/مدينة,15 مايو", "القاهرة/مدينة الشروق", "القاهرة/مدينة بدر", "القاهرة/مدينتي", "القاهرة/العاصمة الإدارية الجديدة", "القليوبية/بهتيم", "القليوبية/شبرا الخيمة", "القليوبية/مدينة العبور", "القليوبية/بنها", "القليوبية/الخانكة", "القليوبية/ابوزعبل", "القليوبية/الخصوص", "القليوبية/القناطر الخيرية", "القليوبية/شبين القناطر", "القليوبية/طوخ", "القليوبية/قليوب", "القليوبية/قها", "القليوبية/كفر شكر", "المنوفية/أشمون", "المنوفية/الباجور", "المنوفية/الشهداء", "المنوفية/بركة السبع", "المنوفية/تلا", "المنوفية/سرس الليان", "المنوفية/شبين الكوم", "المنوفية/قويسنا", "المنوفية/منوف", "المنوفية/ميت العز", "المنوفية/السادات", "المنيا/مدينة المنيا", "المنيا/أبو قرقاص", "المنيا/العدوة", "المنيا/المنيا الجديدة", "المنيا/بني مزار", "المنيا/دير مواس", "المنيا/سمالوط", "المنيا/مطاي", "المنيا/مغاغة", "المنيا/ملوي", "بني سويف/مدينة بني سويف", "بني سويف/إهناسيا", "بني سويف/الفشن", "بني سويف/الواسطى", "بني سويف/ببا", "بني سويف/بني سويف الجديدة", "بني سويف/سمسطا", "بني سويف/ناصر", "بورسعيد/حي الجنوب", "بورسعيد/حي الزهور", "بورسعيد/حي الشرق", "بورسعيد/حي الضواحي", "بورسعيد/حي العرب", "بورسعيد/حي المناخ", "بورسعيد/مدينة بورفؤاد", "جنوب سيناء/شرم الشيخ", "جنوب سيناء/أبو رديس", "جنوب سيناء/أبو زنيمة", "جنوب سيناء/دهب", "جنوب سيناء/راس سدر", "جنوب سيناء/سانت كاترين", "جنوب سيناء/طابا", "جنوب سيناء/طور سيناء", "جنوب سيناء/نويبع", "دمياط/مدينة دمياط", "دمياط/الروضة", "دمياط/الزرقا", "دمياط/السرو", "دمياط/دمياط الجديدة", "دمياط/رأس البر", "دمياط/عزبة البرج", "دمياط/فارسكور", "دمياط/كفر البطيخ", "دمياط/كفر سعد", "دمياط/ميت أبوغالب", "سوهاج/مدينة سوهاج"

    , "سوهاج/أخميم", "سوهاج/البلينا", "سوهاج/العسيرات", "سوهاج/المراغة", "سوهاج/المنشاة", "سوهاج/جرجا", "سوهاج/جهينة", "سوهاج/دارالسلام - سوهاج", "سوهاج/ساقلتة", "سوهاج/طما", "سوهاج/طهطا", "قنا/مدينة قنا", "قنا/أبو تشت", "قنا/الوقف", "قنا/شنا", "قنا/فرشوط", "قنا/قفط", "قنا/قوص", "قنا/نجع حمادي", "قنا/نقادة", "كفر الشيخ/مدينة كفر الشيخ", "كفر الشيخ/البرلس", "كفر الشيخ/الحامول", "كفر الشيخ/الرياض", "كفر الشيخ/بلطيم", "كفر الشيخ/بيلا", "كفر الشيخ/دسوق", "كفر الشيخ/سيدى سالم", "كفر الشيخ/فوه", "كفر الشيخ/قلين", "كفر الشيخ/مطوبس", "مطروح/مرسى مطروح", "مطروح/الحمام", "مطروح/الساحل الشمالي", "مطروح/السلوم", "مطروح/الضبعة", "مطروح/العلمين", "مطروح/النجيلة", "مطروح/براني", "مطروح/سيوة", "مطروح/ماريناالعلمين"
];



var id = '';
var lati = 0.0;
var long = 0.0;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        id = user.uid;


        //var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('accountType');

    }


});

function getstate(s) {

    var ss = '';
    for (i = 0; i < s.length; i++) {
        if (s[i] == '/') {
            break;
        }
        ss += s[i];

    }
    console.log(ss);
    return ss;
}

function getregion(s) {

    var ss = '';
    var h = false;
    for (i = 0; i < s.length; i++) {
        if (s[i] == '/') {
            h = true;
            continue;
        }
        if (h)
            ss += s[i];

    }
    console.log(ss);
    return ss;
}


function addlocation() {
    //var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('accountType');

    console.log(lati + '  ' + long, swapid);



    var locid = makeid(lati,long);
    console.log(locid);
    var lat = lati;
    var lng = long;
    var state = getstate(document.getElementById('region').value);
    var region = getregion(document.getElementById('region').value);
    var address = document.getElementById('address').value;
    var title = document.getElementById('title').value;

    if (state.length <= 0 || title.length <= 0 || address.length <= 0 || region.length <= 0 || locid.length <= 0) {
        console.log('something empty man');
        return;
    }


    var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('locations').child(swapid);

    ref.set({
        address: address,
        building: '11',
        id: swapid,
        lattude: String(lat),
        lontude: String(lng),
        region: state,
        state: region,
        title: title
    })


    console.log(id);
    window.alert("تم تعديل العنوان بنجاح");
    window.location.reload();
}

function deletlocation() {

    if (locationindex > 1) {
        var ref = firebase.database().ref().child('Pickly').child('users').child(id).child('locations').child(swapid).remove();
        window.location.reload();
    } else {
        //noooo
        window.alert("يجب ان يكون هناك عنوان واحد لك على الاقل");
    }
}

function makeid(lat, lng) {
    var id = lat + lng;
    console.log(id);

    var newid = '';

    for (i = 0; i < id.length; i++) {
        console.log(id);

        if (id[i] != '.')
            newid += id[i];
    }

    return newid;
}


var myLatlng = { lat: -25.363, lng: 131.044 };

function initMap() {

    x = navigator.geolocation;
    x.getCurrentPosition(success, fail);

    function success(position) {

        //addlocation(position.coords.latitude ,position.coords.longitude);

        myLatlng = { lat: position.coords.latitude, lng: position.coords.longitude };
        lati = position.coords.latitude;
        long = position.coords.longitude;

        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: myLatlng,
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map,
        });

        map.addListener("click", (mapsMouseEvent) => {
            // Close the current InfoWindow.
            // Create a new InfoWindow.
            marker.setMap(null);

            marker = new google.maps.Marker({
                position: mapsMouseEvent.latLng,
            });
            marker.setMap(map);

            var f = false;
            var latt = '';
            var lngg = '';
            console.log(marker.getPosition().toString());

            for (i = 1; i < marker.getPosition().toString().length - 1; i++) {
                if (marker.getPosition().toString().charAt(i) == ',') {
                    f = true;
                    continue;
                }
                if (f) {
                    lngg += marker.getPosition().toString().charAt(i);
                } else {
                    latt += marker.getPosition().toString().charAt(i);
                }

            }



            lati = parseFloat(latt);
            long = parseFloat(lngg);

            console.log(lati + "   " + long);
        });


    }

    function fail() {}


    console.log(myLatlng);
    //const myLatlng = { lat: -25.363, lng: 131.044 };



}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User logged in already or has just logged in.




        var id = user.uid;
        console.log(id);




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
                        console.log(locinfo[locinfoindex]);
                        locinfoindex++;



                    });
                });


            }




            var select = document.getElementById("adress2");








            for (var i = 0; i < arr.length; i++) {
                if (i == 0) {
                    console.log(locinfo[i].region, locinfo[i].address, locinfo[i].title);
                    document.getElementById('region').value = locinfo[i].region + '/' + locinfo[i].state;
                    document.getElementById('address').value = locinfo[i].address;
                    document.getElementById('title').value = locinfo[i].title;
                    swapid = locinfo[i].id;
                    console.log(swapid);

                }
                var option = document.createElement("OPTION"),
                    txt = document.createTextNode(arr[i]);
                option.appendChild(txt);
                select.insertBefore(option, select.lastChild);

            }
        }

        function errdata(data) {
            console.log('erorr');
        }
    } else {
        // User not logged in or has just logged out.
    }
});

window.onload = function() {
    var eSelect = document.getElementById('mm');
    //var optOtherReason = document.getElementById('otherdetail');
    eSelect.onchange = function() {
        var value = document.getElementById('adress2').value;
        console.log(value);

        for (i = 0; i < locinfoindex; i++) {
            if (locinfo[i].title == value) {
                document.getElementById('region').value = locinfo[i].region + '/' + locinfo[i].state;
                document.getElementById('address').value = locinfo[i].address;
                document.getElementById('title').value = locinfo[i].title;
                swapid = locinfo[i].id;
                console.log(swapid);
                break;
            }
        }


    }
}