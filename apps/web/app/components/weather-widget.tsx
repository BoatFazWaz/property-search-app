'use client';

import { useEffect, useState } from 'react';
import { Card } from '@repo/ui/card';
import { LoadingSkeleton } from './loading-skeleton';
import { RefreshButton } from './refresh-button';
import { ErrorBoundary } from './error-boundary';
import type { WeatherData } from '@repo/api/types';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const content = (
    <Card title="Weather">
      <div className="flex justify-end mb-4">
        <RefreshButton onRefresh={fetchWeather} loading={loading} />
      </div>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : loading ? (
        <LoadingSkeleton className="h-24" />
      ) : weather ? (
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              className="w-16 h-16"
            />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {weather.condition}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {weather.location}
          </div>
        </div>
      ) : null}
    </Card>
  );

  return <ErrorBoundary>{content}</ErrorBoundary>;
} 