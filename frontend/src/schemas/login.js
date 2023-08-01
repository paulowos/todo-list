import z from 'zod';

const loginSchema = z.object({
  email: z.string().email(
    {
      message: 'Email inválido',
    }
  ).max(255, {
    message: 'Email deve ter no máximo 255 caracteres',
  }),
  password: z.string().min(8, {
    message: 'Senha deve ter no mínimo 8 caracteres',
  }).max(255, {
    message: 'Senha deve ter no máximo 255 caracteres',
  })
});

export default loginSchema;