<template>
  <div class="item-wrapper">
    <header class="top-tip">
      <img src="../assets/images/WechatIMG2.png" />
      <span class="tip-num">第一周</span>
    </header>

    <!-- 首页 -->
    <div class="home" v-if="parentComponent == 'home'">
      <img src="../assets/images/1-2.png" class="banner" />
      <img src="../assets/images/1-4.png" class="btn" @click="startQuestion" />
    </div>

    <!-- 答题页 -->
    <div class="item" v-if="parentComponent == 'item'">
      <img src="../assets/images/2-1.png" class="banner" />

      <div class="time">{{ formatTime }}</div>

      <!-- 题目 -->
      <div class="questions">
        <div class="title">{{ itemDetail[itemNum].topic_name }}</div>
        <ul>
          <li
            v-for="(item, index) in itemDetail[itemNum].topic_answer"
            :key="item.topic_answer_id"
            class="item-list"
          >
            <div
              @click="choosed(index, item.topic_answer_id)"
              :class="currentIndex === index ? 'active' : ''"
              class="option"
            >
              {{ options[index] }}
            </div>
            <span>{{ item.answer_name }}</span>
          </li>
        </ul>
      </div>

      <!-- 按钮 -->
      <img
        v-if="itemNum < itemDetail.length - 1"
        src="../assets/images/2-2.png"
        class="btn"
        @click="nextQuestion"
      />
      <img v-else src="../assets/images/3-1.png" class="btn" @click="submit" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      options: ["A", "B", "C", "D"],
      currentIndex: null, //定义的时候不是字符串也不是0，判断时会出问题，因为0也是false中间会转换类型
      answerList: [],
      answerId: ""
    };
  },
  props: {
    parentComponent: String
  },
  computed: {
    ...mapState(["itemDetail", "itemNum", "timer", "allTime"]),
    ...mapMutations(["addNum", "recordAnswer", "recordTime"]),
    // 格式化剩余时间为分秒格式
    formatTime() {
      let minutes = Math.floor(this.allTime / 60);
      let seconds = this.allTime % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  },
  methods: {
    // 提交
    submit() {
      // 提交时也要记录当前答案id,否则最后一题算不上分数
      this.$store.commit("recordAnswer", this.answerId);
      // 结束计时
      clearInterval(this.timer);
      this.$router.push("/result");
    },
    // 选择答案
    choosed(index, id) {
      this.currentIndex = index;
      // 记录当前选中的答案id
      this.answerId = id;
    },
    // 下一题
    nextQuestion() {
      if (this.currentIndex === null) {
        alert("请选择答案");
        return;
      }
      // 保存当前选中的答案
      this.$store.commit("recordAnswer", this.answerId);
      // 清空选中，避免跳到下一题的时候会添加选中的样式
      this.currentIndex = null;
      // 要commit提交修改，不要直接写this.addNum
      // 跳转到下一题
      this.$store.commit("addNum");
    },
    // 开始答题
    startQuestion() {
      this.$router.push("/question");
      // 开始计时
      this.$store.commit("recordTime");
    }
  }
};
</script>

<style lang="less">
.item-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 25vw;
  .banner {
    width: 100%;
  }
  .btn {
    width: 30vw;
    position: absolute;
    left: 50%;
    bottom: 50vw;
    margin-left: -15vw;
  }
  .top-tip {
    position: absolute;
    top: -13vw;
    right: 6vw;
    width: 25vw;
    img {
      width: 100%;
    }
    span {
      position: absolute;
      top: 37.5vw;
      left: 7vw;
      color: #a57c50;
      font-weight: 700;
    }
  }
  .item {
    .time {
      position: absolute;
      top: 5vw;
      left: 5vw;
      color: #f7bb08;
    }
    .questions {
      position: absolute;
      top: 41vw;
      left: 19vw;
      font-size: 6vw;
      color: #fff;
      .title {
        margin-bottom: 3vw;
      }

      .item-list {
        display: flex;
        align-items: center;
        margin-bottom: 1vw;
        .option {
          width: 7vw;
          height: 7vw;
          border: 1px solid #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 7vw;
          margin-right: 2vw;
        }
        .active {
          background: #f7b908;
        }
      }
    }
  }
}
</style>
