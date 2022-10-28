import * as dotenv from 'dotenv'
import * as sgMail from '@sendgrid/mail'
dotenv.config()

const {
  SENDGRID_API_KEY
} = process.env

const handlerMail = new sgMail.MailService()

handlerMail.setApiKey(SENDGRID_API_KEY)
console.log(SENDGRID_API_KEY)

/* const sendMail = async (msg) => {
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
  to: ['cintiaruizv@gmail.com', 'movebikeapp@gmail.com'],
  from: 'movebikeapp@gmail.com',
  subject: 'hola desde movebike',
  text: 'holaaaaaaaaaa',
  html: '<h1>hola desde movebike</h1>'
})
 */

const sendConfirmationEmail = (to, name) => {
  const msg = {
    to: { email: to },
    subject: 'Confirmación de cuenta',
    fromname: 'MOVEBIKE',
    from: { name: 'MOVEBIKE', email: 'movebikeapp@gmail.com' },
    templateId: 'd-e356d0adb76a43829fad752f4bf604aa',
    dynamic_template_data: {
      name
    }
  }
  console.log(msg)
  return handlerMail.send(msg)
}

const sendReserveEmail = (to, vehicle, initialDate, finalDate, totalPrice) => {
  const msg = {
    to: { email: to },
    subject: 'Confirmación de reserva',
    fromname: 'MOVEBIKE',
    from: { name: 'MOVEBIKE', email: 'movebikeapp@gmail.com' },
    templateId: 'd-5949ceb6691046ac979ce4a345d3074a',
    dynamic_template_data: {
      vehicle,
      initialDate,
      finalDate,
      totalPrice
    }
  }
  console.log(msg)
  return handlerMail.send(msg)
}
export {
  sendConfirmationEmail,
  sendReserveEmail
}
