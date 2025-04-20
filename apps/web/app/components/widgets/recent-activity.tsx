'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'view' | 'save' | 'contact';
  propertyId: string;
  propertyName: string;
  timestamp: Date;
}

export function RecentActivityWidget() {
  // Mock activity data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'view',
      propertyId: 'prop1',
      propertyName: 'Modern Apartment',
      timestamp: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
    },
    {
      id: '2',
      type: 'save',
      propertyId: 'prop2',
      propertyName: 'Luxury Villa',
      timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      id: '3',
      type: 'contact',
      propertyId: 'prop3',
      propertyName: 'Downtown Condo',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: '4',
      type: 'view',
      propertyId: 'prop4',
      propertyName: 'Suburban House',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'view':
        return (
          <div className="p-2 bg-blue-100 rounded-full">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        );
      case 'save':
        return (
          <div className="p-2 bg-green-100 rounded-full">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
        );
      case 'contact':
        return (
          <div className="p-2 bg-purple-100 rounded-full">
            <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'view':
        return `You viewed ${activity.propertyName}`;
      case 'save':
        return `You saved ${activity.propertyName} to favorites`;
      case 'contact':
        return `You contacted agent about ${activity.propertyName}`;
    }
  };

  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            {getActivityIcon(activity.type)}
            <div className="flex-1">
              <p className="text-sm font-medium">{getActivityText(activity)}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 