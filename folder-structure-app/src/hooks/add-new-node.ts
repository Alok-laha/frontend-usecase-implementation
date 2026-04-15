import type {FolderProps} from '../components/Folder';

// hook to add new folder or file to the structure tree
const useManageNodes = () => {
    function addNewNode(tree: FolderProps | null, newNode: {name: string, type: {type:number}}, parentId: number) {
        if(tree === null) return null;
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

    function renameNode(tree: FolderProps | null, newName: string, nodeId: number) {
        if(tree === null) return null;
        // We take the id of the node and then we check if the current id is matching
        if(tree.id === nodeId) {
            tree.name = newName;
        } else {
            if(tree.items && tree.items.length > 0)
                tree.items.forEach(item=>renameNode(item, newName, nodeId));
        }
        return tree;
    }

    function deleteNode(tree: FolderProps | null, nodeId: number): FolderProps | null {
        if(tree === null) return null;
        // If the current node matches, remove it (and its subtree) by returning null
        if (tree.id === nodeId) return null;

        // Otherwise recurse into children and keep only those that remain
        if (tree.items && tree.items.length > 0) {
            const remaining: FolderProps[] = [];
            for (const item of tree.items) {
                const kept = deleteNode(item, nodeId);
                if (kept !== null) remaining.push(kept);
            }
            tree.items = remaining;
        }
        return tree;
    }
    return {addNewNode, renameNode, deleteNode};
}

export default useManageNodes;