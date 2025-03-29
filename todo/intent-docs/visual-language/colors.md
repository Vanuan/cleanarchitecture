# Visual Language: Colors

**Intent:**

To define a color palette that creates visual hierarchy, communicates status effectively, and contributes to a modern, clean interface for the Todo application.

**Core Palette:**

* **Primary Action Blue:**
  * Background: Tailwind's `blue-500` (#3b82f6) for primary action buttons
  * Text: White (#ffffff) for text on blue backgrounds
  * Hover: Tailwind's `blue-600` for hover states on primary buttons

* **Selected/Active State:**
  * Background: Tailwind's `blue-100` (#e0f2fe) for selected tabs, backgrounds
  * Text: Tailwind's `blue-600` (#2563eb) for text in selected state elements

* **Success Green:**
  * Icon: Tailwind's `green-500` (#16a34a) for completion checkmarks
  * Background: Tailwind's `green-100` (#dcfce7) for "Done" tag backgrounds
  * Text: Tailwind's `green-700` (#15803d) for text in green backgrounds
  * Hover: Tailwind's `green-600` (#16a34a) for hover states

* **Todo Blue:**
  * Background: Tailwind's `blue-100` (#e0f2fe) for "Todo" tag backgrounds
  * Text: Tailwind's `blue-700` (#1d4ed8) for text in blue tag backgrounds

* **Metadata Purple:**
  * Background: Tailwind's `purple-100` (#f3e8ff) for metadata tag backgrounds
  * Text: Tailwind's `purple-700` (#7e22ce) for text in purple tag backgrounds

* **Neutral (Text/Background):**
  * Headings: Tailwind's `gray-900` (#111827) for primary text and headings
  * Body: Tailwind's `gray-500` (#6b7280) for secondary text and completed task text
  * Icons: Tailwind's `gray-400` (#9ca3af) for default icon states
  * Borders: Tailwind's `gray-100` (#f3f4f6) for card borders
  * Card Background: White (#ffffff) for task cards
  * Page Background: Very light gray for the main application background
  * Completed Task Background: Tailwind's `gray-50` (#f9fafb)

* **Warning/Destruction Red:**
  * Hover: Tailwind's `red-500` (#ef4444) for delete icon hover states

**Usage Guidelines:**

* **Primary Action Blue:**
  * Used for the "Add Todo" button and other primary actions
  * Indicates the current view in the navigation tabs

* **Green Elements:**
  * Reserved for completion indicators and "Done" status
  * Provides positive reinforcement for completed tasks

* **Tag Colors:**
  * Blue for task status (Todo)
  * Green for completion status (Done)
  * Purple for metadata (categories, due dates)

* **Interactive Elements:**
  * Default state: Gray
  * Hover states: Blue for positive/neutral actions, Red for destructive actions
  * Selected states: Blue background with darker blue text

* **Background Hierarchy:**
  * White for active task cards
  * Light gray for completed task cards
  * Subtle shadows to create depth

**Accessibility:**

* Sufficient contrast between text and backgrounds
* Multiple indicators beyond color for important state changes
* Hover states provide clear feedback for interactive elements

**Style and Feel:**

* Clean
* Modern
* Systematic
* Harmonious
* Clear
