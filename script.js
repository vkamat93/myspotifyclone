console.log("Let's start JS")
let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("songs/");
    let response = await a.text()
    console.log(response)

    let div = document.createElement('div');
    div.innerHTML = response;
    let ahref = div.getElementsByTagName("a")
    console.log(ahref)

    let songs = []

    for (const a of ahref) {
        if (a.href.endsWith(".mp3")) {
            songs.push(a.href.split("/songs/")[1])
        }
    }
    return songs
}

function playMusic(track){
    //var audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track;
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

    //attac an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", elem=>{
            console.log(e.getElementsByTagName("div")[0].firstElementChild.innerHTML);
            playMusic(e.getElementsByTagName("div")[0].firstElementChild.innerHTML)
        })
    })
}


main()