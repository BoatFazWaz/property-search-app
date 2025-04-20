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
    { i: 'stats', x: 0, y: 4, w: 4, h: 2, component:
      <Suspense fallback={<div>Loading stats...</div>}>
        <PropertyStatsWidget />
      </Suspense>
    },
    { i: 'trends', x: 4, y: 4, w: 4, h: 2, component:
      <Suspense fallback={<div>Loading trends...</div>}>
        <PropertyTrendsWidget />
      </Suspense>
    },
    { i: 'type', x: 8, y: 4, w: 2, h: 2, component:
      <Suspense fallback={<div>Loading types...</div>}>
        <PropertyTypeWidget />
      </Suspense>
    },
    { i: 'price', x: 10, y: 4, w: 2, h: 2, component:
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
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Dashboard</h1>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Settings
        </button>
      </div>

      <DraggableGrid layouts={layouts} onLayoutChange={handleLayoutChange} />

      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </main>
  );
} 