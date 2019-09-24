import React from 'react';
import styles from './PokeType.styles.scss';

import clsx from 'clsx';

const PokeType = (props) => {
  const {
    type,
    size,
    ...other
  } = props;

  return (
    <div className={clsx('PokeType', `type-${type}`, `size-${size || 'normal'}`)} {...other}>
      {type}
    </div>
  );
};

export default PokeType;
