import React, { Fragment } from 'react';
import styles from './Loading.styles.scss'

const Loading = (props) => {
  const {
    loading
  } = props;

  return loading === true ? (
    <div className="Loading">
      <div className="pokeballs">
        <div className="pokeball" id="normal"></div>
        <div className="pokeball" id="great"></div>
        <div className="pokeball" id="ultra"></div>
        <div className="pokeball" id="master"></div>
        <div className="pokeball" id="safari"></div>
      </div>
    </div>
  ) : <div></div>
}

export default Loading;
