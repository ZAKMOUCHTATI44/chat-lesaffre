import { getLang } from "../services/leadService";
import prisma from "../prisma/prisma";
import { Lang } from "@prisma/client";

// getLang(phone,({lang}) => {
//     if(lang === "ar") {
//         text=`شكرًا لمشاركتكم معلومات الاتصال الخاصة بكم. سيتم التواصل معكم في أقرب وقت من قبل الفريق`
//     }

//     return callback({text,lang})

// })

export const getRegoinPhoneNumber = (regionId: string , lang : Lang) => {
  let text = `Voici le numéro de téléphone de notre commercial dédié à votre région : +212 6 216 860 10`;
  if (lang === "AR") {
    let text = `هذا هو رقم هاتف الممثل التجاري المخصص لمنطقتكم: +212 6 216 860 10`;
  }

  return text;
};
const getRegons = async () => {
  const options = await prisma?.region.findMany();
  const rows = options.map((option: any) => {
    const row = {
      id: `regions-${option.id}`,
      title: " ",
      description: option.nom,
    };

    return row;
  });

  return rows;
};

export const getStep1 = async (lang: Lang): Promise<any> => {
  let rows = await getRegons();

  let body = {
    fr: "Veuillez sélectionner votre région",
    ar: "الرجاء اختيار منطقتك",
  };

  let custom = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: lang === Lang.AR ? "lesaffre" : "lesaffre",
      },
      body: {
        text: lang === Lang.AR ? body.ar : body.fr,
      },
      footer: {
        text: " ",
      },
      action: {
        button: lang === "AR" ? "خيارات" : "Liste des régions",
        sections: [
          {
            title: lang === "AR" ? "اختار:" : "Choisir:",
            rows,
          },
        ],
      },
    },
  };

  return custom;
};

export const step3 = async (phone: string) => {
  let produits = ["Problème ,croûte", "Problème, pain de mie", "Problème"];
  const lang = await getLang(phone);

  let rows = produits.map((produit, index) => {
    return {
      id: `faq${index}`,
      title: " ",
      description: produit,
    };
  });

  let custom = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: lang === "AR" ? "DR BREAD" : "DR BREAD",
      },
      body: {
        text:
          lang === "AR"
            ? "الرجاء اختيار مشكلتك"
            : "Veuillez sélectionner votre option",
      },
      action: {
        button: lang === "AR" ? "خيارات" : "options",
        sections: [
          {
            title: lang === "AR" ? "اختار:" : "options",
            rows: rows,
          },
        ],
      },
    },
  };
  return custom;
};

export const step4 = async (phone: string) => {
  let produits = [
    "S'inscrire au programme Lesaffre & Moi",
    "Gagner des points de fidélité",
    "Consulter mon solde de points ?",
    "Recevoir mes cadeaux",
  ];
  const lang = await getLang(phone);

  let rows = produits.map((produit, index) => {
    return {
      id: `offre${index}`,
      title: " ",
      description: produit,
    };
  });

  let custom = {
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: lang === "AR" ? "DR BREAD" : "DR BREAD",
      },
      body: {
        text:
          lang === "AR"
            ? "الرجاء اختيار مشكلتك"
            : "Veuillez sélectionner votre options",
      },
      action: {
        button: lang === "AR" ? "خيارات" : "Options",
        sections: [
          {
            title: lang === "AR" ? "اختار:" : "Options",
            rows: rows,
          },
        ],
      },
    },
  };
  return custom;
};

export const getStep5 = async (phone: string): Promise<string> => {
  const lang = await getLang(phone);
  let text = `Merci de nous partager vos coordonnées ainsi que le motif de réclamation pour que l'équipe en charge puisse vous contacter et vous apporter l'aide nécessaire.`;

  if (lang === "AR") {
    text = `شكرًا لمشاركتكم معلومات الاتصال الخاصة بكم. سيتم التواصل معكم في أقرب وقت من قبل الفريق`;
  }

  return text;
};

export const getStep6 = async (phone: string): Promise<string> => {
  const lang = await getLang(phone);
  let text =
    "Sur une echelle de 1 a 10 comment évaluerez vous votre niveau de satisfaction globale avec Lesaffre";
  if (lang === "AR") {
    text = "على مقياس من 1 إلى 10، كيف تقيم مستوى رضاك العام مع ليزافر؟";
  }

  return text;
};

export const getStep7 = async (phone: string): Promise<string> => {
  const lang = await getLang(phone);
  let text = `Ci-dessous les liens vers nos pages Lesaffre .

Facebook : https://www.facebook.com/LesaffreMaroc/ 
Instagram  : https://www.instagram.com/lesaffre.maroc 
        
Afin d'accéder au site web de catalogues
https://www.lesaffredoc.ma/`;
  if (lang === "AR") {
    text = `من أجل الوصول إلى مواقعنا الإلكترونية ، ندعوك للنقر على الروابط أدناه 👇

Facebook : https://www.facebook.com/LesaffreMaroc/
    
Instagram  : https://www.instagram.com/lesaffre.maroc
    
Afin d'accéder au site web de catalogues
https://www.lesaffredoc.ma/`;
  }

  return text;
};
