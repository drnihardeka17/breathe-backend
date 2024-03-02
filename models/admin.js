const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

AdminSchema.pre('save', async function(next) {
  const admin = this;
  if (!admin.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(admin.password, salt);
  admin.password = hash;
  next();
});

AdminSchema.methods.isValidPassword = async function(password) {
  const admin = this;
  const compare = await bcrypt.compare(password, admin.password);
  return compare;
};

module.exports = mongoose.model('Admin', AdminSchema);
