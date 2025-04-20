import { ReactNode } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface WidgetLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: ReactNode;
}

interface DraggableGridProps {
  layouts: WidgetLayoutItem[];
  onLayoutChange?: (layout: any[]) => void;
}

export function DraggableGrid({ layouts, onLayoutChange }: DraggableGridProps) {
  const layout = layouts.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={100}
      width={1200}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      onLayoutChange={onLayoutChange}
      draggableHandle=".widget-drag-handle"
      isResizable={true}
      isBounded={true}
    >
      {layouts.map((item) => (
        <div key={item.i} className="widget-container">
          <div className="widget-drag-handle bg-gray-100 dark:bg-gray-700 h-6 rounded-t-lg cursor-move flex items-center px-2">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6a2 2 0 11-4 0 2 2 0 014 0zM8 12a2 2 0 11-4 0 2 2 0 014 0zM8 18a2 2 0 11-4 0 2 2 0 014 0zM20 6a2 2 0 11-4 0 2 2 0 014 0zM20 12a2 2 0 11-4 0 2 2 0 014 0zM20 18a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          {item.component}
        </div>
      ))}
    </GridLayout>
  );
} 