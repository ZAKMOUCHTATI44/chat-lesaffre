import { Lang } from "@prisma/client";
import prisma from "../prisma/prisma";

async function getListProducts(): Promise<any> {
  const options = await prisma.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const rows = options.map((option) => {
    const row = {
      id: `product${option.id}`,
      title: " ",
      description: option.name,
    };

    return row;
  });

  return rows;
}

export async function getProductsOptions(lang: Lang) {
  let rows = await getListProducts();

  let body = {
    fr: "Veuillez sélectionner l'un de nos produits",
    ar: "الرجاء اختيار واحدة من علاماتنا التجارية",
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
        button: lang === "AR" ? "خيارات" : "Liste produits",
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
}
