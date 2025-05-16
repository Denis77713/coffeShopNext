import { prisma } from "../../../../client/prisma/prisma-client"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

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
      // Заполнить imagesUrlProduct названиями изображений
      // data.forEach(async (item: any) => {
      // await prisma.imagesUrlProduct.create({
      // data: {
      // imageURL: item,
      // },
      // })
      // })
      // }
    }
  }
  async pdfLoad(req: any, res: any, next: any) {
    const data = req.body
    const doc = new jsPDF()
    doc.addImage(data.imgData, "PNG", 0, 0, 20, 20)
    doc.save("Философский-PDF.pdf")
  }
}

export const fileController = new fileClass()
