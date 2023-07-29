import z from 'zod';

const taskSchema = z.object({
  task: z.string().max(255, {
    message: 'Tarefa deve ter no máximo 255 caracteres',
  }).min(3, {
    message: 'Tarefa deve ter no mínimo 3 caracteres',
  }),
});

export default taskSchema;