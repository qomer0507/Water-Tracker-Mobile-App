# Water Tracker Mobile App

Basic mobile app I built using React Native + Expo. Tracks daily water intake, saves hydration logs, and lets you set a custom daily goal.
<img width="300" height="650" alt="IMG_0533" src="https://github.com/user-attachments/assets/74fd8c1f-f2ef-4964-8f5b-dffc08e7f0ee" />
<img width="300" height="650" alt="IMG_0534" src="https://github.com/user-attachments/assets/709d2a6f-8d29-4e6e-b6f1-625af8bfd044" />
<img width="300" height="650" alt="IMG_0535" src="https://github.com/user-attachments/assets/b73dc571-4415-4464-8db7-c4038a96fed3" />

### Features
- **Home Screen**: Log water in 8oz increments, see your progress visually. Reset when needed.
- **History Tab**: Shows a timeline of water intake logs with timestamps.
- **Settings Tab**: Set your daily water intake goal in oz (default is 64). Stored with AsyncStorage so it’s saved between sessions.

Data is persisted locally using AsyncStorage — no backend. Just wanted a simple tracker I could use and demo.
