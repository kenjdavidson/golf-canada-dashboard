import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Terms from '../terms';

describe('Terms Page', () => {
  it('renders terms of use heading', () => {
    render(<Terms />);
    expect(screen.getByText('Terms of Use')).toBeDefined();
  });
});
