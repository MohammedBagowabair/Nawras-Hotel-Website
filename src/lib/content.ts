// All copy for the demo hotel "Nawras" — a fictional seaside house on the Mukalla coast.
export type Lang = "ar" | "en";
export type L = { en: string; ar: string };

export const meta = {
  title: { en: "Nawras Mukalla — Sea House & Suites", ar: "نَورَس المكلا — بيت على البحر" },
  description: {
    en: "A light, airy seaside boutique hotel on the Khalf shore of Mukalla, Hadramout (demo concept). Sea rooms, a pool on the horizon, dhow mornings and Khor evenings. Book on WhatsApp.",
    ar: "فندق بوتيك بحري خفيف ومشرق على شاطئ خلف في المكلا، حضرموت (تصميم تجريبي). غرف على البحر، ومسبح على الأفق، وصباحات بالسنبوق، ومساءات على الخور. احجز عبر واتساب.",
  },
};

export const brand = {
  name: { en: "Nawras", ar: "نَورَس" },
  place: { en: "Mukalla · Hadramout", ar: "المكلا · حضرموت" },
};

export const ui = {
  book: { en: "Book on WhatsApp", ar: "احجز عبر واتساب" },
  bookShort: { en: "Book", ar: "احجز" },
  call: { en: "Call", ar: "اتصال" },
  map: { en: "Map", ar: "الخريطة" },
  close: { en: "Close", ar: "إغلاق" },
  langSwitch: { en: "العربية", ar: "English" },
  langLabel: { en: "Switch to Arabic", ar: "Switch to English" },
  tabs: {
    home: { en: "Home", ar: "الرئيسية" },
    rooms: { en: "Rooms", ar: "الغرف" },
    day: { en: "Your day", ar: "يومك" },
    contact: { en: "Contact", ar: "تواصل" },
  },
  next: { en: "Next", ar: "التالي" },
  prev: { en: "Previous", ar: "السابق" },
  details: { en: "See the room", ar: "تفاصيل الغرفة" },
  requestRoom: { en: "Ask for this room", ar: "اطلب هذه الغرفة" },
  skip: { en: "Skip to content", ar: "تخطَّ إلى المحتوى" },
  demo: {
    en: "Demo concept: Nawras is a fictional hotel. Rooms, guests and reviews are invented and the photos are free-licence images, not the hotel's own. WhatsApp messages go to the site owner's demo number.",
    ar: "تصميم تجريبي: «نَورَس» فندق خيالي. الغرف والضيوف والآراء من وحي الخيال، والصور مجانية الترخيص وليست للفندق. رسائل واتساب تصل إلى رقم تجريبي لصاحب الموقع.",
  },
  credits: { en: "Photo credits", ar: "حقوق الصور" },
  openPhoto: { en: "Open photo", ar: "افتح الصورة" },
  storyOf: { en: "Story", ar: "القصة" },
  pause: { en: "Pause story", ar: "إيقاف القصة" },
  play: { en: "Play story", ar: "تشغيل القصة" },
  swipeHint: { en: "Swipe the card", ar: "اسحب البطاقة" },
};

export const heroStories: { kicker: L; title: L; text: L }[] = [
  {
    kicker: { en: "Khalf shore, Mukalla", ar: "شاطئ خلف، المكلا" },
    title: { en: "Where the day begins at sea", ar: "هنا يبدأ اليوم من البحر" },
    text: { en: "Eighteen white rooms a few steps from the Arabian Sea.", ar: "ثماني عشرة غرفة بيضاء على بُعد خطوات من بحر العرب." },
  },
  {
    kicker: { en: "The horizon pool", ar: "مسبح الأفق" },
    title: { en: "A pool that melts into the horizon", ar: "مسبحٌ يذوب في الأفق" },
    text: { en: "Swim at sunrise, read in the shade, nap to the sound of the waves.", ar: "سباحة مع الشروق، وقراءة في الظل، وقيلولة على صوت الموج." },
  },
  {
    kicker: { en: "Evenings on the Khor", ar: "مساءات الخور" },
    title: { en: "And Mukalla glows along the Khor", ar: "والمكلا تضيء على الخور" },
    text: { en: "Old Mukalla, the souq and the corniche are a short drive away.", ar: "المكلا القديمة والسوق والكورنيش على مسافة قصيرة بالسيارة." },
  },
];

