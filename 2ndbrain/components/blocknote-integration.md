# BlockNote Integration

2ndBrain uses [BlockNote](https://www.blocknotejs.org/), a block-based rich text editor built on top of ProseMirror. 

## The Data Loader

Because BlockNote initializes its document state synchronously on mount, we must fetch the existing content from Firestore *before* rendering the editor. 

This is handled by a wrapper component that acts as a Data Loader:

```javascript
function BlockEditor({ documentId }) {
  const [initialContent, setInitialContent] = useState("loading");

  useEffect(() => {
    async function loadDocument() {
      const docRef = doc(db, 'nodes', documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().content) {
        // Parse the JSON string back into a BlockNote object array
        setInitialContent(JSON.parse(docSnap.data().content));
      } else {
        // Render a blank editor
        setInitialContent(undefined); 
      }
    }
    loadDocument();
  }, [documentId]);

  if (initialContent === "loading") {
    return <div>[ Fetching Neural Data... ]</div>;
  }

  // Once loaded, mount the actual EditorCore
  return <EditorCore initialContent={initialContent} />;
}
```

## The Debounced Save Engine

Inside `EditorCore`, every keystroke triggers `handleEditorChange`. Sending a Firestore request on every keystroke would instantly exhaust Firebase rate limits. Instead, a `useRef` timer debounces the save logic by 1000 milliseconds (1 second).

```javascript
const handleEditorChange = () => {
  // Update UI to show gray "Unsaved" dot
  onSyncStatusChange('unsaved');
  
  // Clear any pending timer
  if (debounceTimer.current) clearTimeout(debounceTimer.current);

  // Set a new 1-second timer
  debounceTimer.current = setTimeout(async () => {
    onSyncStatusChange('syncing'); // Turn dot gold
    
    // Serialize the document to a JSON string
    const currentContent = JSON.stringify(editor.document);
    const docRef = doc(db, 'nodes', documentId);
    
    // Push to Firestore
    await updateDoc(docRef, { content: currentContent });
    
    // Turn dot green
    onSyncStatusChange('saved');
  }, 1000); 
};
```

This ensures that the cloud is only hit when the user pauses typing for at least 1 second.
