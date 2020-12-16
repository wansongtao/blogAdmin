<template>
  <div class="dashboard-container">
    <el-card class="box-card" :body-style="{ height: '60px', padding: '10px' }">
      <img src="~@/assets/common/indextop1.gif" alt="欢迎图片" class="topimg">
      <p class="title">{{ title + name + "，祝您开心每一天！" }}</p>
    </el-card>
    <main>
      <div class="calendar">
        <el-card :body-style="{ height: '720px', padding: '10px' }">
          <el-calendar v-model="value" />
        </el-card>
      </div>
      <div class="message">
        <el-card :body-style="{ height: '720px', padding: '10px' }">
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
      const nowDate = new Date()

      return nowDate.toLocaleTimeString().slice(0, 2) + '好，'
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

.box-card {
  height: 80px;
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
}
</style>
