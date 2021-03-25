<template>
  <div class="app-container">
    <keep-alive>
      <Editor />
    </keep-alive>
  </div>
</template>

<script>
import Editor from './components/VueEditor'
export default {
  components: {
    Editor
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  overflow: auto;
  height: calc(100vh - 90px);

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
</style>
