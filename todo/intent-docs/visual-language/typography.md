# Visual Language: Typography

**Intent:**

To establish a clean, modern typographic system that enhances readability, communicates information hierarchy, and contributes to the overall design aesthetic of the Todo application.

**Font Family:**

* **Primary:** A modern sans-serif font (system default sans-serif stack).

**Font Sizes & Weights:**

* **Application Title (H1):**
  * Size: Large (`text-center`)
  * Weight: Bold
  * Used for the main "Todo App" heading

* **Task Titles (H3):**
  * Size: Base (`text-gray-900`)
  * Weight: Medium (`font-medium`)
  * Used for the main content of each task card
  * Strikethrough and color change to `text-gray-500` when completed

* **Button Text:**
  * Size: Base
  * Weight: Normal
  * Consistent across all action buttons

* **Tag Text:**
  * Size: Extra Small (`text-xs`)
  * Weight: Normal
  * Used for status, category, and due date tags

**Font Colors:**

* **Primary Text:** Dark gray (`text-gray-900`) for task titles and main content
* **Secondary Text:** Medium gray (`text-gray-600`) for less prominent elements
* **Completed Task Text:** Medium gray (`text-gray-500`) with strikethrough
* **Button Text:** Either white (on colored backgrounds) or contextual colors based on button type
* **Tag Text:** Color coordinated with background (blue text on blue background, etc.)

**Text Styling:**

* **Normal Tasks:** Clean, medium-weight text for maximum readability
* **Completed Tasks:** Strikethrough text with reduced opacity
* **Interactive Elements:** Text color changes on hover for buttons and actions

**Visual Hierarchy:**

* App title has largest font size and central placement
* Task titles are prominently displayed with medium weight
* Tags and metadata use smaller text size
* Clear distinction between active and completed task text

**Text Alignment:**

* App title: Centered
* Task titles: Left-aligned
* Button text: Centered within buttons
* Tag text: Centered within tag pills

**Line Height & Spacing:**

* Appropriate line height for all text elements
* Proper vertical spacing between text and other elements
* Consistent text baseline alignment within components

**Text Truncation:**

* Task titles may truncate with ellipsis when exceeding available space
* Tags maintain their full text without truncation

**Accessibility Considerations:**

* Sufficient text size for readability
* Strong contrast between text and backgrounds
* Multiple indicators beyond text styling for important states (like completion)

**Style and Feel:**

* Clean
* Modern
* Readable
* Consistent
* Well-proportioned