export const tide = {
  title: { en: "Today on the shore", ar: "اليوم على الشاطئ" },
  sunrise: { en: "Sunrise", ar: "الشروق" },
  sunset: { en: "Sunset", ar: "الغروب" },
  high: { en: "High tide", ar: "المدّ" },
  low: { en: "Low tide", ar: "الجزر" },
  moon: { en: "Moon", ar: "القمر" },
  water: { en: "Sea", ar: "البحر" },
  note: {
    en: "Sunrise and sunset are calculated for Mukalla. Tides and sea temperature are rough estimates for planning, not navigation.",
    ar: "أوقات الشروق والغروب محسوبة لمدينة المكلا. أما المدّ والجزر وحرارة البحر فتقديرية للتخطيط فقط، لا للملاحة.",
  },
  moons: [
    { en: "New", ar: "محاق" }, { en: "Crescent", ar: "هلال" }, { en: "Half", ar: "تربيع" }, { en: "Gibbous", ar: "أحدب" },
    { en: "Full", ar: "بدر" }, { en: "Gibbous", ar: "أحدب" }, { en: "Half", ar: "تربيع" }, { en: "Crescent", ar: "هلال" },
  ] as L[],
};

export const intro = {
  eyebrow: { en: "The house", ar: "البيت" },
  title: {
    en: "A white house by the water, built for slow days.",
    ar: "بيتٌ أبيض على الماء، صُنع للأيام الهادئة.",
  },
  text: {
    en: "Nawras is named after the gulls that follow the fishing boats home every afternoon. Rooms open onto the sea breeze, floors are cool limestone, and the kitchen cooks whatever the boats bring in.",
    ar: "سُمّي «نَورَس» على اسم الطيور التي ترافق قوارب الصيد إلى البرّ كل عصر. تنفتح الغرف على نسيم البحر، والأرضيات حجر جيري بارد، والمطبخ يطهو ما تجلبه القوارب.",
  },
  facts: [
    { n: { en: "18", ar: "١٨" }, l: { en: "rooms & suites", ar: "غرفة وجناحًا" } },
    { n: { en: "200 m", ar: "٢٠٠ م" }, l: { en: "of quiet sand", ar: "من الرمل الهادئ" } },
    { n: { en: "1", ar: "١" }, l: { en: "house dhow", ar: "سنبوق للبيت" } },
  ],
};

