import React, { Fragment, useState, useEffect } from 'react';
import styles from './PokeDetail.styles.scss';
import clsx from 'clsx';

import {
  getPokemonById,
  getPokemonSpeciesById,
  getEvolutionChainByUrl,
  getTypeById,
  getAbilityByName
} from 'api';
import { capitalize, sanitize, zeroFill, processTypes } from 'src/utils';
import { Loading, PokeCard, PokeType } from 'components';
import logo from 'assets/img/poke-logo.png';

const initialStats = {
  hp: {
    label: 'HP',
    value: 0
  },
  attack: {
    label: 'Attack',
    value: 0
  },
  defense: {
    label: 'Defense',
    value: 0
  },
  "special-attack": {
    label: 'Special Attack',
    value: 0
  },
  "special-defense": {
    label: 'Special Defense',
    value: 0
  },
  speed: {
    label: 'Speed',
    value: 0
  },
};

const StatsGrid = (props) => {
  const {
    stats: rawStats
  } = props;

  const [ stats, setStats ] = useState(initialStats);

  useEffect(() => {
    let updatedStats = { ...initialStats };

    if (rawStats) {
      rawStats.forEach((stat) => {
        updatedStats = {
          ...updatedStats,
          [stat.stat.name]: {
            label: updatedStats[stat.stat.name].label,
            value: stat.base_stat
          }
        };
      });

      setStats(updatedStats);
    }
  }, [ rawStats ])

  return (
    <div className="stats-grid">
      {Object.entries(stats).map(([ key, stat ]) => <StatsColumn key={key} name={stat.label} value={stat.value} />)}
    </div>
  );
}

const StatsColumn = (props) => {
  const {
    name,
    value,
    ...other
  } = props;

  const MAX_STAT = 250;
  const TOTAL_BARS = 10;
  const percentage = value / 255 * TOTAL_BARS;
  const numBars = Math.ceil(value / 255 * TOTAL_BARS);

  let filled = []
  let empty = [];

  for (let i = 0; i < numBars; i++) {
    filled.push(<div key={i} className="stats-column-fill"></div>);
  }
  for (let i = 0; i < TOTAL_BARS - numBars; i++) {
    empty.push(<div key={numBars+i} className="stats-column-empty"></div>);
  }

  return (
    <div className="stats-column" {...other}>
      {empty}
      {filled}
      <span className="stats-column-name">{name}</span>
    </div>
  );
}

