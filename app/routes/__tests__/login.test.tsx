import { describe, it, expect } from 'vitest';
import Login from '../login';

describe('Login Page', () => {
  it('component is defined and exportable', () => {
    expect(Login).toBeDefined();
    expect(typeof Login).toBe('function');
  });

  it('default export is the Login component', () => {
    expect(Login.name).toBe('Login');
  });
});
