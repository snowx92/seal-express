document.getElementById('dont').addEventListener('click', function(e) {
    e.preventDefault();
    caculatePrice();
})

function getmantka(s) {
    var f = false;
    var buff = "";
    for (i = 0; i < s.length; i++) {
        if (s[i] == " " && !f) {
            f = true;
            continue;
        }
        if (f) {
            buff += s[i];
        }

    }
    return buff;
}

function caculatePrice() {

    //var dropLoc1 = document.getElementById("shipform");
    //var dropLoc = dropLoc1.option[dropLoc1.selectedIndex].text;

    var dropLoc = document.getElementById("standard-select").value;
    dropLoc = getmantka(dropLoc);
    var nums = document.getElementById("shipment").value;
    console.log(nums, dropLoc);
    if (!parseInt(nums) || nums == undefined) {
        alert("يجب عليك اختيار منطقه وكتابه عدد الاوردرات بشكل صحيح");
        return;
    }
    let toZone = checkWhichZone(dropLoc);
    if (toZone == 0) {
        alert("عزيزنا العميل هذه المنطقه غير متاحه في الوقت الحالي ");
        return;
    }
    console.log(toZone);
    let userPackage = getPackage(nums);
    console.log(userPackage);
    var price = priceOfZones(userPackage, toZone);
    console.log(price);
    document.getElementById("price").innerText =  "جنية" +" "+ price   ;
}

