# Pesticide CSS Debugging Demos

A set of visually plausible, modern website demos designed to showcase common CSS layout mistakes and debugging techniques. On the surface, the layouts look normal, but they contain structural flaws that become obvious when element boundaries are revealed using outline debuggers like **Pesticide** or custom styles.

---

## 🚀 Purpose
This repository serves as a learning playground for web developers. It illustrates how elements can overflow, overlap, and misalign in ways that are hard to spot visually but are instantly exposed by visualizing element bounding boxes.

By toggling between **Buggy CSS** and **Corrected CSS** alongside **Pesticide outlines**, you can see exactly how the layout engines interpret your code and how to write robust CSS.

---

## 📂 Project Demos

This project contains two distinct demos directly in the root directory:

### 1. Subtle Chaos Portfolio (`index.html`)
A standard creative portfolio showcasing simple layout mistakes like unanchored absolute badges, horizontal flex breakout, fixed height text overflow, and negative margin structural overlap.
- **Faulty CSS**: [styles.css](file:///home/tom/cyf/demos/pesticide-demo/styles.css)
- **Corrected CSS**: [corrected-styles.css](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles.css)
- **JS Controller**: [script.js](file:///home/tom/cyf/demos/pesticide-demo/script.js)

### 2. SaaS Analytics Dashboard (`index2.html`)
A dark-mode administrative dashboard designed with modern glassmorphism. It includes interactive widgets, profile dropdowns, KPI metrics, charts, and transaction tables, but suffers from five complex CSS layout bugs.
- **Faulty CSS**: [styles2.css](file:///home/tom/cyf/demos/pesticide-demo/styles2.css)
- **Corrected CSS**: [corrected-styles2.css](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles2.css)
- **JS Controller**: [script2.js](file:///home/tom/cyf/demos/pesticide-demo/script2.js)

---

## 🖥️ How to Run

### Option 1: Double-click to Open
Simply open [index.html](file:///home/tom/cyf/demos/pesticide-demo/index.html) or [index2.html](file:///home/tom/cyf/demos/pesticide-demo/index2.html) directly in any web browser.

### Option 2: Run a Local Server
Start a lightweight Python development server in the root of the project:
```bash
python3 -m http.server 8000
```
Then visit in your browser:
- Portfolio: `http://localhost:8000/index.html`
- SaaS Dashboard: `http://localhost:8000/index2.html`

---

## 🐞 Step-by-Step Guide: Debugging the Portfolio (index.html) with Pesticide

Open [index.html](file:///home/tom/cyf/demos/pesticide-demo/index.html). By default, it loads with **styles.css**. Let's diagnose and fix all six layout bugs step-by-step using Pesticide.

### 🛠️ Setting up the Debug Environment
Click the **"Toggle Pesticide"** button at the top-right of the navigation bar. This injects red outline borders around every element on the page.

---

### Bug 1.1: Fixed Height Text Overflow
*   **The Symptom:** In the "About" section, the text inside the cards looks like it might spill into the section below if more words are added.
*   **The Pesticide Revelation:** Enable Pesticide. Notice that the red outline representing the `.about-card` container ends halfway through the paragraph. The text is literally hanging outside its box boundary because of a hardcoded height constraint.
*   **The Buggy Code ([styles.css:L107](file:///home/tom/cyf/demos/pesticide-demo/styles.css#L107-L113)):**
    ```css
    .about-card {
        flex: 1;
        padding: 20px;
        height: 150px; /* Bug: Fixed height cuts off boundary box */
    }
    ```
*   **The Fix ([corrected-styles.css:L112](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles.css#L112-L118)):**
    Change `height` to `min-height` so the container box grows dynamically if the text content scales:
    ```css
    .about-card {
        flex: 1;
        padding: 20px;
        min-height: 150px; /* Fix: Container wraps dynamic text */
    }
    ```

---

### Bug 1.2: Negative Margin Overlap
*   **The Symptom:** Hovering over the top edge of the "About" section cards doesn't highlight them or register hover effects consistently.
*   **The Pesticide Revelation:** Under Pesticide, the bottom border of the `.hero-content` box stretches 80px *into* the space of the About section. Visually, the sections look separated, but structurally, the Hero box overlaps the About box, blocking clicks and hovers.
*   **The Buggy Code ([styles.css:L75](file:///home/tom/cyf/demos/pesticide-demo/styles.css#L75-L79)):**
    ```css
    .hero-content {
        flex: 1;
        margin-bottom: -80px; /* Bug: Forces box to overlap elements below */
        z-index: 2;
    }
    ```
*   **The Fix ([corrected-styles.css:L81](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles.css#L81-L84)):**
    Remove the negative margin and use padding or regular margins to handle layout flow:
    ```css
    .hero-content {
        flex: 1;
        z-index: 2; /* Fix: Removed margin-bottom overlap */
    }
    ```

---

### Bug 1.3: Unanchored Absolute Badges (Positioning Context)
*   **The Symptom:** In the "Selected Works" section, the yellow "NEW" tags are stacked on top of each other in the top-left viewport corner instead of anchored on their respective project cards.
*   **The Pesticide Revelation:** Look at the top-left of the viewport. Pesticide shows the absolute bounds of the `::after` badges sitting inside the body flow. This indicates the parent element `.project-item` does not establish a relative position context.
*   **The Buggy Code ([styles.css:L146](file:///home/tom/cyf/demos/pesticide-demo/styles.css#L146-L149)):**
    ```css
    .project-item {
        /* position: relative; */ /* Bug: Commented out positioning context */
    }
    ```
*   **The Fix ([corrected-styles.css:L152](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles.css#L152-L155)):**
    Uncomment or add `position: relative;` to anchor the badges relative to each card wrapper:
    ```css
    .project-item {
         position: relative; /* Fix: Anchors absolute children here */
    }
    ```

---

### Bug 1.4: Flex Grid Horizontal Breakout
*   **The Symptom:** When you resize the screen down to mobile widths, the project items don't stack. Instead, they stay in a single row, creating a wide horizontal scroll bar.
*   **The Pesticide Revelation:** Scroll right. Pesticide outlines reveal that `.projects-grid` is a flex box that extends far outside the window margins because `flex-wrap` is set to `nowrap`.
*   **The Buggy Code ([styles.css:L132](file:///home/tom/cyf/demos/pesticide-demo/styles.css#L132-L136)):**
    ```css
    .projects-grid {
        display: flex;
        flex-wrap: nowrap; /* Bug: Forces cards to stay on a single horizontal line */
        gap: 30px;
    }
    ```
*   **The Fix ([corrected-styles.css:L137](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles.css#L137-L142)):**
    Change `flex-wrap` to `wrap` so cards stack vertically when the screen width narrows:
    ```css
    .projects-grid {
        display: flex;
        flex-wrap: wrap; /* Fix: Wraps project items on mobile viewports */
        justify-content: center;
        gap: 30px;
    }
    ```

---

### Bug 1.5: Unclipped Media Overflows
*   **The Symptom:** The agency office image in the Hero section visually extends and overlaps the header/footer limits if resized.
*   **The Pesticide Revelation:** Under Pesticide, the image outline border reaches a height of 500px, which exceeds the 450px height of its parent `.hero` container. The parent doesn't constrain the image bounds.
*   **The Buggy Code ([styles.css:L66](file:///home/tom/cyf/demos/pesticide-demo/styles.css#L66-L72)):**
    ```css
    .hero {
        display: flex;
        align-items: center;
        background: #fff;
        height: 450px; 
        padding: 0 50px;
        /* Bug: Lacks overflow clipping */
    }
    ```
*   **The Fix ([corrected-styles.css:L71](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles.css#L71-L78)):**
    Add `overflow: hidden;` to the `.hero` container so child elements are clipped at its boundaries:
    ```css
    .hero {
        display: flex;
        align-items: center;
        background: #fff;
        height: 450px; 
        padding: 0 50px;
        overflow: hidden; /* Fix: Clips spilling image layers */
    }
    ```

---

### Bug 1.6: Inline-Block Navigation Whitespace Gaps
*   **The Symptom:** The navigation links have slight, inconsistent spacing between them that doesn't align with exact padding margins.
*   **The Pesticide Revelation:** Inspect the gaps between navigation items. Under Pesticide, there are gaps between the outline boxes that do not belong to margins. This is raw HTML code indentation whitespace being rendered between `inline-block` list items.
*   **The Buggy Code ([styles.css:L44](file:///home/tom/cyf/demos/pesticide-demo/styles.css#L44-L47)):**
    ```css
    .nav-links li {
        display: inline-block; /* Bug: Renders HTML spaces as visual page gaps */
        margin-right: 20px;
    }
    ```
*   **The Fix ([corrected-styles.css:L44](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles.css#L44-L52)):**
    Change the parent link wrapper to `display: flex;`. Flexbox ignores HTML node spacing and lets you dictate gap sizes precisely:
    ```css
    .nav-links {
        display: flex; /* Fix: Ignores whitespace nodes */
        list-style: none;
        gap: 20px;
    }
    ```

---

## 🐞 Step-by-Step Guide: Debugging the SaaS Dashboard (index2.html) with Pesticide

Open [index2.html](file:///home/tom/cyf/demos/pesticide-demo/index2.html). By default, it will load with **Buggy CSS Active**. Let's diagnose and fix all five layout bugs step-by-step using Pesticide.

### 🛠️ Setting up the Debug Environment
Click the **"Toggle Pesticide"** button at the top-center of the dashboard header to inject outline borders.

---

### Bug 2.1: The Squashed Sidebar Icons (Flex Shrinkage)
*   **The Symptom:** When you resize the browser width to a smaller desktop or laptop scale, the sidebar navigation icons visually flatten into thin lines or disappear entirely, and text wraps awkwardly.
*   **The Pesticide Revelation:** Under Pesticide, look closely at the sidebar nav links. Notice that the red box outlining `.nav-icon-wrapper` has compressed to a width of `0px`. The browser has shrunk the icon container to make room for the text because of Flexbox's default shrinking behavior.
*   **The Buggy Code ([styles2.css:L114](file:///home/tom/cyf/demos/pesticide-demo/styles2.css#L114-L121)):**
    ```css
    .nav-icon-wrapper {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: inherit;
        /* Missing flex-shrink instruction! */
    }
    ```
*   **The Fix ([corrected-styles2.css:L115](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles2.css#L115-L123)):**
    Add `flex-shrink: 0;` to ensure the icon container maintains its structural dimension:
    ```css
    .nav-icon-wrapper {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: inherit;
        flex-shrink: 0; /* Prevents container from collapsing */
    }
    ```

---

### Bug 2.2: The Clipped Profile Dropdown (Stacking Context / Z-Index Fail)
*   **The Symptom:** Click on the User Profile card (**Alex Rivera**) at the top right to open the account dropdown menu. The dropdown is cut off or renders underneath the KPI cards below, making it impossible to read or click.
*   **The Pesticide Revelation:** With Pesticide enabled, notice that the red boundary outline of `.profile-dropdown` actually extends downwards, overlaying the first KPI card. However, the visual content inside that box is hidden behind the KPI card background. This happens because the `.kpi-card` has `position: relative` and a higher stacking layer, while the parent header establishes a weaker stacking context.
*   **The Buggy Code ([styles2.css:L157](file:///home/tom/cyf/demos/pesticide-demo/styles2.css#L157-L168)):**
    ```css
    .dashboard-header {
        height: var(--header-height);
        position: sticky;
        top: 0;
        z-index: 1; /* Too low! */
    }
    .kpi-card {
        position: relative;
        z-index: 2; /* Beats the header's stacking context! */
    }
    ```
*   **The Fix ([corrected-styles2.css:L159](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles2.css#L159-L170)):**
    Increase the header's `z-index` to lift its stacking context above the scrollable page content:
    ```css
    .dashboard-header {
        height: var(--header-height);
        position: sticky;
        top: 0;
        z-index: 100; /* Solves stacking order hierarchy */
    }
    ```

---

### Bug 2.3: Stats Grid Horizontal Breakout (Flex Wrap)
*   **The Symptom:** Shrink your browser viewport horizontally. Instead of the metrics cards wrapping down to a second row, the page forces a horizontal scrollbar. The interface breaks out of the desktop viewport boundary.
*   **The Pesticide Revelation:** Scroll horizontally to the right with Pesticide on. You will see that the outer `.stats-grid` outline extends far off-screen. The cards (`.kpi-card`) inside have a fixed basis and are locked to a single line, refusing to flow downward.
*   **The Buggy Code ([styles2.css:L298](file:///home/tom/cyf/demos/pesticide-demo/styles2.css#L298-L308)):**
    ```css
    .stats-grid {
        display: flex;
        flex-wrap: nowrap; /* Forces all cards on one line */
        gap: 24px;
    }
    .kpi-card {
        flex: 0 0 280px; /* Does not grow or shrink */
    }
    ```
*   **The Fix ([corrected-styles2.css:L299](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles2.css#L299-L309)):**
    Allow wrapping and convert the hardcoded width base to a fluid flex setting:
    ```css
    .stats-grid {
        display: flex;
        flex-wrap: wrap; /* Permits flowing onto new lines */
        gap: 24px;
    }
    .kpi-card {
        flex: 1 1 240px; /* Grows, shrinks, and bases at 240px */
    }
    ```

---

### Bug 2.4: Squished Action Button Boundaries (Inline Element Padding)
*   **The Symptom:** In the "Recent System Transactions" table at the bottom, hover or click on the "View Details" and "Manage" action buttons. The buttons overlap adjacent row lines, and clicking the margins of the button fails to trigger the link.
*   **The Pesticide Revelation:** Enable Pesticide and look at the buttons inside the table cell. You will see that the red box representing the anchor element (`<a>`) is a thin, flat line matching the raw text height. However, the visual blue background extends much taller. This is because `display: inline` elements do not contribute padding to the block-level line flow, leaving the clickable hit-box extremely squished.
*   **The Buggy Code ([styles2.css:L509](file:///home/tom/cyf/demos/pesticide-demo/styles2.css#L509-L519)):**
    ```css
    .btn-table-action {
        display: inline; /* Ignores vertical box-model boundaries */
        padding: 8px 16px;
    }
    ```
*   **The Fix ([corrected-styles2.css:L510](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles2.css#L510-L520)):**
    Set the element to `display: inline-block` (or `inline-flex`) so the browser honors the vertical padding inside the document flow:
    ```css
    .btn-table-action {
        display: inline-block; /* Forces box boundaries to enclose visual padding */
        padding: 8px 16px;
    }
    ```

---

### Bug 2.5: Hidden Section Overlap (Absolute Position Abuse)
*   **The Symptom:** Look at the middle row containing "Revenue Performance Trend" and "Recent Activity". The left chart card is partially covered on its right side by the "Recent Activity" card, blocking visual data.
*   **The Pesticide Revelation:** Toggle Pesticide on. You will see that the red outline of `.recent-activities-card` intersects and overlaps the right side of `.analytics-chart-card`. This occurs because the developer set the parent `.dashboard-middle` to a fixed height, left-floated the chart at `width: 70%`, and absolutely positioned the activity card at `width: 35%`. The widths sum to `105%`, and because of `position: absolute`, they stack on top of each other.
*   **The Buggy Code ([styles2.css:L351](file:///home/tom/cyf/demos/pesticide-demo/styles2.css#L351-L373)):**
    ```css
    .dashboard-middle {
        position: relative;
        height: 380px;
    }
    .analytics-chart-card {
        position: relative;
        width: 70%;
    }
    .recent-activities-card {
        position: absolute;
        right: 0;
        top: 0;
        width: 35%;
    }
    ```
*   **The Fix ([corrected-styles2.css:L352](file:///home/tom/cyf/demos/pesticide-demo/corrected-styles2.css#L352-L374)):**
    Remove the fixed height and absolute positioning, and use a responsive flex layout to flow cards side-by-side or wrap them on smaller screens:
    ```css
    .dashboard-middle {
        display: flex;
        flex-wrap: wrap; /* Allows wrapping on smaller viewports */
        gap: 24px;
        height: auto; /* Removes restrictive heights */
    }
    .analytics-chart-card {
        flex: 2 1 500px; /* Takes 2/3 of space */
    }
    .recent-activities-card {
        flex: 1 1 300px; /* Takes 1/3 of space */
        position: static; /* Removes absolute positioning overlay */
        width: auto;
    }
    ```

---

## 💡 Summary of Pesticide Debugging Power
Outline tools like Pesticide remove the "visual lie" of styling. They show:
1.  **Hidden Overlap:** Where absolute or poorly calculated boxes encroach on other elements (Bug 1.2, Bug 2.2, Bug 2.5).
2.  **Collapsed Boundaries:** Where elements are squashed by flex/grid constraints (Bug 2.1, Bug 2.4).
3.  **Visual vs. Logical Disconnect:** Where an element's clickable background is larger than its logical hit box (Bug 2.4).
4.  **Overflow Breakouts:** Where page widths exceed the viewport, resulting in horizontal scrolling (Bug 1.4, Bug 2.3).
5.  **Positioning Contexts:** Where absolute elements align relative to the wrong parent bounds (Bug 1.3).
