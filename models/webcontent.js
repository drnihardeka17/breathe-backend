const mongoose = require('mongoose');

const websiteContentSchema = new mongoose.Schema({
  organizationName: String,
  siteName: String,
  metaKeywords: String,
  metaDescription: String,
  about: String,
  address: String,
  primaryContactNo: String,
  alternativeContactNo1: String,
  contactEmail: String,
  linkedIn: String,
  facebook: String,
  twitter: String,
  instagram: String,
  siteNotice: String
});

module.exports = mongoose.model('WebsiteContent', websiteContentSchema);