export type Room = { id: string; name: L; tag: L; size: L; view: L; guests: L; bed: L; text: L; features: L[]; photos: string[]; tone: string };
export const rooms = {
  eyebrow: { en: "Stay", ar: "الإقامة" },
  title: { en: "Pick your corner of the sea", ar: "اختر ركنك من البحر" },
  hint: { en: "Swipe the deck or use the arrows. Tap a card for details.", ar: "اسحب البطاقات أو استخدم الأسهم، واضغط على البطاقة للتفاصيل." },
  items: [
    {
      id: "wave",
      name: { en: "Wave Room", ar: "غرفة الموجة" },
      tag: { en: "Bright, simple, a balcony on the sea", ar: "مشرقة وبسيطة، وشرفة على البحر" },
      size: { en: "32 m²", ar: "٣٢ م²" },
      view: { en: "Sea view", ar: "إطلالة بحرية" },
      guests: { en: "Up to 2 guests", ar: "حتى ضيفين" },
      bed: { en: "King or twin", ar: "سرير كبير أو سريران" },
      text: {
        en: "White linen, a reading corner and a small balcony where breakfast tastes better. The sound of the waves is the only alarm clock.",
        ar: "مفارش بيضاء، وركن للقراءة، وشرفة صغيرة يصبح فيها الفطور ألذّ. صوت الموج هو المنبّه الوحيد.",
      },
      features: [
        { en: "Balcony with two chairs", ar: "شرفة بكرسيين" },
        { en: "Rain shower", ar: "دُش مطري" },
        { en: "Breakfast in bed on request", ar: "فطور في السرير عند الطلب" },
        { en: "Fast Wi-Fi", ar: "واي فاي سريع" },
      ],
      photos: ["wave", "wave2", "shell"],
      tone: "#cfe9e6",
    },
    {
      id: "terrace",
      name: { en: "Terrace Suite", ar: "جناح السطح" },
      tag: { en: "A private roof terrace above the bay", ar: "سطح خاص فوق الخليج" },
      size: { en: "58 m²", ar: "٥٨ م²" },
      view: { en: "Panoramic bay view", ar: "إطلالة بانورامية على الخليج" },
      guests: { en: "Up to 3 guests", ar: "حتى ثلاثة ضيوف" },
      bed: { en: "King + day bed", ar: "سرير كبير + أريكة نوم" },
      text: {
        en: "A living room in sea-washed whites and a terrace for long sunsets, with shade, cushions and a view all the way to the mountains behind Mukalla.",
        ar: "صالة بألوان بيضاء غسلها البحر، وسطح لغروب طويل مع ظل ووسائد وإطلالة حتى الجبال خلف المكلا.",
      },
      features: [
        { en: "Private roof terrace", ar: "سطح خاص" },
        { en: "Separate living room", ar: "صالة منفصلة" },
        { en: "Sunset tea service", ar: "شاي الغروب" },
        { en: "Deep soaking tub", ar: "حوض استحمام عميق" },
      ],
      photos: ["terrace", "terrace2", "dunes"],
      tone: "#f6dcd2",
    },
    {
      id: "villa",
      name: { en: "Pool Villa", ar: "فيلا المسبح" },
      tag: { en: "Your own plunge pool facing the horizon", ar: "مسبحك الخاص في مواجهة الأفق" },
      size: { en: "85 m²", ar: "٨٥ م²" },
      view: { en: "Horizon & garden", ar: "الأفق والحديقة" },
      guests: { en: "Up to 4 guests", ar: "حتى أربعة ضيوف" },
      bed: { en: "2 bedrooms", ar: "غرفتا نوم" },
      text: {
        en: "Two bedrooms around a courtyard and a plunge pool that seems to pour into the sea. Made for families and friends who want their own world.",
        ar: "غرفتا نوم حول فناء، ومسبح صغير يبدو كأنه يصبّ في البحر. للعائلات والأصدقاء الذين يريدون عالمهم الخاص.",
      },
      features: [
        { en: "Private plunge pool", ar: "مسبح خاص" },
        { en: "Courtyard dining", ar: "عشاء في الفناء" },
        { en: "Kids' beds on request", ar: "أسرّة أطفال عند الطلب" },
        { en: "Butler on WhatsApp", ar: "خدمة شخصية عبر واتساب" },
      ],
      photos: ["villa", "villa2", "reading"],
      tone: "#d7e6f2",
    },
  ] as Room[],
};

