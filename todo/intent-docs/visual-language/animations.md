# Visual Language: Animations - Implementation Details

**Intent:**

The Todo application incorporates subtle and purposeful animations that enhance the user experience by providing feedback, guiding attention, and creating a sense of responsiveness and polish. The implemented animations are used strategically to avoid distraction or performance issues.

**Implemented Animation Techniques:**

* **React Spring:** Used for physics-based animations with natural movement
* **CSS Transitions:** Applied for simple property changes with consistent timing
* **Tailwind Transition Classes:** Leveraged for standardized durations and easing
* **Transform Properties:** Used for performance-optimized animations

**Current Implementation:**

## Task Completion Animation

The task completion animation includes multiple coordinated visual changes:

* **Checkbox Icon Transition:**
  * Empty circle transitions to a green checkmark icon
  * CSS transition with 300ms duration and ease-in-out timing
  * Hover states change color from gray to blue (incomplete) or green to darker green (complete)

* **Text Styling Change:**
  * Text transitions from dark gray to medium gray with strikethrough
  * Transition applied with 300ms duration using the `transition-all` Tailwind class

* **Card Background Change:**
  * Background transitions from white to light gray (`bg-gray-50`)
  * Implemented with 300ms ease-in-out transition in `BoardItemCard` component

## Drag and Drop Animations (Board View)

The drag and drop system uses React Spring and DND Kit for fluid motion:

* **Drag Start Animation:**
  * Origin card fades to 50% opacity with scale reduction to 0.98
  * Animation handled by React Spring with { tension: 280, friction: 24 } configuration

* **Drag Overlay:**
  * Dragged card appears with enhanced elevation (shadow)
  * Subtle pulse animation applied with React Spring's `useSpring` hook
  * Custom animation sequence: `{ scale: 1.05, rotate: 1, opacity: 0.95 }`

* **Drop Target Column:**
  * Column scales to 1.02× size on hover
  * Shadow increases from 5px to 15px
  * Brightness increases to 1.05×
  * All transitions controlled by React Spring

* **Progress Indicator:**
  * When task is dropped, a progress bar appears and fills from left to right
  * 800ms duration animation implemented in `TaskCard.tsx`
  * Uses React Spring's `progressApi.start()` with custom configuration

## Layout and View Transitions

Transitions between different views and layouts include:

* **Sidebar Collapse/Expand:**
  * Sidebar width transitions smoothly between collapsed (64px) and expanded (256px) states
  * Container margins adjust responsively
  * 300ms transition with ease-in-out timing

* **TitleBar Hide/Show:**
  * Title bar slides up/down based on scroll position
  * Uses transform with translateY and 300ms transition
  * Detection threshold set at 64px of scroll

* **Content Area Adjustments:**
  * Main content area adjusts automatically with sidebar state
  * 300ms transition ensures smooth resizing

## Calendar View Animations

The calendar view includes specialized transitions:

* **View Type Switching:**
  * Transitions between month/week/day views with subtle background changes
  * Selected tab gets border-bottom highlight with smooth transition

* **Date Navigation:**
  * Smooth transitions when changing date periods (day, week, month)
  * Animation focused on maintaining context between date changes

## Technical Implementation Details

* **Performance Optimizations:**
  * Hardware acceleration through `transform` properties
  * CSS properties chosen to avoid layout recalculation (`opacity` and `transform`)
  * Debouncing applied to resize handlers (e.g., in sidebar responsiveness)

* **Animation Libraries:**
  * `@react-spring/web` for physics-based animations
  * `react-beautiful-dnd` for drag-and-drop operations
  * CSS transitions for simpler state changes

* **Timing Constants:**
  * Layout transitions: 300ms
  * Hover effects: 200ms 
  * Drag feedback: Spring physics (tension: 280, friction: 24)
  * Progress indicators: 800ms

## Accessibility Considerations

* **Current Implementation:**
  * Animations respect standard motion reduction preferences when available
  * Critical UI feedback has multiple indicators beyond animation
  * Touch interactions are optimized with appropriate timing and feedback

**Style and Feel:**

* Smooth
* Responsive
* Subtle
* Engaging
* Modern
