import express, { Request, Response } from "express";
import { MessageRequest } from "../types";
import { buttonMenu, getMenu, welcomeMessage } from "../options/backToMenu";
import { sendMessage } from "../utils/nexmo";
import { Lang } from "@prisma/client";
import { createOrUpdateLead, getLang } from "../services/leadService";
import {
  getRegoinPhoneNumber,
  getStep1,
  getStep5,
  getStep6,
  getStep7,
  step3,
  step4,
} from "../utils/steps";
import { getProductsOptions } from "../services/productService";
require("dotenv").config();

const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "HelloWorlddakdadbabda" });
});

app.post("/chat-bot", async (req: Request, res: Response) => {
  let message: MessageRequest = req.body;
  console.log("**************");
  console.log(JSON.stringify(message));
  console.log("**************");

  const LANG = await getLang(message.from);

  switch (message.message_type) {
    case "reply":
      let { id, title, description } = message?.reply;
      if (id === "menu-default") {
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: welcomeMessage(),
        });
      } else if (id.includes("btn-lang-fr")) {

        console.log("BTN FR ")
        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "custom",
          custom: await getMenu(Lang.FR),
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
        });
        createOrUpdateLead({
          lang: Lang.AR,
          phone: message.from,
          profileName: message.profile.name,
        });
      } else if (id.includes("regions")) {
        const regionId = id.replace("regions-", "");

        sendMessage({
          channel: "whatsapp",
          from: message.to,
          to: message.from,
          message_type: "text",
          text: await getRegoinPhoneNumber(regionId, LANG),
        });
        // setTimeout(() => {
        //   sendButtonBackToMenu(message);
        // }, 3500);
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
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 2500);
            break;

          case "2":
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "custom",
              custom: await getProductsOptions(LANG),
            });
            setTimeout(() => {
              sendButtonBackToMenu(message);
            }, 2500);
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
            }, 2500);
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
            }, 2500);
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
            }, 2500);
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
            }, 2500);
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
            }, 2500);
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
      }
      break;

    default:
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
