# Water Tracker Mobile App

Basic mobile app I built using React Native + Expo. Tracks daily water intake, saves hydration logs, and lets you set a custom daily goal.

### Features
- **Home Screen**: Log water in 8oz increments, see your progress visually. Reset when needed.
- **History Tab**: Shows a timeline of water intake logs with timestamps.
- **Settings Tab**: Set your daily water intake goal in oz (default is 64). Stored with AsyncStorage so it’s saved between sessions.

Data is persisted locally using AsyncStorage — no backend. Just wanted a simple tracker I could use and demo.
