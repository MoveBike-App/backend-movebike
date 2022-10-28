import dbConnect from './src/libs/db.js'
import { server } from './src/server.js'

dbConnect()
  .then(() => {
    console.log('MOVEBIKE 🛵 database connected')

    server.listen(8080, () => {
      console.log('Server listening on port 8080')
    })
  })
  .catch((error) => console.log('Error: ', error))

const date = Date.now()
console.log(date)
const today = new Date(Date.now()).toUTCString()
console.log(today)
