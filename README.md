# Healthcare Cost Calculator

A modular Next.js application for healthcare cost estimation with interactive cost breakdowns, insurance reimbursement calculations, and location-based price comparisons.

## 🚀 Project Status

Currently migrating from a monolithic React component to a modular Next.js architecture with TypeScript.

### ✅ Completed
- Project structure setup
- Context API state management
- Tab navigation system (3 tabs)
- Data layer and utility functions
- Basic layout structure

### 🚧 In Progress
- Component modularization
- Interactive range sliders for percentile selection
- Tab content components

### 📋 To Do
- Complete all UI components
- Add chart visualizations
- Implement location comparison features
- Build collapsible calculator sidebar

## 📁 Project Structure

```
healthcare-calculator/
├── src/
│   ├── pages/
│   │   └── index.tsx                    # Main app page
│   ├── components/
│   │   ├── shared/
│   │   │   ├── TabNavigation.tsx       # Tab navigation component
│   │   │   ├── RangeSlider.tsx         # Percentile range sliders
│   │   │   ├── Icons.tsx               # Reusable icon components
│   │   │   └── HelpButton.tsx          # Help button component
│   │   ├── layout/
│   │   │   └── Header.tsx              # Main header with procedure info
│   │   ├── cost-breakdown/
│   │   │   ├── MedianAverage.tsx       # Median/Average stat boxes
│   │   │   ├── PrimaryProcedure.tsx    # Primary procedure pricing
│   │   │   ├── RelatedCosts.tsx        # Related costs list
│   │   │   └── TotalCostBar.tsx        # Total cost display
│   │   ├── tabs/
│   │   │   ├── AddRelatedCostsContent.tsx      # Add costs tab
│   │   │   ├── OONReimbursementsContent.tsx    # Out-of-network tab
│   │   │   └── CostCalculatorContent.tsx       # Calculator tab
│   │   ├── reimbursements/
│   │   │   └── OONReimbursements.tsx   # Out-of-network calculations
│   │   ├── location/
│   │   │   └── CompareByLocation.tsx   # Zip code comparison
│   │   ├── calculator/
│   │   │   └── CostCalculator.tsx      # Collapsible cost calculator
│   │   ├── resources/
│   │   │   └── AdditionalResources.tsx # Additional resources section
│   │   └── TabbedSection.tsx           # Main tabbed content wrapper
│   ├── contexts/
│   │   └── CalculatorContext.tsx       # Global state management
│   ├── lib/
│   │   ├── data.ts                     # Healthcare cost data
│   │   ├── constants.ts                # App constants and colors
│   │   └── utils.ts                    # Utility functions
│   └── styles/
│       └── globals.css                  # Global styles
```

## 🎯 Features

### Three Main Tabs
1. **Add Related Costs** - Select additional procedures to include in total cost
2. **Out of Network Reimbursements** - Calculate insurance reimbursements for out-of-network care
3. **Healthcare Cost Calculator** - Estimate your actual out-of-pocket costs

### Key Components
- **Interactive Range Sliders** - Adjust cost percentiles (50th-90th) for both in-network and out-of-network prices
- **Dynamic Cost Breakdown** - Real-time updates as you select related procedures
- **Location Comparison** - Compare costs across different zip codes
- **Collapsible Calculator** - Side panel calculator for quick estimates

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ with TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS + Inline styles
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd healthcare-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Development

### Working with Placeholders

The app uses a placeholder system during development to keep the full layout visible while building components:

```typescript
// Placeholder component (temporary)
const Header = () => <div className="border-dashed">Header Placeholder</div>;

// Replace with real component when built
import { Header } from '../components/layout/Header';
```

### State Management

All state is managed through the CalculatorContext:

```typescript
import { useCalculator } from '../contexts/CalculatorContext';

const MyComponent = () => {
  const { activeTab, setActiveTab, selectedCosts } = useCalculator();
  // Use context values
};
```

### Adding New Components

1. Create component file in appropriate directory
2. Build component with proper TypeScript types
3. Import in `index.tsx` and remove placeholder
4. Test integration with existing components

## 📊 Data Structure

### Procedure Data
- Primary procedure costs at different percentiles
- Related procedure costs (anesthesia, pathology, facility fees)
- In-network vs out-of-network pricing
- Facility type variations (Hospital vs ASC)

### Percentile System
- 50th percentile: Lower cost range
- 70th percentile: Typical cost (default)
- 90th percentile: Higher cost range

## 🎨 Styling

The app uses a hybrid styling approach:
- Tailwind CSS for utility classes
- Inline styles for brand colors
- Component-specific styles where needed

### Brand Colors
```javascript
const colors = {
  primary: '#362C67',      // Deep purple
  secondaryTeal: '#007CA3', // Teal
  red: '#D63D0A',          // Red
  green: '#197310',        // Green
  white: '#FFFFFF'
};
```

## 📝 Migration Notes

### From Monolithic to Modular
The project is being migrated from a single large React component (`3-tabs.tsx`) to a modular structure:

1. **Phase 1**: Foundation - Data, Context, Utils ✅
2. **Phase 2**: Reusable Components - Icons, Buttons 🚧
3. **Phase 3**: Feature Components - Tabs, Calculator 🚧
4. **Phase 4**: Assembly & Polish ⏳

### Component Status Checklist
- [x] Project structure
- [x] Data layer
- [x] Context setup
- [x] Tab navigation
- [ ] Range sliders
- [ ] Header component
- [ ] Median/Average boxes
- [ ] Related costs section
- [ ] OON reimbursements
- [ ] Cost calculator sidebar
- [ ] Location comparison
- [ ] Additional resources

## 🤝 Contributing

1. Follow the existing component structure
2. Use TypeScript for all new components
3. Update context when adding new state
4. Keep components modular and reusable
5. Test with placeholders before full integration

## 📄 License

[Your License Here]

## 🙋‍♀️ Support

For questions or issues, please [open an issue](link-to-issues) or contact the development team.

---

*Last Updated: [Current Date]*