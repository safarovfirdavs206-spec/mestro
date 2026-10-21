const musicList = document.getElementById("music-list");
const musicSection = document.querySelector(".music-section");
const songs = [];

const uploadSection = document.createElement("div");
uploadSection.className = "upload-section";
uploadSection.innerHTML = `
    <input type="text" id="song-title" placeholder="Musiqa nomi" aria-label="Musiqa nomi">
    <input type="text" id="song-artist" placeholder="Ijrochi nomi" aria-label="Ijrochi nomi">

    <label for="song-file">🎵 Musiqa faylini tanla</label>
    <input type="file" id="song-file" accept="audio/*">

    <label for="cover-file">🖼️ Albom rasmini tanla</label>
    <input type="file" id="cover-file" accept="image/*">

    <button id="add-song" type="button">+ Musiqa qo‘shish</button>

    <input type="text" id="search-song" placeholder="🔍 Musiqa qidirish..." aria-label="Musiqa qidirish">
`;

musicSection.prepend(uploadSection);

const titleInput = document.getElementById("song-title");
const artistInput = document.getElementById("song-artist");
const audioInput = document.getElementById("song-file");
const coverInput = document.getElementById("cover-file");
const searchInput = document.getElementById("search-song");

function renderSongs(list) {
    musicList.replaceChildren();

    if (list.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = songs.length === 0
            ? "Hozircha musiqalar mavjud emas."
            : "Musiqalar topilmadi.";
        musicList.appendChild(emptyMessage);
        return;
    }

    list.forEach(function (song) {
        const card = document.createElement("div");
        card.className = "song-card";

        const info = document.createElement("div");
        info.className = "song-info";

        if (song.cover) {
            const cover = document.createElement("img");
            cover.src = song.cover;
            cover.alt = `${song.title} albom rasmi`;
            info.appendChild(cover);
        } else {
            const defaultCover = document.createElement("div");
            defaultCover.className = "default-cover";
            defaultCover.textContent = "🎵";
            info.appendChild(defaultCover);
        }

        const details = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = song.title;
        const artist = document.createElement("p");
        artist.textContent = song.artist;
        details.append(title, artist);
        info.appendChild(details);

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.preload = "metadata";
        audio.src = song.audio;

        card.append(info, audio);
        musicList.appendChild(card);
    });
}

function filterSongs() {
    const query = searchInput.value.toLowerCase().trim();
    const filteredSongs = songs.filter(function (song) {
        return song.title.toLowerCase().includes(query)
            || song.artist.toLowerCase().includes(query);
    });

    renderSongs(filteredSongs);
}

document.getElementById("add-song").addEventListener("click", function () {
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();
    const audioFile = audioInput.files[0];
    const coverFile = coverInput.files[0];

    if (!title || !audioFile) {
        alert("Musiqa nomini yoz va audio faylni tanla!");
        return;
    }

    songs.push({
        title: title,
        artist: artist || "Noma'lum ijrochi",
        audio: URL.createObjectURL(audioFile),
        cover: coverFile ? URL.createObjectURL(coverFile) : "",
    });

    titleInput.value = "";
    artistInput.value = "";
    audioInput.value = "";
    coverInput.value = "";
    filterSongs();
});

searchInput.addEventListener("input", filterSongs);

const onlineButton = document.getElementById("add-online-music");
const onlineUrl = document.getElementById("online-music-url");
const onlinePlayer = document.getElementById("online-music-player");

if (onlineButton && onlineUrl && onlinePlayer) {
    onlineButton.addEventListener("click", function () {
        const url = onlineUrl.value.trim();  
       
            const match = url.match(
                /^https?:\/\/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/
            );

        if (!match) {
            alert("Spotify trek, albom yoki pleylist havolasini kiriting!");
            return;
        }

        const type = match[1];
        const id = match[2];

        onlinePlayer.replaceChildren();

        const player = document.createElement("iframe");
        player.src = `https://open.spotify.com/embed/${type}/${id}`;
        player.title = "Spotify musiqa pleyeri";
        player.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        player.loading = "lazy";

        onlinePlayer.appendChild(player);
    });
}
