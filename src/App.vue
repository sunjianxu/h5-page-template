<template>
  <div id="app">
    <div id="img_wrap" class="img_wrap">
      <div class="video_cover-wrapper" @click="handleNowDownload">
        <span class="video_cover video_cover1" />
        <span class="video_cover video_cover2" />
        <span class="video_cover video_cover3" />
        <span class="video_cover video_cover4" />
      </div>
      <a v-show="!showPlayBtnWrapper" id="an_download" href="javascript:void(0)">
        <video
          ref="videoRef"
          poster="./assets/lib/images/poster.gif"
          src="./assets/lib/media/video/mxw.mp4"
          x-webkit-airplay="true"
          webkit-playsinline="true"
          playsinline="true"
          x5-playsinline
          x5-video-player-type="h5"
          x5-video-player-fullscreen
          x5-video-orientation="portraint"
          preload="auto"
        >
          您的浏览器不支持 video 标签。
        </video>
      </a>
    </div>
    <div v-show="showPlayBtnWrapper" class="play-start-wrapper">
      <div class="poster-wrapper" @click="handleNowDownload">
        <img class="poster" src="./assets/lib/images/poster.gif">
      </div>
      <div class="play-btn-wrapper">
        <img width="100" height="100" src="./assets/lib/images/play.png" @click="handlePlayVideo">
      </div>
    </div>

    <div v-show="showReplayWrapper" class="replay-and-download-wrapper">
      <div class="game-info-wrapper">
        <div class="wrapper">
          <div class="game-info">
            <img class="icon" :src="VUE_APP_GAME_ICON">
            <span class="game-name">{{ VUE_APP_GAME_NAME }}</span>
          </div>
          <div class="action-btn-wrapper">
            <div class="btn replay" @click="handleReplayVideo">重播</div>
            <div class="btn now-download" @click="handleNowDownload">立即下载</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gift-wrapper" @click="handleNowDownload">
      <div class="info-wrapper">
        <div class="content-wrapper">
          <div class="game-info">
            <img :src="VUE_APP_GAME_ICON" class="icon" alt="">
            <div class="abstract-wrapper">
              <span class="game-name">{{ VUE_APP_GAME_NAME }}</span>
              <span class="slogan">{{ VUE_APP_GAME_SLOGAN }}</span>
            </div>
          </div>
          <div class="download-btn">
            点我玩玩
          </div>
        </div>
        <div class="arrow-wrapper">
          <img src="./assets/lib/images/arrow.gif">
        </div>
      </div>
    </div>
    <div v-show="isWeiXin()" class="wechat-tips">
      <img src="./assets/lib/images/wx_pup.png">
    </div>
  </div>
</template>

