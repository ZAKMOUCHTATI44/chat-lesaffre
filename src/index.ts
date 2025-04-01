import express, { Request, Response } from "express";
import { MessageRequest } from "../types";
import { buttonMenu, getMenu, welcomeMessage } from "../options/backToMenu";
import { sendMessage } from "../utils/nexmo";
import { Lang } from "@prisma/client";
import { createOrUpdateLead } from "../services/leadService";
import { getStep1 } from "../utils/steps";
require("dotenv").config();

const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "HelloWorlddakdadbabda" });
});

app.post("/chat-bot", async (req: Request, res: Response) => {
  let message: MessageRequest = req.body;
  console.log(JSON.stringify(message));

  switch (message.message_type) {
    case "reply":
      let { id, title, description } = message?.reply;
      if (id.includes("btn-lang-fr")) {
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
      } else if (id.includes("option")) {
        let step = id.replace("option", "");
        switch (step) {
          case "1":
            const textReply = await getStep1(message.from);
            sendMessage({
              channel: "whatsapp",
              from: message.to,
              to: message.from,
              message_type: "text",
              text: textReply,
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

app.listen(6000, () => console.log("App Started"));
