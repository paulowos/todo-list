const z = require('zod');


const emailValidation = (req, res, next) => {
  const schema = z.object({
    email: z.string({
      invalid_type_error: '"email" deve ser uma string',
      required_error: '"email" é obrigatório',
    }).email({
      message: '"email" deve ser um email válido',
    }).max(255, {
      message: '"email" deve ter no máximo 255 caracteres',
    })
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.issues[0].message });
  }
};

const passwordValidation = (req, res, next) => {
  const schema = z.object({
    password: z.string({
      invalid_type_error: '"password" deve ser uma string',
      required_error: '"password" é obrigatório',
    }).max(255, {
      message: '"password" deve ter no máximo 255 caracteres',
    }).min(8, {
      message: '"password" deve ter no mínimo 8 caracteres',
    })
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.issues[0].message });
  }
};

const nameValidation = (req, res, next) => {
  const schema = z.object({
    name: z.string({
      invalid_type_error: '"name" deve ser uma string',
      required_error: '"name" é obrigatório',
    }).max(255, {
      message: '"name" deve ter no máximo 255 caracteres',
    }).min(3, {
      message: '"name" deve ter no mínimo 3 caracteres',
    })
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.issues[0].message });
  }
};

module.exports = {
  userValidation: [nameValidation, emailValidation, passwordValidation],
  loginValidation: [emailValidation, passwordValidation],
};