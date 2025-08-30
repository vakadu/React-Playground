const TREE = {
  type: "folder",
  path: "/",
  nodes: [
    {
      type: "folder",
      path: "/PROJECT 1",
      nodes: [
        {
          type: "folder",
          path: "/project1/public",
          nodes: [
            {
              type: "file",
              path: "/project1/public/index.html",
              content: `<html>
  <body>
    <div>Hello world!</div>
  </body>
</html>
`,
            },
          ],
        },
        {
          type: "folder",
          path: "/project1/src",
          nodes: [
            {
              type: "folder",
              path: "/project1/src/api",
              nodes: [
                {
                  type: "file",
                  path: "/project1/src/api/getTree.ts",
                  content: "export const TREE = {};",
                },
              ],
            },

            {
              type: "file",
              path: "/project1/src/App.tsx",
              content: "export default App = () => <div>hello</div>",
            },
            {
              type: "file",
              path: "/project1/src/index.tsx",
              content: `const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
            },
            {
              type: "file",
              path: "/project1/src/styles.css",
              content: `html,
body {
  background: #111111;
  color: #eeeeee;
}
`,
            },
          ],
        },

        {
          type: "file",
          path: "/project1/package.json",
          content: `{
  "name": "@my/project1",
  "version": "1.0.0",
}
`,
        },
        {
          type: "file",
          path: "/project1/README.md",
          content: `# Hello world`,
        },
        {
          type: "file",
          path: "/project1/tsconfig.json",
          content: `{
  include: ["./src/**/*"],
  compilerOptions: {
    jsx: "react-jsx",
  },
}
`,
        },
        {
          type: "file",
          path: "/project1/babel.config.js",
          content: `{
  something: "something",
}
`,
        },
        {
          type: "file",
          path: "/project1/temp.txt",
          content: `Just some plain text
`,
        },
      ],
    },
    {
      type: "folder",
      path: "/PROJECT 2",
      nodes: [
        {
          type: "folder",
          path: "/project2/public",
          nodes: [
            {
              type: "file",
              path: "/project2/public/index.html",
              content: `<html>
  <body>
    <div>Hello world!</div>
  </body>
</html>
`,
            },
          ],
        },
        {
          type: "folder",
          path: "/project2/src",
          nodes: [
            {
              type: "folder",
              path: "/project2/src/api",
              nodes: [
                {
                  type: "file",
                  path: "/project2/src/api/getTree.ts",
                  content: "export const TREE = {};",
                },
              ],
            },

            {
              type: "file",
              path: "/project2/src/App.tsx",
              content: "export default App = () => <div>hello</div>",
            },
            {
              type: "file",
              path: "/project2/src/index.tsx",
              content: `const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
            },
            {
              type: "file",
              path: "/project2/src/styles.css",
              content: `html,
body {
  background: #111111;
  color: #eeeeee;
}
`,
            },
          ],
        },

        {
          type: "file",
          path: "/project2/package.json",
          content: `{
  "name": "@my/project2",
  "version": "1.0.0",
}
`,
        },
        {
          type: "file",
          path: "/project2/README.md",
          content: `# Hello world`,
        },
        {
          type: "file",
          path: "/project2/tsconfig.json",
          content: `{
  include: ["./src/**/*"],
  compilerOptions: {
    jsx: "react-jsx",
  },
}
`,
        },
        {
          type: "file",
          path: "/project2/babel.config.js",
          content: `{
  something: "something",
}
`,
        },
        {
          type: "file",
          path: "/project2/temp.txt",
          content: `Just some plain text
`,
        },
      ],
    },
  ],
};

export const getTree = async () => {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(JSON.stringify(TREE), {
          headers: {
            "content-type": "application/json",
          },
        })
      );
    }, 600);
  });
};