function checkWhichZone(city) {
    // --- Zones
    let zoneNumb = 0;

    // ---- All Cities of Each Zone
    let zone1 = ["أوسيم", "إمبابة", "الدقى", "الرماية", "الصحفيين", "العجوزة", "العزيزية", "العمرانية", "القرية الفرعونية", "الكيت كات", "المنيب", "المهندسين", "الهرم", "الوراق", "بشتيل", "بولاق الدكرور", "ترسا", "حدائق الاهرام", "حى الجيزة", "دهشور", "ساقية مكى", "سقارة", "صفط", "فيصل", "كرداسة", "كفر طهرمس", "مريوطية", "ميت عقبة", "ناهيا", "اكتوبر - المنطقة الصناعية", "اكتوبر- الاحياء", "أكتوبر - منطقة الحصري", "اكتوبر - المتميز والسياحية", "اكتوبر - مدينة الشيخ زايد", "الشيخ زايد- الاحياء", "مدينة الخمايل", "طريق الواحات", "مدينة الفردوس", "دريم لاند", "حى الاشجار", "مدينة الانتاج الاعلامى", "هرم سيتى", "القرية الذكية", "ابورواش الصناعية", "الطريق الصحراوي الى ال كيلو 28", "البدرشين", "البراجيل", "الحوامدية", "الصف", "المنصورية", "جزيرة الدهب وكولدير", "الحلمية", "الزمالك", "الزيتون", "الساحل", "السيدة زينب", "العباسية", "المرج", "المطرية", "المعادي", "المقطم", "المنيل", "النزهة", "الوايلي", "حدائق القبة", "دار السلام", "زهراء المعادى", "شبرا", "شيراتون", "عزبة النخل", "عين شمس", "قصر النيل", "مدينة السلام", "مدينة نصر", "مصر الجديدة", "وسط البلد", "حدائق حلوان", "حلوان", "مدينة 15 مايو", "شبرا الخيمة"];
    let zone2 = ["العاصمة الإدارية الجديدة", "مدينة الشروق", "مدينة بدر", "مدينتي", "التجمع الأول", "التجمع الثالث", "التجمع الخامس", "مدينة الرحاب", "مدينة العبور", "العاشر من رمضان"];
    let zone3 = ["أبو قير", "الإبراهيمية", "الجمرك", "الحضرة", "الدخيلة", "السيوف", "الظاهرية", "العامرية", "العصافرة", "العوايد", "المعمورة", "المنتزه", "المندرة", "المنشية", "النخيل", "النزهة - الاسكندريه", "الورديان", "باكوس", "بولكلي", "جليم", "سابا باشا", "سان ستيفانو", "سبورتنج", "ستانلي", "سموحة", "سيدي بشر", "سيدي جابر", "شدس", "عجمي", "فلمنج", "فيكتوريا", "كامب شيزار", "كفر عبدو", "كليوباترا", "لوران", "محرّم بيك", "محطة الرمل", "ميامي", "برج العرب"];
    let zone4 = ["حي الجنوب", "حي الزهور", "حي الشرق", "حي الضواحي", "حي العرب", "حي المناخ", "مدينة بورفؤاد", "مدينة الإسماعيلية", "أبوصوير", "التل الكبير", "القصاصين", "القنطرة شرق", "القنطرة غرب", "فايد", "حي السويس", "فيصل", "العين السخنة", "حى الجناين", "حي الأربعين", "حي عتاقة", "دمنهور", "أبو المطامير", "أبو حمص", "إدكو", "الدلنجات", "الرحمانية", "المحمودية", "النوبارية الجديدة", "ايتاي البارود", "بدر", "حوش عيسى", "رشيد", "شبراخيت", "كفر الدوار", "كوم حمادة", "وادي النطرون", "مدينة كفر الشيخ", "البرلس", "الحامول", "الرياض", "بلطيم", "بيلا", "دسوق", "سيدى سالم", "فوه", "قلين", "مطوبس", "المنصورة", "أجا", "أخطاب", "الجمالية", "السنبلاوين", "المطرية", "المنزلة", "بلقاس", "بني عبيد", "تمى الامديد", "جمصه", "دكرنس", "شربين", "طلخا", "منية النصر", "ميت سلسيل", "ميت غمر", "نبروه", "الزقازيق", "أبو حماد", "أبو كبير", "أولاد صقر", "الإبراهيمية", "الحسينية", "الصالحية الجديدة", "بلبيس", "ديرب نجم", "فاقوس", "كفر صقر", "مشتول السوق", "منيا القمح", "ههيا", "طنطا", "المحلة الكبرى", "بسيون", "السنطة", "زفتى", "سمنود", "قطور", "كفر الزيات", "بهتيم", "بنها", "الخانكة", "ابوزعبل", "الخصوص", "القناطر الخيرية", "شبين القناطر", "طوخ", "قليوب", "قها", "كفر شكر", "أشمون", "الباجور", "الشهداء", "بركة السبع", "تلا", "سرس الليان", "شبين الكوم", "قويسنا", "منوف", "ميت العز", "السادات"];
    let zone5 = ["مدينة الفيوم", "أطسا", "إبشواي", "الفيوم الجديدة", "سنورس", "طامية", "يوسف الصديق", "مدينة المنيا", "أبو قرقاص", "العدوة", "المنيا الجديدة", "بني مزار", "دير مواس", "سمالوط", "مطاي", "مغاغة", "ملوي", "مدينة بني سويف", "إهناسيا", "الفشن", "الواسطى", "ببا", "بني سويف الجديدة", "سمسطا", "ناصر"];
    let zone6 = ["مدينة أسيوط", "أبنوب", "أبو تيج", "أسيوط الجديدة", "البدارى", "الغنايم", "الفتح", "القوصيه", "ديروط", "ساحل سليم", "صدفا", "منفلوط", "مدينة سوهاج", "أخميم", "البلينا", "العسيرات", "المراغة", "المنشاة", "جرجا", "جهينة", "دارالسلام", "ساقلتة", "طما", "طهطا", "مدينة قنا", "أبو تشت", "الوقف", "شنا", "فرشوط", "قفط", "قوص", "نجع حمادي", "نقادة"];
    let zone7 = ["مدينة أسوان", "ابو الريش", "ابو سمبل", "ادفو", "البصيلية", "الرديسية", "السباعية", "دراو", "صحارى", "كلابشة", "كوم امبو", "نصر النوبة", "مدينة الأقصر", "أرمنت", "إسنا", "البياضية", "الزينية", "الطود", "القرنه"];
    let zone8 = ["شرم الشيخ", "الغردقة"];
    let zone9 = ["مرسى مطروح", "الحمام", "الساحل الشمالي", "السلوم", "الضبعة", "العلمين", "النجيلة", "براني", "سيوة", "مارينا العلمين"];
    let zone10 = ["شلاتين", "مرسى علم", "طابا", "دهب", "نويبع", "رأس غارب", "رأس شقير", "الفرافره", "الخارجه", "الداخله", "باريس", "بحيرات توشكه"];

    if (zone1.indexOf(city) > -1) {
        zoneNumb = 1;
    } else if (zone2.indexOf(city) > -1) {
        zoneNumb = 2;
    } else if (zone3.indexOf(city) > -1) {
        zoneNumb = 3;
    } else if (zone4.indexOf(city) > -1) {
        zoneNumb = 4;
    } else if (zone5.indexOf(city) > -1) {
        zoneNumb = 5;
    } else if (zone6.indexOf(city) > -1) {
        zoneNumb = 6;
    } else if (zone7.indexOf(city) > -1) {
        zoneNumb = 7;
    } else if (zone8.indexOf(city) > -1) {
        zoneNumb = 8;
    } else if (zone9.indexOf(city) > -1) {
        zoneNumb = 9;
    } else if (zone10.indexOf(city) > -1) {
        zoneNumb = 10;
    }

    return zoneNumb;
}

