<template>
  <div class="answer">
    <div class="answer-fixed">
      <el-page-header @back="goBack" content="重新选题" class="page-header"/>
    </div>
    <div class="answer-wrapper">
      <answerItem
          v-for="(item,index) in answerData.driverQuestionList"
          :key="item.questionID"
          :title="item.question"
          :img-url="item.imageURL"
          :answer-list="[item.optionA,item.optionB,item.optionC,item.optionD]"
          :dot="index + 1"
          :questionType="item.questionType"
          :explains="item.explains"
          :answer-key="item.key"
          :isShowExplains="item.show"
          :alert="item.alert"
          :disabled="item.disabled"
      />
    </div>
    <div class="submit">
      <el-button
          type="success"
          @click="handleSubmit">
        提交答案
      </el-button>
    </div>
    <!-- 返回顶部 -->
    <div class="backTop" v-show="scrollTop > 300">
      <el-button type="primary" icon="el-icon-arrow-up" circle @click="handleBackTop"></el-button>
    </div>
  </div>
</template>

<script>
import answerItem from "../components/answer-item";

export default {
  name: "Answer",
  components: {
    answerItem
  },
  data() {
    return {
      answerData: this.$store.state.answerData,
      scrollTop: 0
    }
  },
  mounted() {
    window.onscroll = () => {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    }
  },
  methods: {
    // 点击返回首页
    goBack() {
      this.$router.push("/")
    },
    // 提交考卷
    handleSubmit() {
      // 1. 判断答案是否全部勾选
      if (this.$store.state.answerList.length === this.answerData.driverQuestionList.length) {
        // 2. 判断答案是否正确

        this.$store.state.answerList.forEach(item => {
          this.answerData.driverQuestionList.forEach(el => {
            el.alert = item === el.key;
            el.show = true
            el.disabled = true
            this.$forceUpdate()
          })
        })

        let correct = 0 // 正确
        let error = 0   // 错误
        let correctRate = 0  // 正确率


        this.answerData.driverQuestionList.forEach(el => {
          // 对或错
          if (el.alert) {
            correct++
          } else {
            error++
          }
        })
        // 正确率
        correctRate = correct / this.answerData.driverQuestionList.length * 100


        // 3. 弹窗成绩
        let vNodeDiv = `
            <div>
                <p>✅ 正确了 : <span> ${correct} </span>道题</p>
                <p>❌ 错误了 : <span> ${error} </span>道题</p>
                <p> 正确率为 : <span>${correctRate}</span> % </p>
            </div>
        `
        this.$confirm(vNodeDiv, '成绩', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          cancelButtonText: '返回首页',
          distinguishCancelAndClose: true,
        }).then(() => {
          // 点击确定的回调
          const goToTop = () => window.scrollTo(0, 0);
          goToTop();
        }).catch(action => {
          // 点击返回首页的回调
          this.$router.push("/")
        });
      } else {
        this.$message.error('请完成考卷再提交')
      }
    },
    // 点击返回顶部
    handleBackTop() {
      let c = this.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(this.handleBackTop);
        window.scrollTo(0, c - c / 8);
      }
    },
  }
}
</script>

<style scoped lang="scss">
.answer {
  position: relative;

  .answer-fixed {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1050px;
    text-align: left;
    z-index: 20;
    background: #fff;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;

    .page-header {
      margin: 30px 0;
    }
  }

  .answer-wrapper {
    margin-top: 130px;

  }

  .submit {
    display: flex;
    justify-content: right;
    margin: 50px 0;
  }

  .backTop {
    position: fixed;
    bottom: 100px;
    right: 50px;
  }
}
</style>
