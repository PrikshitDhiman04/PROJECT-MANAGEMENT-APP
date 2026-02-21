import Mailgen from "mailgen";

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
};
