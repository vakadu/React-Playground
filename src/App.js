import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toast from "./toast";
import NavigationMenu from "./navigation-menu";
import BrowserHistory from "./browser-history";
import NotificationQueue from "./notification-queue";

const Accordian = lazy(() => import("./accordian"));
const Carousel = lazy(() => import("./carousel"));
const Checkboxes = lazy(() => import("./checkboxes"));
const CheckboxesNested = lazy(() => import("./checkboxes-nested"));
const Clock = lazy(() => import("./clock"));
const CodeSplit = lazy(() => import("./code-splitting"));
const DataTables = lazy(() => import("./data-tables"));
const FileExplorer = lazy(() => import("./file-explorer"));
const UseCallback = lazy(() => import("./use-callback"));
const UseLayoutEffect = lazy(() => import("./use-layouteffect"));
const SearchableDropdown = lazy(() => import("./searchable-dropdown"));
const Wordle = lazy(() => import("./wordle"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Router>
        <Routes>
          <Route path="/accordian" element={<Accordian />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/checkboxes" element={<Checkboxes />} />
          <Route path="/checkboxes-nested" element={<CheckboxesNested />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/code-splitting" element={<CodeSplit />} />
          <Route path="/data-tables" element={<DataTables />} />
          <Route path="/file-explorer" element={<FileExplorer />} />
          <Route path="/use-callback" element={<UseCallback />} />
          <Route path="/use-layouteffect" element={<UseLayoutEffect />} />
          <Route path="/searchable-dropdown" element={<SearchableDropdown />} />
          <Route path="/wordle" element={<Wordle />} />
          <Route path="/toast" element={<Toast />} />
          <Route path="/navigation-menu" element={<NavigationMenu />} />
          <Route path="/history" element={<BrowserHistory />} />
          <Route path="/notification-queue" element={<NotificationQueue />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
