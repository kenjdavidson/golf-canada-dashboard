import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Terms from '../terms';

describe('Terms Page', () => {
  it('renders terms of service heading', () => {
    render(<Terms />);
    expect(screen.getByText('Terms of Service')).toBeDefined();
  });
});
