import prisma from "../prisma/prisma";

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
  { fr: "💳 4- Programme Lesaffre & Moi", ar: "💳 4- برنامج Lesaffre & Moi" },
  { fr: "⚠️ 5- Soumettre une réclamation", ar: "⚠️ 5- تقديم شكوى" },
  { fr: "⭐ 6- Noter nos services", ar: "⭐ 6- تقييم خدماتنا" },
  {
    fr: "🌐 7- S'abonner aux pages Lesaffre ou visiter le site web",
    ar: "🌐 7- الاشتراك في صفحات Lesaffre أو زيارة الموقع الإلكتروني",
  },
  { fr: "📍 8- Où nous trouver :", ar: "📍 9- أين تجدنا:" },
];

const produits = [
  {
    nom: "Levure pressée",
    description: {
      fr: "Conditionnement pratique, incorporation facile.",
      ar: "تعبئة عملية، دمج سهل.",
    },
  },
  {
    nom: "Levure sèche",
    description: {
      fr: "Répartition rapide et homogène dans la pâte.",
      ar: "توزيع سريع ومتجانس في العجين.",
    },
  },
  {
    nom: "Améliorants",
    description: {
      fr: "Optimise les caractéristiques des produits finis.",
      ar: "تحسين خصائص المنتجات النهائية.",
    },
  },
  {
    nom: "Compléments de panification",
    description: {
      fr: "Enrichit le profil sensoriel et la conservation.",
      ar: "يعزز النكهة والحفظ.",
    },
  },
  {
    nom: "Levains",
    description: {
      fr: "Apporte des arômes et des propriétés spécifiques.",
      ar: "يوفر نكهات وخصائص مميزة.",
    },
  },
  {
    nom: "Levain",
    description: {
      fr: "Favorise une fermentation naturelle et riche en arômes.",
      ar: "يعزز تخميرًا طبيعيًا وغنيًا بالنكهات.",
    },
  },
  {
    nom: "Levure désactivée",
    description: {
      fr: "Utilisée pour diverses applications techniques.",
      ar: "تستخدم لتطبيقات تقنية مختلفة.",
    },
  },
];

const regions = [
  { region: "Tanger-Tétouan-Al Hoceïma", telephone: "+212 539 00 11 22" },
  { region: "L'Oriental", telephone: "+212 536 66 77 88" },
  { region: "Fès-Meknès", telephone: "+212 535 44 55 66" },
  { region: "Rabat-Salé-Kénitra", telephone: "+212 537 77 88 99" },
  { region: "Béni Mellal-Khénifra", telephone: "+212 523 33 44 55" },
  { region: "Casablanca-Settat", telephone: "+212 522 22 33 44" },
  { region: "Marrakech-Safi", telephone: "+212 524 44 55 66" },
  { region: "Drâa-Tafilalet", telephone: "+212 528 88 99 00" },
  { region: "Souss-Massa", telephone: "+212 528 22 33 44" },
  { region: "Guelmim-Oued Noun", telephone: "+212 528 66 77 88" },
];

const createMessageTemplates = async () => {
  if (!prisma) {
    console.error("Erreur : Prisma n'est pas initialisé.");
    return;
  }

  for (const option of menuOptions) {
    try {
      const lead = await prisma.messageTemplate.create({
        data: {
          titleAr: option.ar,
          titleFr: option.fr,
          contentAr: "",
          contentFr: "",
        },
      });
      console.log(`MessageTemplate créé avec ID : ${lead.id}`);
    } catch (error) {
      console.error("Erreur lors de la création du MessageTemplate :", error);
    }
  }

  for (const produit of produits) {
    try {
      const lead = await prisma.product.create({
        data: {
          name: produit.nom,
          contentAr: produit.description.ar,
          contentFr: produit.description.fr,
        },
      });
      console.log(`Produits créé avec ID : ${lead.id}`);
    } catch (error) {
      console.error("Erreur lors de la création du MessageTemplate :", error);
    }
  }

  for (const region of regions) {
    await prisma.region.create({
      data: {
        nom: region.region,
        telephone: region.telephone,
      },
    });
  }
};

// Exécuter la fonction
createMessageTemplates();
