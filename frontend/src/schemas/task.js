import z from 'zod';

const taskSchema = z.object({
  task: z.string().min(3, {
    message: 'Tarefa deve ter no mínimo 3 caracteres',
  }),
});

export default taskSchema;