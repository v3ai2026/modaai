# Contributing to V3 AI UI

Thank you for your interest in contributing to V3 AI UI! 🎉

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 9+

### Getting Started

1. Fork and clone the repository:
```bash
git clone https://github.com/v3ai2026/modaai.git
cd modaai
```

2. Install dependencies:
```bash
pnpm install
```

3. Build all packages:
```bash
pnpm lib:build
```

4. Run the demo:
```bash
cd examples/react-demo
pnpm dev
```

## Project Structure

```
modaai/
├── packages/
│   ├── core/          # Framework-agnostic utilities
│   └── react/         # React components
├── examples/
│   └── react-demo/    # Demo application
└── scripts/           # Build and utility scripts
```

## Development Workflow

### Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes in the appropriate package

3. Build and test:
```bash
pnpm lib:build
```

4. Run the demo to verify:
```bash
cd examples/react-demo
pnpm dev
```

### Adding New Icons

To add new icons, edit `scripts/generate-icons.js` and add your icon definition:

```javascript
const icons = {
  YourIcon: '<path d="..."/>',
  // ...existing icons
};
```

Then run:
```bash
node scripts/generate-icons.js
```

### Adding New Components

1. Create a new directory in `packages/react/src/components/YourComponent/`
2. Add the component files:
   - `YourComponent.tsx`
   - `YourComponent.module.css` (if needed)
   - `index.ts`
3. Export from `packages/react/src/components/index.ts`
4. Update documentation

## Code Style

- Use TypeScript for all code
- Follow existing code patterns
- Add TypeScript types for all props
- Use meaningful variable names
- Comment complex logic

## Testing

Currently, the project uses manual testing via the demo application. We plan to add automated tests in the future.

## Commit Messages

Use clear and descriptive commit messages:

```
Add new Icon component
Fix button hover state
Update documentation for Dialog
```

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md with your changes
3. The PR will be merged once you have approval from maintainers

## Questions?

Feel free to open an issue or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
