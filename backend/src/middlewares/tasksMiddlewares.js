const z = require('zod');

const idValidation = (req, res, next) => {
  const schema = z.object({
    authorization: z.string({
      required_error: '"header authorization" é obrigatório',
    }).uuid({
      message: '"header authorization" deve ser um UUID válido',
    }),
  });
  try {
    schema.parse(req.headers);
    next();
  } catch (error) {
    res.status(401).json({ error: error.issues[0].message });
  }
};

const taskValidation = (req, res, next) => {
  const schema = z.object({
    task: z.string({
      invalid_type_error: '"task" deve ser uma string',
      required_error: '"task" é obrigatório',
    }).max(255, {
      message: '"task" deve ter no máximo 255 caracteres',
    }).min(3, {
      message: '"task" deve ter no mínimo 3 caracteres',
    }),
  });
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.issues[0].message });
  }
};

module.exports = {
  idValidation, taskValidation,
};