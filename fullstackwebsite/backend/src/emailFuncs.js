

const db = require('./db.js');


exports.getEmails = async (req, res) => {
// get current user and check email against db emails
// create an array and use the get api 200
  const allboxes = [];
  const allBoxNames = await db.getMailBoxes();
  for (let i = 0; i < allBoxNames.length; i++) {
    const boxtoAdd = {'name': allBoxNames[i],
      'mail': await db.getEmailsByBox(allBoxNames[i])};
    allboxes.push(boxtoAdd);
  }
  const toRet = [];
  allboxes.some((el) =>{
    // can also change this up to switch on box selection
    if (el.name == 'inbox') {
      el.mail.forEach((email) =>{
        toRet.push(email);
      });
    }
  });
  const topush = {'name': 'inbox', 'mail': toRet};
  res.status(200).json([topush]);
};
