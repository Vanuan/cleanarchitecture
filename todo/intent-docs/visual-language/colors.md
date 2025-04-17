# Visual Language: Colors - Implementation Details

**Intent:**

The Todo application implements a color palette that creates visual hierarchy, communicates status effectively, and contributes to a modern, clean interface.

**Implemented Color System:**

## Primary Action Colors

* **Blue Gradient:**
  * Header uses `bg-gradient-to-r from-blue-600 to-emerald-600` for visual interest
  * Primary titles use `text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600`
  * Gives the application a distinctive look that spans from blue to emerald green

* **Primary Action Blue:**
  * Buttons use `bg-blue-500 text-white` for primary actions
  * Hover states transition to `hover:bg-blue-600`
  * "Add Task" buttons and primary interactive elements

* **Status Emerald/Green:**
  * Completed checkmark: `text-emerald-500 hover:text-emerald-600`
  * "Done" tag background: `bg-emerald-100 text-emerald-600 border-emerald-200`
  * Calendar "Today" indicators: `bg-blue-100 text-blue-800`

## UI Element Colors

* **Task Cards:**
  * Active tasks: `bg-white border border-gray-100`
  * Completed tasks: `bg-gray-50` (subtle light gray)
  * Hover state: `hover:shadow-md` for depth enhancement
  * Borders: Left border uses colored accents for status indication

* **Tag System:**
  * Todo tags: `bg-blue-100 text-blue-500 border-blue-200`
  * Done tags: `bg-emerald-100 text-emerald-600 border-emerald-200`
  * Date tags: `bg-gray-100 text-gray-600 border-gray-200`
  * Due soon indicator: `bg-blue-100 text-blue-600 border-blue-200`

* **Navigation & Controls:**
  * Sidebar: Blue/emerald gradient header with white text
  * Selected view: `bg-blue-50 text-blue-600` or border-based indicators
  * Unselected view: `text-gray-700 hover:bg-gray-100`

## Text Hierarchy Colors

* **Text Coloring:**
  * Primary text: `text-gray-900` for task titles
  * Secondary text: `text-gray-700` for headings
  * Tertiary text: `text-gray-500` for metadata and hints
  * Completed text: `text-gray-500` with strikethrough
  * Interactive text: Changes color on hover (e.g., `hover:text-blue-500`)

* **Icon Coloring:**
  * Default state: `text-gray-400`
  * Hover state: `hover:text-blue-500` for standard actions, `hover:text-red-500` for deletion
  * Active state: Status-specific colors (e.g., emerald for completion)
  * Grab handles: `text-gray-400 hover:text-gray-600`

## Board View Specific Colors

* **Column Headers:**
  * Todo column: `from-blue-100 to-indigo-50` gradient background
  * Completed column: `from-emerald-100 to-green-50` gradient background
  * Count badges: `bg-blue-500` (todo) and `bg-emerald-500` (completed)

* **Drop Target Highlights:**
  * Active drop area: `border-blue-300 bg-blue-50 bg-opacity-80`
  * Drop indicator text: `text-blue-600`

## Calendar View Specific Colors

* **Day Indicators:**
  * Today: `bg-blue-50` or border highlight `border-t-2 border-emerald-400`
  * Selected day: `bg-gradient-to-r from-blue-50 to-emerald-50` in week view
  * Tasks on calendar: `bg-blue-50 text-blue-700` (active) and `bg-gray-100 text-gray-500` (completed)

* **Period Navigation:**
  * Selected period: `text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600`
  * Current day/period indicators: `text-green-600` or emerald gradient

## System Feedback Colors

* **Status Indicators:**
  * Moving tasks: `bg-blue-100 text-blue-800` badge
  * Error state: `bg-red-100 text-red-800` badge
  * Progress indicators: `bg-blue-400` for task update progress

* **Form Elements:**
  * Input focus: `focus:ring-2 focus:ring-blue-500 focus:border-transparent`
  * Toggle buttons: `bg-blue-600` when active, `bg-gray-200` when inactive
  * Form labels: `text-gray-700`

**Implemented UI Component Color Examples:**

* **Task Card:**
  ```
  bg-white rounded-lg border-l-4 border-blue-500 (active)
  bg-gray-50 rounded-lg border-l-4 border-emerald-100 (completed)
  ```

* **Primary Button:**
  ```
  bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500
  ```

* **Tag Component:**
  ```
  bg-blue-100 text-blue-500 border border-blue-200 rounded-full px-2 py-1
  ```

**Accessibility Implementations:**

* Color is never the sole indicator of state (icons, text, and position also indicate state)
* Text has sufficient contrast with backgrounds (following WCAG guidelines)
* Interactive elements have clear visual feedback beyond color

**Style and Feel:**

* Clean
* Modern
* Systematic
* Harmonious
* Clear
