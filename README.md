# Trading Example Monorepo

A monorepo example showcasing a trading interface built with **Next.js**, **TypeScript**, **TailwindCSS**, and **Turborepo**. The project follows a clean architecture pattern, separating UI components from data processing and business logic.

---

## User Stories

The GUI supports the following user stories:

- Users can navigate between tabs.
- Each tab displays:
  - A **banner** that updates in real-time via WebSocket events.
  - **Historical prices** fetched from an API.
  - **Daily trends** fetched from an API.

---

## Prerequisites

- Node.js (v18+)
- Yarn (v1.22+)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kelebra28/trading-exaple-monorepo.git
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```

---

## Running the Project

1. Navigate to the frontend app:
   ```bash
   cd apps/frontend
   ```
2. Start the development server:
   ```bash
   yarn dev
   ```
3. Open [http://localhost:3002](http://localhost:3002) in your browser.

---

## Project Structure

The monorepo is organized to enforce a clean architecture, separating concerns into distinct layers:

```
.
├── apps
│   └── frontend              # Next.js application (presentation layer)
│       ├── src/app           # Page components and layouts
│       ├── src/hooks         # Custom hooks (data fetching/state management)
│       └── src/DynamicComponents  # UI components consuming data
├── libs
│   ├── domain                # Business logic & data layer
│   │   ├── src/websocket     # WebSocket client (real-time updates)
│   │   └── src/fetchs.ts     # API calls (historical data)
│   ├── ui-components         # Reusable presentational components
│   │   └── src/components    # Banner, Charts, Tabs (no business logic)
│   └── utils                 # Shared utilities and types
│       ├── src/types         # TypeScript interfaces
│       ├── src/formats.ts    # Data formatting functions
│       └── src/dataTransformation # Data processing logic
├── turbo.json                # Turborepo pipeline config
└── package.json              # Workspace dependencies
```

---

## Key Architectural Principles

### Presentation Layer (`apps/frontend`)
- **UI Components**: Only handle rendering and user interactions (no data logic).
- **Dynamic Components**: Consume data via props or hooks (e.g., `PriceChart.tsx`).
- **Hooks**: Handle data fetching (`useHistoricalData.ts`, `useCurrencyData.ts`).

### Business Logic & Data Layer (`libs/domain`)
- **WebSocket Client**: Manages real-time banner updates (`ws-client.ts`).
- **API Fetching**: Axios-based functions for historical/daily data (`fetchs.ts`).

### Shared Utilities (`libs/utils`)
- **Data Transformation**: Processes raw API/WebSocket data into UI-ready formats.
- **Type Definitions**: Centralized interfaces for data consistency.
- **Formatting**: Date/currency formatting utilities.

### Reusable UI (`libs/ui-components`)
- **Banner**: Displays real-time notifications (receives data via props).
- **Charts**: Dumb components that render data (e.g., `PriceChart.tsx`).
- **Tabs/Grids**: Stateless navigation and layout components.

---

## Technologies Used

- **Next.js**: Framework for building the frontend with server-side rendering.
- **TypeScript**: Ensures type safety across the codebase.
- **TailwindCSS**: Utility-first CSS for styling UI components.
- **Axios**: HTTP client for API requests.
- **Turborepo**: Optimizes build and dev workflows in the monorepo.
- **WebSocket**: Real-time data updates for the banner.

---

## Design Philosophy

### Clean Architecture

#### Decoupled Layers:

**UI Components:** Only render data and emit events. Example:
```tsx
// PriceChart.tsx (UI Component)
interface PriceChartProps {
  data: HistoricalData[];
  onZoom: (range: DateRange) => void;
}
const PriceChart = ({ data, onZoom }: PriceChartProps) => { /* ... */ };
```

**Data Processing:** Handled in `utils/dataTransformation`:
```typescript
// historical-data.ts (Data Transformation)
export const transformHistoricalData = (apiData: APIResponse): HistoricalData[] => {
  return apiData.entries.map(entry => ({
    date: new Date(entry.timestamp),
    price: entry.close,
  }));
};
```

**State Management:** Custom hooks like `useHistoricalData` bridge the UI and data layers:
```typescript
// useHistoricalData.ts (Hook)
const useHistoricalData = (currencyPair: string) => {
  const [data, setData] = useState<HistoricalData[]>([]);
  useEffect(() => {
    fetchHistoricalData(currencyPair).then(transformed => setData(transformed));
  }, [currencyPair]);
  return data;
};
```

---

## License

This project is proprietary and not open to external contributions.
