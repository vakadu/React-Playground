import { useEffect, useState } from "react";

import { ChevronDown } from "../assets/ChevronDown";
import { ChevronRight } from "../assets/ChevronRight";
import { getTree, TreeFile, TreeFolder } from "../api/getTree";
import { TypeScriptLogo } from "../assets/TypeScriptLogo";
import { JavaScriptLogo } from "../assets/JavaScriptLogo";
import { JSONLogo } from "../assets/JSONLogo";
import { MarkdownLogo } from "../assets/MarkdownLogo";
import { HTMLLogo } from "../assets/HTMLLogo";
import { CSSLogo } from "../assets/CSSLogo";
import { DefaultFileIcon } from "../assets/DefaultFileIcon";

//intial tought is need to use recursion to loop thru the nodes
// then needed on data varaibe to hold the state for mutations
// create a function to get the api and holded the data in the state varaible
// first selectedfile have added only content, then cahnegd to whole node for getting the heading

const FileExplorer = () => {
  const [data, setData] = useState<TreeFolder | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<TreeFile | null>(null);

  useEffect(() => {
    getTreeData();
  }, []);

  const getTreeData = async () => {
    setLoading(true);
    try {
      const response = await getTree();
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300, border: "1px solid #FFF" }}>
        {data?.nodes?.map((node) => {
          return (
            <File
              node={node}
              key={node?.path}
              onSelectFile={(file) => setSelectedFile(file)}
            />
          );
        })}
      </div>
      {selectedFile && selectedFile?.content?.length > 0 && (
        <div style={{ flex: 1, padding: 20 }}>
          <p>{selectedFile.path.split("/").pop()}</p>
          <pre>{selectedFile?.content}</pre>
        </div>
      )}
    </div>
  );
};

const File = ({
  node,
  onSelectFile,
}: {
  node: TreeFile | TreeFolder;
  onSelectFile: (node: TreeFile) => void;
}) => {
  const [show, setShow] = useState(false);
  const isFolder = node.type === "folder";

  const getFileIcon = (path: string) => {
    if (path.endsWith(".tsx") || path.endsWith(".ts"))
      return <TypeScriptLogo />;
    if (path.endsWith(".js")) return <JavaScriptLogo />;
    if (path.endsWith(".json")) return <JSONLogo />;
    if (path.endsWith(".md")) return <MarkdownLogo />;
    if (path.endsWith(".html")) return <HTMLLogo />;
    if (path.endsWith(".css")) return <CSSLogo />;
    return <DefaultFileIcon />;
  };
  //   console.log(node.path.split("/").pop());

  return (
    <div style={{ marginLeft: isFolder ? "0" : "20px" }}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => {
          if (isFolder) {
            setShow(!show);
          } else {
            onSelectFile(node);
          }
        }}
      >
        {isFolder ? (
          show ? (
            <ChevronDown />
          ) : (
            <ChevronRight />
          )
        ) : (
          getFileIcon(node.path)
        )}
        {/* //first i have used {node.path.slice(1)} for removing the /, then i saw
        it was coming as src/, so node.path.split("/").pop() to get the last */}
        <span style={{ marginLeft: "5px" }}>{node.path.split("/").pop()}</span>
      </div>
      {show &&
        isFolder &&
        node?.nodes?.map((node) => {
          return (
            <File
              node={node}
              key={node?.path}
              onSelectFile={(file) => onSelectFile(file)}
            />
          );
        })}
    </div>
  );
};

export default FileExplorer;
