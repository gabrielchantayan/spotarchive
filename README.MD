# Spotify Playlist Archiver

## Microservice Architecture
```
  App     Chronjob
   ↓          ↓
  User     Spotify
   ↓↑        ↓ ↑
Core Functionality
```

**App** The application

**User** User authentication service and friend service

**Core** The core functionality of the app, recommendations, playlist saving, ect

**Spotify** Service that interacts directly with Spotify