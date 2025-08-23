import { env } from "../../env.js";
import nodemailer from "nodemailer";

class MailTrapConfig {
  public createTransport: () => nodemailer.Transporter;
  constructor(
    host: string,
    port: number,
    authUser: string,
    authPassword: string,
  ) {
    this.createTransport = function () {
      return nodemailer.createTransport({
        host,
        port,
        auth: {
          user: authUser,
          pass: authPassword,
        },
      });
    };
  }
}

//MAKING OBJECT OF MAILTRAP CONFIG WITH THE ENV VARIBLES AS HOST,PORT,USER,PASSWORD
const mailtrapConfig = new MailTrapConfig(
  env.MAILTRAP_HOST,
  +env.MAILTRAP_PORT,
  env.MAILTRAP_USER,
  env.MAILTRAP_PASSWORD,
);

//SINGLETON CONCEPT
const createTransport = mailtrapConfig.createTransport.bind(mailtrapConfig);
export { createTransport };
