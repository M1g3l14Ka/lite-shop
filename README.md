# Hi there 👋

## **Live Demo:** [https://shop.michaelkasion.ru/](https://shop.michaelkasion.ru/)

---

## Features

This is a minimalist online store with simulated purchases. I created it as a pet project to improve my skills in modern frontend development, state management, and API interactions. The essence is clear from its name — lightweight, fast, and focused on the shopping experience.

---

## 🛠️ Tools & Tech Stack

- **Core** | Next.js 16, React 19, TypeScript |
- **Styling** | Tailwind CSS v4, shadcn/ui |
- **Animations** | Framer Motion |
- **State Management** | Zustand (+ persist middleware) |
- **API** | DummyJSON Products API |
- **Utilities** | use-debounce |

---

## 🗂️ Structure

- **Hero Section:** Search bar with debounce (500ms), cart counter, navigation
- **Main (Product Grid):** Responsive grid (2→3→4→5 columns), product cards with discount prices
- **Cart Page:** Item selection, quantity control, order placement
- **Footer:** FAQ accordion with project info and author links

---

## 🤪 What I Learned

- **State Management:** Mastered Zustand for cart and filter stores with localStorage persistence
- **Performance:** Implemented debounced search, request timeouts (AbortController), and API response caching
- **Responsive Design:** Built mobile-first adaptive layouts with Tailwind breakpoints
- **Modern Patterns:** Server Components vs Client Components in Next.js 16 App Router
- **Error Handling:** Proper try/catch, loading states, and user feedback

---

## 🤔 Future Improvements

- [ ] Add product categories and brand filters
- [ ] Implement sorting (by price, rating, newest)
- [ ] Write unit tests (Vitest + React Testing Library)

---

## 🛜 How to Run Locally

If you want to run this project on your machine:

1. **Download the archive** with the project
2. **Open the project** in your code editor (I use VS Code)
3. **Install dependencies:**
   ```bash
   npm install
4. Create .env.local file in the root directory:
- NEXT_PUBLIC_API_URL="https://dummyjson.com/products"
5. Start the dev server:
- npm run dev
6. Open http://localhost:3000 in your browser
