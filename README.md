🎵 Spotify Clone

📌 Overview

This is a Spotify Clone built using HTML, CSS, and JavaScript. The project replicates the look and feel of Spotify's web player, allowing users to browse, play, and control music seamlessly. Songs are fetched dynamically from a specified folder or external source, enabling smooth audio streaming.

🚀 Features

🎨 Responsive UI – Modern and sleek Spotify-like interface.

🎶 Dynamic Song Fetching – Songs are loaded dynamically from a folder.

⏯️ Music Controls – Play, pause, next, previous, and volume adjustments.

🔊 Seek Bar & Song Progress – Interactive seek bar for navigating songs.

📂 Playlist Management – Displays available songs in a structured list.

🎧 Real-Time Updates – Track and update song details on the UI.

🛠️ Tech Stack

HTML – Structure and layout of the web player.

CSS – Styling for a visually appealing design.

JavaScript – Handles music playback, fetching songs, and UI interactions.

📂 How to Use

Clone the Repository:

git clone https://github.com/thunderthorash/spotify.clone.git

Navigate to the Project Folder:

cd spotify.clone

Open index.html in a Browser.

🎵 Adding Songs

Local Hosting (For Development)

Place your .mp3 files inside the songs/ folder.

Ensure filenames match exactly in script.js.

Modify the songs array in script.js:

let songs = [
    "songs/song1.mp3",
    "songs/song2.mp3"
];


❌ Common Issues & Fixes

1️⃣ Songs Not Loading on GitHub Pages

✅ Fix: GitHub Pages doesn’t support directory listing. Manually list song URLs in script.js.

2️⃣ 404 Errors for Songs

✅ Fix: Ensure song files exist in the repository and match the correct filename.

3️⃣ Songs Over 100MB Not Uploading

✅ Fix: Use an external file host for large MP3 files.

📜 License

This project is for educational purposes only. It does not provide actual Spotify services.

Enjoy your music! 🎧🚀
