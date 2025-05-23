console.log("Let's start JS")
let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("songs/songs.json");
    let response = await a.json()
    console.log(response)

    return response
}

function playMusic(track){
    //var audio = new Audio("/songs/" + track);
    const basePath = window.location.pathname.includes("myspotifyclone") ? "/myspotifyclone/" : "/";
    console.log(`Basepath is ${basePath}`)
    currentSong.src = `${basePath}songs/` + track;
    currentSong.play();
}

async function main(params) {
    // get the list of all songs
    let songs = await getSongs()
    console.log(songs)

    let songList = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songList.innerHTML = songList.innerHTML + `<li>
                        <img class="invert" src="play-circle-02-stroke-rounded.svg" alt="">
                        <div class="songinfo">
                            <div>${song.replaceAll("%20", " ")}</div>
                            <div>A.R. Rahman</div>
                        </div>
                    </li>`
    }

    //playing first song
    // var audio = new Audio(songs[3]);
    // audio.play();

    // audio.addEventListener("loadeddata", ()=>{
    //     let duration = audio.duration;
    //     console.log(duration)
    // });

    //attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", elem=>{
            console.log(e.getElementsByTagName("div")[0].firstElementChild.innerHTML);
            playMusic(e.getElementsByTagName("div")[0].firstElementChild.innerHTML)
        })
    })
}

// Determine base path based on where the app is running
const BASE_PATH = (() => {
    const pathParts = window.location.pathname.split('/');
    // If hosted at e.g. /myspotifyclone/index.html → grab "/myspotifyclone/"
    if (pathParts.length > 1 && pathParts[1] !== '') {
        return `/${pathParts[1]}/`;
    } else {
        return '/'; // Local or root
    }
})();



main()