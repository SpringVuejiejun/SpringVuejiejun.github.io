document.addEventListener("DOMContentLoaded", function () {
    new Vue({
        el: "#music-app",
        template:`
    <div class="music-welcome-container">
        <!-- 背景特效 -->
        <div class="visualizer"></div>

        <!-- 主要内容 -->
        <div class="welcome-content">
            <!-- 标题动画 -->
            <h1 class="neon-title">
            <span
                v-for="(char, index) in title"
                :key="index"
                class="neon-char"
                :style="{ animationDelay: index * 0.2 + 's' }"
                >
                {{ char }}
            </span>
            </h1>

        <!-- 播放器控件 -->
        <div class="player-container">
            <div
                class="album-art"
            :style="{ backgroundImage: 'url(' + currentSong.cover + ')' }"
            >
            <div class="vinyl" :class="{ playing: isPlaying }"></div>
            </div>

            <div class="player-controls">
                <button @click="togglePlay" class="play-btn">
                    {{ isPlaying ? "⏸" : "▶" }}
                </button>
                <div class="progress-bar" @click="seek">
                    <div class="progress" :style="{ width: progress + '%' }"></div>
                </div>
                <div class="time-display">
                    {{ formatTime(currentTime) }} /
                    {{ formatTime(currentSong.duration) }}
                </div>
            </div>
        </div>

        <!-- 歌曲列表 -->
        <div class="song-list">
            <div
                v-for="(song, index) in songs"
                :key="index"
                class="song-item"
                :class="{ active: currentSongIndex === index }"
                @click="changeSong(index)"
            >
                <span class="song-number">{{ index + 1 }}.</span>
                <span class="song-title">{{ song.title }}</span>
                <span class="song-artist">{{ song.artist }}</span>
            </div>
        </div>
    </div>

    <audio ref="audioPlayer" @timeupdate="updateProgress"></audio>
</div>
        `,
        data() {
            return {
                title: "Welcome to MusicWave",
                isPlaying: false,
                currentTime: 0,
                progress: 0,
                currentSongIndex: 0,
                songs: [
                    // {
                    //     title: "不晓得啥子歌",
                    //     artist: "陈青清",
                    //     duration: 25,
                    //     file: require("../assets/audios/1.mp3"),
                    //     cover: require("../assets/pictures/1.png"),
                    // },
                    // {
                    //     title: "巡光",
                    //     artist: "就是南方凯",
                    //     duration: 209,
                    //     file: "/audios/巡光.mp3",
                    //     cover: "/img/巡光.jpg",
                    // },
                    {
                        title: "修炼爱情",
                        artist: "橘子海",
                        duration: 32,
                        file: "/audios/修炼爱情.m4a",
                        cover: "/img/夏日漱石.jpg",
                    },
                    {
                        title: "小情歌",
                        artist: "橘子海",
                        duration: 90,
                        file: "/audios/小情歌.m4a",
                        cover: "/img/夏日漱石.jpg",
                    },
                    {
                        title: "跳楼机",
                        artist: "橘子海",
                        duration: 52,
                        file: "/audios/跳楼机.m4a",
                        cover: "/img/夏日漱石.jpg",
                    },
                    {
                        title: "在你的身边",
                        artist: "橘子海",
                        duration: 99,
                        file: "/audios/在你的身边.m4a",
                        cover: "/img/夏日漱石.jpg",
                    },
                    {
                        title: "夏夜最美的烟火",
                        artist: "颜人中",
                        duration: 279,
                        file: "/audios/夏夜最美的烟火.mp3",
                        cover: "/img/夏夜最美的烟火.jpg",
                    },
                    // {
                    //     title: "夏日漱石",
                    //     artist: "橘子海",
                    //     duration: 263,
                    //     file: "/audios/夏日漱石.mp3",
                    //     cover: "/img/夏日漱石.jpg",
                    // },
                ],
            };
        },
        computed: {
            currentSong() {
                return this.songs[this.currentSongIndex];
            },
        },
        methods: {
            togglePlay() {
                this.isPlaying = !this.isPlaying;
                const player = this.$refs.audioPlayer;
                if (this.isPlaying) {
                    player.play();
                } else {
                    player.pause();
                }
            },
            changeSong(index) {
                this.currentSongIndex = index;
                const player = this.$refs.audioPlayer;
                player.src = this.currentSong.file;
                if (this.isPlaying) {
                    player.play();
                }
            },
            updateProgress(e) {
                const player = e.target;
                this.currentTime = player.currentTime;
                this.progress = (player.currentTime / this.currentSong.duration) * 100;
            },
            formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                seconds = Math.floor(seconds % 60);
                return `${minutes}:${seconds.toString().padStart(2, "0")}`;
            },
            seek(e) {
                const player = this.$refs.audioPlayer;
                const rect = e.target.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                player.currentTime = pos * this.currentSong.duration;
            },
        },
        mounted() {
            this.$refs.audioPlayer.src = this.currentSong.file;
        },
    })
})
// {
//     title: "不晓得啥子歌",
//     artist: "陈青清",
//     duration: 25,
//     file: require("../assets/audios/1.mp3"),
//     cover: require("../assets/pictures/1.png"),
// },
