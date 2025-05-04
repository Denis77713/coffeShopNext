import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { configDotenv } from "dotenv"
import { accountRouter } from "./routes/account/accountRoute"
import { middlewareError } from "./middleware/error"

const app = express()
const PORT = configDotenv().parsed?.port || 5000
const upload = require("express-fileupload")
app.use(express.json())
app.use(cookieParser())
app.use(upload())
app.post("/upload", (req: any, res) => {
  if (req.files) {
    const file = req.files.file
    const fileName = file.name
    file.mv("../client/public/" + fileName, (err: any) => {
      if (err) {
        res.send(err)
      } else {
        res.send("File Uploaded")
      }
    })
  }
})
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use("/api", accountRouter)
app.use(middlewareError)

async function main() {
  try {
    app.get("/login", (req, res) => {
      res.status(200).json({
        message: "complite!",
      })
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Methods", "*")
      res.setHeader("Access-Control-Allow-Headers", "*")
      res.setHeader("Access-Control-Allow-Credentials", "true")
      res.cookie("hello", "world", { maxAge: 6000 })
    })
    app.listen(PORT, () => {})
  } catch (e) {}
}
main()
