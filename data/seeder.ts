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
    nom: "Jaouda",
    description: {
      fr: `La levure Jaouda est une levure pressée qui 
convient à tous les procédés de panification 
traditionnels et modernes. Elle permet une 
fermentation régulière grâce à son haut pouvoir 
fermentatif. Adaptée à tous les types de produits 
(pains, viennoiseries…), elle garantit qualité et 
sécurité. Référence incontournable des 
boulangers, elle assure des résultats fiables à 
chaque utilisation.`,
      ar: `الخميرة جودة هي خميرة مضغوطة تناسب جميع أنواع التخمير التقليدي 
والحديث. تتميز بالتخمير المنتظم والقوة العالية في التخمير، مع احترام 
معايير الجودة والسلامة. ملائمة لجميع أنواع المنتجات مثل الخبز 
والمخبوزات. تُعد مرجعًا أساسيًا وموثوقًا للخبازين في مختلف 
الاستعمالات.`,
    },
  },
  {
    nom: "Saf-Instant Gold",
    description: {
      fr: `Saf-Instant Gold est une levure sèche instantanée idéale 
pour les produits sucrés et autres produits de boulangerie 
avec un taux de sucre entre 3% et 30%. Elle offre une 
excellente performance même en présence d’inhibiteurs 
de moisissures.`,
      ar: `Saf-Instant Gold هي خميرة جافة فورية مثالية للمنتجات الحلوة وغيرها من 
منتجات المخابز التي تحتوي على نسبة سكر بين 3% و30%. توفر أداءً ممتازًا 
حتى في وجود مثبطات العفن.`,
    },
  },
  {
    nom: "IBIS BLEU",
    description: {
      fr: `IBIS Bleu est un améliorant spécifiquement formulé pour 
tous types de pains. Il permet une tolérance de la pâte 
renforcée, apporte plus de force et une meilleure tenue 
des pâtes en méthode directe. Il procure un meilleur 
volume grâce à une extensibilité accrue, et offre une mie 
plus aérée ainsi qu’une croûte fine, croustillante et bien 
dorée. Agissant à tous les stades de la fabrication, 
il garantit la qualité des produits finis. Ses performances 
reconnues facilitent le travail du boulanger et permettent 
d’accroître la satisfaction des consommateurs.`,
      ar: `IBIS Bleu هو محسّن مخبوزات مُخصص لجميع أنواع الخبز. يوفّر تحمّلًا معززًا 
للعجينة ويزيد من قوة وثبات العجين في الطريقة المباشرة. يمنح حجمًا أفضل 
بفضل قابلية تمدد عالية، كما يسمح بالحصول على قشرة رقيقة، مقرمشة وذات 
لون ذهبي وفتات خبز أكثر تهوية. يعمل في جميع مراحل التصنيع ويضمن جودة 
المنتجات النهائية. أداؤه المعترف به يساعد الخبازين يوميًا على تحسين العمل 
وزيادة رضا المستهلكين.`,
    },
  },
  {
    nom: "IBIS PLATINIUM",
    description: {
      fr: `Ibis Platinium permet une belle dorure, un meilleur 
volume et une tolérance de la pâte renforcée. Il est 
adapté à tous les types de pain et permet de remplacer 
la quantité de sucre ajoutée à la farine. Facile à utiliser, 
il s’incorpore directement avec les autres ingrédients.`,
      ar: `يمنح Ibis Platinium لونًا ذهبيًا جميلًا، وحجمًا أفضل، مع تحمّل معزز للعجين. 
مناسب لجميع أنواع الخبز، ويُستخدم كبديل لكمية السكر المضافة إلى الدقيق. 
يُدمج مباشرة مع باقي المكونات أثناء التحضير.`,
    },
  },
  {
    nom: "Magimix Rouge",
    description: {
      fr: `Magimix Rouge est un améliorant spécialement conçu 
pour la production de viennoiseries et pains spéciaux. 
Il permet une tolérance de la pâte renforcée, un meilleur 
volume, un passage en machine facile, ainsi qu’une belle 
présentation des produits avec une plus grande sécurité. 
À incorporer directement avec les autres ingrédients.`,
      ar: `Magimix Rouge هو محسّن مخبوزات مخصص لإنتاج الفطائر والخبز الخاص. 
يسمح بـتحمّل معزز للعجين، وحجم أفضل، وسهولة مرور العجين عبر الآلة. 
يضمن مظهرًا جميلاً للمنتجات وأمانًا أكبر. يُدمج مباشرة مع باقي المكونات 
ويُخلط جيدًا.`,
    },
  },
  {
    nom: "Magimix Jaune",
    description: {
      fr: `Magimix Soft est un complément moelleux spécialement 
développé pour apporter une texture souple et moelleuse 
à vos produits de panification. Ses performances sont 
basées sur une combinaison d’ingrédients fonctionnels 
aux propriétés anti-rassissement. La formule ne contient 
aucun agent anti-moisissure ni gomme, ce qui permet 
d’éviter le développement de tout micro-organisme. 
Combiné à votre améliorant habituel, Magimix Soft 
préserve le moelleux de la mie pendant la durée de vie 
des produits, sans en augmenter l’humidité.`,
      ar: `Magimix Soft يمنح قوامًا ناعمًا ومرنًا بفضل مكوناته ذات الخصائص مضادة 
للتجفيف. لا يحتوي على مواد مضادة للعفن أو جلود، مما يمنع نمو الكائنات الدقيقة. 
يحافظ على ليونة فتات الخبز دون زيادة الرطوبة.`,
    },
  },
  {
    nom: "Magimix Vert",
    description: {
      fr: `Magimix Vert améliore le lissage et l’extensibilité des pâtes, 
garantissant un excellent comportement au laminage. 
Il assure un bon volume à la cuisson, même après plusieurs 
mois de conservation à -18°C. Spécialement conçu pour les 
viennoiseries et produits préfermentés surgelés, il facilite la 
cuisson directe sans décongélation.`,
      ar: `Magimix Vert يُحسّن تمليس وتمدّد العجين، ويضمن أداءً ممتازًا أثناء الفرد. يوفر 
حجمًا جيدًا بعد الخبز حتى بعد تخزين طويل عند -18 درجة مئوية. مخصّص للمعجنات 
والمنتجات المسبقة التخمير والمجمدة، ويسهّل الخبز المباشر دون إذابة تجميد.`,
    },
  },
  {
    nom: "Magimix Vert",
    description: {
      fr: `Magimix Vert améliore le lissage et l’extensibilité des pâtes, 
garantissant un excellent comportement au laminage. 
Il assure un bon volume à la cuisson, même après plusieurs 
mois de conservation à -18°C. Spécialement conçu pour les 
viennoiseries et produits préfermentés surgelés, il facilite la 
cuisson directe sans décongélation.`,
      ar: `Magimix Vert يُحسّن تمليس وتمدّد العجين، ويضمن أداءً ممتازًا أثناء الفرد. يوفر 
حجمًا جيدًا بعد الخبز حتى بعد تخزين طويل عند -18 درجة مئوية. مخصّص للمعجنات 
والمنتجات المسبقة التخمير والمجمدة، ويسهّل الخبز المباشر دون إذابة تجميد.`,
    },
  },
  {
    nom: "Inventis Premix Rustique",
    description: {
      fr: `Inventis Premix Rustique contient tous les ingrédients, à 
l’exception de la levure, pour élaborer facilement des pains 
authentiques et originaux. Il offre un meilleur volume et une 
tolérance optimale, une belle couleur de mie beige ainsi 
qu’une douce acidité.`,
      ar: `Inventis Premix Rustique يحتوي على جميع المكونات باستثناء الخميرة، 
لتسهيل تحضير خبز أصيل وأصلي. يوفر حجمًا أفضل وتحمّلًا ممتازًا، مع لون فتات 
ذهبي جميل وحموضة خفيفة.`,
    },
  },
  {
    nom: "Inventis Premix Saveur",
    description: {
      fr: `Inventis Premix Saveur contient tous les ingrédients, à 
l’exception de la levure, pour élaborer facilement une large 
gamme de pains savoureux. Il offre un meilleur volume et 
une tolérance optimale, une belle couleur de mie ainsi que 
des subtiles notes beurrées et lactées.`,
      ar: `Inventis Premix Saveur يحتوي على جميع المكونات باستثناء الخميرة، لتسهيل 
تحضير مجموعة واسعة من الخبز اللذيذ. يوفر حجمًا أفضل وتحمّلًا ممتازًا، مع لون 
فتات جميل ونكهات زبدية وحليبية دقيقة.`,
    },
  },
  {
    nom: "Livendo",
    description: {
      fr: `Livendo est un levain liquide en conditionnement de 5 litres 
qui apporte une saveur délicieuse et un éclat particulier aux 
préparations de boulangerie et viennoiserie. Il donne une 
signature unique aux produits grâce à son odeur, sa couleur 
et ses arômes, fidélisant ainsi la clientèle. Facile à conserver 
et à doser, Livendo se distingue par son utilisation simplifiée.`,
      ar: `Livendo هو خميرة سائلة معبأة في عبوة 5 لترات، تضيف نكهة لذيذة ولمعان خاص 
لجميع منتجات المخابز والمعجنات. سهل الحفظ والقياس، ويمتاز بسهولة الاستخدام.`,
    },
  },
];

const regions = [
  { region: "Tanger-Tétouan-Al Hoceïma", telephone: "+212 539 00 11 22" },
  { region: "Zone GHARB", telephone: "+212662764537" },
  { region: "Zone NORD", telephone: "+212662764537" },
  { region: "Zone SUD", telephone: "+212673239401" },
  { region: "Zone SAISS", telephone: "+212661324539" },
  { region: "Zone ATLAS", telephone: "+212661355097" },
  { region: "Zone ORIENTALE", telephone: "+212661451032" },
  { region: "Zone ATLANTIC", telephone: "+212667801989" },
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
