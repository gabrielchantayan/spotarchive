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

**User** (:22302) User authentication service and friend service

**Core** (:22301) The core functionality of the app, recommendations, playlist saving, ect

**Spotify** (:22303) Service that interacts directly with Spotify