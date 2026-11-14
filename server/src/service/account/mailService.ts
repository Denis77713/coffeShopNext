import nodemailer from "nodemailer"
const path = require("path")

class mailServiceClass {
  // Настройка подключение к почте
  transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "demigot2033@gmail.com",
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // Тело функции отправления письма на почту для активации аккаунта
  async sendActivationMail(to: string, link: string) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to, // list of receivers
      subject: "Ссылка на активацию", // Subject line
      text: "Нажмите на ссылку чтобы активировать аккаунт", // plain text body
      html: `<a href="${link}"> ${link}</a>`, // html body
    })
  }
  async sendPdfFile(to: string, idPay: number) {
    const pathUrl = path.resolve(__dirname, "/server/src/products.pdf")

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to, // list of receivers
      subject: `Заказ ${idPay}`, // Subject line
      text: `${process.env.CLIENT_URL}/managerPage?developId=${idPay}`, // plain text body
      // html: `<a href="${link}"> ${link}</a>`, // html body
      attachments: [
        {
          filename: "products.pdf",
          path: `./products.pdf`,
        },
      ],
    })
  }
}
export const mailService = new mailServiceClass()
