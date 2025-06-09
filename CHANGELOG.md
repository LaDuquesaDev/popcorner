# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2025-06-09
### Added
- Watchlist functionality allowing users to save and manage favorite movies
- WatchlistScreen with movie grid display and empty state handling
- Zustand store with AsyncStorage persistence for watchlist state management
- WatchlistStack navigator enabling navigation to MovieDetails from Watchlist
- Navigation type definitions for both Home and Watchlist stacks
- Bookmark icon integration in bottom tab navigator

### Changed
- Updated navigation structure to support MovieDetails access from both Home and Watchlist
- Modified MovieDetailsScreen to work with multiple navigation stacks
- Enhanced header display consistency across all navigation stacks

### Fixed
- Navigation errors when accessing MovieDetails from Watchlist screen
- Missing back button in MovieDetails when navigated from Watchlist

## [0.3.0] - 2025-06-08
### Added
- Implemented movie filtering feature on Home screen.
- Persisted search filter in AsyncStorage to maintain state after app restart.

## [0.2.0] - 2025-06-07
### Added
- Navigation to a new `MovieDetails` screen for viewing movie information.

## [0.1.0] - 2025-06-06
### Added
- Initial project structure with React Native and TypeScript.
- `src/` folder created with base folders: `components`, `screens`, `hooks`, `navigation`.
- `App.tsx` moved to `src/` and connected in `index.js`.
- Movies displayed on Home using TMDB API.
- Movie types for API response.
- Responsive styles implemented using pixel helpers (`pixelVertical`, `pixelHorizontal`, `pixelModerado`).
- Styles applied to `MovieCard` component and `Home` screen layout.