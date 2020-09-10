const Cred = require("../models/Cred");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const cred_id = id ? { _id: id } : {};

    const creds = await Cred.find(cred_id).sort({ createAt: -1 });

    res.json(creds);
  },

  async delete(req, res) {
    const deletedCred = await Cred.findById(req.params.id);
    if (deletedCred) {
      await deletedCred.remove();
      res.send({ message: "Cred Deleted" });
    } else {
      res.send("Error in Deletion.");
    }
  },

  async updated(req, res) {
    
    const credId = req.params.id;
    const cred = await Cred.findById(credId);

    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      socialNetwork,
      rg,
      cpf,
      passportNumber,
      streetOrAvenue,
      city,
      state,
      zipCode,
      country,
      deviceName,
      diviceURL,
      inputValue,
      numberOfWeeks,
      ownersAccountName,
      numberAccount,
      sortCodeAccount,
    } = req.body;

    const { imagePassportOrRg, imageSelfieWithPassport } = req.files;

    const keyPassaportOrRg =
      imagePassportOrRg[0].key || imagePassportOrRg[0].filename;

    const locationPassaportOrRg =
      imagePassportOrRg[0].location ||
      `${process.env.APP_URL}/files/${keyPassaportOrRg}`;

    const keySelfieWithPassport =
      imageSelfieWithPassport[0].key || imageSelfieWithPassport[0].filename;

    const locationSelfieWithPassport =
      imageSelfieWithPassport[0].location ||
      `${process.env.APP_URL}/files/${keySelfieWithPassport}`;

    const data = {
      fullName,
      email,
      phone,
      dateOfBirth,
      socialNetwork,

      personalDocuments: {
        rg,
        cpf,
        passportNumber,

        pictureSelfieWithPassport: {
          originalname: imageSelfieWithPassport[0].originalname,
          mimetype: imageSelfieWithPassport[0].mimetype,
          size: imageSelfieWithPassport[0].size,
          key: keySelfieWithPassport,
          location: locationSelfieWithPassport,
        },

        picturePassportOrRg: {
          originalname: imagePassportOrRg[0].originalname,
          mimetype: imagePassportOrRg[0].mimetype,
          size: imagePassportOrRg[0].size,
          key: keyPassaportOrRg,
          location: locationPassaportOrRg,
        },
      },

      address: {
        streetOrAvenue,
        city,
        state,
        zipCode,
        country,
      },

      deviceSpecification: {
        deviceName,
        diviceURL,
        inputValue,
        numberOfWeeks,
      },

      bankDetails: {
        ownersAccountName,
        numberAccount,
        sortCodeAccount,
      },
    };

    if (cred) {

      const updatedCred = await cred.save(data);

      if (updatedCred) {
        return res
          .status(200)
          .send({ message: "Cred Updated", data: updatedCred });
      }
    }

    return res.status(500).send({ message: " Error in Updating Cred." });
  },

  async create(req, res) {
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      socialNetwork,
      rg,
      cpf,
      passportNumber,
      streetOrAvenue,
      city,
      state,
      zipCode,
      country,
      deviceName,
      diviceURL,
      inputValue,
      numberOfWeeks,
      ownersAccountName,
      numberAccount,
      sortCodeAccount,
    } = req.body;

    const { imagePassportOrRg, imageSelfieWithPassport } = req.files;

    const keyPassaportOrRg =
      imagePassportOrRg[0].key || imagePassportOrRg[0].filename;

    const locationPassaportOrRg =
      imagePassportOrRg[0].location ||
      `${process.env.APP_URL}/files/${keyPassaportOrRg}`;

    const keySelfieWithPassport =
      imageSelfieWithPassport[0].key || imageSelfieWithPassport[0].filename;

    const locationSelfieWithPassport =
      imageSelfieWithPassport[0].location ||
      `${process.env.APP_URL}/files/${keySelfieWithPassport}`;

    const data = {
      fullName,
      email,
      phone,
      dateOfBirth,
      socialNetwork,

      personalDocuments: {
        rg,
        cpf,
        passportNumber,

        pictureSelfieWithPassport: {
          originalname: imageSelfieWithPassport[0].originalname,
          mimetype: imageSelfieWithPassport[0].mimetype,
          size: imageSelfieWithPassport[0].size,
          key: keySelfieWithPassport,
          location: locationSelfieWithPassport,
        },

        picturePassportOrRg: {
          originalname: imagePassportOrRg[0].originalname,
          mimetype: imagePassportOrRg[0].mimetype,
          size: imagePassportOrRg[0].size,
          key: keyPassaportOrRg,
          location: locationPassaportOrRg,
        },
      },

      address: {
        streetOrAvenue,
        city,
        state,
        zipCode,
        country,
      },

      deviceSpecification: {
        deviceName,
        diviceURL,
        inputValue,
        numberOfWeeks,
      },

      bankDetails: {
        ownersAccountName,
        numberAccount,
        sortCodeAccount,
      },
    };

    const cred = new Cred(data);

    try {
      const newCred = await cred.save();

      if (newCred) {
        res.status(200).json({
          _id: newCred.id,
          data,
        });
      } else {
        res.status(401).json({ message: "Invalid Data." });
      }
    } catch (err) {
      res.status(401).json({ err });
    }
  },
};
