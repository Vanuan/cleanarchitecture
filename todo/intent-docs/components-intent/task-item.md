# Task Item Component Intent

**Purpose:**

To visually represent a single todo item within the Todo application, providing clear status indication and interaction points while maintaining a modern, card-based design aesthetic.

**Visual Goals:**

* **Clear Status:** Immediately communicate the task's completion status through icons, text styling, and background changes.
* **Visual Distinction:** Each task is contained in its own card with subtle shadows and hover effects.
* **Consistent Layout:** Maintain a predictable structure with completion indicator on the left, content in the middle, and actions on the right.
* **Interactive Feedback:** Provide clear visual cues for all interactive elements.
* **Draggable (in Board View):** Provide visual indicators that tasks can be dragged and reordered.

**Key Elements & Intent:**

* **Container Card:** White rounded card with subtle shadow and border that enhances shadow on hover.
* **Drag Handle (Board View):** Left-aligned grip icon indicating draggability.
* **Completion Indicator:** Circle icon that changes to a green checkmark when completed.
* **Title:** Medium-weight text that receives strikethrough styling when completed, and changes color from dark gray to lighter gray.
* **Metadata Tags:** A row of pill-shaped tags below the title showing:
  * Due date with clock icon in gray
  * Other relevant metadata
* **Action Buttons:** Right-aligned icons for delete (trash) and edit (pen) that change color on hover.
* **Visual State Indicators:** Left border (blue for todo, emerald/green for completed) in board view.

**Visual Hierarchy:**

1. **Completion Status:** The circle/checkmark is the primary interaction point.
2. **Title:** Clear, medium-weight text that's the most visually prominent content.
3. **Metadata Tags:** Smaller, neutral-colored pills that provide supplementary information.
4. **Actions:** Right-aligned utility functions that are visually subdued until hovered.

**Color Palette:**

* **Incomplete Task:**
  * White background with dark gray text
  * Blue left border (in board view)
  * Gray circle icon
* **Complete Task:**
  * White background with strikethrough gray text
  * Green/emerald left border (in board view)
  * Green checkmark icon
* **Due Date Tag:** Gray background with darker gray text and clock icon
* **Action Icons:** Gray that changes to red (delete) or blue (edit) on hover

**Completed State Changes:**

* Circle icon → Green checkmark icon
* Normal text → Medium gray text with strikethrough
* Blue left border → Green/emerald left border (in board view)

**Spacing & Layout:**

* Consistent padding within the card
* Appropriate spacing between elements
* Rounded corners (8px radius)
* Vertically centered elements with proper alignment

**Interactions:**

* Clicking the completion indicator toggles completion state
* Dragging (in board view) allows repositioning tasks between columns
* Hovering over the card slightly increases its shadow
* Hovering over action buttons changes their color
* Edit and delete buttons provide clear feedback on interaction

**Responsive Behavior:**
* Maintains consistent design across screen sizes
* Action buttons may be condensed on smaller screens
* Ensures touch targets are appropriately sized for mobile use

**Overall Style:**

Modern, clean, card-based design with clear visual indicators, subtle state changes, and a strong focus on user interaction feedback.
