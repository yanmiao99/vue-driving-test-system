<template>
  <div class="answer">
    <el-page-header @back="goBack" content="重新选题" style="margin: 50px 0"/>
    <answerItem
        v-for="(item,index) in answerData.driverQuestionList"
        :key="item.questionID"
        :title="item.question"
        :img-url="item.imageURL"
        :answer-list="[item.optionA,item.optionB,item.optionC,item.optionD,]"
        :dot="index + 1"
        :questionType="item.questionType"
        :explains="item.explains"
        :answer-key="item.key"
        :isShowExplains="item.show"
        :alert="item.alert"
        :disabled="item.disabled"
    />
    <div class="submit">
      <el-button type="success" @click="handleSubmit">提交答案</el-button>
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
      answerData: this.$store.state.answerData
    }
  },
  mounted() {
    // console.log(this.answerData);
  },
  methods: {
    goBack() {
      this.$router.push("/")
    },
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

        }).catch(action => {
          this.$router.push("/")
        });
      } else {
        this.$message.error('请完成考卷再提交')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.answer {
  .submit {
    margin: 50px 0;
  }
}
</style>
