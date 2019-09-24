import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { PokeCard } from './PokeCard';

afterEach(cleanup);

describe('This will test PokeCard', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PokeCard
        pokemon={{
          id: 1,
          name: 'charmander',
        }}
      />
    );

    expect(getByText('charmander')).toBeInTheDocument();
  });
});
