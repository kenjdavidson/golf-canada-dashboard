import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Policy from '../policy';

describe('Policy Page', () => {
  it('renders privacy policy heading', () => {
    render(<Policy />);
    expect(screen.getByText('Privacy Policy')).toBeDefined();
  });
});
