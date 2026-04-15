import "./index.css";
import Folder, { type FolderProps } from "./components/Folder";
import { structure } from "./data/structure";
import { useState } from "react";
import useManageNodes from "./hooks/add-new-node";

export default function App() {
  const [explorerData, setExplorerData] = useState<FolderProps | null>(structure);
  const {addNewNode, renameNode, deleteNode} = useManageNodes();


  const updateTree = (newNodeData: {name: string, type: {type:number}}, parentId: number) => {
    const newTree = addNewNode(explorerData, newNodeData, parentId);

    setExplorerData(newTree ? { ...newTree } : null);
  }

  const renameTreeNode = (newName: string, nodeId: number) => {
    const newTree = renameNode(explorerData, newName, nodeId);

    setExplorerData(newTree ? { ...newTree } : null);
  }

  const deleteTreeNode = (nodeId: number) => {
    const newTree = deleteNode(explorerData, nodeId);
    setExplorerData(newTree ? { ...newTree } : null);
  }

  
  return (
    <div className="App">
      <Folder data={explorerData} updateTree={updateTree} renameTreeNode={renameTreeNode} deleteTreeNode={deleteTreeNode}/>
    </div>
  );
}
