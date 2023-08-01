import z from 'zod';
import loginSchema from "./login";


const registerSchema = loginSchema.extend({
  name: z.string({
  }).min(3, {
    message: 'Nome deve ter no mínimo 3 caracteres',
  }).max(255, {
    message: 'Nome deve ter no máximo 255 caracteres',
  })
});

export default registerSchema;