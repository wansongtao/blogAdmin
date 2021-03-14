<template>
  <div class="app-container">
    <el-card v-if="isShow.editor === 0">
      <div class="title">
        <span>文章列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
      <div class="add-btn" @click="isShow.editor = 1">写文章</div>
      <el-table
        :data="articleData"
        border
        stripe
        style="margin: 30px auto; width: 90%; "
      >
        <el-table-column
          fixed
          align="center"
          prop="articleId"
          label="文章编号"
        />
        <el-table-column
          fixed
          align="center"
          prop="articleTitle"
          label="文章标题"
        />
        <el-table-column fixed align="center" prop="ADDACC" label="添加人" />
        <el-table-column fixed align="center" prop="ADDTIME" label="添加时间" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="getArticleContent(scope.$index)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="split-page">
        <el-pagination
          :current-page="search.currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="search.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 编辑器，写文章页面 -->
    <Editor v-if="isShow.editor === 1" @click="backArticleList" />

    <!-- 文章内容页 -->
    <el-card v-if="isShow.editor === 2">
      <div class="title">
        <span>文章详情</span>
        <el-divider content-position="right">你有成为大师的潜质</el-divider>
      </div>
      <div class="article-details">
        <h4>{{ articleData[selectedIndex].articleTitle }}</h4>
        <div class="content" v-html="articleContent" />
      </div>
      <div class="back-btn" @click="isShow.editor = 0">返回</div>
    </el-card>
  </div>
</template>

<script>
import Editor from './components/VueEditor'
import { getArticleList, getArticleContent } from '@/api/article'

export default {
  components: {
    Editor
  },
  data() {
    return {
      articleData: [],
      count: 0,
      isShow: {
        editor: 0 // 0文章列表，1添加文章，2查看文章
      },
      selectedIndex: -1,
      articleContent: '',
      search: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created() {
    // 获取文章列表
    this.getList()
  },
  methods: {
    /**
     * @description 获取文章列表
     */
    getList() {
      getArticleList(this.search).then((data) => {
        this.articleData = data.articles.map(item => {
          return {
            ...item,
            ADDTIME: item.ADDTIME.replace(/T|Z/g, ' ').substr(0, 19)
          }
        })
        console.log(this.articleData)
        this.count = data.count
      })
    },
    // 查看文章内容
    getArticleContent(index) {
      this.selectedIndex = index
      this.isShow.editor = 2

      const id = this.articleData[index].articleId

      // 获取文章内容
      getArticleContent({ id }).then(data => {
        this.articleContent = data.articleContent
      })
    },
    // 改变每页显示条数
    handleSizeChange(pageSize) {
      this.search.pageSize = pageSize

      this.getList()
    },
    // 改变页码
    handleCurrentChange(currentPage) {
      this.search.currentPage = currentPage
      this.getList()
    },
    // 从写文章页返回事件
    backArticleList(isAdd) {
      this.isShow.editor = 0

      if (isAdd) {
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 80px;

  span {
    font-size: 24px;
  }
}

.split-page {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 auto;
  width: 90%;
  height: 50px;
}

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
  background: #c7edcc;
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

