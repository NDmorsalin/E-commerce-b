const mongoose = require('mongoose');
async function db() {
  //console.log({db:process.env.DB_URI})
  try {

    const connect = await mongoose.connect(process.env.DB_URI);
    console.log('db connection is successful ')
  } catch (e) {
    console.log(e)
  }

}

module.exports = db