import Joi from "joi";
export default function validatingStudent(req, res, next) {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  else {
    next();
  }
}
const validate = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().positive().required(),
    gender: Joi.string().valid("male", "female").required(),
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(body);
  return error;
};
