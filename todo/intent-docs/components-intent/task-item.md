# Task Item Component Intent

**Purpose:**

To visually represent a single todo item within the Todo application, providing clear status indication and interaction points while maintaining a modern, card-based design aesthetic.

**Visual Goals:**

* **Clear Status:** Immediately communicate the task's completion status through icons, text styling, and background changes.
* **Visual Distinction:** Each task is contained in its own card with subtle shadows and hover effects.
* **Consistent Layout:** Maintain a predictable structure with completion indicator on the left, content in the middle, and actions on the right.
* **Interactive Feedback:** Provide clear visual cues for all interactive elements.

**Key Elements & Intent:**

* **Container Card:** White rounded card with subtle shadow and border that enhances shadow on hover.
* **Completion Indicator:** Left-aligned circle icon that changes to a green checkmark when completed.
* **Title:** Medium-weight text that receives strikethrough styling when completed, and changes color from dark gray to lighter gray.
* **Tags Section:** A row of pill-shaped tags below the title showing:
  * Status tag (Todo in blue, Done in green)
  * Category tags in purple
  * Due date information in purple
* **Action Buttons:** Right-aligned icons for delete (trash) and edit (pen) that change color on hover.

**Visual Hierarchy:**

1. **Completion Status:** Left-positioned circle/checkmark is the primary interaction point.
2. **Title:** Clear, medium-weight text that's the most visually prominent content.
3. **Tags:** Smaller, colored pills that provide supplementary information.
4. **Actions:** Right-aligned utility functions that are visually subdued until hovered.

**Color Palette:**

* **Incomplete Task:** White background with dark gray text
* **Complete Task:** Light gray background with medium gray text
* **Todo Tag:** Blue background with darker blue text
* **Done Tag:** Green background with darker green text
* **Category/Due Date Tags:** Purple background with darker purple text
* **Action Icons:** Gray that changes to red (delete) or blue (edit) on hover

**Completed State Changes:**

* Circle icon → Green checkmark icon
* White background → Light gray background
* Dark text → Medium gray text with strikethrough
* "Todo" tag → "Done" tag (blue to green)

**Spacing & Layout:**

* Consistent padding within the card (16px)
* Appropriate spacing between elements
* Full-width cards with rounded corners (8px radius)
* Vertically centered elements with proper alignment

**Interactions:**

* Clicking the completion indicator toggles completion state
* Hovering over the card slightly increases its shadow
* Hovering over action buttons changes their color
* Edit and delete buttons provide clear feedback on interaction

**Overall Style:**

Modern, clean, card-based design with clear visual indicators and a strong focus on user interaction feedback.
