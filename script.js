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


import { useState } from "react";
import "./App.css";

const BASE_URL =
  "https://raw.githubusercontent.com/safarovfirdavs206-spec/mestro/main/music/";

const songs = [
  {
    title: "Conexão do Funk No Ritmo Do Dance",
    artist: "DJ RMC, Dj Tchouzen, MC BF",
    file: "01_DJ_RMC,_Dj_Tchouzen,_MC_BF,_Conexão_do_Funk_No_Ritmo_Do_Dance.flac",
  },
  {
    title: "SEM DEMORA (Slowed)",
    artist: "MXXNAVRA, SIXTINAGER, DJ Samir",
    file: "02. MXXNAVRA, SIXTINAGER, DJ Samir - SEM DEMORA (Slowed).mp3",
  },
  {
    title: "pursuit (Super Slowed)",
    artist: "Isq",
    file: "03. Isq - pursuit (super slowed).mp3",
  },
  {
    title: "New Jeans (Jersey Club)",
    artist: "Dxrkaii, Jiandro",
    file: "Dxrkaii, Jiandro - New Jeans (Jersey Club (2).mp3",
  },
  {
    title: "EU SÓ QUERO FUNK (Slowed)",
    artist: "Funk",
    file: "EU SÓ QUERO FUNK (SLOWED).m4a",
  },
  {
    title: "LOW EFFORT (Slowed)",
    artist: "Slowed",
    file: "LOW EFFORT (Slowed).m4a",
  },
  {
    title: "New Jeans Jersey Remix (Slowed)",
    artist: "Jiandro x Dxrkaii",
    file: "New Jeans Jersey Remix SLOWED - (Jiandro x Dxrkaii) (2).mp3",
  },
  {
    title: "S9oXj3a4gZ4",
    artist: "Unknown Artist",
    file: "S9oXj3a4gZ4 (2).mp3",
  },
  {
    title: "ZAKHELO (Slowed)",
    artist: "Official Music Video",
    file: "ZAKHELO (Slowed) - Official Music Video (2).mp3",
  },
  {
    title: "Если Ты Со Мной",
    artist: "Доминик Джокер",
    file: "Доминик Джокер - Если Ты Со Мной.mp3",
  },
  {
    title: "Сопрано",
    artist: "Мот feat. Ани Лорак",
    file: "Мот_feat_Ани_Лорак_Сопрано_премьера_клипа,_2017.mp3",
  },
  {
    title: "Витаминка",
    artist: "Тима Белорусских",
    file: "Тима_Белорусских_Витаминка_Премьера_официального_клипа.mp3",
  },
  {
    title: "Розовое вино",
    artist: "Элджей, Feduk",
    file: "Элджей   Feduk - Розовое вино.mp3",
  },
];

function getAudioUrl(file) {
  return BASE_URL + file.split("/").map(encodeURIComponent).join("/");
}

export default function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState(false);

  const filteredSongs = songs.filter((song) =>
    `${song.title} ${song.artist}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function playSong(song) {
    setCurrentSong(song);
    setPlaying(true);
  }

  return (
    <main className="maestro">
      <header className="topbar">
        <a className="logo" href="#">
          <span className="logo-icon">M</span>
          MAESTRO<span className="logo-dot">.</span>
        </a>
        <span className="online-status">
          <span className="status-dot" />
          YOUR MUSIC SPACE
        </span>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR SOUND. YOUR WORLD.</span>
          <h1>
            Feel the
            <br />
            <span>rhythm.</span>
          </h1>
          <p>
            Sevimli musiqalaringni top, tingla va
            o'z musiqiy olamingni yarat.
          </p>
          <a className="hero-button" href="#library">
            <span>▶</span> MUSIQALARNI TINGLASH
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="disc">
            <div className="disc-center">M</div>
          </div>
          <div className="sound-wave">
            {Array.from({ length: 23 }, (_, i) => (
              <span
                key={i}
                style={{ height: `${18 + ((i * 37) % 75)}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="library" id="library">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR COLLECTION</span>
            <h2>Music library<span>.</span></h2>
          </div>
          <span className="song-count">{songs.length} TRACKS</span>
        </div>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Qo'shiq yoki ijrochini qidir..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="track-header">
          <span>#</span>
          <span>TRACK / ARTIST</span>
          <span>PLAY</span>
        </div>

        <div className="track-list">
          {filteredSongs.map((song, index) => (
            <div
              className={`track ${
                currentSong?.file === song.file ? "active-track" : ""
              }`}
              key={song.file}
            >
              <span className="track-number">
                {currentSong?.file === song.file && playing
                  ? "♫"
                  : String(index + 1).padStart(2, "0")}
              </span>

              <div className="track-info">
                <div className="cover">
                  {song.title.charAt(0).toUpperCase()}
                </div>
                <div className="track-text">
                  <strong>{song.title}</strong>
                  <span>{song.artist}</span>
                </div>
              </div>

              <button
                className="play-button"
                aria-label={`Play ${song.title}`}
                onClick={() => playSong(song)}
              >
                {currentSong?.file === song.file && playing ? "♫" : "▶"}
              </button>
            </div>
          ))}

          {filteredSongs.length === 0 && (
            <p className="empty-message">Bu nomdagi musiqa topilmadi.</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <span>MAESTRO<span className="logo-dot">.</span></span>
        <span>MADE FOR MUSIC LOVERS</span>
      </footer>

      <div className="player">
        <div className="player-song">
          <div className="cover player-cover">
            {currentSong ? currentSong.title.charAt(0) : "M"}
          </div>
          <div className="track-text">
            <strong>{currentSong?.title || "MAESTRO PLAYER"}</strong>
            <span>{currentSong?.artist || "Musiqa tanlanmagan"}</span>
          </div>
        </div>

        <div className="player-controls">
          <button
            className="main-play"
            disabled={!currentSong}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? "Ⅱ" : "▶"}
          </button>
          <span className="player-caption">
            {currentSong ? "NOW PLAYING" : "CHOOSE YOUR TRACK"}
          </span>
        </div>

        <audio
          key={currentSong?.file || "empty"}
          src={currentSong ? getAudioUrl(currentSong.file) : undefined}
          autoPlay={playing && Boolean(currentSong)}
          controls
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      </div>
    </main>
  );
}
