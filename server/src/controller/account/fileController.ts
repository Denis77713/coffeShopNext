import { prisma } from "../../../../client/prisma/prisma-client"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { mailService } from "../../service/account/mailService"

const fs = require("fs")
const path = require("path")

class fileClass {
  async fileLoad(req: any, res: any, next: any) {
    try {
      if (req.files) {
        const file = req.files.file
        const fileName = file.name
        file.mv("../client/public/product/" + fileName, (err: any) => {
          if (err) {
            res.send(err)
          } else {
            res.send("File Uploaded")
          }
        })
      }
    } catch (e) {}
  }
  async imageLoad(req: any, res: any, next: any) {
    const papka = fs.existsSync(path.resolve(__dirname, "/client/public"))
    if (papka) {
      const data = fs.readdirSync(
        path.resolve(__dirname, "../../../../client/public/product")
      )
      res.json(data)
    }
  }
  async pdfLoad(req: any, res: any, next: any) {
    const { imgData, mail } = req.body
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    })
    console.log(mail)
    await doc.addImage(imgData, "PNG", 0, 0, 300, 420)
    await doc.save("./products.pdf")
    await mailService.sendPdfFile(mail, `qqwe`)
  }
}

export const fileController = new fileClass()