export type Step = { time: L; title: L; text: L; photo: string };
export const day = {
  eyebrow: { en: "A day at Nawras", ar: "يوم في نَورَس" },
  title: { en: "Plan nothing. Or plan this.", ar: "لا تخطّط لشيء. أو خطّط لهذا." },
  tabs: [
    { en: "Sea day", ar: "يوم البحر" },
    { en: "City day", ar: "يوم المدينة" },
  ] as L[],
  plans: [
    [
      { time: { en: "06:00", ar: "٦:٠٠" }, title: { en: "Sunrise stretch", ar: "تمارين الشروق" }, text: { en: "Gentle yoga on the sand while the sea is still glass.", ar: "يوغا هادئة على الرمل والبحر ما زال كالزجاج." }, photo: "yoga" },
      { time: { en: "08:00", ar: "٨:٠٠" }, title: { en: "Breakfast by the pool", ar: "فطور بجانب المسبح" }, text: { en: "Hadrami honey, fresh bread, eggs any way and strong coffee.", ar: "عسل حضرمي، وخبز طازج، وبيض كما تحب، وقهوة قوية." }, photo: "breakfast" },
      { time: { en: "10:00", ar: "١٠:٠٠" }, title: { en: "Out on the dhow", ar: "رحلة بالسنبوق" }, text: { en: "Two hours along the coast with the house captain. Swim stops included.", ar: "ساعتان على طول الساحل مع ربّان البيت، مع توقّفات للسباحة." }, photo: "dhow" },
      { time: { en: "13:30", ar: "١:٣٠" }, title: { en: "The catch, grilled", ar: "صيد اليوم مشويًا" }, text: { en: "Lunch is whatever the boats brought in, with lime and rice.", ar: "الغداء ما جلبته القوارب، مع الليمون والأرز." }, photo: "palms" },
      { time: { en: "16:00", ar: "٤:٠٠" }, title: { en: "Pool and a book", ar: "المسبح وكتاب" }, text: { en: "The quiet hours. Shade, cold juice and the library cart.", ar: "ساعات الهدوء: ظل، وعصير بارد، وعربة الكتب." }, photo: "reading" },
      { time: { en: "18:00", ar: "٦:٠٠" }, title: { en: "Sunset on the sand", ar: "الغروب على الرمل" }, text: { en: "Lanterns, cushions and spiced tea where the waves end.", ar: "فوانيس ووسائد وشاي بالبهارات حيث ينتهي الموج." }, photo: "sunset" },
    ],
    [
      { time: { en: "07:30", ar: "٧:٣٠" }, title: { en: "Coffee on the terrace", ar: "قهوة على السطح" }, text: { en: "Watch the fishing boats leave the bay.", ar: "شاهد قوارب الصيد تغادر الخليج." }, photo: "terrace" },
      { time: { en: "09:30", ar: "٩:٣٠" }, title: { en: "Al-Gwayzi fort", ar: "حصن الغويزي" }, text: { en: "The little fort on its rock at the city's gate.", ar: "الحصن الصغير على صخرته عند مدخل المدينة." }, photo: "fort" },
      { time: { en: "11:00", ar: "١١:٠٠" }, title: { en: "Sultan's palace & museum", ar: "قصر السلطان والمتحف" }, text: { en: "The white Qu'aiti palace on the waterfront.", ar: "قصر القعيطي الأبيض على الواجهة البحرية." }, photo: "palace" },
      { time: { en: "13:00", ar: "١:٠٠" }, title: { en: "Lunch in the old town", ar: "غداء في المدينة القديمة" }, text: { en: "Our driver knows the best mandi and the best sweets.", ar: "سائقنا يعرف أفضل مندي وأطيب الحلويات." }, photo: "khor" },
      { time: { en: "17:00", ar: "٥:٠٠" }, title: { en: "Al-Shaggain rocks", ar: "صخور الشقين" }, text: { en: "Golden light on the cliffs west of the city.", ar: "ضوء ذهبي على المنحدرات غرب المدينة." }, photo: "rocks" },
      { time: { en: "20:00", ar: "٨:٠٠" }, title: { en: "Walk the Khor", ar: "نزهة على الخور" }, text: { en: "Lights on the water and ice cream on the corniche.", ar: "أضواء على الماء وآيس كريم على الكورنيش." }, photo: "night" },
    ],
  ] as Step[][],
  ask: { en: "Ask us to arrange this day", ar: "اطلب منّا ترتيب هذا اليوم" },
};

export const house = {
  eyebrow: { en: "On the house", ar: "من البيت" },
  title: { en: "Small things, done well", ar: "أشياء صغيرة، بإتقان" },
  items: [
    { icon: "pool", t: { en: "Horizon pool", ar: "مسبح الأفق" } },
    { icon: "sun", t: { en: "Breakfast included", ar: "الفطور مشمول" } },
    { icon: "car", t: { en: "Airport pick-up", ar: "استقبال من المطار" } },
    { icon: "wifi", t: { en: "Fast Wi-Fi", ar: "واي فاي سريع" } },
    { icon: "wave", t: { en: "Kayaks & snorkels", ar: "قوارب كاياك وأقنعة غطس" } },
    { icon: "leaf", t: { en: "Shaded garden", ar: "حديقة مظلّلة" } },
  ],
};

