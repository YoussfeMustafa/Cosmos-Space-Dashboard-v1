document.addEventListener("DOMContentLoaded", () => {
    // --- 1. تعريف العناصر ---
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".app-section");


    // بيانات الكواكب
    const planetsData = {
        mercury: {
            name: "Mercury",
            description: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days.",
            distance: "57.9M km",
            radius: "2,440 km",
            mass: "3.285 × 10²³ kg",
            moons: "0",
            color: "#eab308"
        },
        venus: {
            name: "Venus",
            description: "Venus is the second planet from the Sun. It is sometimes called Earth's 'sister' planet as it is almost as large.",
            distance: "108.2M km",
            radius: "6,052 km",
            mass: "4.867 × 10²⁴ kg",
            moons: "0",
            color: "#f97316"
        },
        earth: {
            name: "Earth",
            description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
            distance: "149.6M km",
            radius: "6,371 km",
            mass: "5.97 × 10²⁴ kg",
            moons: "1",
            color: "#3b82f6"
        },

        mars: {
            name: "Mars",
            description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Often called the 'Red Planet' due to its reddish appearance.",
            distance: "227.9M km (1.52 AU)",
            radius: "3,389 km",
            mass: "6.39 × 10²³ kg",
            moons: "2",
            color: "#ef4444"
        },
        jupiter: {
            name: "Jupiter",
            description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.",
            distance: "778.5M km (5.20 AU)",
            radius: "69,911 km",
            mass: "1.898 × 10²⁷ kg",
            moons: "95",
            color: "#f59e0b"
        },
        saturn: {
            name: "Saturn",
            description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It is famous for its complex and beautiful ring system.",
            distance: "1.4B km (9.58 AU)",
            radius: "58,232 km",
            mass: "5.683 × 10²⁶ kg",
            moons: "146",
            color: "#eab308"
        },
        uranus: {
            name: "Uranus",
            description: "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
            distance: "2.9B km (19.22 AU)",
            radius: "25,362 km",
            mass: "8.681 × 10²⁵ kg",
            moons: "28",
            color: "#22d3ee"
        },
        neptune: {
            name: "Neptune",
            description: "Neptune is the eighth and farthest known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter.",
            distance: "4.5B km (30.05 AU)",
            radius: "24,622 km",
            mass: "1.024 × 10²⁶ kg",
            moons: "16",
            color: "#6366f1"
        }
        // ضيف باقي الكواكب هنا بنفس النمط...
    };

    // --- وظيفة تحديث التاريخ لتاريخ اليوم ---
    const dateInput = document.getElementById('apod-date-input');
    const displayDate = document.getElementById('display-date');

    if (dateInput) {
        // 1. الحصول على تاريخ اليوم بتنسيق YYYY-MM-DD
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${yyyy}-${mm}-${dd}`;

        // 2. تعيين القيمة الافتراضية وأقصى تاريخ مسموح به
        dateInput.value = formattedToday;
        dateInput.max = formattedToday;

        // 3. تحديث النص الظاهر (الـ Span) بتنسيق جميل
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        displayDate.textContent = today.toLocaleDateString('en-US', options);

        // 4. تغيير النص لما المستخدم يختار تاريخ جديد
        dateInput.addEventListener('change', (e) => {
            const selectedDate = new Date(e.target.value);
            displayDate.textContent = selectedDate.toLocaleDateString('en-US', options);

            // هنا تقدر تنادي على وظيفة تجيب صورة اليوم (NASA API) بناءً على التاريخ الجديد
            // updateApod(e.target.value); 
        });
    }

    // عناصر تفاصيل الكوكب
    const planetCards = document.querySelectorAll('.planet-card');
    const detailImage = document.getElementById('planet-detail-image');
    const detailName = document.getElementById('planet-detail-name');
    const detailDescription = document.getElementById('planet-detail-description');
    const detailDistance = document.getElementById('planet-distance');
    const detailRadius = document.getElementById('planet-radius');
    const detailMass = document.getElementById('planet-mass');
    const detailMoons = document.getElementById('planet-moons');

    // --- 2. وظيفة تحديث الكوكب عند الضغط ---
    planetCards.forEach(card => {
        card.addEventListener('click', () => {
            const planetId = card.getAttribute('data-planet-id');
            const data = planetsData[planetId];

            if (data) {
                // تحديث النصوص
                detailName.textContent = data.name;
                detailDescription.textContent = data.description;
                detailDistance.textContent = data.distance;
                detailRadius.textContent = data.radius;
                detailMass.textContent = data.mass;
                detailMoons.textContent = data.moons;

                // تحديث الصورة
                detailImage.src = `./assets/images/${planetId}.png`;
                detailImage.alt = `${data.name} planet`;

                // تأثير الانتقال (smooth transition)
                detailImage.classList.add('opacity-0', 'scale-90');
                setTimeout(() => {
                    detailImage.classList.remove('opacity-0', 'scale-90');
                    detailImage.classList.add('opacity-100', 'scale-100');
                }, 50);

                // سكرول تلقائي لمنطقة التفاصيل (اختياري)
                document.getElementById('planet-details-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 3. وظيفة التبديل بين الأقسام (Sidebar) ---
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-section");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                sections.forEach((section) => section.classList.add("hidden"));
                targetSection.classList.remove("hidden");

                navLinks.forEach((l) => {
                    l.classList.remove("bg-blue-500/10", "text-blue-400");
                    l.classList.add("text-slate-300");
                });
                link.classList.add("bg-blue-500/10", "text-blue-400");
                link.classList.remove("text-slate-300");

                if (window.innerWidth < 1024) {
                    sidebar.classList.add("-translate-x-full");
                }
            }
        });
    });

    // --- 4. زر الموبايل ---
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("-translate-x-full");
        });
    }

    console.log("Cosmos Dashboard is Ready! 🚀");
});
// --- تحديث تاريخ APOD ---
const apodInput = document.getElementById('apod-date-input');
const apodDateInfo = document.getElementById('apod-date-info');

if (apodInput && apodDateInfo) {
    // 1. الحصول على تاريخ اليوم وتنسيقه
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    // 2. تعيين القيمة الافتراضية للـ Input والـ Span عند تحميل الصفحة
    apodInput.value = todayStr;
    apodInput.max = todayStr; // لمنع اختيار تاريخ في المستقبل
    apodDateInfo.textContent = todayStr;

    // 3. مستمع أحداث لتغيير النص فور اختيار تاريخ جديد
    apodInput.addEventListener('input', (e) => {
        const selectedDate = e.target.value;

        // تحديث الـ Span بالتاريخ المختار
        apodDateInfo.textContent = selectedDate;

        // نصيحة: هنا يمكنك استدعاء دالة fetchApod(selectedDate) 
        // لتحديث الصورة بناءً على التاريخ الجديد
        console.log("Fetching data for:", selectedDate);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const apodFullDateText = document.getElementById('apod-date');
    const apodInput = document.getElementById('apod-date-input');

    const formatAndShowDate = (dateValue) => {
        const dateObj = new Date(dateValue);

        // تنسيق التاريخ ليكون بالشكل: March 14, 2024
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        // تحديث النص داخل الـ p
        if (apodFullDateText) {
            apodFullDateText.textContent = `Astronomy Picture of the Day - ${formattedDate}`;
        }
    };

    // 1. عند التحميل: اجلب تاريخ اليوم بتوقيتك المحلي
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // تنفيذ التحديث الأولي
    formatAndShowDate(todayStr);

    // 2. إذا كان لديك input للتاريخ، اربطه ليحدث هذا النص أيضًا
    if (apodInput) {
        apodInput.addEventListener('input', (e) => {
            formatAndShowDate(e.target.value);
        });
    }
});