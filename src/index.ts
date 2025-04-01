import express, { Request, Response } from "express";
import { MessageRequest } from "../types";
import { buttonMenu, getMenu, welcomeMessage } from "../options/backToMenu";
import { sendMessage } from "../utils/nexmo";
import { Lang } from "@prisma/client";
import { createOrUpdateLead } from "../services/leadService";
const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "HelloWorld" });
});

app.post("/chat-bot", async (req: Request, res: Response) => {
  let message: MessageRequest = req.body;
  console.log(message);

  
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
      }

      break;

    default:
      break;
  }

  sendMessage({
    channel: "whatsapp",
    from: message.to,
    to: message.from,
    message_type: "custom",
    custom: welcomeMessage(),
  });

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

app.listen(4000, () => console.log("App Started"));
