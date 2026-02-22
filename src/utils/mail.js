import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed silently, make sure you have provided your mailtrap credentials in .env file",
    );
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! We are excited to have you on board. ",
      action: {
        instructions:
          "To Verify your email , please click on the following button",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your Email",
          link: verificationUrl,
        },
      },
      outro:
        "Need Help, or have questions ? Just reply to this email, We will love to Help",
    },
  };
};

const forgotPasswordVerificationMailgenContent = (
  username,
  passwordResetUrl,
) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account ",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#f45123", // Optional action button color
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need Help, or have questions ? Just reply to this email, We will love to Help",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordVerificationMailgenContent,
  sendEmail,
};
