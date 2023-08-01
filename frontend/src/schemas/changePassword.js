import z from 'zod';
import loginSchema from "./login";

const changePasswordSchema = loginSchema.extend({
  newPassword: z.string().min(8, {
    message: 'Senha deve ter no mínimo 8 caracteres',
  }).max(255, {
    message: 'Senha deve ter no máximo 255 caracteres',
  }),

}).refine((data) => data.password !== data.newPassword, {
  message: 'Senhas não podem ser iguais',
  path: ['newPassword'],

});

export default changePasswordSchema;