const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

export const validateEmail = (email: string) => {
  const emailWithoutSpaces = email.replace(/ /g, ''); // remove espaços
  if (EMAIL_REGEX.test(emailWithoutSpaces)) {
    return emailWithoutSpaces;
  }
};
