import { objectToQueryString } from 'src/utils';

const pokeApi = 'https://pokeapi.co/api/v2';

function getPokemons (params) {
  return new Promise((resolve, reject) => fetch(`${pokeApi}/pokemon${objectToQueryString(params)}`).then(res => resolve(res.json())).catch(reject));
}

function getPokemonByName (name) {
  return new Promise((resolve, reject) => fetch(`${pokeApi}/pokemon/${name}`).then(res => resolve(res.json())).catch(reject));
}

function getPokemonById (id) {
  return new Promise((resolve, reject) => fetch(`${pokeApi}/pokemon/${id}`).then(res => resolve(res.json())).catch(reject));
}

function getPokemonSpeciesById (id) {
  return new Promise((resolve, reject) => fetch(`${pokeApi}/pokemon-species/${id}`).then(res => resolve(res.json())).catch(reject));
}

function getEvolutionChainById (id) {
  return new Promise((resolve, reject) => fetch(`${pokeApi}/evolution-chain/${id}`).then(res => resolve(res.json())).catch(reject));
}

function getEvolutionChainByUrl (url) {
  return new Promise((resolve, reject) => fetch(`${url}`).then(res => resolve(res.json())).catch(reject));
}

function getTypeById (id) {
  return new Promise((resolve, reject) => fetch(`${pokeApi}/type/${id}`).then(res => resolve(res.json())).catch(reject));
}

function getAbilityByName (name) {
  return new Promise((resolve, reject) => fetch(`${pokeApi}/ability/${name}`).then(res => resolve(res.json())).catch(reject));
}

export {
  getPokemons,
  getPokemonById,
  getPokemonByName,

  getPokemonSpeciesById,

  getEvolutionChainById,
  getEvolutionChainByUrl,

  getTypeById,

  getAbilityByName
};
