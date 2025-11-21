import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Policy from '../policy';

describe('Policy Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders privacy policy heading', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: async () => '# Privacy Policy',
    });

    render(<Policy />);

    await waitFor(() => {
      expect(screen.getByText('Privacy Policy')).toBeDefined();
    });
  });

  it('handles fetch errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    render(<Policy />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
