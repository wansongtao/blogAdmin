<template>
  <div class="dashboard-container">
    <el-card :body-style="{ height: '60px', padding: '10px' }">
      <img src="~@/assets/common/indextop1.gif" alt="欢迎图片" class="topimg">
      <p class="title">{{ title + name + "，祝您开心每一天！" }}</p>
    </el-card>
    <main>
      <div class="calendar">
        <el-card>
          <el-calendar v-model="value" />
        </el-card>
      </div>
      <div class="message">
        <el-card>
          <h4>待处理事项</h4>
          <div class="process">
            <p>不过是大梦一场空，不过是孤影照惊鸿</p>
          </div>
        </el-card>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      value: new Date()
    }
  },
  computed: {
    ...mapGetters(['name']),
    title() {
      const nowTime = new Date().toTimeString().slice(0, 2)
      const timeNum = Number(nowTime)

      let title = ''

      if (timeNum >= 0 && timeNum < 5) {
        title = '凌晨好，'
      } else if (timeNum >= 5 && timeNum < 7) {
        title = '清晨好，'
      } else if (timeNum >= 7 && timeNum < 12) {
        title = '上午好，'
      } else if (timeNum >= 12 && timeNum < 14) {
        title = '中午好，'
      } else if (timeNum >= 14 && timeNum < 18) {
        title = '下午好，'
      } else if (timeNum >= 18 && timeNum < 24) {
        title = '晚上好，'
      } else {
        title = '您好，'
      }

      return title
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.topimg {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.title {
  margin: 0 0 0 60px;
  padding: 0 10px;
  font-size: 30px;
  line-height: 60px;
}

main {
  margin-top: 20px;

  .calendar {
    float: left;
    width: 65%;
  }

  .message {
    float: right;
    width: 33%;

    h4 {
      margin: 0 0 0 0;
      height: 53px;
      line-height: 53px;
      border-bottom: 1px solid #ebeef5;
    }
  }

  ::v-deep .el-card {
    overflow: auto;
    height: calc(100vh - 200px);

    &::-webkit-scrollbar {
      width: 8px;
      background: #eed1ac;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #91cfca;
      border-radius: 4px;
    }
  }
}
</style>
