import { useState } from "react";
import Button from "./Button";

export type FolderProps = {
    id: number;
    name: string;
    isFolder: boolean;
    items: FolderProps[];
};

const Folder = ({ data, updateTree }: { data: FolderProps; updateTree: (newNodeData: {name: string, type: {type:number}}, parentId: number) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [addNewComponent, setAddNewComponent] = useState<null | {type: number}> (null);

  const showNewComponent = (type:number) => {
    setExpanded(true);
    setAddNewComponent({type});
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

  if (data.isFolder) {
    return (
      <div>
        <span
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          📁 {data.name}
        </span>
        <Button text="Folder +" onClick={showNewComponent} type={1}/>
        <Button text="File +" onClick={showNewComponent} type={2}/>
        
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
              <Folder key={exp.id} data={exp} updateTree={updateTree} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return <div>📄 {data.name}</div>;
  }
};

export default Folder;
