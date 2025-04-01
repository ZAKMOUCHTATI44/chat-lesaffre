import prisma from '../prisma/prisma'
const menuOptions = [
  {
    fr: "📦 1- Passer une commande de produits",
    ar: "📦 1- تقديم طلب لشراء المنتجات",
  },
  {
    fr: "🍞 2- Découvrir la gamme de produits",
    ar: "🍞 2- اكتشاف مجموعة المنتجات",
  },
  {
    fr: "🎧 3- Demander assistance ou support technique ?",
    ar: "🎧 3- طلب المساعدة أو الدعم الفني؟",
  },
  {
    fr: "💳 4- Programme Lesaffre & Moi",
    ar: "💳 4- برنامج Lesaffre & Moi",
  },
  {
    fr: "⚠️ 5- Soumettre une réclamation",
    ar: "⚠️ 5- تقديم شكوى",
  },
  {
    fr: "⭐ 6- noter nos services",
    ar: "⭐ 6- تقييم خدماتنا",
  },
  {
    fr: "🌐 7- S'abonner pages Lesaffre ou visiter site web",
    ar: "🌐 7- الاشتراك في صفحات Lesaffre أو زيارة الموقع الإلكتروني",
  },
  {
    fr: "📦 8- Devenir distributeur",
    ar: "📦 8- أن تصبح موزعًا",
  },
  {
    fr: "📍 9- Où nous trouver :",
    ar: "📍 9- أين تجدنا:",
  },
];

menuOptions.forEach(async (option) => {
  const lead = await prisma?.messageTemplate.create({
    data: {
      titleAr: option.ar,
      titleFr: option.fr,
      contentAr: "",
      contentFr: "",
    },
  });
  console.log(lead?.id)
});
