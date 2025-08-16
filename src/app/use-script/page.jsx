"use client";

import { useState, useEffect } from 'react';

function useScript(src) {
  const [state, setState] = useState({
    loading: true,
    error: false,
    ready: false,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // Event listeners for script loading success or failure
    script.onload = () => setState({ loading: false, error: false, ready: true });
    script.onerror = () => setState({ loading: false, error: true, ready: false });

    // Append the script to the document
    document.body.appendChild(script);

    // Cleanup on unmount or when the script source changes
    return () => {
      document.body.removeChild(script);
    };
  }, [src]); // Re-run effect when the source changes

  return state; // Return the loading, error, and ready states
}

function ExternalScriptComponent() {
  const { loading, error, ready } = useScript('https://example.com/some-external-script.js');

  useEffect(() => {
    if (ready) {
      // Perform some actions once the script is ready
      console.log('Script loaded successfully');
    }

    if (error) {
      console.error('There was an error loading the script');
    }
  }, [ready, error]);

  if (loading) {
    return <div>Loading script...</div>;
  }

  return (
    <div>
      <h1>External Script Loaded</h1>
      {/* Your component content */}
    </div>
  );
}

export default ExternalScriptComponent;
