const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupsSchema = new Schema({
  name: String,
  location: String,
  organiserName: String,
  organiserPhone: Number
});

module.exports = mongoose.model('Group', groupsSchema);

