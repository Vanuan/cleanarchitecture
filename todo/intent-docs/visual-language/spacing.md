# Visual Language: Spacing - Implementation Details

**Intent:**

The Todo application implements a consistent spacing system that creates visual harmony, organization, and breathing room, with an emphasis on card-based design and clear component separation.

**Implemented Spacing System:**

## Tailwind Spacing Classes Used

The application primarily uses Tailwind's spacing scale, which creates a consistent rhythm throughout the interface:

* **0.5 (2px):** `p-0.5`, `m-0.5`, `-mt-0.5`, `-ml-0.5` - Smallest adjustments
* **1 (4px):** `p-1`, `m-1`, `gap-1` - Micro spacing (tag internal spacing)
* **2 (8px):** `p-2`, `m-2`, `gap-2` - Small spacing (between related elements)
* **3 (12px):** `p-3`, `m-3`, `gap-3` - Medium spacing (internal card padding)
* **4 (16px):** `p-4`, `m-4`, `gap-4` - Standard spacing (between cards)
* **6 (24px):** `p-6`, `gap-6` - Large spacing (section separation)

## Component Spacing Implementation

### Task Card Spacing

* **Card External Spacing:**
  * List view: `gap-4` (16px) between cards
  * Board view: `gap-3` (12px) between cards within columns
  * Calendar view: Day-specific spacing varies by context

* **Card Internal Spacing:**
  * Outer padding: `p-4` (16px) for content area, `p-3` (12px) for headers
  * Element gap: `gap-3` (12px) between checkbox and content
  * Title to metadata: `mt-2` (8px) separation
  * Between tags: `gap-2` (8px) in tag containers

* **Tag Component Spacing:**
  * Tag internal padding: `px-2 py-1` (8px horizontal, 4px vertical)
  * Icon margin: `mr-1` (4px) for icons within tags
  * Tag container: `flex items-center gap-2 flex-wrap mt-2`

### Navigation & Layout Spacing

* **Sidebar Spacing:**
  * Sidebar section spacing: `mt-6` (24px)
  * Nav item padding: `px-4 py-3` (16px horizontal, 12px vertical)
  * Icon to label spacing: `ml-3` (12px)

* **Title Bar Spacing:**
  * Container height: `h-16` (64px)
  * Button padding: `p-3` (12px)
  * Content padding: `px-4` (16px horizontal)

* **Primary Containers:**
  * Main container: `max-w-4xl mx-auto` (centered with max width)
  * Border separation: `border-b border-gray-200` (single pixel borders with color)
  * Section padding: `p-4` (16px) for standard content areas

### Form Spacing

* **Form Element Spacing:**
  * Between fields: `space-y-4` (16px vertical spacing)
  * Input padding: `px-3 py-2` (12px horizontal, 8px vertical)
  * Button padding: `px-4 py-2` (16px horizontal, 8px vertical)
  * Label to input: `mt-1` (4px)

* **Modal Spacing:**
  * Modal padding: `p-6` (24px) for overall container
  * Between header and content: `mb-4` (16px)
  * Between actions: `gap-2` (8px)

## View-Specific Spacing

### Board View

* **Column Layout:**
  * Columns grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
  * Column header: `p-3` (12px) for header areas
  * Task container: `space-y-3` (12px between tasks)
  * Empty state: `h-40` (160px) height for empty columns

### Calendar View

* **Month View:**
  * Day cell height: `min-h-24` (96px)
  * Calendar padding: `p-4` (16px) outside the grid
  * Day number spacing: `p-1` (4px) for day numbers

* **Week View:**
  * Day section padding: `p-3` (12px) for headers
  * Task container: `p-4` (16px) for task lists
  * Between tasks: `mb-3` (12px)

* **Day View:**
  * Section spacing: `mb-3` (12px) between major sections
  * Time slot height: `min-h-[70px]` (70px) for each hour slot
  * Time label width: `w-16` (64px) for hour labels

## Responsive Spacing Adjustments

* **Mobile Adaptations:**
  * Sidebar width: `w-4/5 max-w-xs` on mobile (80% width with max constraint)
  * Grid changes: `grid-cols-1` on mobile vs `md:grid-cols-2` on larger screens
  * Calendar adaptations: Visible date count adjusts based on screen width

* **Desktop Refinements:**
  * Expanded sidebar: `w-64` (256px) standard, `w-16` (64px) when collapsed
  * Container width: `max-w-4xl` (896px) maximum for content area
  * More generous whitespace in larger viewports

## Specific Implementation Examples

```tsx
// Card spacing example from TaskCard.tsx
<div 
  className="
    rounded-lg
    bg-white
    ${getTheme(item).border} border-l-4
    transition-all duration-200 hover:shadow-md
    relative
    flex items-stretch
    cursor-pointer
  "
>
  <div className="flex-1 flex items-start p-4">
    {/* Content with standard medium padding */}
  </div>
</div>

// Tag spacing example
<div className="flex items-center gap-2 flex-wrap mt-2">
  {/* Tags with small gaps between them */}
</div>

// List spacing example from List.tsx
<ListView>
  {items?.map((item, index) => <li key={index}>{renderItem(item)}</li>)}
</ListView>

const ListView = tw.ul`
  flex flex-col gap-4
`;
```

**Style and Feel:**

* Organized
* Balanced
* Consistent
* Clean
* Modern
