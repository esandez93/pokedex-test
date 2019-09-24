import React from 'react';
import { render, cleanup } from '@testing-library/react';

import PokeType from './PokeType';

afterEach(cleanup);

describe('This will test PokeType', () => {
  it('renders message', () => {
    const { getByText } = render(<PokeType type="normal" />);

    expect(getByText('normal')).toBeInTheDocument();
  });

  it('has correct classes', () => {
    const { getByText } = render(<PokeType type="normal" size="big" />);

    expect(getByText('normal')).toHaveClass('size-big');
    expect(getByText('normal')).toHaveClass('type-normal');
  });
});
