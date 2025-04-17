# Visual Language: Typography - Implementation Details

**Intent:**

The Todo application implements a clean, modern typographic system that enhances readability, communicates information hierarchy, and contributes to the overall design aesthetic.

**Implemented Typography System:**

## Font Family

The application uses the system default sans-serif stack provided by Tailwind:

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
  "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", 
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

This ensures optimal rendering across all platforms and devices.

## Text Size & Weight Implementation

### Headers and Titles

* **App Title:**
  * Implemented as: `text-xl font-bold text-white` in sidebar header
  * Additional styling: Placed on gradient background for emphasis
  * Location: Top of sidebar navigation

* **View Titles:**
  * Implemented as: `text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-semibold`
  * Unique styling: Uses gradient text effect for visual interest
  * Location: Title bar at top of each view

* **Section Headers:**
  * Implemented as: `text-sm font-medium text-gray-500` for sidebar section labels
  * Calendar section headers: `font-medium text-gray-900`
  * Board column headers: `font-medium text-gray-700`

### Task Typography

* **Task Titles:**
  * Implemented as: `text-gray-900 font-medium`
  * When completed: `line-through text-gray-500`
  * Transitions: `transition-all duration-300 ease-in-out` for smooth state changes

* **Task Metadata Text:**
  * Due dates: `text-xs text-gray-600` with clock icon
  * Tags: `text-xs` with color-coordinated background and text
  * Status indicators: `text-xs font-medium` with appropriate status colors

### UI Element Typography

* **Button Text:**
  * Primary buttons: `text-white font-medium` on colored backgrounds
  * Secondary actions: Context-appropriate text colors
  * Icon buttons: Often use only icons with aria-labels

* **Navigation Text:**
  * Nav items: `text-gray-700 hover:text-gray-500` with selected state variations
  * Calendar navigation: Text size varies from `text-xs` to `text-lg` based on hierarchy

* **Form Element Text:**
  * Labels: `text-sm font-medium text-gray-700`
  * Input text: Standard base font size
  * Helper text: `text-xs text-gray-500`

## Text Styling Implementation

### Component-Specific Typography

```tsx
// Task title implementation (from TodoItem.tsx)
<TodoTitle $completed={viewModel.completed}>
  {viewModel.title}
</TodoTitle>

// Defined in styles.ts
export const TodoTitle = tw.h3<{ $completed: boolean }>`
  font-medium transition-all duration-300 ease-in-out
  ${({ $completed }) => 
    $completed 
      ? "line-through text-gray-500" 
      : "text-gray-900"
  }
`;

// Tag implementation (BoardTag from styles.ts)
export const BoardTag = tw.span<{ $tagType: "todo" | "done" | "other" }>`
  text-xs px-2 py-1 rounded-full flex items-center border
  ${({ $tagType }) =>
    $tagType === "todo"
      ? "bg-blue-100 text-blue-500 border-blue-200"
      : $tagType === "done"
        ? "bg-emerald-100 text-emerald-600 border-emerald-200"
        : "bg-blue-50 text-blue-600 border-blue-100"
  }
`;
```

### Text Truncation & Overflow

* Task tiles use `min-w-0` to enable text truncation in flex layouts
* Long content can be truncated with `truncate` where appropriate
* Calendar entries use explicit truncation: `truncate ${viewModel.completed ? "line-through" : ""}`

### Special Typography Treatments

* **Gradient Text:**
  * Used for emphasis in titles: `text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600`
  * Creates visual interest and connection to the app's color theme
  * Applied to selected view indicators and "Today" markers

* **Completion Styling:**
  * Consistent pattern across views: `line-through text-gray-500`
  * Visual indicator that works alongside checkbox icons
  * Smooth transition between states with 300ms duration

## Calendar Typography Specifics

* **Month View:**
  * Day headers: `text-sm` for compact day name display
  * Day numbers: `text-sm font-medium`
  * Today indicator: Bold with blue or gradient text
  * Task counts: `text-xs text-gray-500`

* **Week View:**
  * Day names: `text-lg` with today highlighted
  * Date display: `text-sm text-gray-500`
  * "Today" marker: `text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800`

* **Day View:**
  * Section headers: `font-medium text-gray-700/900`
  * Time indicators: `text-xs text-gray-500`
  * Task times: `text-xs text-gray-600` with icon

## Board View Typography

* **Column Headers:**
  * Title: `font-medium` with background gradient
  * Count badge: `text-white text-xs font-medium`

* **Empty States:**
  * Text: `text-gray-400 text-sm`
  * Clear visual distinction from active content

## Responsive Typography

* Text sizes remain consistent across device sizes
* Larger text for primary interface elements on all devices
* Condensed navigation text on smaller screens
* Mobile adaptations prioritize touchable targets without changing text size

## Accessibility Implementation

* Text contrast ratios follow WCAG guidelines:
  * Standard text: At least 4.5:1 contrast ratio
  * Large text: At least 3:1 contrast ratio
* Adequate base font size (16px equivalent)
* Font weight variations to emphasize hierarchy
* Multiple indicators for state changes (not just color or text style)

**Style and Feel:**

* Clean
* Modern
* Readable
* Consistent
* Well-proportioned
* Multiple indicators beyond text styling for important states (like completion)

**Style and Feel:**

* Clean
* Modern
* Readable
* Consistent
* Well-proportioned
