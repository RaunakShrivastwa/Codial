const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
let transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'puse476@gmail.com',
    pass: 'rdfviwvmdsvodvtl',
  },
});

let renderTemplate = (data, relativepath) => {
  let mainHtml;
  ejs.renderFile(
    path.join(__dirname, '../views/Mailer', relativepath),
    data,
    function (err, template) {
      if (err) {
        console.log('There is a problem with the template');
        return;
      } else {
        mainHtml = template;
      }
    }
  );
  return mainHtml;
};

module.exports = {
  transport: transport,
  renderTemplate: renderTemplate,
};
