'use client';

import React, { Suspense, useState } from 'react';
import { SettingsPanel } from './components/settings-panel';
import { DraggableGrid } from './components/grid-layout';
import { PropertyListWidget } from './components/widgets/property-list';
import { PropertyMapWidget } from './components/widgets/property-map';
import { PropertyStatsWidget } from './components/widgets/property-stats';
import { PropertyTrendsWidget } from './components/widgets/property-trends';
import { PropertyTypeWidget } from './components/widgets/property-type';
import { PropertyPriceWidget } from './components/widgets/property-price';
import { PropertySearchWidget } from './components/widgets/property-search';
import { RecentActivityWidget } from './components/widgets/recent-activity';
import { PropertyComparisonWidget } from './components/widgets/property-comparison';
import { PropertyNotificationsWidget } from './components/widgets/property-notifications';

export default function DashboardPage(): React.ReactElement {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [layouts, setLayouts] = useState([
    { i: 'map', x: 0, y: 0, w: 8, h: 4, component: 
      <Suspense fallback={<div>Loading map...</div>}>
        <PropertyMapWidget />
      </Suspense>
    },
    { i: 'list', x: 8, y: 0, w: 4, h: 4, component:
      <Suspense fallback={<div>Loading properties...</div>}>
        <PropertyListWidget />
      </Suspense>
    },
    { i: 'notifications', x: 0, y: 4, w: 3, h: 3, component:
      <Suspense fallback={<div>Loading notifications...</div>}>
        <PropertyNotificationsWidget />
      </Suspense>
    },
    { i: 'search', x: 3, y: 4, w: 3, h: 3, component:
      <Suspense fallback={<div>Loading search...</div>}>
        <PropertySearchWidget />
      </Suspense>
    },
    { i: 'activity', x: 6, y: 4, w: 3, h: 3, component:
      <Suspense fallback={<div>Loading activity...</div>}>
        <RecentActivityWidget />
      </Suspense>
    },
    { i: 'comparison', x: 9, y: 4, w: 3, h: 4, component:
      <Suspense fallback={<div>Loading comparison...</div>}>
        <PropertyComparisonWidget />
      </Suspense>
    },
    { i: 'stats', x: 0, y: 7, w: 3, h: 2, component:
      <Suspense fallback={<div>Loading stats...</div>}>
        <PropertyStatsWidget />
      </Suspense>
    },
    { i: 'trends', x: 3, y: 7, w: 3, h: 2, component:
      <Suspense fallback={<div>Loading trends...</div>}>
        <PropertyTrendsWidget />
      </Suspense>
    },
    { i: 'type', x: 6, y: 7, w: 3, h: 2, component:
      <Suspense fallback={<div>Loading types...</div>}>
        <PropertyTypeWidget />
      </Suspense>
    },
    { i: 'price', x: 9, y: 8, w: 3, h: 2, component:
      <Suspense fallback={<div>Loading prices...</div>}>
        <PropertyPriceWidget />
      </Suspense>
    },
  ]);

  const handleLayoutChange = (newLayout: any[]) => {
    setLayouts(layouts.map((item, index) => ({
      ...item,
      ...newLayout[index]
    })));
  };

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Your Property Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              // Reset to default layout could be implemented here
            }}
            className="px-3 py-1.5 text-sm md:px-4 md:py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Reset Layout
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-3 py-1.5 text-sm md:px-4 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Settings
          </button>
        </div>
      </div>

      <DraggableGrid layouts={layouts} onLayoutChange={handleLayoutChange} />

      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </main>
  );
} 