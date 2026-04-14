import type {FolderProps} from '../components/Folder';

// hook to add new folder or file to the structure tree
const useManageNodes = () => {
    function addNewNode(tree: FolderProps, newNode: {name: string, type: {type:number}}, parentId: number) {
        
        // Check if this is adding to the current element
        if(parentId === tree.id && tree.isFolder){
            const payload = {
                id: Date.now(),
                name: newNode.name,
                isFolder: newNode.type.type === 1 ? true : false,
                items: []
            }
            tree.items.unshift(payload);
        }

        // If not, traverse the tree recursively
        if(tree.items && tree.items.length > 0){
            tree.items.forEach(item => addNewNode(item, newNode, parentId));
        }
        return tree;
    }

    function renameNode(tree: FolderProps, newName: string, nodeId: number) {
        // We take the id of the node and then we check if the current id is matching
        if(tree.id === nodeId) {
            tree.name = newName;
        } else {
            if(tree.items && tree.items.length > 0)
                tree.items.forEach(item=>renameNode(item, newName, nodeId));
        }
        return tree;
    }

    function deleteNode() {

    }
    return {addNewNode, renameNode, deleteNode};
}

export default useManageNodes;