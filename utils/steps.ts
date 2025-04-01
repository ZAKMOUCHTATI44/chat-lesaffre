import { getLang } from "../services/leadService";

export const getStep1 = async (phone: string): Promise<string> => {
  const lang = await getLang(phone);
  let text = `Notre responsable commercial prendra contact avec vous dans les plus proches délais. Merci et à très bientôt!`;

  if (lang === "AR") {
    text = `سيتصل بك مدير مبيعاتنا في أقرب وقت. شكرًا ونراك قريبًا!`;
  }

  return text;
};
