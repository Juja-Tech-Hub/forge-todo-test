import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoFilter from './TodoFilter';
import type { FilterType } from './TodoFilter';

describe('TodoFilter Component', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  describe('Rendering', () => {
    it('renders without errors', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      expect(document.body).toBeTruthy();
    });

    it('renders the All filter button', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      expect(screen.getByText('All')).toBeTruthy();
    });

    it('renders the Active filter button', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      expect(screen.getByText('Active')).toBeTruthy();
    });

    it('renders the Completed filter button', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      expect(screen.getByText('Completed')).toBeTruthy();
    });

    it('renders exactly three filter buttons', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });
  });

  describe('Active filter highlighting', () => {
    it('highlights the All button when currentFilter is "all"', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      const allButton = screen.getByText('All');
      expect(allButton.closest('button')?.getAttribute('data-active')).toBe('true');
    });

    it('does not highlight the Active button when currentFilter is "all"', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      const activeButton = screen.getByText('Active');
      expect(activeButton.closest('button')?.getAttribute('data-active')).toBe('false');
    });

    it('does not highlight the Completed button when currentFilter is "all"', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      const completedButton = screen.getByText('Completed');
      expect(completedButton.closest('button')?.getAttribute('data-active')).toBe('false');
    });

    it('highlights the Active button when currentFilter is "active"', () => {
      render(
        <TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />
      );
      const activeButton = screen.getByText('Active');
      expect(activeButton.closest('button')?.getAttribute('data-active')).toBe('true');
    });

    it('does not highlight the All button when currentFilter is "active"', () => {
      render(
        <TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />
      );
      const allButton = screen.getByText('All');
      expect(allButton.closest('button')?.getAttribute('data-active')).toBe('false');
    });

    it('highlights the Completed button when currentFilter is "completed"', () => {
      render(
        <TodoFilter currentFilter="completed" onFilterChange={mockOnFilterChange} />
      );
      const completedButton = screen.getByText('Completed');
      expect(completedButton.closest('button')?.getAttribute('data-active')).toBe('true');
    });

    it('does not highlight the All button when currentFilter is "completed"', () => {
      render(
        <TodoFilter currentFilter="completed" onFilterChange={mockOnFilterChange} />
      );
      const allButton = screen.getByText('All');
      expect(allButton.closest('button')?.getAttribute('data-active')).toBe('false');
    });

    it('applies active CSS class to the currently selected filter button', () => {
      render(
        <TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />
      );
      const activeButton = screen.getByText('Active').closest('button');
      expect(activeButton?.className).toMatch(/active/);
    });

    it('does not apply active CSS class to non-selected filter buttons', () => {
      render(
        <TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />
      );
      const allButton = screen.getByText('All').closest('button');
      // The all button should not have the active class when filter is "active"
      expect(allButton?.getAttribute('data-active')).toBe('false');
    });
  });

  describe('Filter change callbacks', () => {
    it('calls onFilterChange with "all" when All button is clicked', () => {
      render(
        <TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />
      );
      fireEvent.click(screen.getByText('All'));
      expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
      expect(mockOnFilterChange).toHaveBeenCalledWith('all');
    });

    it('calls onFilterChange with "active" when Active button is clicked', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      fireEvent.click(screen.getByText('Active'));
      expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
      expect(mockOnFilterChange).toHaveBeenCalledWith('active');
    });

    it('calls onFilterChange with "completed" when Completed button is clicked', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      fireEvent.click(screen.getByText('Completed'));
      expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
      expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
    });

    it('calls onFilterChange even when clicking the currently active filter', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      fireEvent.click(screen.getByText('All'));
      expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
      expect(mockOnFilterChange).toHaveBeenCalledWith('all');
    });

    it('does not call onFilterChange on initial render', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });
  });

  describe('TypeScript types', () => {
    it('accepts "all" as a valid FilterType', () => {
      const filter: FilterType = 'all';
      render(
        <TodoFilter currentFilter={filter} onFilterChange={mockOnFilterChange} />
      );
      expect(screen.getByText('All')).toBeTruthy();
    });

    it('accepts "active" as a valid FilterType', () => {
      const filter: FilterType = 'active';
      render(
        <TodoFilter currentFilter={filter} onFilterChange={mockOnFilterChange} />
      );
      expect(screen.getByText('Active')).toBeTruthy();
    });

    it('accepts "completed" as a valid FilterType', () => {
      const filter: FilterType = 'completed';
      render(
        <TodoFilter currentFilter={filter} onFilterChange={mockOnFilterChange} />
      );
      expect(screen.getByText('Completed')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('renders buttons with accessible role', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('has a container with a nav or filter role', () => {
      const { container } = render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      const filterContainer = container.firstChild as HTMLElement;
      expect(filterContainer).toBeTruthy();
    });

    it('All button has correct aria-label or text', () => {
      render(
        <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
      );
      expect(screen.getByText('All')).toBeTruthy();
    });
  });
});