<script>
import { getViewPortSize, downloadSource, isIos, isWeiXin } from '@/utils'
export default {
  name: 'App',
  data() {
    return {
      showPlayBtnWrapper: true,
      showReplayWrapper: false,
      VUE_APP_GAME_ICON: process.env.VUE_APP_GAME_ICON,
      VUE_APP_GAME_SLOGAN: process.env.VUE_APP_GAME_SLOGAN,
      VUE_APP_GAME_NAME: process.env.VUE_APP_GAME_NAME,
      VUE_APP_APK_URL: process.env.VUE_APP_APK_URL,
      VUE_APP_IPA_URL: `${process.env.VUE_APP_IPA_URL}&page_title=${window.btoa(window.encodeURIComponent(process.env.VUE_APP_GAME_NAME))}&game_icon=${window.btoa(window.encodeURIComponent(process.env.VUE_APP_GAME_ICON))}&from_os_type=h5`
    }
  },
  computed: {
    videoDOM() {
      return this.$refs['videoRef']
    }
  },
  mounted() {
    setTimeout(() => {
      const { pageHeight } = getViewPortSize();
      const videoDOM = this.videoDOM;
      videoDOM.style.width = '100%';
      videoDOM.style.height = pageHeight + 'px';
      videoDOM.style.objectFit = 'fill';
      videoDOM.addEventListener('ended', this.onVideoEnded, false);
      this.initENV();
    }, 500);
  },
  beforeDestroy() {
    const videoDOM = this.videoDOM;
    videoDOM.removeEventListener('ended', this.onVideoEnded, false)
  },
  methods: {
    isWeiXin,
    initENV() {
      if (!this.isWeiXin() && !isIos()) {
        downloadSource(this.VUE_APP_APK_URL);
      }
    },
    handleReplayVideo() {
      this.videoDOM.play();
      this.showPlayBtnWrapper = this.showReplayWrapper = false;
      this.handleNowDownload();
    },
    handlePlayVideo() {
      this.videoDOM.play();
      this.showPlayBtnWrapper = this.showReplayWrapper = false;
    },
    onVideoEnded() {
      this.showPlayBtnWrapper = this.showReplayWrapper = true;
    },
    handleNowDownload() {
      isIos() ? downloadSource(this.VUE_APP_IPA_URL) : downloadSource(this.VUE_APP_APK_URL);
    }
  }
}
</script>
<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  font-family: Source Han Sans CN;
  .img_wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    overflow: hidden;
    .video_cover {
      position: absolute;
      z-index: 1;
      &.video_cover1 {
        top: 0;
        left: 0;
        right: 0;
        height: 35%;
      }
      &.video_cover2 {
        top: 0;
        right: 0;
        bottom: 0;
        width: 35%;
      }
      &.video_cover3 {
        bottom: 0;
        left: 0;
        right: 0;
        height: 35%;
      }
      &.video_cover4 {
        bottom: 0;
        left: 0;
        top: 0;
        width: 35%;
      }
    }
  }

  #an_download {
    display: inline-block;
  }

  .play-start-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 12;
    overflow: hidden;

    .poster-wrapper {
      width: 100%;
      height: 100%;

      .poster {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .play-btn-wrapper {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translateX(-50%);

      img {
        width: 170px;
        height: 170px;
      }
    }
  }

  .replay-and-download-wrapper {
    z-index: 2001;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.5);

    .game-info-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .wrapper {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .game-info {
          display: flex;
          flex-direction: column;

          .icon {
            display: inline-block;
            width: 160px;
          }

          .game-name {
            margin-top: 12px;
            font-size: 36px;
            color: #fff;
          }
        }

        .action-btn-wrapper {
          width: 100%;
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
          color: #fff;

          .btn {
            width: 200px;
            height: 50px;
            border-radius: 12px;
            background-color: #ffa02a;
            font-size: 26px;
            text-align: center;
            line-height: 50px;

            &.replay {
              color: #333;
              background-color: #fff;
            }
          }
        }
      }
    }
  }

  .gift-wrapper {
    position: absolute;
    bottom: 2%;
    left: 5%;
     width: 100%;

    .info-wrapper {
      display: flex;

      .content-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        bottom: 0%;
        left: 0%;
        width: 60%;
        padding: 20px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, .8);
        border-radius: 12px;
        z-index: 20;
        .game-info {
          display: flex;
          .icon {
            width: 100px;
            height: 100px;
            object-fit: cover;
            display: block;
          }
          .abstract-wrapper {
            display: flex;
            flex-direction: column;
            margin-left: 15px;

            .game-name {
              font-size: 29px;
              color: #333;
              font-weight: bold;
            }

            .slogan {
              font-size: 24px;
              margin-top: 10px;
              color: #666;
              line-height: 1.3;
            }
          }
        }

        .download-btn {
          width: 100%;
          height: 55px;
          background-color: #ffa02a;
          color: #fff;
          text-align: center;
          line-height: 55px;
          margin-top: 20px;
          border-radius: 8px;
          font-size: 28px;
        }
      }

      .arrow-wrapper {
        position: absolute;
        bottom: 8%;
        right: 7%;
        width: 38%;
        z-index: 19;

        img {
          width: 100%;
          display: inline-block;
        }
      }
    }

  }

  .wechat-tips {
    z-index: 2001;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.5);

    img {
      display: inline-block;
      width: 100%;
    }
  }
}
</style>

