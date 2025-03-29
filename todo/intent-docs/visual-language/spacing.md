# Visual Language: Spacing

**Intent:**

To define a consistent spacing system that creates visual harmony, organization, and breathing room within the Todo application, with an emphasis on card-based design and clear component separation.

**General Principles:**

* **Component Encapsulation:** Each functional unit (task card, header) has clear boundaries with consistent internal spacing.
* **Consistent Rhythm:** Maintain uniform spacing between cards and elements to create a clean, organized feel.
* **Hierarchy Through Space:** Use spacing to establish relationships between elements.
* **Breathing Room:** Provide adequate whitespace around and within components to prevent visual crowding.

**Spacing Units (Based on Implementation):**

* **Extra Small (4px):** Used for tightest spacing needs (between icon and text in tags).
* **Small (8px):** For spacing between related elements within a component (tag items).
* **Medium (16px):** Standard padding within cards and components (`p-4` in Tailwind).
* **Large (24px):** For spacing between major sections and cards (gap between list items).
* **Extra Large (32px+):** For page margins and major section separation.

**Application of Spacing:**

* **Task Card Internal Spacing:**
  * Medium (16px) padding on all sides within task cards
  * Small (8px) gap between task title and tags section
  * Small (8px) gap between individual tags

* **Between Components:**
  * Large (24px) gap between task cards in the vertical list (`gap-4` in Tailwind)
  * Extra Large (32px) spacing between header sections and content

* **Navigation & Controls:**
  * Small (8px) spacing between navigation tabs (`gap-2` in Tailwind)
  * Medium (16px) internal padding in buttons and controls

* **Icon & Text Spacing:**
  * Extra Small (4px) between icons and their text
  * Small (8px) around standalone icons

**Layout Structure:**

* Container with maximum width constraint (`max-w-4xl`) and centered on page
* Consistent margins on mobile and desktop
* Proper gaps between elements rather than margins to maintain vertical rhythm

**Responsive Considerations:**

* Maintain consistent padding within cards across device sizes
* Adjust container width and page margins based on viewport size

**Visual Implementation Details:**

* **Card Spacing:** Clean, equal spacing around all sides of content within cards
* **List Spacing:** Consistent gaps between list items to create visual rhythm
* **Button Spacing:** Uniform padding within buttons (`px-4 py-2`)
* **Nested Element Spacing:** Proper spacing between parent and child elements (title and tags)

**Style and Feel:**

* Organized
* Balanced
* Consistent
* Clean
* Modern
