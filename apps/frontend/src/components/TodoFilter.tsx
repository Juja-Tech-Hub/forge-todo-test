import React from 'react';
import { styled } from '@stitches/react';

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterContainer = styled('div', {
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px 0',
  borderRadius: '8px',
});

const FilterButton = styled('button', {
  padding: '6px 16px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  background: 'transparent',
  color: '#6b7280',
  fontSize: '0.875rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  '&:hover': {
    borderColor: '#6366f1',
    color: '#6366f1',
    backgroundColor: '#f5f3ff',
  },

  '&:focus': {
    outline: '2px solid #6366f1',
    outlineOffset: '2px',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        color: '#ffffff',
        fontWeight: '600',

        '&:hover': {
          backgroundColor: '#4f46e5',
          borderColor: '#4f46e5',
          color: '#ffffff',
        },
      },
      false: {},
    },
  },
});

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <FilterContainer role="group" aria-label="Todo filters">
      {FILTERS.map(({ label, value }) => {
        const isActive = currentFilter === value;
        return (
          <FilterButton
            key={value}
            active={isActive}
            data-active={String(isActive)}
            className={isActive ? 'filter-btn active' : 'filter-btn'}
            onClick={() => onFilterChange(value)}
            aria-pressed={isActive}
          >
            {label}
          </FilterButton>
        );
      })}
    </FilterContainer>
  );
};

export default TodoFilter;
