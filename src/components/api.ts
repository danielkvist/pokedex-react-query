const fetchPkmns = async (_: string, cursor: string | undefined) => {
  const url = cursor ? cursor :
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  const res = await fetch(url);
  return res.json();
}

const fetchPkmnStats = async (_: string, url: string) => {
  const res = await fetch(url);
  return res.json();
}

export { fetchPkmns, fetchPkmnStats }