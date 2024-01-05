import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Archive from './Archive';

jest.mock('./ArchivedItem/ArchivedItem', () => ({ activity, onUnarchive }) => (
  <div data-testid="archived-item">ArchivedItem - {activity.id}</div>
));

describe('Archive Component', () => {
  const mockActivities = [
    { id: '1', is_archived: true },
    { id: '2', is_archived: true },
    { id: '3', is_archived: false }
  ];

  it('renders only archived activities', () => {
    const onUnarchive = jest.fn();
    const { getAllByTestId } = render(
      <Archive activities={mockActivities} onUnarchive={onUnarchive} />
    );

    const archivedItems = getAllByTestId('archived-item');
    expect(archivedItems.length).toBe(2); // Since only two activities are archived
  });

  it('calls onUnarchive for all activities when unarchive all is clicked', () => {
    const onUnarchive = jest.fn();
    const { getByText } = render(
      <Archive activities={mockActivities} onUnarchive={onUnarchive} />
    );

    fireEvent.click(getByText('Unarchive All'));
    expect(onUnarchive).toHaveBeenCalledTimes(2); // Two times, for each archived activity
  });
});
