import validator from "../utils/validate.js";

const userSchema = async (req, res, next) => {
  //creating the validation rule for every input filed
  const validateRule = {
    fname: "required|string",
    lname: "required|string",
    phone_number: "required|string",
    address: "required|string",
    password: "required|string",
    bank_account_no: "required|string",
    email: "required|string",
    ID: "string",
  };

  await validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

module.exports = {
  userSchema,
};
