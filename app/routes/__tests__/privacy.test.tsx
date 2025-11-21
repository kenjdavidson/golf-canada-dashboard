import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Privacy from '../privacy';

describe('Privacy Page', () => {
  it('renders privacy policy heading', () => {
    render(<Privacy />);
    expect(screen.getByText('Privacy Policy')).toBeDefined();
  });
});
