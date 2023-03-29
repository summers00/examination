<template>
  <div class="result-wrapper">
    <div class="result">
      <img src="../assets/images/4-2.png" alt="" />
      <div class="score-warpper">
        <div class="score">{{ calculateScore }}分!</div>
        <div class="tip">{{ scoreTip }}</div>
      </div>
    </div>
    <img
      class="share"
      src="../assets/images/4-3.png"
      alt=""
      @click="showShareMask = true"
    />
    <span>关注葡萄之家 获取答案</span>
    <img class="qr" src="../assets/images/4-4.png" alt="" />
    <div class="share-mask" v-if="showShareMask" @click="showShareMask = fals">
      <img src="../assets/images/5-2.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showShareMask: false,
      rightAnswer: [2, 7, 12, 13, 18], //正确答案
      scoreTipsArr: [
        "你说，是不是把知识都还给小学老师了？",
        "还不错，但还需要继续加油哦！",
        "不要嘚瑟还有进步的空间！",
        "智商离爆表只差一步了！",
        "你也太聪明啦，葡萄之家欢迎你！"
      ]
    };
  },
  computed: {
    ...mapState(["answerId"]),
    calculateScore() {
      let score = 0;
      // 一一对应
      this.answerId.forEach((item, index) => {
        if (item == this.rightAnswer[index]) {
          score += 20;
        }
      });
      return score;
    },
    scoreTip() {
      // 向上取整
      const index = Math.ceil(this.calculateScore / 20) - 1;
      return this.scoreTipsArr[index];
    }
  }
};
</script>

<style lang="less">
.result-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(../assets/images/4-1.jpg) no-repeat;
  text-align: center;
  .result {
    position: relative;
    width: 65vw;
    margin-top: 12vw;
    img {
      width: 100%;
    }
    .score-warpper {
      position: absolute;
      top: 32vw;
      left: 48%;
      margin-left: -27vw;
      text-align: center;
      width: 92%;
      .score {
        font-size: 10vw;
        color: #a51d31;
        font-weight: 700;
      }
    }
  }
  .share {
    width: 36vw;
    margin: 10vw 0;
  }
  .qr {
    width: 36vw;
    margin-top: 4vw;
  }
  .share-mask {
    width: 100%;
    height: 100%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAARwAQMAAABAQXdDAAAAA1BMVEUaGhr7hBjdAAAAAXRSTlPrdz7jlgAAAHxJREFUeNrswYEAAAAAgKD9qRepAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg9uCABAAAAEDQ/9ftCFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAiZ38AAY74Dj4AAAAASUVORK5CYII=)
      no-repeat;
    position: absolute;
    img {
      width: 74vw;
      margin-top: 7vw;
    }
  }
}
</style>
