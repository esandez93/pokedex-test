import React from 'react';
import styles from './PokeCard.styles.scss';
import { withRouter } from 'react-router';
import clsx from 'clsx';

import { PokeType } from 'components';
import { zeroFill } from 'src/utils';

//function zeroFill(a){return a};

export const PokeCard = (props) => {
  const {
    className,
    pokemon,
    mode,
    history,
    staticContext,
    ...other
  } = props;

  return (
    <div className={clsx('PokeCard', className)} onClick={() => history.push(`/${pokemon.id}`)} {...other}>
      <div className="upper">
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${zeroFill(pokemon.id, 3)}.png`} />
      </div>
      <div className="lower">
        <div className="number">N.º {zeroFill(pokemon.id, 3)}</div>
        <div className="name">{pokemon.name}</div>
        <div className="types">
          {pokemon.types ?
            [].concat(pokemon.types)
              .sort((a, b) => a.slot < b.slot)
              .map((type) => <PokeType key={type.slot} type={type.type.name} />)
            : <PokeType type="???" />
          }
        </div>
      </div>
    </div>
  );
};

export default withRouter(PokeCard);
