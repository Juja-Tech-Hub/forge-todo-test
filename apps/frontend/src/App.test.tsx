import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without errors', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('displays the app title', () => {
    render(<App />);
    expect(screen.getByText('Forge Todo App')).toBeTruthy();
  });

  it('displays the app description', () => {
    render(<App />);
    expect(screen.getByText('Manage your tasks efficiently')).toBeTruthy();
  });
});
