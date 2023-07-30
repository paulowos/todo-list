import z from 'zod';
import loginSchema from "./login";

const changePasswordSchema = loginSchema.extend({
  newPassword: z.string().min(8, {
    message: 'Nova Senha deve ter no mínimo 8 caracteres',
  }).max(255, {
    message: 'Nova Senha deve ter no máximo 255 caracteres',
  }),
});

export default changePasswordSchema;