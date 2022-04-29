<template>
  <div class="answer-item">
    <el-card class="box-card">
      <div slot="header" class="title">
        <div class="dot">{{ dot }}</div>
        <p>{{ title }} <span>{{ questionType === '3' ? '多选题' : '单选题' }}</span></p>
      </div>
      <div class="answer-wrapper">
        <div class="item-img" v-if="imgUrl">
          <img :src="imgUrl" alt="">
        </div>
        <div class="btn-group" v-if="questionType === '3'">
          <el-checkbox-group
              v-model="answerCheckBoxList"
              v-for="(item,index) in answerList"
              :key="index"
              class="btn-item">
            <el-checkbox
                @change="(val)=>handleCheckBoxChange(val,index)"
                :label="item"
                border
                :disabled="disabled"
                size="medium"
                v-if="item"
            />
          </el-checkbox-group>
        </div>
        <div class="btn-group" v-else>
          <el-radio-group
              @change="handleRadioChange"
              v-model="answerRadio"
              v-for="(item,index) in answerList"
              :key="index"
              class="btn-item">
            <el-radio
                border
                :disabled="disabled"
                size="medium"
                v-if="item"
                :label="index + 1">
              {{ item }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 解释 -->
      <div class="explains" v-if="isShowExplains">
        <el-divider></el-divider>
        <el-alert
            :title="alert ? '正确' : `错误, 正确答案是 ${answerKey}`"
            :type="alert ?'success' : 'error'"
            show-icon
            :closable="false"
            :description='`最佳解释 : ${explains}`'>
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "answer-item",
  props: {
    title: {
      type: String,
    },
    dot: {
      type: Number,
    },
    imgUrl: {
      type: String,
    },
    answerList: {
      type: Array
    },
    questionType: {
      type: String
    },
    explains: {
      type: String,
    },
    answerKey: {
      type: String
    },
    isShowExplains: {
      type: Boolean
    },
    alert: {
      type: Boolean
    },
    disabled:{
      type:Boolean
    }
  },
  data() {
    let obj = {
      1: () => 'A',
      2: () => 'B',
      3: () => 'C',
      4: () => 'D',
    }
    return {
      answerRadio: '',
      answerCheckBoxList: [],
      obj,
      checkBoxStr: '',
    }
  },
  methods: {
    handleRadioChange(val) {
      let res = this.obj[Number(val)]()
      this.$store.commit('saveAnswerList', {index: this.dot, data: res})
    },
    handleCheckBoxChange(val, index) {
      let res = this.obj[Number(index + 1)]()
      this.checkBoxStr += res
      this.checkBoxStr = [...new Set(this.checkBoxStr)].join('');
      // console.log(this.checkBoxStr);
      this.$store.commit('saveAnswerList', {index: this.dot, data: this.checkBoxStr})
    },
  }
}
</script>

<style scoped lang="scss">
.answer-item {
  .box-card {
    margin-top: 20px;
    position: relative;

    ::v-deep .el-card__header {
      background: rgba(48, 149, 250, 0.1);
    }

    .title {
      color: #3095FA;
      font-size: 16px;
      display: flex;
      align-items: center;

      p {
        span {
          color: #85888E;
          font-size: 14px;
        }
      }

      .dot {
        flex-shrink: 0;
        margin-right: 10px;
        background: #3095FA;
        color: #fff;
        text-align: center;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
      }
    }

    .answer-wrapper {


      .imgUrl {
        max-height: 200px;

        img {
          height: 100%;
        }
      }

      .btn-group {
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;

        .btn-item {
          margin-top: 10px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
