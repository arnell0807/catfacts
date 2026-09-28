import { useQuery } from '@tanstack/react-query'
import { fetchRandomCatFact } from '../api/catFacts'

export function useCatFact() {
  return useQuery({
    queryKey: ["cat-fact"],
    queryFn: fetchRandomCatFact,
    staleTime: Infinity,
    retry: 1,
  })
}


