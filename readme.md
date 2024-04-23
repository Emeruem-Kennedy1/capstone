
# Music Web App: Playlist Generator

## Description
This Music Web App automatically creates playlists by analyzing song samples and their relationships.

## Current State
As of now, the app features a basic web scraper that collects song data from specified music websites. The data doesn't include the genre of the songs but I plan to add this soon.

## Demo of Web Scraper
![Web Scraper Demo]()

## Features
- **Web Scraper**: Collects and processes song data from various online sources.
- **Playlist Generation**: Generates playlists based on the sample relationships of the songs. ("Coming Soon")

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/Emeruem-Kennedy1/capstone.git
   ```
2. Navigate to the project directory:
   ```
   cd capstone
   ```
3. Install the necessary packages:
   ```
   npm install
   ```
4. Create a .env file in the root directory and add the following environment variables:
   ```
    DB_DIALECT=sqlite
    DB_STORAGE=./database/db.development.sqlite
    PORT=3000
   ```

### Running the Application
To start the application, run the following command in the terminal:
```
npm start
or
npm run dev
```

## Usage
Once the app is running, navigate to `http://localhost:3000`

