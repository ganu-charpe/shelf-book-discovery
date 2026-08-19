# 📚 SHELF — Book Discovery App

A modern, responsive book discovery application built with **Nuxt 4, Vue 3, TypeScript, Tailwind CSS v4, and Storybook**.

SHELF allows users to discover books, search for books using the Google Books API, view book details, and maintain a personal shortlist.

---

## 🚀 Live Demo

> Add your deployed application URL here.

**Demo:** `https://shelf-book-discovery-o45n1fscb-ganu-charpes-projects.vercel.app/`

---

## 📦 Repository

**GitHub:** `https://github.com/ganu-charpe/shelf-book-discovery`

---

## ✨ Features

### 🔎 Book Search

* Search books using the Google Books API.
* Search by title, author, keyword.
* Debounced search to prevent unnecessary API requests while typing.
* Displays appropriate loading and error states.

### 📚 Book Discovery

* Responsive grid-based book discovery interface.
* Book cards display:

  * Cover image
  * Title
  * Author
  * Published year
* Graceful fallback when a book does not have a cover image.
* Hover interactions provide visual feedback and access to book details.

### 📖 Book Details

Users can select a book to view additional information such as:

* Title
* Authors
* Description
* Published information
* Cover image
* Categories
* Publisher
* Page count
* External book information/purchase links where available

### ⭐ Shortlist

Users can add and remove books from their shortlist.

* Shortlist state is shared across the application.
* Prevents duplicate books from being added.
* Shortlisted books can be removed easily.
* Shortlist state can be persisted using browser storage.
* Client-only browser functionality is protected from Nuxt SSR execution.

## 🛠️ Tech Stack

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| Nuxt 4           | Application framework and SSR           |
| Vue 3            | UI development                          |
| TypeScript       | Type safety                             |
| Tailwind CSS v4  | Styling and responsive UI               |
| Google Books API | Book data                               |
| Git / GitHub     | Version control                         |

---

## 🏗️ Project Structure

```text
shelf-book-discovery/
├── app/
│   ├── components/
|   |   |── AppHeader.vue
│   │   ├── BookCard.vue
│   │   ├── BookGrid.vue
│   │   ├── SearchBar.vue
│   │   |── ShortlistButton.vue
|   |   └── LoadingState.vue
│   │
│   ├── composables/
│   │   └── useShortlist.ts
│   │
│   ├── pages/
│   │   ├── index.vue
│   │   └── shortlist.vue
|   |   └── books
|   |       └── [id].vue/
│   │
│   └── assets/
│       └── css/
|           └── main.css
│
├── shared/
│   └── bookModel.ts
│
├── server/
│   └── api/
|       └── Books/
|           └── index.get.ts
|           └── [id].get.ts
│
│
├── public/
│
├── tests/
│
├── .env
├── .gitignore
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

> The exact structure may vary depending on the final implementation.

---

## 🔌 Google Books API

The application uses the **Google Books API** to retrieve book information.

The API integration is isolated from UI components so that API-specific logic does not need to be duplicated throughout the application.

### Example API flow

```text
User Search
    ↓
Search Component
    ↓
Composable / API Service
    ↓
Google Books API
    ↓
Response Mapping
    ↓
Book Model
    ↓
Book Cards
```

---

## 🔐 Environment Variables

API credentials and other environment-specific values should not be committed to Git.

Create a `.env` file:

```env
NUXT_GOOGLE_BOOKS_API_KEY=your_api_key_here
```

### Important

Never commit real API keys or secrets to GitHub.

The `.env` file should be included in `.gitignore`.

---

## ⚡ Installation

Clone the repository:

```bash
git clone https://github.com/ganu-charpe/shelf-book-discovery.git
```

Navigate to the project:

```bash
cd shelf-book-discovery
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp  .env
```

Add the required API key to `.env`.

---

## 💻 Development

Start the Nuxt development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🏭 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```


## 🌐 Nuxt SSR Considerations

Because Nuxt supports server-side rendering, browser-only APIs need to be handled carefully.

For example, `localStorage` is only available in the browser.

Client-specific logic can be protected using:

```ts
if (import.meta.client) {
  // Browser-only logic
}
```

This prevents browser APIs from being executed during server-side rendering.

For data fetching:

* `useFetch()` / `useAsyncData()` can be used for SSR-friendly data fetching.
* `$fetch()` can be used for client-triggered operations and API requests where SSR integration is not required.

---

## 🧠 State Management

Nuxt's `useState()` is used for shared reactive state where appropriate.

For example:

```ts
const shortlist = useState<Book[]>(
  'book-shortlist',
  () => []
)
```

This allows different components/pages to access the same shortlist state.

A book can be checked using:

```ts
shortlist.value.some(
  item => item.id === book.id
)
```

A book can be removed using:

```ts
shortlist.value = shortlist.value.filter(
  item => item.id !== book.id
)
```

---

## 🧩 Component Design

The application follows a reusable component architecture.

Example:

```text
Book Discovery Page
│
├── SearchBar
│
├── BookGrid
│   └── BookCard
│       └── ShortlistButton
│
└── BookDetails
```

Components are kept focused on presentation and user interaction while API/state logic is handled through composables or dedicated modules.

---

## 🔍 Search Behaviour

Search requests are debounced so the application does not make an API request for every character entered.

For example:

```text
User types:
J
Ja
Jav
Java
JavaS
JavaSc
JavaScript

                 ↓

       Debounce / Wait

                 ↓

       API request
```

This reduces unnecessary network traffic and improves the user experience.

---

## 📋 Available Scripts

| Command                   | Description              |
| ------------------------- | ------------------------ |
| `npm run dev`             | Start development server |
| `npm run build`           | Create production build  |
| `npm run preview`         | Preview production build |

---

## 🚧 Possible Future Improvements

Potential enhancements include:

* Advanced filtering by category/genre.
* Sorting by publication date or relevance.
* Pagination/infinite scrolling.
* Enhanced card hover effects with background and visual transitions.
* Fully responsive UI across desktop, tablet, and mobile devices.
* Expanded Storybook implementation for reusable UI components and component documentation.

---

## 👨‍💻 Author

**Ganesh Charpe**

Frontend / Full Stack Developer

Technologies used in this project include:

**Vue 3 • Nuxt 4 • TypeScript • Tailwind CSS • Storybook • REST APIs**

---

