<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>用户列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
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
            >重置密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delArticleHandler(scope.row.articleId)"
            >删除</el-button>
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
  </div>
</template>

<script>
import { getArticleList, delArticle } from '@/api/article'

export default {
  data() {
    return {
      articleData: [],
      count: 0,
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

        this.count = data.count
      })
    },
    // 查看文章内容
    getArticleContent(index) {
      this.selectedIndex = index

      const id = this.articleData[index].articleId
      const title = this.articleData[index].articleTitle

      this.$router.push(`/article/details/${id}/${title}`)
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
    // 删除文章
    delArticleHandler(id) {
      this.$confirm('此操作将永久删除该用户, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle({ id }).then(() => {
          this.getList()

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
