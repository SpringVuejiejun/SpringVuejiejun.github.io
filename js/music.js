document.addEventListener('DOMContentLoaded', function() {
  new Vue({
    el: '#music-app',
    template: `
      <div class="music-container">
        <div class="music-grid">
          <div 
            v-for="(item, index) in musicList" 
            :key="index" 
            class="music-card"
            :class="{ 'playing': currentMusic === item }"
          >
            <div 
              class="album-cover"
              :style="{ backgroundImage: 'url(' + item.cover + ')' }"
            >
              <button 
                class="play-btn"
                @click="togglePlay(item)"
              >
                {{ currentMusic === item ? '⏸' : '▶' }}
              </button>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.year }} | {{ item.genre }}</p>
          </div>
        </div>
        <audio ref="audioPlayer" @ended="handleAudioEnd" @timeupdate="updateProgress"></audio>
        <div v-if="currentMusic" class="audio-controls">
          <progress :value="progress" max="100"></progress>
          <button @click="togglePlay(currentMusic)">
            {{ isPlaying ? '⏸ 暂停' : '▶ 播放' }}
          </button>
        </div>
      </div>
    `,
    data() {
      return {
        currentMusic: null,
        isPlaying: false,
        progress: 0,
        musicList: [
          {
            title: "夏夜最美的烟火",
            year: 2018,
            genre: "颜人中",
            cover: "/img/夏夜最美的烟火.jpg",
            src: "/audios/夏夜最美的烟火.mp3"
          },
          {
            title: "巡光",
            year: 2019,
            genre: "就是南方凯",
            cover: "/img/巡光.jpg",
            src: "/audios/巡光.mp3"
          },
          {
            title: "夏日漱石",
            year: 2020,
            genre: "橘子海",
            cover: "/img/夏日漱石.jpg",
            src: "/audios/夏日漱石.mp3"
          },
          {
            title: "修炼爱情",
            year: 2025,
            genre: "316",
            cover: "/img/夏日漱石.jpg",
            src: "/audios/修炼爱情.m4a"
          },
          {
            title: "小情歌",
            year: 2025,
            genre: "316",
            cover: "/img/夏日漱石.jpg",
            src: "/audios/小情歌.m4a"
          },
          {
            title: "跳楼机",
            year: 2025,
            genre: "DJJ",
            cover: "/img/夏日漱石.jpg",
            src: "/audios/跳楼机.m4a"
          },
          {
            title: "在你的身边",
            year: 2025,
            genre: "DJJ",
            cover: "/img/夏日漱石.jpg",
            src: "/audios/在你的身边.m4a"
          }
        ]
      };
    },
    methods: {
      togglePlay(item) {
        if (this.currentMusic === item) {
          this.isPlaying ? this.pauseAudio() : this.playAudio();
        } else {
          this.currentMusic = item;
          this.$refs.audioPlayer.src = item.src;
          this.playAudio();
        }
      },
      playAudio() {
        this.$refs.audioPlayer.play();
        this.isPlaying = true;
      },
      pauseAudio() {
        this.$refs.audioPlayer.pause();
        this.isPlaying = false;
      },
      handleAudioEnd() {
        this.isPlaying = false;
        this.progress = 0;
      },
      updateProgress() {
        const audio = this.$refs.audioPlayer;
        this.progress = (audio.currentTime / audio.duration) * 100;
      }
    }
  });
});