export const postcards = {
  eyebrow: { en: "Postcards", ar: "بطاقات بريدية" },
  title: { en: "Notes guests left behind", ar: "كلمات تركها الضيوف" },
  items: [
    { q: { en: "We came for two nights and stayed five. The dhow morning was the best day of the year.", ar: "جئنا لليلتين وبقينا خمسًا. صباح السنبوق كان أجمل يوم في السنة." }, who: { en: "Huda & Sami", ar: "هدى وسامي" }, from: { en: "Aden", ar: "عدن" } },
    { q: { en: "Quiet, clean and kind. The kids still talk about the turtles.", ar: "هادئ ونظيف وطيّب. ما زال الأطفال يتحدّثون عن السلاحف." }, who: { en: "The Ba-Wazir family", ar: "عائلة باوزير" }, from: { en: "Seiyun", ar: "سيئون" } },
    { q: { en: "I worked from the terrace for a week. Best office I have ever had.", ar: "عملت من السطح أسبوعًا كاملًا. أجمل مكتب حظيت به." }, who: { en: "Lina", ar: "لينا" }, from: { en: "Dubai", ar: "دبي" } },
    { q: { en: "Fish straight from the boat, grilled in front of us. Simple and perfect.", ar: "سمك من القارب مباشرة، يُشوى أمامنا. بسيط ومثالي." }, who: { en: "Omar", ar: "عمر" }, from: { en: "Kuala Lumpur", ar: "كوالالمبور" } },
  ],
  note: { en: "Sample reviews for this demo.", ar: "آراء نموذجية لهذا العرض." },
};

export const gallery = {
  eyebrow: { en: "Moods", ar: "لحظات" },
  title: { en: "The colours of the coast", ar: "ألوان الساحل" },
  shots: ["beach", "boat", "sunset", "pool", "fort", "shell", "palace", "night"],
  captions: [
    { en: "Turquoise morning", ar: "صباح فيروزي" },
    { en: "Boats under the palms", ar: "قوارب تحت النخيل" },
    { en: "Low tide at dusk", ar: "جزر عند الغسق" },
    { en: "The pool at noon", ar: "المسبح وقت الظهيرة" },
    { en: "Al-Gwayzi fort, Mukalla", ar: "حصن الغويزي، المكلا" },
    { en: "Shells on the shore", ar: "أصداف على الشاطئ" },
    { en: "Qu'aiti palace, Mukalla", ar: "قصر القعيطي، المكلا" },
    { en: "The Khor at night", ar: "الخور ليلًا" },
  ] as L[],
};

export const location = {
  eyebrow: { en: "Find us", ar: "موقعنا" },
  title: { en: "On the Khalf shore, east of the Khor", ar: "على شاطئ خلف، شرق الخور" },
  text: {
    en: "Nawras is imagined on the quiet eastern shore of Mukalla. We meet every guest at Riyan airport and drive you in.",
    ar: "نتخيّل «نَورَس» على الشاطئ الشرقي الهادئ للمكلا. نستقبل كل ضيف في مطار الريان ونوصله إلى البيت.",
  },
  near: [
    { t: { en: "Khor Mukalla & corniche", ar: "خور المكلا والكورنيش" }, d: { en: "≈ 10 min", ar: "≈ ١٠ دقائق" } },
    { t: { en: "Old Mukalla & souq", ar: "المكلا القديمة والسوق" }, d: { en: "≈ 15 min", ar: "≈ ١٥ دقيقة" } },
    { t: { en: "Riyan airport", ar: "مطار الريان" }, d: { en: "≈ 30 min", ar: "≈ ٣٠ دقيقة" } },
  ],
  open: { en: "Open in Maps", ar: "افتح في الخرائط" },
};

