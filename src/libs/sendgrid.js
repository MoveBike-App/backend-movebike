import * as dotenv from 'dotenv'
import * as sgMail from '@sendgrid/mail'
dotenv.config()

const {
  SENDGRID_API_KEY
} = process.env

const handlerMail = new sgMail.MailService()

handlerMail.setApiKey(SENDGRID_API_KEY)

const sendConfirmationEmail = (to, name, token) => {
  const msg = {
    to: { email: to },
    subject: 'Confirmación de cuenta',
    fromname: 'MOVEBIKE',
    from: { name: 'MOVEBIKE', email: 'movebikeapp@gmail.com' },
    templateId: 'd-c8078f3fce5645da9bb6db7618d32372',
    dynamic_template_data: {
      name,
      link: `http://localhost:3000/confirm-email/?token=${token}`
    }
  }
  return handlerMail.send(msg)
}

const sendReserveEmail = (to, vehicle, initialDate, finalDate, totalPrice) => {
  const msg = {
    to: { email: to },
    subject: 'Confirmación de reserva',
    fromname: 'MOVEBIKE',
    from: { name: 'MOVEBIKE', email: 'movebikeapp@gmail.com' },
    templateId: 'd-dffa1f489a2a41f7968553a5bdf923be',
    dynamic_template_data: {
      vehicle,
      initialDate,
      finalDate,
      totalPrice
    }
  }
  return handlerMail.send(msg)
}

const sendReserveToCompany = (reserveNumber, vehicle, initialDate, finalDate, name, email, totalPrice) => {
  const msg = {
    to: { email: 'movebikeapp@gmail.com' },
    subject: 'Tienes una nueva reserva',
    fromname: 'MOVEBIKE',
    from: { name: 'MOVEBIKE', email: 'movebikeapp@gmail.com' },
    templateId: 'd-d3a72cc1e7134644811f97ff8a5bd190',
    dynamic_template_data: {
      reserveNumber,
      vehicle,
      initialDate,
      finalDate,
      name,
      email,
      totalPrice
    }
  }
  return handlerMail.send(msg)
}

export {
  sendConfirmationEmail,
  sendReserveEmail,
  sendReserveToCompany
}
