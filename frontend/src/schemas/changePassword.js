import z from 'zod';

const changePasswordSchema = z.object({
  email: z.string().email(
    {
      message: 'Email inválido',
    }
  ),
  password: z.string().min(8, {
    message: 'Senha deve ter no mínimo 8 caracteres',
  }).max(255, {
    message: 'Senha deve ter no máximo 255 caracteres',
  }),

  newPassword: z.string()
    .min(8, {
      message: 'Nova Senha deve ter no mínimo 8 caracteres',
    }).max(255, {
      message: 'Nova Senha deve ter no máximo 255 caracteres',
    })
}).refine((data) => data.password !== data.newPassword, {
  message: 'Senhas não podem ser iguais',
  path: ['newPassword'],

});


export default changePasswordSchema;