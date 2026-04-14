import { useState } from "react";
import Button from "./Button";

export type FolderProps = {
    id: number;
    name: string;
    isFolder: boolean;
    items: FolderProps[];
};

const Folder = ({ data, updateTree, renameTreeNode }: { data: FolderProps; updateTree: (newNodeData: {name: string, type: {type:number}}, parentId: number) => void; renameTreeNode: (newName: string, nodeId: number) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [addNewComponent, setAddNewComponent] = useState<null | {type: number}> (null);
  const [renameComponent, setRenameComponent] = useState<null | {nodeId: number, newName: string}> (null);

  const showNewComponent = (type:number) => {
    if(type === 1 || type === 2){
      setExpanded(true);
      setAddNewComponent({type});
    } else {
      handleRename(type);
    }
  }

  const handleInputBlur = () => {
    setAddNewComponent(null);
  };

  const addNewComponentHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Logic to add new folder or file based on addNewComponent.type
      updateTree({name: e.currentTarget.value, type: addNewComponent!}, data.id);
      setAddNewComponent(null);
    }
  }

  const handleRename = (nodeId: number) => {
    setRenameComponent({nodeId, newName: data.name});
  };

  const handleRenameInputBlur = () => {
    setRenameComponent(null);
  };

  const renameComponentHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      renameTreeNode(e.currentTarget.value, data.id);
      setRenameComponent(null);
    }
  }

  if (data.isFolder) {
    return (
      <div>
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {
           renameComponent ? (
            <span style={{display: 'block', paddingLeft: "20px"}}>
              <input 
              name="rename_component" 
              type="text" 
              placeholder="Enter name" 
              autoFocus={true} 
              onBlur={handleRenameInputBlur}
              onKeyDown={renameComponentHandler}
              />  
            </span>
          ) : (
            <span>📁 {data.name}</span>
          )
        }
        </span>
        {renameComponent === null && (
          <>
            <Button text="Folder +" onClick={showNewComponent} type={1}/>
            <Button text="File +" onClick={showNewComponent} type={2}/>
            <Button text="Rename" onClick={showNewComponent} type={data.id} />
            {/* Delete basically deletes the node itself along with it's child */}
            <Button text="Delete" onClick={showNewComponent} type={data.id} />
          </>
        )}
        
        {
          addNewComponent && (
            <span style={{display: 'block', paddingLeft: "20px"}}>
              {addNewComponent?.type === 1 ? '📁' : '📄'}
              <input 
              name="new_component" 
              type="text" 
              placeholder="Enter name" 
              autoFocus={true} 
              onBlur={handleInputBlur}
              onKeyDown={addNewComponentHandler}
              />  
            </span>
          )
        }
        {expanded && (
          <div style={{ paddingLeft: "20px" }}>
            {data.items?.map((exp) => (
              <Folder key={exp.id} data={exp} updateTree={updateTree} renameTreeNode={renameTreeNode} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return <div>
      📄 {data.name}
        <Button text="Rename" onClick={showNewComponent} type={data.id} />
        {/* Delete basically deletes the node itself along with it's child */}
        <Button text="Delete" onClick={showNewComponent} type={data.id} />
    </div>;
  }
};

export default Folder;
