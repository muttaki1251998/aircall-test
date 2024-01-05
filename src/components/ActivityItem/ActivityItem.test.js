import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ActivityItem from './ActivityItem';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('ActivityItem Component', () => {
  const mockActivity = {
    id: '1',
    from: '123456789',
    to: '987654321',
    call_type: 'missed',
    is_archived: false,
    created_at: '2021-01-01T00:00:00Z',
    direction: 'inbound',
  };

  const mockOnArchive = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(
      <Router>
        <ActivityItem activity={mockActivity} onArchive={mockOnArchive} />
      </Router>
    );

    expect(getByText('123456789')).toBeInTheDocument();
  });

  it('calls onArchive when archive icon is clicked', () => {
    const { getByTestId } = render(
      <Router>
        <ActivityItem activity={mockActivity} onArchive={mockOnArchive} />
      </Router>
    );

    const archiveButton = getByTestId('archive-icon');
    fireEvent.click(archiveButton);
    expect(mockOnArchive).toHaveBeenCalledWith(mockActivity.id);
  });
});
