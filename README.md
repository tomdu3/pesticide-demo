# Faulty Portfolio - Subtle Chaos Demo

A "visually plausible" modern portfolio website designed to showcase common CSS layout mistakes and debugging techniques. On the surface, the site looks somewhat normal, but it contains several structural flaws that become obvious when layout boundaries are revealed.

## 🚀 Purpose
This project serves as a demonstration for tools like **Pesticide** or custom "debug" CSS. It illustrates how elements can overflow, overlap, and misalign in ways that are hard to spot without visualizing the element boundaries.

## 🛠️ Features
- **Modern UI**: Hero section, About cards, and a Project gallery using Pexels images.
- **Pesticide Toggle**: A built-in "Toggle Pesticide" button in the header that injects debug outlines to reveal the "chaos".
- **Vanilla Tech**: Built with standard HTML5, CSS3, and Vanilla JavaScript.

## 🐞 Intentional CSS Bugs
Look for these issues after enabling "Pesticide" mode:

1.  **Fixed Height Overflow**: The `about-card` elements have a fixed height. The text content is longer than the card, causing it to spill out into the section below without any visible container boundaries.
2.  **Negative Margin Overlap**: The `hero-content` uses a large negative margin to "align" itself, but this causes its structural box to overlap significantly with the section below it.
3.  **Absolute Positioning Fail**: The "NEW" badges on project items are `position: absolute` but the parent `project-item` is *not* `position: relative`. This causes the badges to be positioned relative to the `<body>` (stacking at the top-left) rather than on the cards.
4.  **Horizontal Scroll Breakout**: The `projects-grid` uses `flex-wrap: nowrap` with large `flex-basis` values, forcing the layout to break horizontally on smaller screens.
5.  **Unclipped Media**: The `hero-image` is taller than its container (`hero`), bleeding out into the header/footer space because the parent lacks `overflow: hidden`.
6.  **Inline-Block Gaps**: The navigation links use `display: inline-block`, which introduces small whitespace gaps between items due to HTML formatting.

## 🖥️ How to Run
Simply open `index.html` in any modern web browser.

Click the **"Toggle Pesticide"** button at the top right to reveal the hidden layout issues.

## 📂 Project Structure
- `index.html`: The markup structure.
- `styles.css`: The styling, including the intentional bugs and debug mode styles.
- `script.js`: Simple logic for the debug toggle.
