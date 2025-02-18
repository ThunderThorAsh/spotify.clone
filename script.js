console.log('Now Js starts');
let currentSong = new Audio();
let songs= [];
let currFolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder) {
    currFolder = folder;

    console.log(`Fetching songs from: /${folder}`);
    try{
    let a = await fetch(`/${folder}/song.json`)
    if (!a.ok) {
        throw new Error(`Failed to fetch songs: ${a.status} ${a.statusText}`);
        
    }
    let response = await a.json();
    console.log("Response:", response);
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    if (folder === "songs/arijit") {
        songs = [
           "Khamoshiyan.mp3",
        "Phir Bhi Tumko Chaahunga.mp3",
        "Tum Hi Ho.mp3"
        ];
    } else if (folder === "songs/atif") {
        songs = [
            "Aadat.mp3",
        "Chale To Kat Hi Jayega.mp3"
        ];
    }
   
    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList ul")
    if (!songUL) {
        console.error("Could not find .songList ul element in the DOM.");
        return;
    }
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + ` <li>
                             <img class="invert" width="34" src="img/music.svg" alt="music">
                             <div class="info">
                                 <div >${song.replaceAll("%20", " ")}</div>
                                
                                 <div>Artist</div>
                             
                             </div>
                             <div class="playNow"><span> Play Now</span>
                                 <img class="invert" src="img/play.svg" alt="">
                             </div>
                         </li>`;
    }

    // To play a song by clicking

    Array.from(document.querySelector(".songList ul li")).forEach(e => {
        e.addEventListener("click", () => {
            let songName = e.querySelector(".info").firstElementChild.innerHTML.trim();
            console.log("Song clicked:", songName);
            playMusic(songName);
        })
    }
    )
    console.log("Songs rendered in library:", songs);
    return response.songs;
}
    catch (error) {
        console.error("Error fetching songs:", error);
        // Display an error message to the user
        let songUL = document.querySelector(".songList ul");
        if (songUL) {
            songUL.innerHTML = "<p>Failed to load songs. Please try again later.</p>";
        }
        return [];
    }
}

const playMusic = (track, pause = false) => {
    console.log("Playing song:", track);
    currentSong.src = `/${currFolder}/` +  encodeURIComponent(track);
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg"
    }

    document.querySelector(".songTime").innerHTML = "00:00/00:00"
    document.querySelector(".songInfo").innerHTML = decodeURI(track)
}


async function displayAlbums(){
   try{
    let a = await fetch(`/songs/albums.json`)
    if (!a.ok) {
        throw new Error(`Failed to fetch albums: ${a.status} ${a.statusText}`);
    }
    // point to note here
    let response = await a.json();
    // let div = document.createElement("div")
    // div.innerHTML = response;
    // let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    // let array = Array.from(anchors)
    // for (let index = 0; index < array.length; index++) {
    //     const e = array[index]; 
    //     if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
    //         let folder = e.href.split("/").slice(-2)[0]
    //         // Get the metadata of the folder
    //          a = await fetch(`/songs/${folder}/info.json`)
    //         let response = await a.json(); 
    //         cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card ">
    //                     <div class="playbtn">
    //                         <div class="play"></div>
    //                     </div>
    //                     <img src="/songs/${folder}/cover.jpg" alt="cover">
    //                     <h2>${response.title}</h2>
    //                     <h3>${response.description}</h3>
    //                 </div>`
    //     }
    // }
    cardContainer.innerHTML = "";

    for (const album of response.albums) {
        cardContainer.innerHTML += `
            <div data-folder="${album.folder}" class="card">
                <div class="playbtn">
                    <div class="play"></div>
                </div>
                <img src="/songs/${album.folder}/cover.jpg" alt="cover">
                <h2>${album.title}</h2>
                <h3>${album.description}</h3>
            </div>`;
    }



    // load data whenever the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async () => {
            let folder = e.dataset.folder;
            console.log("Card clicked. Fetching songs for folder:", folder);
            songs = await getSongs(`songs/${folder}`)
            console.log(e);
            playMusic(songs[0])
        })

    })
}
catch (error) {
    console.error("Error fetching albums:", error);
    // Display an error message to the user
    document.querySelector(".cardContainer").innerHTML = "<p>Failed to load albums. Please try again later.</p>";
}
}

async function main() {
    // display songs in the library
    console.log("Initializing library...");
    let songs = await getSongs("songs/atif")
    console.log("Songs loaded:", songs);
    playMusic(songs[0], true)

    console.log("Loading albums...");
    // To display files of cards
    await displayAlbums()
    
    console.log("Setting up event listeners...");
    // To play a song by clicking prev,play and next
    // Play button
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })

    // Prev Button
    // prev.addEventListener("click", () => {
    //     currentSong.pause;
    //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    //     if ((index - 1) >= 0) {
    //         playMusic(songs[index - 1])
    //     }
    // })
    prev.addEventListener("click", () => {
        currentSong.pause();
        let currentSongName = currentSong.src.split("/").slice(-1)[0]; // Get the current song name
        let index = songs.indexOf(currentSongName); // Find the index of the current song
        if (index - 1 >= 0) {
            playMusic(songs[index - 1]); // Play the previous song
        } else {
            playMusic(songs[songs.length - 1]); // Loop back to the last song
        }
    });

    // Next Button
    // next.addEventListener("click", () => {
    //     currentSong.pause;
    //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    //     if ((index + 1) < songs.length) {
    //         playMusic(songs[index + 1])
    //     }
    // })
    next.addEventListener("click", () => {
        currentSong.pause();
        let currentSongName = currentSong.src.split("/").slice(-1)[0]; // Get the current song name
        let index = songs.indexOf(currentSongName); // Find the index of the current song
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]); // Play the next song
        } else {
            playMusic(songs[0]); // Loop back to the first song
        }
    });



    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    //addEventListener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100

    })
    // addEventListener to hamburger
    document.querySelector(".hamburger").addEventListener("click", e => {
        document.querySelector(".left").style.left = "0"
    })

    // addEventListener to close btn
    document.querySelector(".close").addEventListener("click", e => {
        document.querySelector(".left").style.left = "-120%"
    })


    // addEventListener to volume btn
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume >0){
            document.querySelector(".volicon>img").src = document.querySelector(".volicon>img").src.replace("mute.svg", "volume.svg")
        }
    })

    // addEventListener to volume btn for mute
document.querySelector(".volicon>img").addEventListener("click",e=>{
    if(e.target.src.includes("volume.svg")){
        e.target.src = e.target.src.replace("volume.svg", "mute.svg")
        currentSong.volume = 0;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
    }
    else{
        e.target.src = e.target.src.replace("mute.svg", "volume.svg")
        currentSong.volume = .10;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 20;
    }
    
})

    
}
main()

