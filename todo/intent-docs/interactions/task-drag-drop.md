# Task Drag & Drop Interaction

**Purpose:**

To provide a natural, responsive, and visually informative experience when users reorganize their tasks between columns in the board view, with clear feedback throughout the drag operation and proper handling of background state updates.

**Overall Interaction Flow:**

1. **Drag Start:**
   - User begins dragging a task card with the grab handle
   - The original item in the source column fades (becomes semi-transparent with opacity 0.5)
   - An overlay card appears under the cursor, maintaining the task's visual appearance

2. **Dragging Over Target Column:**
   - A drop zone indicator appears in the target column with visual highlighting
   - The hovering target column receives a subtle scale transformation (1.02×) and shadow enhancement
   - The column header subtly highlights to indicate the potential drop target

3. **Release (Drop):**
   - When released over a valid drop target, the task animates smoothly to its new position
   - The task immediately shows a subtle "Moving..." badge in the top-right corner
   - A progress indicator appears beneath the card, filling from left to right
   - The original card remains in place until the server confirms the update

4. **Completion:**
   - Upon successful completion, the task settles into its new position with the final style
   - If an error occurs, an "Error" badge appears, allowing the user to retry
   - After a short delay (3 seconds), the error state automatically clears

**Visual Feedback Elements:**

* **Card States:**
  - Normal: White background, subtle border and shadow
  - Dragging Source: 50% opacity
  - Dragging Overlay: Full opacity with enhanced shadow
  - Moving: Progress indicator and "Moving..." badge
  - Error: "Error" badge in red
  
* **Column States:**
  - Normal: Standard styling
  - Hover Target: Slight scale (1.02×), increased shadow, brightness boost (1.05×)
  - Active Drop Area: Overlay with "Drop here" message and downward arrow

**Technical Implementation Details:**

* **Optimistic Updates:**
  - The UI updates immediately when a card is dropped in a new column
  - The change is sent asynchronously to the server
  - The card displays a "pending" state while waiting for server confirmation

* **Error Handling:**
  - If the server update fails, the card shows an error state
  - The error state automatically clears after a timeout
  - The card returns to its original position if needed

* **Animation Timing:**
  - Drag animations use spring physics with tension: 280, friction: 24
  - Transition animations use 300ms duration with ease-in-out timing
  - Progress indicator uses 800ms animation duration

**Accessibility Considerations:**

* Touch-friendly grab handles with appropriate size targets
* Visual feedback is provided through multiple channels (size, color, text)
* Animations respect user preferences for reduced motion when supported