import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
interface Email {
  to: string[] // An array of email addresses to which to send the email.
  subject: string // The subject of the email.
  react: React.ReactElement // The body of the email as a React element.
}

export const sendEmail = async (payload: Email) => {
  const { error } = await resend.emails.send({
    from: 'Weiterbildung <haroldmudosa@gmail.com>',
    ...payload
  })
  if(error) {
    console.error('Error sending Email',error);
    return null;
  }

  console.log('Email sent successfully');
  return true;
}
