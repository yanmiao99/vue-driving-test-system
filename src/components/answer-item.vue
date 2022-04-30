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
        <!-- 多选题 -->
        <div class="btn-group" v-if="questionType === '3'">
          <el-checkbox-group
              v-model="answerCheckBoxList"
              v-for="(item,index) in formatAnswerList"
              :key="index"
              class="btn-item">
            <el-checkbox
                @change="(val)=>handleCheckBoxChange(val,index)"
                :label="item.label"
                :name="item.label"
                :checked="item.checked"
                border
                :disabled="disabled"
                size="medium"
                v-if="item"
            />
          </el-checkbox-group>
        </div>
        <!-- 单选题 -->
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
    title: {  // 标题
      type: String,
    },
    dot: {   // 标记点
      type: Number,
    },
    imgUrl: {  // 图片url
      type: String,
    },
    answerList: {  // 数据列表
      type: Array
    },
    questionType: {  // 数据类型 1,2 单选题 , 3 多选题
      type: String
    },
    explains: { // 正确的解释
      type: String,
    },
    answerKey: { // 正确的答案
      type: String
    },
    isShowExplains: { // 是否显示解释
      type: Boolean
    },
    alert: { // 显示的解释里面的内容
      type: Boolean
    },
    disabled: { // 是否全部禁用
      type: Boolean
    }
  },
  data() {
    // 定义字典对应 1,2,3,4 的转换关系
    let obj = {
      1: () => 'A',
      2: () => 'B',
      3: () => 'C',
      4: () => 'D',
    }
    return {
      answerRadio: '',  // radio ,单选题选中后的 value
      answerCheckBoxList: [], // checkbox , 多选题选中后的 value
      obj,
      checkBoxStr: '', // 用于多选题分割
    }
  },
  computed: {
    // 格式化数据, 用于给 checkbox 使用
    formatAnswerList() {
      let newData = []
      this.answerList.forEach((item, index) => {
        newData.push({
          value: index + 1,
          label: item,
          checked: false
        })
      })
      return newData
    }
  },
  methods: {
    handleRadioChange(val) {
      let res = this.obj[Number(val)]()
      this.$store.commit('saveAnswerList', {index: this.dot, data: res})
    },
    handleCheckBoxChange(val, index) {
      let res = this.obj[Number(index + 1)]()

      // 选中则继续 添加 , 取消则替换
      if (val) {
        this.checkBoxStr += res
      } else {
        this.checkBoxStr = this.checkBoxStr.replace(res, '')
      }
      // 字符串去重 , 防止多次勾选造成的数据错误
      this.checkBoxStr = [...new Set(this.checkBoxStr)].join('');
      // // console.log(this.checkBoxStr);
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
