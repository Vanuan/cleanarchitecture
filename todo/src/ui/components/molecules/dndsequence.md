
1. **Drag Start**
   - User begins dragging a task card
   - An overlay copy appears under the cursor
   - The original item in the source column fades (becomes less prominent)

2. **Drag Over Target Column**
   - As the card hovers over a new column, the overlay maintains its appearance
   - The original card completely disappears from the source column
   - A ghost/preview card appears in the target column (semi-transparent)

3. **Release Cursor (Drop)**
   - When the user releases, the overlay card smoothly animates to the exact position of the ghost/preview card
   - The ghost/preview card disappears as the overlay card transitions to its position
   - The async operation starts simultaneously
   - This creates one continuous motion from hand to final position

4. **During Animation**
   - While the card is animating to its final position, it can display a subtle "in progress" indicator
   - The animation timing is slightly longer than typical to allow time for the async operation
   - This maintains the illusion of a single object moving through space

5. **Animation Completion**
   - As the animation completes, the card is now in its final position
   - If the async operation is done, the card assumes its final appearance
   - If the async operation is still ongoing, the card maintains a "saving" indicator until complete
