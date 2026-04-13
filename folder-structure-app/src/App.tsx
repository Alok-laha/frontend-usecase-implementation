import "./index.css";
import Folder, { type FolderProps } from "./components/Folder";
import { structure } from "./data/structure";
import { useState } from "react";
import useAddNewNode from "./hooks/add-new-node";

export default function App() {
  const [explorerData, setExplorerData] = useState<FolderProps>(structure);
  const {addNewNode} = useAddNewNode();


  const updateTree = (newNodeData: {name: string, type: {type:number}}, parentId: number) => {
    const newTree = addNewNode(explorerData, newNodeData, parentId);

    setExplorerData(newTree);
  }

  
  return (
    <div className="App">
      <Folder data={explorerData} updateTree={updateTree}/>
    </div>
  );
}
