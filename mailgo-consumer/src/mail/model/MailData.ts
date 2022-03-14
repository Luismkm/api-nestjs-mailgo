type MailData = {
  client: {
    cod: string;
    email: string;
  };
  emailContent: {
    emailSubject: string;
    linkImgBanner: string;
  };
  token: string;
};

export { MailData };