function getPackage(ordersCount) {
    var packID = 0;
    if (ordersCount > 0 && ordersCount <= 10) {
        packID = 1;
    } else if (ordersCount >= 11 && ordersCount <= 20) {
        packID = 2;
    } else if (ordersCount >= 21 && ordersCount <= 25) {
        packID = 3;
    } else if (ordersCount >= 26 && ordersCount <= 125) {
        packID = 4;
    } else if (ordersCount >= 126) {
        packID = 5;
    }
    return packID;
}

function priceOfZones(pack, zone) {
    var zonesPr;
    if (pack === 1) {
        zonesPr = [40, 45, 55, 65, 70, 85, 95, 110, 120, 145];
    } else if (pack === 2) {
        zonesPr = [35, 40, 52, 62, 67, 82, 92, 107, 117, 143];
    } else if (pack === 3) {
        zonesPr = [32, 37, 50, 60, 65, 80, 90, 105, 115, 140];
    } else if (pack === 4) {
        zonesPr = [30, 34, 48, 58, 63, 78, 88, 103, 113, 138];
    } else {
        zonesPr = [28, 30, 45, 55, 60, 75, 85, 100, 110, 135];
    }

    return zonesPr[zone - 1];
}



/* <input type="text" name="mo7fza" style="text-align: right;" placeholder="شحنتك هتروح فين" class="form-control" id="mo7fza" list="datalist1">
                               <datalist id="datalist1">>
    <option value="الجيزة, أوسيم">
    <option value="الجيزة, إمبابة">
    <option value="الجيزة, الدقى">
    <option value="الجيزة, الرماية">
    <option value="الجيزة, الصحفيين">
    <option value="الجيزة, العجوزة">
    <option value="الجيزة, العزيزية">
    <option value="الجيزة, العمرانية">
    <option value="الجيزة, القرية الفرعونية">
    <option value="الجيزة, الكيت كات">
    <option value="الجيزة, المنيب">
    <option value="الجيزة, المهندسين">
    <option value="الجيزة, الهرم">
    <option value="الجيزة, الوراق">
    <option value="الجيزة, بشتيل">
    <option value="الجيزة, بولاق الدكرور">
    <option value="الجيزة, ترسا">
    <option value="الجيزة, حدائق الاهرام">
    <option value="الجيزة, حى الجيزة">
    <option value="الجيزة, دهشور">
    <option value="الجيزة, ساقية مكى">
    <option value="الجيزة, سقارة">
    <option value="الجيزة, صفط">
    <option value="الجيزة, فيصل">
    <option value="الجيزة, كرداسة">
    <option value="الجيزة, كفر طهرمس">
    <option value="الجيزة, مريوطية">
    <option value="الجيزة, ميت عقبة">
    <option value="الجيزة, ناهيا">
    <option value="الجيزة, اكتوبر - المنطقة الصناعية">
    <option value="الجيزة, اكتوبر- الاحياء">
    <option value="الجيزة, أكتوبر - منطقة الحصري">
    <option value="الجيزة, اكتوبر - المتميز والسياحية">
    <option value="الجيزة, اكتوبر - مدينة الشيخ زايد">
    <option value="الجيزة, الشيخ زايد- الاحياء">
    <option value="الجيزة, مدينة الخمايل">
    <option value="الجيزة, طريق الواحات">
    <option value="الجيزة, مدينة الفردوس">
    <option value="الجيزة, دريم لاند">
    <option value="الجيزة, حى الاشجار">
    <option value="الجيزة, مدينة الانتاج الاعلامى">
    <option value="الجيزة, هرم سيتى">
    <option value="الجيزة, القرية الذكية">
    <option value="الجيزة, ابورواش الصناعية">
    <option value="الجيزة, الطريق الصحراوي الى ال كيلو 28">
    <option value="الجيزة, البدرشين">
    <option value="الجيزة, البراجيل">
    <option value="الجيزة, الحوامدية">
    <option value="الجيزة, الصف">
    <option value="الجيزة, المنصورية">
    <option value="الجيزة, جزيرة الدهب وكولدير">
    <option value="القاهرة, الحلمية">
    <option value="القاهرة, الزمالك">
    <option value="القاهرة, الزيتون">
    <option value="القاهرة, الساحل">
    <option value="القاهرة, السيدة زينب">
    <option value="القاهرة, العباسية">
    <option value="القاهرة, المرج">
    <option value="القاهرة, المطرية">
    <option value="القاهرة, المعادي">
    <option value="القاهرة, المقطم">
    <option value="القاهرة, المنيل">
    <option value="القاهرة, النزهة">
    <option value="القاهرة, الوايلي">
    <option value="القاهرة, حدائق القبة">
    <option value="القاهرة, دار السلام">
    <option value="القاهرة, زهراء المعادى">
    <option value="القاهرة, شبرا">
    <option value="القاهرة, شيراتون">
    <option value="القاهرة, عزبة النخل">
    <option value="القاهرة, عين شمس">
    <option value="القاهرة, قصر النيل">
    <option value="القاهرة, مدينة السلام">
    <option value="القاهرة, مدينة نصر">
    <option value="القاهرة, مصر الجديدة">
    <option value="القاهرة, وسط البلد">
    <option value="القاهرة, حدائق حلوان">
    <option value="القاهرة, حلوان">
    <option value="القاهرة, مدينة 15 مايو">
    <option value="القليوبية, شبرا الخيمة">
    <option value="القاهرة, العاصمة الإدارية الجديدة">
    <option value="القاهرة, مدينة الشروق">
    <option value="القاهرة, مدينة بدر">
    <option value="القاهرة, مدينتي">
    <option value="القاهرة, التجمع الأول">
    <option value="القاهرة, التجمع الثالث">
    <option value="القاهرة, التجمع الخامس">
    <option value="القاهرة, مدينة الرحاب">
    <option value="القليوبية, مدينة العبور">
    <option value="الشرقية, العاشر من رمضان">
    <option value="الاسكندرية, أبو قير">
    <option value="الاسكندرية, الإبراهيمية">
    <option value="الاسكندرية, الجمرك">
    <option value="الاسكندرية, الحضرة">
    <option value="الاسكندرية, الدخيلة">
    <option value="الاسكندرية, السيوف">
    <option value="الاسكندرية, الظاهرية">
    <option value="الاسكندرية, العامرية">
    <option value="الاسكندرية, العصافرة">
    <option value="الاسكندرية, العوايد">
    <option value="الاسكندرية, المعمورة">
    <option value="الاسكندرية, المنتزه">
    <option value="الاسكندرية, المندرة">
    <option value="الاسكندرية, المنشية">
    <option value="الاسكندرية, النخيل">
    <option value="الاسكندرية, النزهة - الاسكندريه">
    <option value="الاسكندرية, الورديان">
    <option value="الاسكندرية, باكوس">
    <option value="الاسكندرية, بولكلي">
    <option value="الاسكندرية, جليم">
    <option value="الاسكندرية, سابا باشا">
    <option value="الاسكندرية, سان ستيفانو">
    <option value="الاسكندرية, سبورتنج">
    <option value="الاسكندرية, ستانلي">
    <option value="الاسكندرية, سموحة">
    <option value="الاسكندرية, سيدي بشر">
    <option value="الاسكندرية, سيدي جابر">
    <option value="الاسكندرية, شدس">
    <option value="الاسكندرية, عجمي">
    <option value="الاسكندرية, فلمنج">
    <option value="الاسكندرية, فيكتوريا">
    <option value="الاسكندرية, كامب شيزار">
    <option value="الاسكندرية, كفر عبدو">
    <option value="الاسكندرية, كليوباترا">
    <option value="الاسكندرية, لوران">
    <option value="الاسكندرية, محرّم بيك">
    <option value="الاسكندرية, محطة الرمل">
    <option value="الاسكندرية, ميامي">
    <option value="الاسكندرية, برج العرب">
    <option value="بورسعيد, حي الجنوب">
    <option value="بورسعيد, حي الزهور">
    <option value="بورسعيد, حي الشرق">
    <option value="بورسعيد, حي الضواحي">
    <option value="بورسعيد, حي العرب">
    <option value="بورسعيد, حي المناخ">
    <option value="بورسعيد, مدينة بورفؤاد">

    <option value="الاسماعيلية, مدينة الإسماعيلية">
    <option value="الاسماعيلية, أبوصوير">
    <option value="الاسماعيلية, التل الكبير">
    <option value="الاسماعيلية, القصاصين">
    <option value="الاسماعيلية, القنطرة شرق">
    <option value="الاسماعيلية, القنطرة غرب">
    <option value="الاسماعيلية, فايد">
    <option value="السويس, حي السويس">
    <option value="السويس, فيصل - السويس">
    <option value="السويس, العين السخنة">
    <option value="السويس, حى الجناين">
    <option value="السويس, حي الأربعين">
    <option value="السويس, حي عتاقة">

    <option value="البحيرة, دمنهور">
    <option value="البحيرة, أبو المطامير">
    <option value="البحيرة, أبو حمص">
    <option value="البحيرة, إدكو">
    <option value="البحيرة, الدلنجات">
    <option value="البحيرة, الرحمانية">
    <option value="البحيرة, المحمودية">
    <option value="البحيرة, النوبارية الجديدة">
    <option value="البحيرة, ايتاي البارود">
    <option value="البحيرة, بدر">
    <option value="البحيرة, حوش عيسى">
    <option value="البحيرة, رشيد">
    <option value="البحيرة, شبراخيت">
    <option value="البحيرة, كفر الدوار">
    <option value="البحيرة, كوم حمادة">
    <option value="البحيرة, وادي النطرون">

    <option value="كفر الشيخ, مدينة كفر الشيخ">
    <option value="كفر الشيخ, البرلس">
    <option value="كفر الشيخ, الحامول">
    <option value="كفر الشيخ, الرياض">
    <option value="كفر الشيخ, بلطيم">
    <option value="كفر الشيخ, بيلا">
    <option value="كفر الشيخ, دسوق">
    <option value="كفر الشيخ, سيدى سالم">
    <option value="كفر الشيخ, فوه">
    <option value="كفر الشيخ, قلين">
    <option value="كفر الشيخ, مطوبس">

    <option value="الدقهلية, المنصورة">
    <option value="الدقهلية, أجا">
    <option value="الدقهلية, أخطاب">
    <option value="الدقهلية, الجمالية">
    <option value="الدقهلية, السنبلاوين">
    <option value="الدقهلية, المطرية - الدقهلية">
    <option value="الدقهلية, المنزلة">
    <option value="الدقهلية, بلقاس">
    <option value="الدقهلية, بني عبيد">
    <option value="الدقهلية, تمى الامديد">
    <option value="الدقهلية, جمصه">
    <option value="الدقهلية, دكرنس">
    <option value="الدقهلية, شربين">
    <option value="الدقهلية, طلخا">
    <option value="الدقهلية, منية النصر">
    <option value="الدقهلية, ميت سلسيل">
    <option value="الدقهلية, ميت غمر">
    <option value="الدقهلية, نبروه">

    <option value="الشرقية, الزقازيق">
    <option value="الشرقية, أبو حماد">
    <option value="الشرقية, أبو كبير">
    <option value="الشرقية, أولاد صقر">
    <option value="الشرقية, الإبراهيمية - الشرقية">
    <option value="الشرقية, الحسينية">
    <option value="الشرقية, الصالحية الجديدة">
    <option value="الشرقية, بلبيس">
    <option value="الشرقية, ديرب نجم">
    <option value="الشرقية, فاقوس">
    <option value="الشرقية, كفر صقر">
    <option value="الشرقية, مشتول السوق">
    <option value="الشرقية, منيا القمح">
    <option value="الشرقية, ههيا">

    <option value="الغربية, طنطا">
    <option value="الغربية, المحلة الكبرى">
    <option value="الغربية, بسيون">
    <option value="الغربية, السنطة">
    <option value="الغربية, زفتى">
    <option value="الغربية, سمنود">
    <option value="الغربية, قطور">
    <option value="الغربية, كفر الزيات">

    <option value="القليوبية, بهتيم">
    <option value="القليوبية, بنها">
    <option value="القليوبية, الخانكة">
    <option value="القليوبية, ابوزعبل">
    <option value="القليوبية, الخصوص">
    <option value="القليوبية, القناطر الخيرية">
    <option value="القليوبية, شبين القناطر">
    <option value="القليوبية, طوخ">
    <option value="القليوبية, قليوب">
    <option value="القليوبية, قها">
    <option value="القليوبية, كفر شكر">

    <option value="المنوفية, أشمون">
    <option value="المنوفية, الباجور">
    <option value="المنوفية, الشهداء">
    <option value="المنوفية, بركة السبع">
    <option value="المنوفية, تلا">
    <option value="المنوفية, سرس الليان">
    <option value="المنوفية, شبين الكوم">
    <option value="المنوفية, قويسنا">
    <option value="المنوفية, منوف">
    <option value="المنوفية, ميت العز">
    <option value="المنوفية, السادات">
    <option value="الفيوم, مدينة الفيوم">
    <option value="الفيوم, أطسا">
    <option value="الفيوم, إبشواي">
    <option value="الفيوم, الفيوم الجديدة">
    <option value="الفيوم, سنورس">
    <option value="الفيوم, طامية">
    <option value="الفيوم, يوسف الصديق">
    <option value="المنيا, مدينة المنيا">
    <option value="المنيا, أبو قرقاص">
    <option value="المنيا, العدوة">
    <option value="المنيا, المنيا الجديدة">
    <option value="المنيا, بني مزار">
    <option value="المنيا, دير مواس">
    <option value="المنيا, سمالوط">
    <option value="المنيا, مطاي">
    <option value="المنيا, مغاغة">
    <option value="المنيا, ملوي">
    <option value="بني سويف, مدينة بني سويف">
    <option value="بني سويف, إهناسيا">
    <option value="بني سويف, الفشن">
    <option value="بني سويف, الواسطى">
    <option value="بني سويف, ببا">
    <option value="بني سويف, بني سويف الجديدة">
    <option value="بني سويف, سمسطا">
    <option value="بني سويف, ناصر">
    <option value="اسيوط, مدينة أسيوط">
    <option value="اسيوط, أبنوب">
    <option value="اسيوط, أبو تيج">
    <option value="اسيوط, أسيوط الجديدة">
    <option value="اسيوط, البدارى">
    <option value="اسيوط, الغنايم">
    <option value="اسيوط, الفتح">
    <option value="اسيوط, القوصيه">
    <option value="اسيوط, ديروط">
    <option value="اسيوط, ساحل سليم">
    <option value="اسيوط, صدفا">
    <option value="اسيوط, منفلوط">
    <option value="سوهاج, مدينة سوهاج">
    <option value="سوهاج, أخميم">
    <option value="سوهاج, البلينا">
    <option value="سوهاج, العسيرات">
    <option value="سوهاج, المراغة">
    <option value="سوهاج, المنشاة">
    <option value="سوهاج, جرجا">
    <option value="سوهاج, جهينة">
    <option value="سوهاج, دارالسلام">
    <option value="سوهاج, ساقلتة">
    <option value="سوهاج, طما">
    <option value="سوهاج, طهطا">
    <option value="قنا, مدينة قنا">
    <option value="قنا, أبو تشت">
    <option value="قنا, الوقف">
    <option value="قنا, شنا">
    <option value="قنا, فرشوط">
    <option value="قنا, قفط">
    <option value="قنا, قوص">
    <option value="قنا, نجع حمادي">
    <option value="قنا, نقادة">
    <option value="اسوان, مدينة أسوان">
    <option value="اسوان, ابو الريش">
    <option value="اسوان, ابو سمبل">
    <option value="اسوان, ادفو">
    <option value="اسوان, البصيلية">
    <option value="اسوان, الرديسية">
    <option value="اسوان, السباعية">
    <option value="اسوان, دراو">
    <option value="اسوان, صحارى">
    <option value="اسوان, كلابشة">
    <option value="اسوان, كوم امبو">
    <option value="اسوان, نصر النوبة">
    <option value="الاقصر, مدينة الأقصر">
    <option value="الاقصر, أرمنت">
    <option value="الاقصر, إسنا">
    <option value="الاقصر, البياضية">
    <option value="الاقصر, الزينية">
    <option value="الاقصر, الطود">
    <option value="الاقصر, القرنه">
	</datalist>*/