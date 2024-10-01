import { lazy, Suspense, useState } from "react";
import ErrorBoundary from "./error-boundary";

const CodeSplittingAbout = lazy(() => import("./about"));
const CodeSplittingContact = lazy(() => import("./contact"));

export default function CodeSplitting() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div onClick={() => setShow(!show)}>show</div>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary>
          <CodeSplittingAbout />
        </ErrorBoundary>
      </Suspense>
      {show && (
        <Suspense fallback={<p>Loading...</p>}>
          <ErrorBoundary>
            <CodeSplittingContact />
          </ErrorBoundary>
        </Suspense>
      )}
    </div>
  );
}