const PokeDetail = (props) => {
  const {
    match,
    history
  } = props;

  const [ pokemon, setPokemon ] = useState({});
  const [ species, setSpecies ] = useState(null);
  const [ evolutionDetails, setEvolutionDetails ] = useState(null);
  const [ evolutionChain, setEvolutionChain ] = useState([]);
  const [ typesInfo, setTypesInfo ] = useState(null);
  const [ abilitiesInfo, setAbilitiesInfo ] = useState([]);
  const [ currentAbility, setCurrentAbility ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ previousPokemon, setPreviousPokemon ] = useState(null);
  const [ nextPokemon, setNextPokemon ] = useState(null);

  function getPokemonsByChain (chain) {
    let promises = [ getPokemonById(chain.species.name) ];

    if (chain.evolves_to[0]) {
      promises.push(getPokemonById(chain.evolves_to[0].species.name));

      if (chain.evolves_to[0].evolves_to[0]) {
        promises.push(getPokemonById(chain.evolves_to[0].evolves_to[0].species.name));
      }
    }

    return Promise.all(promises);
  }

  function getDescription () {
    let description = '';

    if (species) {
      species.flavor_text_entries.forEach((entry) => {
        if (!description && entry.language.name === 'en') {
          description = entry.flavor_text;
        }
      });
    }

    return description;
  }

  function handleAbilityClick (ability) {
    let abilityDescription = '';

    ability.flavor_text_entries.forEach((entry) => {
      if (!abilityDescription && entry.language.name === 'en') {
        abilityDescription = entry.flavor_text;
      }
    })

    setCurrentAbility(abilityDescription);
  }

  function handlePrevPokemon () {
    setLoading(true);
    history.push(`/${previousPokemon.id}`);
  }
  function handleNextPokemon () {
    setLoading(true);
    history.push(`/${nextPokemon.id}`);
  }

  function goPokedex () {
    setLoading(true);
    history.push('/');
  }

  useEffect(() => {
    let poke = null;
    setLoading(true);
    getPokemonById(match.params.id)
      .then((res) => {
        setPokemon(res);
        poke = res;
        return getPokemonSpeciesById(res.id);
      })
      .then((spec) => {
        setSpecies(spec);
        return getEvolutionChainByUrl(spec.evolution_chain.url);
      })
      .then((chain) => {
        setEvolutionDetails(chain.chain);
        return getPokemonsByChain(chain.chain);
      })
      .then((evolutions) => {
        setEvolutionChain(evolutions);
        let types = [];

        poke.types.forEach((type) => {
          types.push(getTypeById(type.type.name));
        });

        return Promise.all(types);
      })
      .then((types) => {
        setTypesInfo(processTypes(types));

        let promises = poke.abilities.map((ability) => getAbilityByName(ability.ability.name));

        return Promise.all(promises);
      })
      .then((abilities) => {
        setAbilitiesInfo(abilities);
        return Promise.all([
          poke.id > 1 ? getPokemonById(poke.id - 1) : getPokemonById(809),
          poke.id < 809 ? getPokemonById(poke.id + 1) : getPokemonById(1)
        ]);
      })
      .then(([ prev, next ]) => {
        setPreviousPokemon(prev);
        setNextPokemon(next);
        console.log(prev)
        console.log(next)
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ match.params.id ]);

  return (
    <div className="PokeDetail">
      <div className="header">
        <button className="prev" onClick={handlePrevPokemon}>
          <div>Previous</div>
          {previousPokemon && <div className="prev-poke">
            <div>Nº.{zeroFill(previousPokemon.id, 3)}</div>
            <div>{capitalize(previousPokemon.name)}</div>
          </div>}
        </button>
        <img className="logo" src={logo} onClick={goPokedex} />
        <button className="next" onClick={handleNextPokemon}>
          <div>Next</div>
          {nextPokemon && <div className="next-poke">
            <div>Nº.{zeroFill(nextPokemon.id, 3)}</div>
            <div>{capitalize(nextPokemon.name)}</div>
          </div>}
        </button>
      </div>

      <div className="container">
        <div className="column">
          <div className="image">
            {pokemon.id && <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroFill(pokemon.id, 3)}.png`} />}
          </div>

          <div className="stats">
            <div>Stats</div>
            <StatsGrid stats={pokemon.stats} />
          </div>
        </div>

        <div className="column">
          <div className="description">
            <span>{getDescription()}</span>
          </div>

          <div className="info">
            {currentAbility !== null && <div className="ability-overlay">
              <span className="close-overlay" onClick={() => setCurrentAbility(null)}>X</span>
              <span>{currentAbility}</span>
            </div>}
            {species && (<Fragment>
              <div className="column">
                <div className="attribute">
                  <span className="title">Height</span>
                  <span>{pokemon.height / 10} m</span>
                </div>

                <div className="attribute">
                  <span className="title">Weight</span>
                  <span>{pokemon.weight / 10} kg</span>
                </div>

                <div className="attribute">
                  <span className="title">Gender</span>
                  <span>???</span>
                </div>
              </div>
              <div className="column">
                <div className="attribute">
                  <span className="title">Category</span>
                  <span>{capitalize(species.shape.name)}</span>
                </div>
                <div className="attribute">
                  <span className="title">Abilities</span>
                  {abilitiesInfo.map((ability) =>
                    <div key={ability.id} className="ability" onClick={() => handleAbilityClick(ability)}>
                      {sanitize(capitalize(ability.name))}
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
            )}
          </div>

          <div className="attributes">
            <div>Types</div>
            <div className="types">
              {pokemon.types &&
                [].concat(pokemon.types)
                  .sort((a, b) => a.slot < b.slot)
                  .map((type) => <PokeType key={type.slot} size="big" type={type.type.name} />)
              }
            </div>

            <div>Weaknesses</div>
            <div className="weaknesses">
              {typesInfo &&
                [].concat(typesInfo.quadra.from)
                  .concat(typesInfo.double.from)
                  .map((type) => <PokeType key={type} size="big" type={type} />)
              }
            </div>
          </div>
        </div>
      </div>

      <div className="evolutions">
        <div className="title">Evolutions</div>
        <div className="evolutions-pokemons">
          {evolutionChain.map((evolution, index) => (
            <Fragment key={evolution.id}>
              <PokeCard className={clsx({
                current: pokemon.id === evolution.id
              })} pokemon={evolution} />
              {index < evolutionChain.length - 1 && <span className="arrow-right"></span>}
            </Fragment>
          ))}
        </div>
      </div>

      <Loading loading={loading} />
    </div>
  );
}

export default PokeDetail;
