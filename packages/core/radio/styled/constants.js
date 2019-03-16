import { gridSize } from '@atlaskit/theme'; // Border

export var borderWidth = 1; // 1

export var borderWidthFocus = 2; // 2
// Full size

export var fullHeight = gridSize() * 1.5; // 12

export var fullWidth = gridSize() * 1.5; // 12
// Minus border width

export var height = fullHeight - 2 * borderWidth; // 10

export var width = fullWidth - 2 * borderWidth; // 10
// Horizontal padding around icon

export var maxIconWidth = fullWidth + borderWidthFocus * 2; // 16

export var iconHorizontalPadding = (3 * width - maxIconWidth) / 2; // 7
// Size of inner circle

export var innerWidth = gridSize() / 2; // 4

export var innerHeight = gridSize() / 2; // 4