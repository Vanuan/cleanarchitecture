# Visual Language: Animations

**Intent:**

To incorporate subtle and purposeful animations that enhance the user experience by providing feedback, guiding attention, and creating a sense of responsiveness and polish within the Todo application. Animations should be used sparingly and strategically to avoid distraction or performance issues.

**General Principles:**

*   **Subtlety:** Animations should be subtle and not overpowering.
*   **Purposefulness:** Every animation should have a clear purpose – to provide feedback, guide the user, or enhance the overall experience.
*   **Performance:** Animations must be performant and not cause lag or stuttering.
*   **Consistency:** Use a consistent style and duration for animations throughout the application.
*   **Accessibility:** Provide an option to disable animations for users with motion sensitivities.

**Specific Animations:**

*   **Task Completion:**
    *   A subtle fade or color change as a task is marked as complete (or a checkmark icon animation).
    *   Duration: 150-300ms.
    *   Easing: `ease-in-out` (Tailwind).
*   **Task Creation:**
    *   A smooth slide-in or fade-in as a new task appears in the list or board.
    *   Duration: 200-400ms.
    *   Easing: `ease-out` (Tailwind).
*   **Drag and Drop (Board View):**
    *   The dragged task card should have a slight "lift" effect.
    *   The target column should highlight to indicate a valid drop zone.
    *   Dropping the task card should trigger a smooth movement animation into the new column.
*   **View Transitions:**
    *   Use fade-in or slide-in/out transitions when switching between views (list, board, calendar).
    *   Duration: 200-400ms.
    *   Easing: `ease-in-out` (Tailwind).
*   **Hover Effects:**
    *   Subtle changes in background color or shadow on hover for buttons and task cards.
    *   Duration: 100-200ms.

**Technical Considerations:**

*   Use CSS transitions and animations for simple effects.
*   For more complex animations, consider using a JavaScript animation library (e.g., React Spring, Framer Motion) while ensuring performance.
*   Avoid animating properties that cause layout reflows (e.g., width, height, top, left). Instead, animate properties like `transform` and `opacity`.

**Accessibility:**

*   Provide a setting to disable all animations for users with vestibular disorders or motion sensitivities.

**Style and Feel:**

*   Smooth
*   Responsive
*   Subtle
*   Engaging
*   Modern
