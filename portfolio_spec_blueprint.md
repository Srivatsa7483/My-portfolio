# Creative Developer Portfolio: Technical Specification & Blueprint

This document outlines the architectural requirements, design philosophy, and development roadmap for building a high-end creative portfolio inspired by the minimalist, motion-heavy aesthetic of modern creative developers (Reference: lukebaffait.fr).

---

## 1. Design Philosophy
To emulate this specific style, the website must prioritize **motion as a primary language**, not just an ornament.
* **Typography-First:** Use bold, high-contrast sans-serif typefaces (e.g., Inter, Neue Montreal, or Satoshi).
* **Minimalist Color Palette:** A primary dark/light theme (High-contrast) with subtle glassmorphism or grain textures.
* **Micro-Interactions:** Every click, hover, and scroll must provide tactile visual feedback.
* **Fluidity:** Eliminating "jank" via smooth scroll physics and orchestrated transition timelines.

---

## 2. Technical Stack Requirements

### Frontend Framework
* **Next.js (React):** For routing, performance optimization, and SEO.
* **Tailwind CSS:** For rapid, utility-first styling and managing complex responsive layouts (Grid/Flex).

### Animation & Motion Engine
* **GSAP (GreenSock):** The core engine for timeline-based animations and ScrollTrigger.
* **Lenis:** For smooth scrolling (Inertia-based scroll physics).
* **Framer Motion:** Recommended for simple layout transitions and exit/entry animations between pages.

### Assets & Optimization
* **Font Optimization:** Using `next/font` for zero layout shift.
* **Image Handling:** Using `next/image` with WebP/AVIF formats to maintain high-quality visuals without compromising load speed.

---

## 3. Core Feature Requirements

### A. Smooth Scroll Implementation
Standard browser scrolling is too "steppy." You must implement a virtual scroll listener (Lenis) to normalize the experience across devices.

### B. Scroll-Triggered Reveal Effects
* **Text Masking:** Lines of text should "slide up" into view from an invisible container.
* **Parallax Imagery:** Images should move at a slightly different speed than the scroll to create depth.

### C. The Bento Grid Layout
A modular grid system to showcase skills, projects, and personal details (e.g., location, tech stack, social links). Each "cell" should have its own hover state or animation.

### D. Custom Cursor
A dynamic SVG/Div cursor that follows the mouse with a slight lag (lerp) and expands/reacts when hovering over interactive elements.

---

## 4. Development Roadmap

| Phase | Task | Focus |
| :--- | :--- | :--- |
| **01** | Setup & Layout | Next.js init, Tailwind config, and Semantic HTML structure. |
| **02** | Smooth Scroll | Integrate Lenis and ensure no "jitter" on mobile/desktop. |
| **03** | Motion Design | Implement GSAP ScrollTrigger for section transitions. |
| **04** | Project Showcase | Build sticky-stacking cards for portfolio items. |
| **05** | Polish | Add grain textures, custom cursors, and page loaders. |

---

## 5. Learning Resources
* **GSAP Documentation:** Focus on `ScrollTrigger` and `Flip` plugins.
* **Studio Freight (Lenis):** Study their implementation of smooth scroll in React.
* **Awwwards Case Studies:** Analyze "Site of the Day" winners to understand layout trends.

---
*Document generated for creative development planning.*
