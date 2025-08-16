"use client";

import { useEffect, useState } from "react";

// import { ChevronDown } from "../assets/ChevronDown";
// import { ChevronRight } from "../assets/ChevronRight";
import { getTree, TreeFile, TreeFolder } from "./api";
// import { TypeScriptLogo } from "../assets/TypeScriptLogo";
// import { JavaScriptLogo } from "../assets/JavaScriptLogo";
// import { JSONLogo } from "../assets/JSONLogo";
// import { MarkdownLogo } from "../assets/MarkdownLogo";
// import { HTMLLogo } from "../assets/HTMLLogo";
// import { CSSLogo } from "../assets/CSSLogo";
// import { DefaultFileIcon } from "../assets/DefaultFileIcon";

//intial tought is need to use recursion to loop thru the nodes
// then needed on data varaibe to hold the state for mutations
// create a function to get the api and holded the data in the state varaible
// first selectedfile have added only content, then cahnegd to whole node for getting the heading

const FileExplorer = () => {
  const [data, setData] = (useState < TreeFolder) | (null > null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = (useState < TreeFile) | (null > null);

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
    <div className="grid grid-cols-3 border border-[#FFF] border-opacity-10 h-full">
      <div className="col-span-1 border border-[#FFF] border-opacity-10 py-[20px]">
        {data?.nodes?.map((node) => {
          return (
            <File
              node={node}
              key={node?.path}
              onSelectFile={(file) => setSelectedFile(file)}
              selectedFile={selectedFile}
            />
          );
        })}
      </div>
      {selectedFile && selectedFile?.content?.length > 0 ? (
        <div className="col-span-2 p-[20px]">
          <p className="text-[32px] font-bold">
            {selectedFile.path.split("/").pop()}
          </p>
          <div className="border border-[#FFF] border-opacity-10 p-[20px] mt-[24px]">
            <pre>{selectedFile?.content}</pre>
          </div>
        </div>
      ) : (
        <div className="col-span-2 p-[20px] flex justify-center items-center">
          No file selected
        </div>
      )}
    </div>
  );
};

const File = ({ node, onSelectFile, selectedFile }) => {
  const [show, setShow] = useState(false);
  const isFolder = node.type === "folder";
  const active = selectedFile?.path === node?.path;
  // const getFileIcon = (path) => {
  //   if (path.endsWith(".tsx") || path.endsWith(".ts"))
  //     return <TypeScriptLogo />;
  //   if (path.endsWith(".js")) return <JavaScriptLogo />;
  //   if (path.endsWith(".json")) return <JSONLogo />;
  //   if (path.endsWith(".md")) return <MarkdownLogo />;
  //   if (path.endsWith(".html")) return <HTMLLogo />;
  //   if (path.endsWith(".css")) return <CSSLogo />;
  //   return <DefaultFileIcon />;
  // };

  return (
    <div
      className={`${
        isFolder && node?.nodes.length <= 0 ? "ml-0" : "ml-[12px]"
      } py-[6px]`}
    >
      <div
        className="flex items-center cursor-pointer ml-[12px]"
        onClick={() => {
          if (isFolder) {
            setShow(!show);
          } else {
            onSelectFile(node);
          }
        }}
      >
        {/* {isFolder ? (
          show ? (
            <ChevronDown />
          ) : (
            <ChevronRight />
          )
        ) : (
          getFileIcon(node.path)
        )} */}
        {/* //first i have used {node.path.slice(1)} for removing the /, then i saw
        it was coming as src/, so node.path.split("/").pop() to get the last */}
        <span className={`ml-[5px] ${active ? "text-white" : ""}`}>
          {node.path.split("/").pop()}
        </span>
      </div>
      {show &&
        isFolder &&
        node?.nodes?.map((node) => {
          return (
            <File
              node={node}
              key={node?.path}
              onSelectFile={(file) => onSelectFile(file)}
              selectedFile={selectedFile}
            />
          );
        })}
    </div>
  );
};

export default FileExplorer;
