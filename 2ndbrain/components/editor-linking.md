# Bi-Directional Linking (`@` Mentions)

The core mechanic of 2ndBrain is the ability to seamlessly connect thoughts as you type. This is handled by a custom integration of BlockNote's `SuggestionMenuController`.

## The `@` Trigger Menu

When the user types `@` in the editor, BlockNote fires an async `getItems` function that receives the user's query string.

### Filtering Existing Nodes
First, we filter the master array of Firestore nodes based on the query, excluding the document currently being edited (to prevent a node from linking to itself):

```javascript
const getMentionItems = async (query) => {
  const filteredNodes = nodes.filter(node => 
    node.name.toLowerCase().includes(query.toLowerCase()) && 
    node.id !== documentId
  );
  // ...
```

### Rendering the Menu Items
We map the filtered nodes into BlockNote's expected item format. When an item is clicked, two things happen simultaneously:

1. **Inline Insertion:** A yellow-styled text block (representing the WikiLink) is inserted directly into the cursor position.
2. **Database Write:** A new link document is pushed to the `/links` Firestore collection connecting the current `documentId` and the target `node.id`.

```javascript
const items = filteredNodes.map((node) => ({
  title: `Link to: ${node.name}`,
  onItemClick: () => {
    // 1. Insert Visual Block
    editor.insertInlineContent([
      {
        type: "text",
        text: `[[${node.name}]]`,
        styles: { textColor: "yellow" } 
      },
      { type: "text", text: " ", styles: {} }
    ]);
    
    // 2. Create Graph Connection
    onAddLink(documentId, node.id);
  },
}));
```

## Inline Node Creation

If the user searches for a concept that *does not exist* in their vault yet, we want to allow them to create it instantly without breaking their flow state.

If the `query` length is > 0 and no exact match is found, we inject a custom `+ Create new node` button at the bottom of the `@` dropdown:

```javascript
const exactMatch = nodes.some(n => n.name.toLowerCase() === query.toLowerCase());

if (query.trim().length > 0 && !exactMatch) {
  items.push({
    title: `+ Create new node: "${query}"`,
    onItemClick: async () => {
      onSyncStatusChange('syncing');
      
      // A. Create the actual node in Firestore
      const newNodeRef = await addDoc(collection(db, 'nodes'), { 
        name: query, 
        content: '',
        val: 3, 
        createdAt: Date.now(),
        userId: user.uid
      });

      // B. Insert visual text
      editor.insertInlineContent([
         // ... inserting [[query]] text block
      ]);

      // C. Connect the current node to the NEW node
      onAddLink(documentId, newNodeRef.id);
      
      onSyncStatusChange('saved');
    }
  });
}
```

This single click executes three separate operations (creating a node, injecting UI blocks, forming a database link), ensuring a true "zero-friction" workflow.
