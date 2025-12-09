# VibeNest Navigation Structure

## 📍 Content Organization

### **DISCOVER** (Public Content - Browse & Explore)

#### 1. **Boards** (`/moodboards`) - Pinterest-Style 🎨
- **Type**: Visual Discovery with Music
- **Content**: Images in masonry grid layout
- **Interaction**: Click image → plays related music
- **Features**:
  - Mood-based filtering (Chill, Energetic, Focus, Nature, Party, Romantic)
  - Pinterest-style infinite scroll
  - Hover effects with play/heart/add buttons
  - Each image triggers music playback
- **Badge**: "Pinterest" to indicate visual discovery

#### 2. **Music** (`/music`) 🎵
- **Type**: Music Streaming
- **Content**: Music tracks from Pixabay
- **Layout**: Grid of album covers
- **Features**:
  - Play/pause on click
  - Album art or gradient covers
  - Trending music discovery

#### 3. **Podcasts** (`/podcasts`) 🎙️
- **Type**: Podcast Platform
- **Content**: Podcasts from iTunes/Apple
- **Layout**: Grid of podcast artwork
- **Features**:
  - RSS feed parsing
  - Latest episode playback
  - Podcast artwork display

#### 4. **Audiobooks** (`/audiobooks`) 📚
- **Type**: Audiobook Library
- **Content**: Audiobooks from LibriVox
- **Layout**: Grid of book covers
- **Features**:
  - Classic literature
  - Chapter-by-chapter playback
  - Author information

#### 5. **Other Discovery Pages**:
- **Home** (`/`): Overview with all content types
- **Discover** (`/discover`): Tabbed search (Music/Podcasts/Visuals)
- **Calm** (`/calm-sounds`): Ambient sounds for focus/sleep
- **Moods** (`/moods`): Instant mood-based mixes

---

### **MY LIBRARY** (Personal Content - Your Collection)

#### 1. **Favorites** (`/favorites`) ❤️
- **Purpose**: Saved/liked content
- **Content**: User's favorited tracks, podcasts, boards
- **Features**:
  - Heart icon to add items
  - Mixed content types
  - Quick access to loved content

#### 2. **Recent** (`/recent`) 🕐
- **Purpose**: Listening history
- **Content**: Recently played items
- **Features**:
  - Chronological order
  - All content types mixed
  - Resume where you left off

#### 3. **Playlists** (`/playlists`) 🎧
- **Purpose**: Custom collections
- **Content**: User-created playlists
- **Features**:
  - Create custom playlists
  - Mix music, podcasts, sounds
  - Organize by mood/activity

---

## 🎯 Quick Reference

### Pinterest-Like Section:
**→ Boards** (`/moodboards`)
- Masonry grid of images
- Click image = play music
- Visual-first discovery

### Music Content:
**→ Music** (`/music`) - Music tracks
**→ Moods** (`/moods`) - Mood-based mixes
**→ Calm** (`/calm-sounds`) - Ambient sounds

### Podcast Content:
**→ Podcasts** (`/podcasts`) - Podcast episodes

### Audiobook Content:
**→ Audiobooks** (`/audiobooks`) - Audio literature

### Personal Library:
**→ Favorites** - Your saved items
**→ Recent** - Your history
**→ Playlists** - Your collections

---

## 🎨 Visual Separation in Topbar

```
[Logo] [Discover Section] | [Library Section] [Search] [Notifications] [Profile]
       ↓                    ↓
       Public Content       Personal Content
```

### Discover Section (Left):
- Home
- Discover
- **Boards** (Pinterest badge)
- Music
- Podcasts
- Audiobooks
- Calm
- Moods

### Library Section (Right):
- **MY LIBRARY** label
- Favorites
- Recent
- Playlists

---

## 💡 User Flow Examples

### Visual Discovery Flow:
1. Go to **Boards** (Pinterest section)
2. Browse beautiful images
3. Click image → music plays
4. Heart it → saves to **Favorites**

### Music Discovery Flow:
1. Go to **Music** or **Moods**
2. Click track → plays
3. Heart it → saves to **Favorites**
4. Add to **Playlist**

### Podcast Flow:
1. Go to **Podcasts**
2. Browse shows
3. Click → plays latest episode
4. Heart it → saves to **Favorites**

### Personal Library Flow:
1. **Favorites**: See all hearted content
2. **Recent**: Continue where you left off
3. **Playlists**: Organize your collection

---

## 🔍 Content Type Summary

| Page | Type | Layout | Plays |
|------|------|--------|-------|
| **Boards** | Images | Masonry | Music |
| Music | Tracks | Grid | Music |
| Podcasts | Shows | Grid | Podcasts |
| Audiobooks | Books | Grid | Audiobooks |
| Calm | Sounds | Grid | Ambient |
| Moods | Mixes | Cards | Music |
| Favorites | Mixed | Grid | All |
| Recent | Mixed | List | All |
| Playlists | Mixed | Grid | All |

---

**Key Distinction**:
- **Discover** = Browse public content
- **Library** = Your personal collection
