
   // دالة تحويل التاريخ الميلادي إلى هجري باستخدام تقويم أم القرى
function toHijri(gDate) {
    let day = gDate.getDate();
    let month = gDate.getMonth();
    let year = gDate.getFullYear();

    let jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
             Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
             Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4) +
             day - 32075;

    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    let hijriMonth = Math.floor((24 * l) / 709);
    let hijriDay = l - Math.floor((709 * hijriMonth) / 24);
    let hijriYear = 30 * n + j - 30;

    return { day: hijriDay, month: hijriMonth, year: hijriYear };
}

// أسماء الأشهر الهجرية
const hijriMonthNames = [
    "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة",
    "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

// تحديث التقويم الهجري سنويًا تلقائيًا
function renderHijriCalendar(gDate) {
    let hijriDate = toHijri(gDate);
    let monthName = hijriMonthNames[hijriDate.month - 1];
    document.getElementById("month-year").innerText = `${monthName} ${hijriDate.year}`;

    let calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = "";

    let daysInMonth = hijriDate.month === 12 ? 30 : 29; // معظم الأشهر الهجرية بين 29-30 يومًا

    for (let day = 1; day <= daysInMonth; day++) {
        let dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        dayDiv.innerText = day;

        if (day === hijriDate.day) {
            dayDiv.classList.add("today");
        }

        calendarDays.appendChild(dayDiv);
    }
}

// تحديث التقويم الميلادي
function renderGregorianCalendar(gDate) {
    let monthNames = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    
    let month = gDate.getMonth();
    let year = gDate.getFullYear();
    document.getElementById("month-year").innerText = `${monthNames[month]} ${year}`;

    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = "";

    for (let day = 1; day <= daysInMonth; day++) {
        let dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        dayDiv.innerText = day;

        if (day === gDate.getDate()) {
            dayDiv.classList.add("today");
        }

        calendarDays.appendChild(dayDiv);
    }
}

// تبديل التقويم بين الهجري والميلادي
let isHijri = false;
let displayedDate = new Date();

function toggleCalendar() {
    isHijri = !isHijri;
    if (isHijri) {
        renderHijriCalendar(displayedDate);
    } else {
        renderGregorianCalendar(displayedDate);
    }
}

// تحديث التقويم تلقائيًا كل سنة
function autoUpdateCalendar() {
    let now = new Date();
    if (now.getFullYear() !== displayedDate.getFullYear()) {
        displayedDate = now;
        if (isHijri) {
            renderHijriCalendar(displayedDate);
        } else {
            renderGregorianCalendar(displayedDate);
        }
    }
}

// تشغيل التحديث كل يوم عند الساعة 12:01 صباحًا
setInterval(autoUpdateCalendar, 86400000);

// عرض التقويم عند التشغيل
renderGregorianCalendar(displayedDate);
    