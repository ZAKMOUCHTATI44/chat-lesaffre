import axios from "axios";
import { saveMessage } from "./messageService";
import { MessageRequest } from "../types";

export function sendMessage(data: MessageRequest, step?: number) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + process.env.NEXMO_ACCESS_TOKEN,
    },
  };

  axios
    .post("https://api.nexmo.com/v1/messages", data, config)
    .then((res : any) => {
      saveMessage({
        body: data.text ?? "",
        from: data.from,
        to: data.to,
        step: step,
        type: data.message_type,
        messageId: res.data.message_uuid ?? "",
      });
    })
    .catch((error : any) => {
      console.error(error);
    });
}
