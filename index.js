import dbConnect from './src/libs/db.js'
import { server } from './src/server.js'
import * as dotenv from 'dotenv'
import * as sgMail from '@sendgrid/mail'
dotenv.config()

const {
  SENDGRID_API_KEY
} = process.env

const handlerMail = new sgMail.MailService()

handlerMail.setApiKey(SENDGRID_API_KEY)
console.log(SENDGRID_API_KEY)

const sendMail = async (msg) => {
  try {
    await handlerMail.send(msg)
    console.log('msg sent succesfully!')
  } catch (error) {
    console.error(error)
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

sendMail({
  to: 'cintiaruizv@gmail.com',
  from: 'movebikeapp@gmail.com ',
  subject: 'hola desde movebike',
  text: 'holaaaaaaaaaa'
})

dbConnect()
  .then(() => {
    console.log('MOVEBIKE 🛵 database connected')

    server.listen(8080, () => {
      console.log('Server listening on port 8080')
    })
  })
  .catch((error) => console.log('Error: ', error))
