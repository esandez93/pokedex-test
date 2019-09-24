import React, { useState, useEffect } from 'react';
import styles from './Pokedex.styles.scss';

import { PokeCard } from 'components';
import {
  getPokemons,
  getPokemonByName
} from 'api';

const Pokedex = (props) => {
  const [ pokemons, setPokemons ] = useState([]);
  const [ mode, setMode ] = useState('compact');

  useEffect(() => {
    getPokemonsByRange();
  }, []);

  function getPokemonsByRange (offset = 0, limit = 20) {
    getPokemons({
      offset,
      limit
    }).then((res) => {
      const promises = res.results.map((pokemon) => getPokemonByName(pokemon.name));
      return Promise.all(promises);
    }).then((results) => {
      const sort = results.sort((a, b) => a.id > b.id);
      setPokemons([
        ...pokemons,
        ...sort
      ]);
    }).catch((e) => {
      console.error(e);
    });
  }

  return (
    <div className="Pokedex">
      <h2>Pokedex</h2>

      <div className="list">
        {pokemons.map((pokemon) => {
          return <PokeCard key={pokemon.id} pokemon={pokemon} mode={mode} />;
        })}
      </div>
    </div>
  );
};

export default Pokedex;
