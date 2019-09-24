function objectToQueryString (object = {}) {
  let query = Object.keys(object).map(key => key + '=' + object[key]).join('&');

  if (query.length === 0) {
    return '';
  } else {
    return '?' + query;
  }
}

function zeroFill (number, max) {
  let num = number + '';

  while (num.length < max) {
    num = `0${num}`;
  }

  return num;
}

function capitalize (text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function sanitize (text) {
  return text.replace('-', ' ').replace('_', ' ');
}

function processTypes (types) {
  let results = {
    quadra: {
      to: [],
      from: []
    },
    double: {
      to: [],
      from: []
    },
    half: {
      to: [],
      from: []
    },
    quarter: {
      to: [],
      from: []
    },
    zero: {
      to: [],
      from: []
    }
  };

  results.double.from = types[0].damage_relations.double_damage_from.map((type) => type.name);
  results.double.to = types[0].damage_relations.double_damage_to.map((type) => type.name);
  results.half.from = types[0].damage_relations.half_damage_from.map((type) => type.name);
  results.half.to = types[0].damage_relations.half_damage_to.map((type) => type.name);
  results.zero.from = types[0].damage_relations.no_damage_from.map((type) => type.name);
  results.zero.to = types[0].damage_relations.no_damage_to.map((type) => type.name);

  if (types[1]) {
    types[1].damage_relations.double_damage_from.forEach(type => {
      if (results.double.from.includes(type.name)) {
        results.double.from = results.double.from.filter((name) => name !== type.name);
        results.quadra.from.push(type.name);
      } else if (results.zero.from.includes(type.name)) {
        // do nothing
      } else if (results.half.from.includes(type.name)) {
        results.half.from = results.half.from.filter((name) => name !== type.name);
      } else {
        results.double.from.push(type.name);
      }
    });
    types[1].damage_relations.double_damage_to.forEach(type => {
      if (results.double.to.includes(type.name)) {
        results.double.to = results.double.to.filter((name) => name !== type.name);
        results.quadra.to.push(type.name);
      } else if (results.zero.to.includes(type.name)) {
        // do nothing
      } else if (results.half.to.includes(type.name)) {
        results.half.to = results.half.to.filter((name) => name !== type.name);
      } else {
        results.double.to.push(type.name);
      }
    });

    types[1].damage_relations.half_damage_from.forEach(type => {
      if (results.double.from.includes(type.name)) {
        results.double.from = results.double.from.filter((name) => name !== type.name);
      } else if (results.zero.from.includes(type.name)) {
        // do nothing
      } else if (results.half.from.includes(type.name)) {
        results.half.from = results.half.from.filter((name) => name !== type.name);
        results.quarter.from.push(type.name);
      } else {
        results.half.from.push(type.name);
      }
    });
    types[1].damage_relations.half_damage_to.forEach(type => {
      if (results.double.to.includes(type.name)) {
        results.double.to = results.double.to.filter((name) => name !== type.name);
      } else if (results.zero.to.includes(type.name)) {
        // do nothing
      } else if (results.half.to.includes(type.name)) {
        results.half.to = results.half.to.filter((name) => name !== type.name);
        results.quarter.to.push(type.name)
      } else {
        results.half.to.push(type.name);
      }
    });

    types[1].damage_relations.no_damage_from.forEach(type => {
      if (results.double.from.includes(type.name)) {
        results.double.from = results.double.from.filter((name) => name !== type.name);
      } else if (results.zero.from.includes(type.name)) {
        // do nothing
      } else if (results.half.from.includes(type.name)) {
        results.half.from = results.half.from.filter((name) => name !== type.name);
      } else {
        results.zero.from.push(type.name);
      }
    });
    types[1].damage_relations.no_damage_to.forEach(type => {
      if (results.double.to.includes(type.name)) {
        results.double.to = results.double.to.filter((name) => name !== type.name);
      } else if (results.zero.to.includes(type.name)) {
        // do nothing
      } else if (results.half.to.includes(type.name)) {
        results.half.to = results.half.to.filter((name) => name !== type.name);
      } else {
        results.zero.to.push(type.name);
      }
    });
  }

  return results;
}

export {
  capitalize,
  sanitize,
  objectToQueryString,
  zeroFill,
  processTypes
};
