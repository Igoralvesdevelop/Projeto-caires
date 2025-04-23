function generatePassword(){
    const key = (Math.random() + 1).toString(36).substring(2).substring(0,10);
    const newPassword = key
  .replace(/n/g, '@')
  .replace(/w/g, '!')
  .replace(/i/g, '#')
  .replace(/t/g, '$')
  .replace(/a/g, '*')
  .replace(/r/g, '%');

    return newPassword;
}
export {generatePassword}