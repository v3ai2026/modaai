# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-06

### Added

#### @v3ai/ui-core
- Initial release of core package
- AI clients (GeminiClient, OpenAIClient)
- Storage utilities (localStorage, sessionStorage, IndexedDB)
- HTTP client with timeout and error handling
- Color and size constants
- Full TypeScript support

#### @v3ai/ui-react
- Initial release of React package
- 40+ SVG icon components (Sparkles, Database, Code, Settings, etc.)
- Animation system (Motion component, useAnimation hook, transitions)
- UI components (Button, Dialog)
- React hooks (useLocalStorage, useDebounce, useMediaQuery, useClickOutside, useToggle)
- Utility functions (cn, formatBytes, formatNumber, formatRelativeTime)
- Full TypeScript support
- CSS modules for styling
- Tree-shaking support

#### Examples
- React demo application showcasing all components

#### Infrastructure
- Monorepo setup with pnpm workspaces
- Turborepo for build orchestration
- GitHub Actions for CI/CD
- TypeScript configuration
- Build scripts

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- Zero external dependencies to minimize supply chain risks
- Type-safe API design
