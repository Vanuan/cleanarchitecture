# Calendar View Consistency Guidelines

To ensure a consistent user experience across all calendar view variants (Month, Week, and Day), the following elements should be standardized:

## 1. Header Elements

**App Title:**
- Title should always be "Todo App"
- Consistent typography (text-2xl font-bold)
- Centered at the top of the page

**Add Button:**
- Labeled "Add Todo" consistently across all views
- Same positioning in the top-right corner
- Same styling (blue background, white text, rounded corners)
- Same hover effects

## 2. Time Period Display

**Current Period Title:**
- Consistent positioning in the calendar header
- Clear hierarchy with larger font for the main period (month/week/day)
- Standardized format:
  - Month view: "March 2025"
  - Week view: "Week 13 • Mar 24-30, 2025"
  - Day view: "March 29, 2025 (Saturday)"
- Special indicators ("Today", "This week", etc.) with consistent styling

## 3. View Selector

**Structure:**
- Include only Month, Week, and Day views (remove Timeline, Agenda, etc.)
- Maintain the same order: Month → Week → Day
- Segmented control with the active view highlighted in blue
- Inactive views in white/gray with hover states

**Styling:**
- Consistent rounded corners
- Same font size and padding
- Same visual treatment for the active state
- Same positioning in the header area

## 4. Navigation Controls

**Time Period Navigation:**
- Consistent Previous/Today/Next controls
- Same positioning relative to the view selector
- Same visual treatment (borders, background, hover states)
- Today button always returns to the current period

## 5. Content Area

**Container Styling:**
- Consistent border styles
- Consistent corner radius
- Consistent background colors
- Uniform spacing and padding

## 6. Task Representation

**Task Cards:**
- Maintain the same visual styling across all views
- Consistent status indicators (checkbox/circle)
- Consistent tag styling
- Same hover and interaction patterns

## Implementation Guidelines

1. **Extract Common Components:**
   - Create a shared `CalendarHeader` component for title and controls
   - Standardize the view selector as a reusable component
   - Use consistent styling variables for colors, spacing, and typography

2. **Maintain Consistent Structure:**
   - Header (title, add button)
   - Calendar navigation (period title, view selector, navigation controls)
   - Content area (specific to each view type)

3. **Use Consistent Naming:**
   - "Month" instead of "Monthly View"
   - "Week" instead of "Weekly Agenda"
   - "Day" instead of "Daily View"

4. **Preserve View-Specific Features:**
   - While standardizing common elements, preserve the unique value of each view:
     - Month: Overview with task counts
     - Week: Day-by-day task listing
     - Day: Hourly schedule with detailed timing
