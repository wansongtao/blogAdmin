<template>
  <div class="app-container">
    <el-card v-if="isShow.editor === 0" :body-style="{ height: '880px' }">
      <el-table
        :data="articleData"
        border
        stripe
        max-height="880px"
        style="margin: 50px auto; width: 90%"
      >
        <el-table-column fixed align="center" prop="articleId" label="文章编号" />
        <el-table-column fixed align="center" prop="articleTitle" label="文章标题" />
        <el-table-column fixed align="center" prop="ADDACC" label="添加人" />
        <el-table-column fixed align="center" prop="ADDTIME" label="添加日期" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectedIndex = scope.$index; isShow.editor = 2;">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-btn" @click="isShow.editor = 1">添加文章</div>
    </el-card>
    <Editor v-if="isShow.editor === 1" @click="isShow.editor = 0" />
    <el-card v-if="isShow.editor === 2" :body-style="{ height: '880px' }">
      <div class="article-details">
        <h4>{{ articleData[selectedIndex].articleTitle }}</h4>
        <div class="content" v-html="articleData[selectedIndex].articleContent" />
      </div>
      <div class="back-btn" @click="isShow.editor = 0">返回</div>
    </el-card>
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
        editor: 0 // 0文章列表，1添加文章，2查看文章
      },
      selectedIndex: -1
    }
  },
  created() {
    getAllArticle().then((data) => {
      this.articleData = data.articles
    })
  },
  methods: {}
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

.article-details {
  background: #C7EDCC;
  overflow: auto;

  h4 {
    font-size: 24px;
    line-height: 50px;
    text-align: center;
  }

  .content {
    overflow: auto;
    padding: 10px;
    height: 660px;
    border-radius: 5px;

    &::-webkit-scrollbar {
      width: 8px;
      background: #eed1ac;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #91cfca;
      border-radius: 4px;
    }

    ::v-deep p {
      font-size: 16px;
      line-height: 30px;
      text-indent: 2em;
    }
  }
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100px;
  height: 40px;
  background: #c7edcc;
  cursor: pointer;
  box-shadow: 0 0 5px 4px #eee;
}
</style>

