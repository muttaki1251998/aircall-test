import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ActivityFeed from './ActivityFeed';
import axios from 'axios';

jest.mock('axios');

const mockActivities = [
  { id: '1', from: '100000', to: '200000', created_at: new Date().toISOString(), is_archived: false },
  { id: '2', from: '100001', to: '200001', created_at: new Date().toISOString(), is_archived: true }
];

describe('ActivityFeed', () => {
  it('renders non-archived activities and does not render archived ones', () => {
    const selectActivity = jest.fn();
    const onArchive = jest.fn();

    const { queryByText } = render(
      <MemoryRouter>
        <ActivityFeed 
          activities={mockActivities} 
          selectActivity={selectActivity} 
          onArchive={onArchive} 
        />
      </MemoryRouter>
    );
    expect(queryByText('100001')).not.toBeInTheDocument();
  });

  it('archives all non-archived activities when "Archive All" button is clicked', () => {
    const selectActivity = jest.fn();
    const setActivities = jest.fn();
    const onArchive = jest.fn();

    onArchive.mockImplementation((id) => {
      setActivities((prev) => prev.map((activity) => {
        if (activity.id === id) {
          return { ...activity, is_archived: true };
        }
        return activity;
      }));
    });

    const { getByText } = render(
      <MemoryRouter>
        <ActivityFeed 
          activities={mockActivities} 
          selectActivity={selectActivity} 
          setActivities={setActivities} 
          onArchive={onArchive} 
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText(/Archive All/i));
    expect(onArchive).toHaveBeenCalledTimes(1);
  });
});