export const faq = {
  eyebrow: { en: "Good to know", ar: "معلومات مفيدة" },
  title: { en: "Questions, answered", ar: "أسئلة وإجابات" },
  items: [
    { q: { en: "How do I book?", ar: "كيف أحجز؟" }, a: { en: "Tap Book, answer four quick questions and we open WhatsApp with your request written for you. We reply with availability.", ar: "اضغط «احجز»، وأجب عن أربعة أسئلة سريعة، فنفتح لك واتساب برسالة جاهزة. نردّ عليك بالتوفّر." } },
    { q: { en: "Is breakfast included?", ar: "هل الفطور مشمول؟" }, a: { en: "Yes, every stay includes breakfast by the pool or in your room.", ar: "نعم، تشمل كل إقامة الفطور بجانب المسبح أو في غرفتك." } },
    { q: { en: "When is the best season?", ar: "ما أفضل موسم للزيارة؟" }, a: { en: "October to April is warm and calm. Summer brings stronger winds and waves on this coast.", ar: "من أكتوبر إلى أبريل الجو دافئ والبحر هادئ. أما الصيف فتشتدّ فيه الرياح والأمواج على هذا الساحل." } },
    { q: { en: "Do you arrange trips?", ar: "هل ترتّبون الرحلات؟" }, a: { en: "Dhow mornings, old-town visits and day trips along the coast. Just ask on WhatsApp.", ar: "صباحات السنبوق، وزيارات المدينة القديمة، ورحلات يومية على الساحل. اطلب ذلك عبر واتساب." } },
    { q: { en: "Is Nawras a real hotel?", ar: "هل «نَورَس» فندق حقيقي؟" }, a: { en: "No. This is a design demo with invented content and free-licence photos.", ar: "لا. هذا عرض تصميم بمحتوى متخيَّل وصور مجانية الترخيص." } },
  ],
};

export const booking = {
  title: { en: "Plan your stay", ar: "خطّط لإقامتك" },
  hello: { en: "Hi! I'm the Nawras desk. Four quick questions and your WhatsApp message is ready.", ar: "أهلًا! معك مكتب نَورَس. أربعة أسئلة سريعة وتجهز رسالتك على واتساب." },
  qDates: { en: "When would you like to come?", ar: "متى تودّ القدوم؟" },
  qGuests: { en: "Who's coming?", ar: "من سيأتي؟" },
  qRoom: { en: "Any room in mind?", ar: "هل في بالك غرفة معيّنة؟" },
  qName: { en: "And your name?", ar: "وما اسمك؟" },
  checkIn: { en: "Arrive", ar: "الوصول" },
  checkOut: { en: "Leave", ar: "المغادرة" },
  nights: { en: "nights", ar: "ليالٍ" },
  night1: { en: "night", ar: "ليلة" },
  invalid: { en: "Departure must be after arrival.", ar: "يجب أن تكون المغادرة بعد الوصول." },
  adults: { en: "Adults", ar: "البالغون" },
  children: { en: "Children", ar: "الأطفال" },
  anyRoom: { en: "Surprise me", ar: "اختاروا لي" },
  name: { en: "Your name", ar: "اسمك" },
  namePh: { en: "e.g. Sara Ahmed", ar: "مثال: سارة أحمد" },
  needName: { en: "Please add your name.", ar: "من فضلك أضف اسمك." },
  preview: { en: "Your message", ar: "رسالتك" },
  send: { en: "Send on WhatsApp", ar: "أرسل عبر واتساب" },
  confirm: { en: "Looks good", ar: "تمام" },
  edit: { en: "Change", ar: "تعديل" },
  noPrice: { en: "We'll reply with availability. Nothing is charged here.", ar: "سنردّ عليك بالتوفّر، ولا يُدفع أي شيء هنا." },
};

export const contact = {
  title: { en: "Talk to the house", ar: "تواصل مع البيت" },
  wa: { en: "WhatsApp us", ar: "راسلنا على واتساب" },
  waSub: { en: "Fastest reply, any time", ar: "أسرع ردّ، في أي وقت" },
  call: { en: "Call", ar: "اتصل بنا" },
  callSub: { en: "The demo WhatsApp number", ar: "رقم واتساب التجريبي" },
  map: { en: "Open in Maps", ar: "افتح في الخرائط" },
  mapSub: { en: "Khalf shore, Mukalla", ar: "شاطئ خلف، المكلا" },
};

export const footer = {
  line: { en: "A light house by the Arabian Sea.", ar: "بيتٌ خفيف على بحر العرب." },
  rights: { en: "Design demo", ar: "عرض تصميم" },
};

export const notFound = {
  title: { en: "The tide took this page", ar: "أخذ المدُّ هذه الصفحة" },
  text: { en: "The page you're looking for isn't here. The shore is this way.", ar: "الصفحة التي تبحث عنها غير موجودة. الشاطئ من هنا." },
  home: { en: "Back to the shore", ar: "العودة إلى الشاطئ" },
};
