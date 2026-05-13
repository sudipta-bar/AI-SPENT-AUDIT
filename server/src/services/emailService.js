import nodemailer from 'nodemailer';

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

export async function sendLeadConfirmation({ email, companyName, estimatedMonthlySavings }) {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || 'hello@credex.example';

  return transporter.sendMail({
    from,
    to: email,
    subject: 'Your AI spend audit request is confirmed',
    text: `Hi, we received your request for ${companyName}. Estimated monthly savings: $${estimatedMonthlySavings}. The Credex team will follow up shortly.`
  });
}
