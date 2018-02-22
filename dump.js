exports.html = () => {
  return `<html>
  <head>
    <title>File uploads</title>
  </head>
  <body>
    <form action="/foods" method="POST" enctype="multipart/form-data" >
      <div>
        <input type="text" name="name" placeholder="Name"/>
      </div>
      <div>
        <input type="file" accept="image/*" name="image" multiple/>
      </div>
      <div>
        <input type="submit"/>
      </div>
    </form>
  </body>
</html>`
}

  // const reader = fs.createReadStream(file.path)
  // const writer = fs.createWriteStream(filePath)
  // reader.pipe(writer)
  // fs.unlink(file.path)
  //   .catch(err => {
  //     console.log('temp file is not deleted', err)
  //   })