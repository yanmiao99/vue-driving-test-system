<template>
  <div class="home">
    <div class="wrapper">
      <h2>驾考题库</h2>
      <el-form ref="formItemBank" :model="formItemBank" label-width="80px">
        <el-form-item label="驾照类型">
          <el-select v-model="formItemBank.licenseType" placeholder="请选择驾照类型" style="width: 100%">
            <el-option
                :label="type.label"
                :value="type.value"
                v-for="type in typeOption"
                :key="type.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="考试科目">
          <el-select v-model="formItemBank.subjectType" placeholder="请选择考试科目" style="width: 100%">
            <el-option
                :label="subject.label"
                :value="subject.value"
                v-for="subject in subjectOption"
                :key="subject.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="题目数量">
          <el-input v-model="formItemBank.pageSize" placeholder="请选择题目数量"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary" @click="handleSubmit" style="width: 100%">开始考试</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    // 0：小车（C1、C2），1：客车（A1、A3、B1），2：货车（A2、B2），3：摩托车（D、E、F）
    let typeOption = [
      {value: 0, label: '小车（C1、C2）'},
      {value: 1, label: '客车（A1、A3、B1）'},
      {value: 2, label: '货车（A2、B2）'},
      {value: 3, label: '摩托车（D、E、F）'}
    ]
    // 0：科目一，1：科目四（文明考试）
    let subjectOption = [
      {value: 0, label: '科目一'},
      {value: 1, label: '科目四（文明考试）'}
    ]
    return {
      formItemBank: {
        licenseType: 0,
        subjectType: 0,
        pageSize: 10
      },
      typeOption,
      subjectOption
    }
  },
  mounted() {
  },
  methods: {
    async handleSubmit() {
      let res = await this.$api.post("/queryQuestionList", {
        ...this.formItemBank,
        page: Math.floor(Math.random() * 10) + 1, // 生成 1-10 页码中的随机一个页面的数据
      })
      // console.log(res);
      // 存储考题
      this.$store.commit('saveAnswerData', res)
      // 清空上次的所有答案
      this.$store.commit('resetAnswerList')
      // 跳转路由
      await this.$router.push("/answer")
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .wrapper {
    width: 300px;
    padding: 20px 50px;
    border: 1px solid #ccc;
    border-radius: 4px;

    h2 {
      text-align: center;
    }
  }
}
</style>
