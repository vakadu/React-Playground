import Link from "next/link";

const routes = [
  { routeName: "great-frontend", name: "Great Frontend" },
  { routeName: "react-use", name: "React Use" },
  { routeName: "accordian", name: "Accordian" },
  { routeName: "auto-complete", name: "Auto Complete" },
  { routeName: "auto-complete-2", name: "Auto Complete2" },
  { routeName: "auto-complete-3", name: "Auto Complete3" },
  { routeName: "big-bazar-counter", name: "Big Bazar Counter" },
  { routeName: "browser-history", name: "Browser History" },
  { routeName: "carousel", name: "Carousel" },
  { routeName: "chat", name: "Chat" },
  { routeName: "checkboxes", name: "Checkboxes" },
  { routeName: "checkboxes-nested", name: "Checkboxes Nested" },
  { routeName: "checkboxes-nested-2", name: "Checkboxes Nested 2" },
  { routeName: "clock", name: "Clock" },
  { routeName: "cms", name: "Cms" },
  { routeName: "code-splitting", name: "Code Splitting" },
  { routeName: "data-tables", name: "Data Tables" },
  { routeName: "debounce", name: "Debounce" },
  { routeName: "devtools", name: "Devtools" },
  { routeName: "dmart-checkout", name: "Dmart Checkout" },
  { routeName: "file-explorer", name: "File Explorer" },
  { routeName: "flights-date", name: "Flights Date" },
  { routeName: "form-builder", name: "Form Builder" },
  { routeName: "form-builder-2", name: "Form Builder 2" },
  { routeName: "form-builder-3", name: "Form Builder 3" },
  { routeName: "form-builder-4", name: "Form Builder 4" },
  { routeName: "form-renderer", name: "Form Renderer" },
  { routeName: "forms", name: "Forms" },
  { routeName: "generate-rows-cols", name: "Generate Rows Cols" },
  { routeName: "grid-lights", name: "Grid Lights" },
  { routeName: "grid-navigation", name: "Grid Navigation" },
  { routeName: "hacker-news", name: "Hacker News" },
  { routeName: "html-layout", name: "Html Layout" },
  { routeName: "image-lazyload", name: "Image Lazyload" },
  { routeName: "indexdb", name: "Indexdb" },
  { routeName: "intersection-observer", name: "Intersection Observer" },
  { routeName: "json-builder", name: "Json Builder" },
  { routeName: "json-diff", name: "Json Diff" },
  { routeName: "like", name: "Like" },
  { routeName: "marklee-tree", name: "Marklee Tree" },
  { routeName: "memory-game", name: "Memory Game" },
  { routeName: "menu-context", name: "Menu Context" },
  { routeName: "modal", name: "Modal" },
  { routeName: "multi-cell-selection", name: "Multi Cell Selection" },
  { routeName: "multi-select-dropdown", name: "Multi Select Dropdown" },
  { routeName: "multi-select-dropdown-2", name: "Multi Select Dropdown 2" },
  { routeName: "navigation-menu", name: "Navigation Menu" },
  { routeName: "nayan", name: "Nayan" },
  { routeName: "nested-comments", name: "Nested Comments" },
  { routeName: "not-solved-yet", name: "Not Solved Yet" },
  { routeName: "notification-queue", name: "Notification Queue" },
  { routeName: "notification-service", name: "Notification Service" },
  { routeName: "otp", name: "Otp" },
  { routeName: "pagination", name: "Pagination" },
  { routeName: "progress-bar", name: "Progress Bar" },
  { routeName: "react-query", name: "React Query" },
  { routeName: "react-query-2", name: "React Query 2" },
  { routeName: "recursive-tree-editable", name: "Recursive Tree Editable" },
  { routeName: "redux", name: "Redux" },
  { routeName: "reduxs", name: "Reduxs" },
  { routeName: "render-props", name: "Render Props" },
  { routeName: "reusable-grid", name: "Reusable Grid" },
  { routeName: "riders", name: "Riders" },
  { routeName: "searchable-dropdown", name: "Searchable Dropdown" },
  { routeName: "selecteable-grids", name: "Selecteable Grids" },
  { routeName: "sooner-toast", name: "Sooner Toast" },
  { routeName: "star-rating", name: "Star Rating" },
  { routeName: "stopwatch", name: "Stopwatch" },
  { routeName: "tabs", name: "Tabs" },
  { routeName: "task-mangagement", name: "Task Mangagement" },
  { routeName: "tic-tac-toe", name: "Tic Tac Toe" },
  { routeName: "timer", name: "Timer" },
  { routeName: "to-do-list", name: "To Do List" },
  { routeName: "toast", name: "Toast" },
  { routeName: "toaster", name: "Toaster" },
  { routeName: "traffic-light", name: "Traffic Light" },
  { routeName: "transfer-list", name: "Transfer List" },
  {
    routeName: "tree-search-with-highlight",
    name: "Tree Search With Highlight",
  },
  { routeName: "undo-redo", name: "Undo Redo" },
  { routeName: "undoable-counter", name: "Undoable Counter" },
  { routeName: "use-callback", name: "Use Callback" },
  { routeName: "use-clickoutside", name: "Use Clickoutside" },
  { routeName: "use-effect", name: "Use Effect" },
  { routeName: "use-effect-2", name: "Use Effect 2" },
  { routeName: "use-fetch", name: "Use Fetch" },
  { routeName: "use-layouteffect", name: "Use Layouteffect" },
  { routeName: "use-memo", name: "Use Memo" },
  { routeName: "use-prev", name: "Use Prev" },
  { routeName: "use-reducer", name: "Use Reducer" },
  { routeName: "use-script", name: "Use Script" },
  { routeName: "use-state", name: "Use State" },
  { routeName: "use-state-with-history", name: "Use State With History" },
  { routeName: "use-throttle", name: "Use Throttle" },
  { routeName: "use-timeout", name: "Use Timeout" },
  { routeName: "use-windowsize", name: "Use Windowsize" },
  { routeName: "useref", name: "Useref" },
  { routeName: "users-database", name: "Users Database" },
  { routeName: "vscode", name: "Vscode" },
  { routeName: "wordle", name: "Wordle" },
  { routeName: "pagination-2", name: "Pagination-2" },
];

export default function Page() {
  return (
    <section className="px-5">
      <h1 className="py-5 text-xl font-bold">Routes List:</h1>
      <div className="grid grid-cols-5 gap-4 pb-5">
        {routes.map((route) => {
          return (
            <Link
              className="flex items-center justify-center rounded-xl bg-amber-800 p-4 text-white hover:bg-amber-900"
              key={route.name}
              href={route.routeName}
            >
              {route.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
