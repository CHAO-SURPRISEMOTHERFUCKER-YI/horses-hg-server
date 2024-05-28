import { transport } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transport.sendMail({
      from: "Horse HG <admin@horsehg.com>",
      to: user.email,
      subject: "Horse HG - Confirma tu cuenta",
      text: "Horse HG - Confirma tu cuenta",
      html: `<p>Hola: ${user.name}, para confimar tu cuenta en Horse HG, haz click en el siguiente enlaces: </p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
      <p>E ingresa el código: <b>${user.token}</b></p>
      <p>Este token expira en 10 minutos</p>`,
    });

    console.log("Mensaje enviado", info.messageId);
  };

  static sendPasswordReset = async (user: IEmail) => {
    const info = await transport.sendMail({
      from: "Horse HG <admin@horsehg.com>",
      to: user.email,
      subject: "Horse HG - Restablecer contraseña",
      text: "Horse HG - Restablecer contraseña",
      html: `<p>Hola: ${user.name}, has solicitado restablecer tu contraseña </p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer contraseña</a>
      <p>E ingresa el código: <b>${user.token}</b></p>
      <p>Este token expira en 10 minutos</p>`,
    });

    console.log("Mensaje enviado", info.messageId);
  };
}


