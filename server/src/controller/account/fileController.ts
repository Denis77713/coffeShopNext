class fileClass {
  async fileLoad(req: any, res: any, next: any) {
    try {
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
    } catch (e) {}
  }
}

export const fileController = new fileClass()
