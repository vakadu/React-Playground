import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toast from "./toast";
import NavigationMenu from "./navigation-menu";
import BrowserHistory from "./browser-history";
import NotificationQueue from "./notification-queue";
import TaskMangement from "./task-mangagement";
import NestedComments from "./nested-comments";
import ReactQuery from "./react-query";
import "./cache";
import NotificationApp from "./notification-service";
import Chat from "./chat";
import Toaster from "./toaster";

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
          <Route path="/task-management" element={<TaskMangement />} />
          <Route path="/comments" element={<NestedComments />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/notifications" element={<NotificationApp />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/toaster" element={<Toaster />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
