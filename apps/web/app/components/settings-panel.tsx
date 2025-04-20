'use client';

import React, { useState, useEffect } from 'react';

interface WidgetSettings {
  enabled: boolean;
  refreshInterval?: number;
}

interface Settings {
  github: WidgetSettings;
  weather: WidgetSettings;
  quote: WidgetSettings;
  kanban: WidgetSettings;
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultSettings: Settings = {
  github: { enabled: true, refreshInterval: 300 },
  weather: { enabled: true, refreshInterval: 900 },
  quote: { enabled: true, refreshInterval: 3600 },
  kanban: { enabled: true },
};

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('widget-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  const handleSettingChange = (
    widget: keyof Settings,
    field: keyof WidgetSettings,
    value: boolean | number
  ) => {
    const newSettings = {
      ...settings,
      [widget]: {
        ...settings[widget],
        [field]: value,
      },
    };
    setSettings(newSettings);
    localStorage.setItem('widget-settings', JSON.stringify(newSettings));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Dashboard Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(settings).map(([widget, config]) => (
            <div key={widget} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {widget} Widget
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={(e) => handleSettingChange(widget as keyof Settings, 'enabled', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
              </div>
              {config.refreshInterval !== undefined && (
                <div className="mt-2">
                  <label className="text-xs text-gray-500 dark:text-gray-400">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    min="60"
                    step="60"
                    value={config.refreshInterval}
                    onChange={(e) => handleSettingChange(widget as keyof Settings, 'refreshInterval', Number(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 