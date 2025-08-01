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
import UseEffct from "./use-effect";
import { BigBazar } from "./big-bazar-counter";
import FormBuilder from "./form-builder";
import JsonDiff from "./json-diff";
import Cms from "./cms";
import RecursiveTree from "./recursive-tree-editable";
import CheckboxNested from "./checkboxes-nested";
import FormRenderer from "./form-renderer";
import JsonBuilder from "./json-builder";
import TreeSearchExpandable from "./tree-search-with-highlight";
import MultiSelectDropdown from "./multi-select-dropdown";
import UndoRedo from "./undo-redo";
import SoonerToaster from "./sooner-toast";
import ReactSwr from "./react-query-2";
import AppRedux from "./reduxs";
import DebounceThrottleDemo from "./debounce-throttle";
import AUtoComplete from "./auto-complete";
import Vscode from "./vscode";
import DevTools from "./devtools";
import FormBuilder2 from "./form-builder-2";
import { FetchHook } from "./use-fetch";
import { DebounceFunction } from "./debounce";
import ThrottleFunc from "./use-throttle";
import WindowSize from "./use-windowsize";
import FormBuilder3 from "./form-builder-3";
import UseIntersectionObserver from "./intersection-observer";
import FormBuilder4 from "./form-builder-4";
import CustomUseEffect from "./use-effect-2";
import ReusableGrid from "./reusable-grid";
import MultiCellSelection from "./multi-cell-selection";
import UseClickOutside from "./use-clickoutside";
import UseTimeout from "./use-timeout";
import UseStateWithHistory from "./use-state-with-history";
import ExternalScriptComponent from "./use-script";
import { CustomUseState } from "./use-state";
import GridNavigation from "./grid-navigation";
import { Riders } from "./riders";
import TodoList from "./to-do-list";
import IndexDB from "./indexdb";
import TicTacToe from "./tic-tac-toe";

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
const MarkleeTree = lazy(() => import("./marklee-tree"));

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
          <Route path="/marklee-tree" element={<MarkleeTree />} />
          <Route path="/use-effect" element={<UseEffct />} />
          <Route path="/big-bazar" element={<BigBazar />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/json-diff" element={<JsonDiff />} />
          <Route path="/cms" element={<Cms />} />
          <Route path="/recursive-tree" element={<RecursiveTree />} />
          <Route path="/checkboxes-nested" element={<CheckboxNested />} />
          <Route path="/form-renderer" element={<FormRenderer />} />
          <Route path="/json-builder" element={<JsonBuilder />} />
          <Route
            path="/tree-search-expandable"
            element={<TreeSearchExpandable />}
          />
          <Route
            path="/multi-select-dropdown"
            element={<MultiSelectDropdown />}
          />
          <Route path="/undo-redo" element={<UndoRedo />} />
          <Route path="/sooner" element={<SoonerToaster />} />
          <Route path="/react-swr" element={<ReactSwr />} />
          <Route path="/app-redux" element={<AppRedux />} />
          <Route path="/debounce-throttle" element={<DebounceThrottleDemo />} />
          <Route path="/auto-complete" element={<AUtoComplete />} />
          <Route path="/vscode" element={<Vscode />} />
          <Route path="/devtools" element={<DevTools />} />
          <Route path="/form-builder2" element={<FormBuilder2 />} />
          <Route path="/use-fetch" element={<FetchHook />} />
          <Route path="/use-debounce" element={<DebounceFunction />} />
          <Route path="/use-throttle" element={<ThrottleFunc />} />
          <Route path="/use-windowsize" element={<WindowSize />} />
          <Route path="/form-builder3" element={<FormBuilder3 />} />
          <Route path="/form-builder4" element={<FormBuilder4 />} />
          <Route
            path="/intersection-observer"
            element={<UseIntersectionObserver />}
          />
          <Route path="/use-effect2" element={<CustomUseEffect />} />
          <Route path="/reusable-grid" element={<ReusableGrid />} />
          <Route path="/multicell-grid" element={<MultiCellSelection />} />
          <Route path="/click-outside" element={<UseClickOutside />} />
          <Route path="/use-timeout" element={<UseTimeout />} />
          <Route
            path="/use-state-with-history"
            element={<UseStateWithHistory />}
          />
          <Route path="/use-script" element={<ExternalScriptComponent />} />
          <Route path="/use-state" element={<CustomUseState />} />
          <Route path="/grid-navigation" element={<GridNavigation />} />
          <Route path="/riders" element={<Riders />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/indexdb" element={<IndexDB />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
