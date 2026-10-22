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

const mySong = {
    title: "New Jeans Jersey Remix SLOWED",
    artist: "Jiandro x Dxrkaii",
    audio: "music/New%20Jeans%20Jersey%20Remix%20SLOWED%20-%20(Jiandro%20x%20Dxrkaii)%20(2).mp3",
    cover: ""
};

songs.push(mySong);
renderSongs(songs);


const songs = [
    {
        title: "New Jeans (Jersey Club)",
        artist: "Dxrkaii, Jiandro",
        audio: "music/Dxrkaii%2C%20Jiandro%20-%20New%20Jeans%20(Jersey%20Club%20(2).mp3",
        cover: ""
    },
    {
        title: "EU SÓ QUERO FUNK (SLOWED)",
        artist: "Noma'lum ijrochi",
        audio: "music/EU%20S%C3%93%20QUERO%20FUNK%20(SLOWED).m4a",
        cover: ""
    },
    {
        title: "New Jeans Jersey Remix SLOWED",
        artist: "Jiandro x Dxrkaii",
        audio: "music/New%20Jeans%20Jersey%20Remix%20SLOWED%20-%20(Jiandro%20x%20Dxrkaii)%20(2).mp3",
        cover: ""
    },
    {
        title: "S9oXj3a4gZ4",
        artist: "Noma'lum ijrochi",
        audio: "music/S9oXj3a4gZ4%20(2).mp3",
        cover: ""
    },
    {
        title: "ZAKHELO (Slowed)",
        artist: "Noma'lum ijrochi",
        audio: "music/ZAKHELO%20(Slowed)%20-%20Official%20Music%20Video%20(2).mp3",
        cover: ""
    },
    {
        title: "Если Ты Со Мной",
        artist: "Доминик Джокер",
        audio: "music/%D0%94%D0%BE%D0%BC%D0%B8%D0%BD%D0%B8%D0%BA%20%D0%94%D0%B6%D0%BE%D0%BA%D0%B5%D1%80%20-%20%D0%95%D1%81%D0%BB%D0%B8%20%D0%A2%D1%8B%20%D0%A1%D0%BE%20%D0%9C%D0%BD%D0%BE%D0%B9.mp3",
        cover: ""
    },
    {
        title: "Если Ты Со Мной (2)",
        artist: "Доминик Джокер",
        audio: "music/%D0%94%D0%BE%D0%BC%D0%B8%D0%BD%D0%B8%D0%BA%20%D0%94%D0%B6%D0%BE%D0%BA%D0%B5%D1%80%20-%20%D0%95%D1%81%D0%BB%D0%B8%20%D0%A2%D1%8B%20%D0%A1%D0%BE%20%D0%9C%D0%BD%D0%BE%D0%B9%20(2).mp3",
        cover: ""
    },
    {
        title: "Сопрано",
        artist: "Мот feat. Ани Лорак",
        audio: "music/%D0%9C%D0%BE%D1%82_feat_%D0%90%D0%BD%D0%B8_%D0%9B%D0%BE%D1%80%D0%B0%D0%BA_%D0%A1%D0%BE%D0%BF%D1%80%D0%B0%D0%BD%D0%BE_%D0%BF%D1%80%D0%B5%D0%BC%D1%8C%D0%B5%D1%80%D0%B0_%D0%BA%D0%BB%D0%B8%D0%BF%D0%B0%2C_2017.mp3",
        cover: ""
    },
    {
        title: "Витаминка",
        artist: "Тима Белорусских",
        audio: "music/%D0%A2%D0%B8%D0%BC%D0%B0_%D0%91%D0%B5%D0%BB%D0%BE%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D1%85_%D0%92%D0%B8%D1%82%D0%B0%D0%BC%D0%B8%D0%BD%D0%BA%D0%B0_%D0%9F%D1%80%D0%B5%D0%BC%D1%8C%D0%B5%D1%80%D0%B0_%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BA%D0%BB%D0%B8%D0%BF%D0%B0.mp3",
        cover: ""
    },
    {
        title: "Розовое вино",
        artist: "Элджей, Feduk",
        audio: "music/%D0%AD%D0%BB%D0%B4%D0%B6%D0%B5%D0%B9%20%20%20Feduk%20-%20%D0%A0%D0%BE%D0%B7%D0%BE%D0%B2%D0%BE%D0%B5%20%D0%B2%D0%B8%D0%BD%D0%BE.mp3",
        cover: ""
    }
];
