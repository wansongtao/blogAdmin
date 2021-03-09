<template>
  <div class="app-container">
    <el-card v-if="!isShow.editor" :body-style="{ height: '880px' }">
      <el-table
        :data="articleData"
        border
        stripe
        max-height="880px"
        style="margin: 50px auto;width: 90%;"
      >
        <el-table-column
          fixed
          prop="articleId"
          label="文章编号"
        />
        <el-table-column
          fixed
          prop="articleTitle"
          label="文章标题"
        />
        <el-table-column fixed prop="ADDACC" label="添加人" />
        <el-table-column
          fixed
          prop="ADDTIME"
          label="添加日期"
        />
      </el-table>
      <div class="add-btn" @click="isShow.editor = true">添加文章</div>
    </el-card>
    <Editor v-if="isShow.editor" @click="isShow.editor = false" />
  </div>
</template>

<script>
import Editor from './components/VueEditor'
import { getAllArticle } from '@/api/article'

export default {
  components: {
    Editor
  },
  data() {
    return {
      articleData: [],
      multipleSelection: [],
      isShow: {
        editor: false
      }
    }
  },
  created() {
    getAllArticle().then(data => {
      this.articleData = data.articles
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  width: 100px;
  height: 40px;
  background: #f4b194;
  cursor: pointer;
  box-shadow: 0 0 5px 4px #eee;
}
</style>

