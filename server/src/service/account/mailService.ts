import nodemailer from "nodemailer"

class mailServiceClass {
  // Настройка подключение к почте 
  transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user: "demigot2033@gmail.com",
      pass: process.env.SMTP_PASSWORD,
    },
  });

// Тело функции отправления письма на почту для активации аккаунта
  async sendActivationMail(to: string, link: string) {
    const transporter = nodemailer.createTransport({
      service:"Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to, // list of receivers
      subject: "Ссылка на кативацию", // Subject line
      text: "Нажмите на ссылку чтобы активировать аккаунт", // plain text body
      html: `<a href="${link}"> ${link}</a>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  }


}
export const mailService = new mailServiceClass()
