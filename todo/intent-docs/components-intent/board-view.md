# Board View Component Intent (Kanban)

**Purpose:**

To provide a visual workflow representation of tasks using a Kanban-style board, allowing users to easily track and manage task progress through different stages with drag-and-drop functionality.

**Visual Goals:**

* **Column-Based Layout:** Present tasks in distinct columns that represent different workflow stages.
* **Visual Flow:** Clearly illustrate the progression of tasks from "Todo" to "Completed" stages.
* **Drag and Drop:** Enable intuitive drag-and-drop interaction for moving tasks between columns.
* **Consistent Task Display:** Maintain the same task card design across different views for consistency.
* **Column Counters:** Display task counts visually in each column header.

**Key Elements & Intent:**

* **Column Structure:**
  * Two clearly defined columns: "Todo" and "Completed"
  * Each column has a distinct header with color gradients and task count
  * Columns have subtle background, border, and shadow to create visual containers
  * Columns are evenly spaced and arranged in a grid layout
  * Column headers use blue-to-emerald gradients (blue for Todo, emerald/green for Completed)

* **Task Cards:**
  * Modified version of task cards with left color border indicating status
  * Include a grab handle on the left for drag operations
  * Maintain consistent information: title, due date, completion status
  * Visual distinction between Todo and Completed tasks
  * Subtle shadow with hover enhancement

* **View Selector:**
  * Icon-based selector for switching between List, Board, and Calendar views
  * Current view highlighted with blue gradient
  * Clean visual separation from main content area

* **Draggable Interaction:**
  * Each task card can be dragged between columns with dedicated grab handle
  * Task cards have appropriate ARIA attributes for accessibility
  * Visual feedback during drag operations
  * Touch-friendly interaction patterns for mobile

**Visual Implementation Details:**

* **Board Layout:**
  * Two-column grid with appropriate gap between columns on desktop
  * Single column stack on mobile with responsive behavior
  * Each column is a flex container with its own scrollable area

* **Column Design:**
  * White background with subtle border and shadow
  * Blue-to-emerald gradient headers (blue dominant for Todo, emerald dominant for Completed)
  * Task count displayed as a colored badge in the column header
  * Padding inside columns to separate content from edges

* **Task Status Representation:**
  * Column placement indicates task status (Todo or Completed)
  * Left border color indicates status (blue for todo, emerald/green for completed)
  * Task cards maintain visual indicators:
    * Incomplete tasks have a circle icon
    * Completed tasks have a green checkmark icon and strikethrough text
    * Metadata tags with clock icon for due dates

**Interaction Patterns:**

* Tasks can be dragged from one column to another using the grab handle
* Moving a task to the "Completed" column automatically marks it as complete
* Moving a task to the "Todo" column automatically marks it as incomplete
* Clicking the completion indicator toggles completion state
* Task counters update dynamically as tasks move between columns
* Edit and delete buttons appear on hover with appropriate color changes (blue for edit, red for delete)

**Mobile Considerations:**
* Stacked column layout instead of side-by-side on small screens
* Fixed floating "+" button with blue-to-emerald gradient in the bottom right corner for adding new tasks
* Touch-friendly grab handles and interaction targets
* Accessible drag and drop with appropriate ARIA attributes

**Relation to Other Views:**

* Shares navigation and view switching controls with other views
* Task cards maintain consistent styling and behavior across views
* Provides an alternative visualization of the same task data

**Add Task Interface:**
* Column-specific "Add task" buttons with dashed borders
* Blue text and plus icon for clear affordance
* Hover state with light blue background

**Style and Feel:**

* Organized
* Spatial
* Interactive
* Progress-Oriented
* Visual
* Dynamic
* Responsive
* Consistent blue-to-emerald gradient accents
