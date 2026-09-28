type CatFactResponse = {
  fact: string
}

export async function fetchRandomCatFact(): Promise<CatFactResponse> {
  const response = await fetch('https://catfact.ninja/fact')

  if (!response.ok) {
    throw new Error('Could not fetch a cat fact')
  }

  return response.json()
}