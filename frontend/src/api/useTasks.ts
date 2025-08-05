import { useQuery } from '@tanstack/vue-query';

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/tasks');
      return res.json();
    },
  });
}
