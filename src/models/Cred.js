const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// const aws = require("aws-sdk");
// const fs = require("fs");
// const path = require("path");
// const { promisify } = require("util");

// const s3 = new aws.S3();



const CredSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  socialNetwork: { type: String, required: true },
  creditAccepted: { type: Boolean, required: true, default: false },

  personalDocuments: {
    rg: { type: String, default: "" },
    cpf: { type: String, default: "" },
    passportNumber: { type: String, required: true },

    pictureSelfieWithPassport: {
      originalname: { type: String, required: true },
      mimetype: { type: String, required: true },
      size: { type: String, required: true },
      key: { type: String, required: true },
      location: { type: String, required: true }
    },

    picturePassportOrRg: {
      originalname: { type: String, required: true },
      mimetype: { type: String, required: true },
      size: { type: String, required: true },
      key: { type: String, required: true },
      location: { type: String, required: true }
    },

  },

  address: {
    streetOrAvenue: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  deviceSpecification: {
    deviceName: { type: String, required: true },
    diviceURL: String,
    inputValue: { type: String, required: true },
    numberOfWeeks: { type: Number, required: true, default: 1 }
  },

  bankDetails: {
    ownersAccountName: { type: String, required: true },
    numberAccount: { type: String, required: true },
    sortCodeAccount: { type: String, required: true },
  },

  createAt: { type: Date, default: Date.now }
});

// CredSchema.pre("remove", function() {
  // if (process.env.STORAGE_TYPE === "s3") {
  //   return s3
  //     .deleteObject({
  //       Bucket: process.env.BUCKET_NAME,
  //       Key: this.key
  //     })
  //     .promise()
  //     .then(response => {
  //       console.log(response.status);
  //     })
  //     .catch(response => {
  //       console.log(response.status);
  //     });
  // } else {
  //   return promisify(fs.unlink)(
  //     path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
  //   );
  // }
// });


module.exports = mongoose.model("Cred", CredSchema);

