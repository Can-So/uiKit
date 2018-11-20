### Remove peeking behaviour

- `peek`, `unpeek`, `togglePeek`, `peekHint`, `unPeekHint`, and `togglePeekHint` methods removed from `UIController`
- `isPeeking` and `isPeekHinting` properties removed from `UIController.state`
- `initialPeekViewId` removed as constructor parameter to `ViewController` and as prop to `NavigationProvider`
- `setInitialPeekViewId` method removed from `ViewController`
- `activePeekView` and `incomingPeekView` properties removed from `ViewController.state`
- `PeekToggleItem` removed as an exported component
