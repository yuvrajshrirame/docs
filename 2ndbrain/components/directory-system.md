# Directory System (Folder CRUD)

While 2ndBrain focuses on graph networks, it retains a lightweight folder system for high-level organization (e.g., "Projects", "Archive"). 

## Folder State

Folders are stored in a dedicated `folders` Firestore collection. 

```javascript
// Active filter state
const [activeFolder, setActiveFolder] = useState('all'); 
```

When `activeFolder` is set to `'all'`, the Cloud Nodes panel renders every document. When set to a specific folder ID, it filters the array:

```javascript
const displayedNodes = graphData.nodes.filter(n => {
  if (activeFolder === 'all') return true;
  return n.folder === activeFolder;
});
```

## Creating & Renaming Folders

Folders feature inline editing. When the user clicks the `+` button in the directory header, an inline input appears, managed by Framer Motion's `<AnimatePresence>` for smooth expansion.

### Creation Logic
If the user blurs the input or presses Enter, the string is trimmed and pushed to the cloud:
```javascript
const handleCreateFolder = async () => {
  if (!newFolderName.trim()) return;
  
  await addDoc(collection(db, 'folders'), {
    name: newFolderName.trim(),
    createdAt: Date.now(),
    userId: user.uid
  });
};
```

### Ellipsis Context Menu
Each folder has a three-dot `EllipsisIcon`. Clicking it toggles `openFolderMenuId`. Because the menus could be clipped by the sidebar's `overflow: hidden`, the active folder dynamically changes to `overflow: visible` and `zIndex: 10` when its menu is open.

## Orphan-Safe Deletion

The most critical architectural decision regarding folders is that **deleting a folder does not delete its contents**.

When a folder is deleted, we intercept the command and run a migration script on all nodes inside that folder, setting their `folder` reference to `null` (which drops them back into the universal "Unassigned" pool).

```javascript
const orphanedNodes = graphData.nodes.filter(n => n.folder === folderId);

for (const node of orphanedNodes) {
  await updateDoc(doc(db, 'nodes', node.id), { folder: null });
}

await deleteDoc(doc(db, 'folders', folderId));
```
This guarantees zero data loss if a user decides to restructure their vault topology.
