import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Terms from '../terms';

describe('Terms Page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders terms of service heading', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      text: async () => '# Terms of Service',
    });

    render(<Terms />);

    await waitFor(() => {
      expect(screen.getByText('Terms of Service')).toBeDefined();
    });
  });

  it('handles fetch errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    render(<Terms />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
