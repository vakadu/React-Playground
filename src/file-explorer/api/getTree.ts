export type TreeFile = {
  type: "file";
  path: string;
  content: string;
};
export type TreeFolder = {
  type: "folder";
  path: string;
  nodes: (TreeFile | TreeFolder)[];
};

const TREE: TreeFolder = {
  type: "folder",
  path: "/",
  nodes: [
    {
      type: "folder",
      path: "/public",
      nodes: [
        {
          type: "file",
          path: "/public/index.html",
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
      path: "/src",
      nodes: [
        {
          type: "folder",
          path: "/src/api",
          nodes: [
            {
              type: "file",
              path: "/src/api/getTree.ts",
              content: "export const TREE = {};",
            },
          ],
        },

        {
          type: "file",
          path: "/src/App.tsx",
          content: "export default App = () => <div>hello</div>",
        },
        {
          type: "file",
          path: "/src/index.tsx",
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
          path: "/src/styles.css",
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
      path: "/package.json",
      content: `{
  "name": "@my/package",
  "version": "1.0.0",
}
`,
    },
    {
      type: "file",
      path: "/README.md",
      content: `# Hello world`,
    },
    {
      type: "file",
      path: "/tsconfig.json",
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
      path: "/babel.config.js",
      content: `{
  something: "something",
}
`,
    },
    {
      type: "file",
      path: "/temp.txt",
      content: `Just some plain text
`,
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
