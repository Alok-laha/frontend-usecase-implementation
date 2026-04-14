import "./index.css";
import Folder, { type FolderProps } from "./components/Folder";
import { structure } from "./data/structure";
import { useState } from "react";
import useManageNodes from "./hooks/add-new-node";

export default function App() {
  const [explorerData, setExplorerData] = useState<FolderProps>(structure);
  const {addNewNode, renameNode} = useManageNodes();


  const updateTree = (newNodeData: {name: string, type: {type:number}}, parentId: number) => {
    const newTree = addNewNode(explorerData, newNodeData, parentId);

    setExplorerData(newTree);
  }

  const renameTreeNode = (newName: string, nodeId: number) => {
    const newTree = renameNode(explorerData, newName, nodeId);

    setExplorerData(newTree);
  }

  
  return (
    <div className="App">
      <Folder data={explorerData} updateTree={updateTree} renameTreeNode={renameTreeNode}/>
    </div>
  );
}
