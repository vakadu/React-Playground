"use client";

import React from "react";

const HTmlLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header
        style={{ backgroundColor: "tomato", height: 60, textAlign: "center" }}
      >
        Header
      </header>
      <div style={{ flexGrow: 1, display: "flex" }}>
        <nav style={{ width: 100, backgroundColor: "coral" }}>Navigation</nav>
        <main style={{ flex: 1, backgroundColor: "moccasin" }}>Main</main>
        <aside style={{ backgroundColor: "sandybrown", width: 100 }}>
          Sidebar
        </aside>
      </div>
      <footer
        style={{
          backgroundColor: "slategray",
          height: 60,
          textAlign: "center",
        }}
      >
        Footer
      </footer>
    </div>
  );
};

export default HTmlLayout;
