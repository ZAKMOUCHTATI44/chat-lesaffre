import express, { Request, Response } from "express";
import { MessageRequest } from "../types";
import { buttonMenu, getMenu, welcomeMessage } from "../options/backToMenu";
import { sendMessage } from "../utils/nexmo";
import { Lang } from "@prisma/client";
import prisma from "../prisma/prisma";
import { createOrUpdateLead, getLang } from "../services/leadService";
import {
  getRegoinPhoneNumber,
  getRegoinNameById,
  getStep1,
  getStep5,
  getStep6,
  getStep7,
  step3,
  step4,
} from "../utils/steps";
import {
  getProductsDetail,
  getProductsOptions,
} from "../services/productService";
import { getLastMessage, getLastMessageByTo } from "../utils/messageService";
require("dotenv").config();

const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "HelloWorlddakdadbabda" });
});

app.post("/chat-bot", async (req: Request, res: Response) => {
  let message: MessageRequest = req.body;


  const LANG = await getLang(message.from);

  const langMessage = await getLastMessage(message.from);
  console.log("**************");
  console.log(JSON.stringify(langMessage));
  console.log("**************");
  switch (message.message_type) {
    case "reply":
      let { id, title, description } = message?.reply;
      if (id === "menu-default") {
        console.log("menu-default ");
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: welcomeMessage(),
          //text: "Welcome",
        });
      } else if (id.includes("btn-lang-fr")) {
        console.log("BTN FR ");
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: await getMenu(Lang.FR),
          //text: "options FR",
        });
        createOrUpdateLead({
          lang: Lang.FR,
          phone: message.from,
          profileName: message.profile.name,
        });
      } else if (id.includes("btn-lang-ar")) {
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: await getMenu(Lang.AR),
          //text: "options AR",
        });
        createOrUpdateLead({
          lang: Lang.AR,
          phone: message.from,
          profileName: message.profile.name,
        });
      } else if (id.includes("regions")) {
        console.log("Regions ");
        const regionId = id.replace("regions-", "");
        const regionNumber = Number(regionId);
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "text",
          text: await getRegoinPhoneNumber(regionId, LANG),
        }, regionNumber); 
      } else if (id.includes("option")) {
        let step = id.replace("option", "");
        switch (step) {
          case "1":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom: await getStep1(LANG),
            }); 
            break;

          case "2":
            const productList = await getProductsOptions(LANG);
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom: productList,
            });
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 5000);
            break;
          case "3":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom: await step3(message.from),
            });
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 5000);
            break;
          case "4":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom: await step4(message.from),
            });
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 5000);
            break;
          case "5":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "text",
              text: await getStep5(message.from),
            });
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 5000);
            break;
          case "6":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "text",
              text: await getStep6(message.from),
            });
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 5000);
            break;
          case "7":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "text",
              text: await getStep7(message.from),
            });
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 5000);
            break;

          case "8":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom: {
                type: "location",
                location: {
                  longitude: -4.9830625,
                  latitude: 34.0261875,
                  name: "Lesaffre Maroc",
                  address: "Situé dans : Quartier Industriel Sidi Brahim",
                },
              },
            });
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom: {
                type: "location",
                location: {
                  longitude: -7.5774499,
                  latitude: 33.5989164,
                  name: "Baking Centre Lesaffre Maroc",
                  address:
                    "92, Bd Batali Med Ben Mekki-Ex Gergovie, Casablanca 20100",
                },
              },
            });
            break;

          default:
            break;
        }
      } else if (id.includes("product")) {
        let productId = id.replace("product", "");

        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "text",
          text: await getProductsDetail(productId, LANG),
        });
      }
      break;
    
    case "text":   
      const last = await getLastMessageByTo(message.from); 
      console.log("Last message: ");
      console.log(last?.step);
      console.log(last?.body);  
      if ((last?.step != null) && (last?.body?.includes("Veuillez renseigner les"))) {
        console.log("creation de la commande"); 
        // Enregistre la commande texte
        if (message.text) {
          const regionName = await getRegoinNameById(last.step);
          await prisma.commande.create({
            data: {
              from: message.from,
              body: message.text,
              region: regionName, 
              statut: 0,
            },
          });
          
          // Confirme la réception
          sendMessage({
            channel: "whatsapp",
            from: message.to,
            to: message.from,
            message_type: "text",
            text: LANG === "AR"
              ? "✅ تم تسجيل طلبك بنجاح."
              : "✅ Votre commande a été enregistrée avec succès.",
          }); 
          sendButtonBackToMenu(message);
        } else {
          console.warn("❗ message.text est undefined, commande non enregistrée.");
        }

       
      }

    default:
      console.log("default"); 
      sendMessage({
        channel: "whatsapp",
        from: message.to,
        to: message.from,
        message_type: "custom",
        custom: welcomeMessage(),
      });

      break;
  }

  res.json({ mead: "dbd" });
});

function sendButtonBackToMenu(message: MessageRequest) {
  setTimeout(async () => {
    let custom = await buttonMenu(message.from);
    sendMessage({
      channel: "whatsapp",
      from: message.to,
      to: message.from,
      message_type: "custom",
      custom,
    });
  }, 5000);
}

const PORT = 6000;
app.listen(PORT, () => console.log(`App Started ${PORT}`));
