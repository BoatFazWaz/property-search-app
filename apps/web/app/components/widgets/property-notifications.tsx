'use client';

import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'alert' | 'update';
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
}

export function PropertyNotificationsWidget() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'New Properties Available',
      message: '5 new properties have been added in your area of interest.',
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false
    },
    {
      id: '2',
      type: 'alert',
      title: 'Price Drop Alert',
      message: 'Modern Apartment price has dropped by $25,000.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: false
    },
    {
      id: '3',
      type: 'update',
      title: 'Search Results Updated',
      message: 'Your saved search has 3 new matching properties.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Open House Scheduled',
      message: 'Luxury Villa has an open house this weekend.',
      date: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      isRead: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return (
          <div className="p-2 bg-blue-100 rounded-full">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'alert':
        return (
          <div className="p-2 bg-red-100 rounded-full">
            <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'update':
        return (
          <div className="p-2 bg-green-100 rounded-full">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
    }
  };

  const getTimeString = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {unreadCount} new
            </span>
          )}
        </h2>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex gap-3 p-3 rounded-lg border ${
                notification.isRead ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className={`font-medium ${notification.isRead ? 'text-gray-800' : 'text-black'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {getTimeString(notification.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="flex gap-3 mt-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No notifications to display
          </div>
        )}
      </div>
    </div>
  );
} 