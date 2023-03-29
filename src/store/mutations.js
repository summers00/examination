const mutations = {
  // 当前题目
  addNum(state) {
    state.itemNum += 1;
  },
  recordAnswer(state, answerId) {
    state.answerId.push(answerId);
  },
  recordTime(state) {
    state.timer = setInterval(() => {
      // 如果倒计时结束，清除定时器
      if (state.allTime <= 0) {
        clearInterval(state.timer);
        return;
      }
      // state.allTime++;
      state.allTime--;
    }, 1000);
  }
};
export default mutations;
