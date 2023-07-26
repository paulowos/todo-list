import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(
    {
      message: 'Email inválido',
    }
  ),
  password: z.string().min(8, {
    message: 'Senha deve ter no mínimo 8 caracteres',
  }).max(255, {
    message: 'Senha deve ter no máximo 255 caracteres',
  })
});