<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>文章审核列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
      <el-table
        :data="articleData"
        border
        stripe
        style="margin: 30px auto; width: 90%"
      >
        <el-table-column
          fixed
          align="center"
          prop="articleTitle"
          label="标题"
        />
        <el-table-column align="center" prop="author" label="作者" />
        <el-table-column align="center" prop="categoryType" label="分类" />
        <el-table-column align="center" prop="stateDes" label="状态" />
        <el-table-column align="center" prop="addtime" label="添加时间" />
        <el-table-column align="center" prop="isdelete" label="是否已删除" />
        <el-table-column align="center" label="操作" min-width="240">
          <template slot-scope="scope">
            <div class="btn-list">
              <el-button
                size="mini"
                @click="getArticleContent(scope.$index)"
              >查看</el-button>
              <el-button
                v-if="scope.row.stateDes !== '待审核'"
                size="mini"
                :loading="once.delBtn"
                @click="changeArticleState(scope.row.articleId, 1)"
              >待审核</el-button>
              <el-button
                v-if="scope.row.stateDes !== '所有用户可见'"
                size="mini"
                :loading="once.delBtn"
                @click="changeArticleState(scope.row.articleId, 3)"
              >所有人可见</el-button>
              <el-button
                v-if="scope.row.stateDes !== '仅管理员可见'"
                size="mini"
                :loading="once.delBtn"
                @click="changeArticleState(scope.row.articleId, 4)"
              >管理员可见</el-button>
              <el-button
                v-if="scope.row.isdelete === ''"
                size="mini"
                type="danger"
                :loading="once.delBtn"
                @click="delArticleHandler(scope.row.articleId)"
              >删除</el-button>
              <el-button
                v-if="scope.row.isdelete === '已删除'"
                size="mini"
                type="primary"
                :loading="once.delBtn"
                @click="reduction(scope.row.articleId)"
              >恢复</el-button>
            </div>
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
import { getAllArticle, delArticle, checkArticleState, reductionArticle } from '@/api/article'

export default {
  data() {
    return {
      articleData: [],
      count: 0,
      search: {
        currentPage: 1,
        pageSize: 10
      },
      once: {
        delBtn: false
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
      getAllArticle(this.search).then((data) => {
        this.articleData = data.articles.map((item) => {
          return {
            ...item,
            isdelete: item.isdelete ? '已删除' : ''
          }
        })

        this.count = data.count
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
    // 查看文章内容
    getArticleContent(index) {
      const id = this.articleData[index].articleId
      const title = this.articleData[index].articleTitle

      this.$router.push(`/article/details/${id}/${title}`)
    },
    // 删除文章
    delArticleHandler(id) {
      this.once.delBtn = true

      this.$confirm('此操作将永久删除该文章, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delArticle({ id })
            .then(() => {
              this.getList()

              this.$message({
                type: 'success',
                message: '删除成功!'
              })

              this.once.delBtn = false
            })
            .catch(() => {
              this.once.delBtn = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })

          this.once.delBtn = false
        })
    },
    // 审核文章
    changeArticleState(articleId, stateNum) {
      this.$confirm('确定修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.once.delBtn = true

          checkArticleState({ articleId, stateNum }).then(() => {
            this.$message({
              type: 'success',
              message: '修改状态成功'
            })

            this.getList()
            this.once.delBtn = false
          }).catch(() => {
            this.once.delBtn = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })

          this.once.delBtn = false
        })
    },
    // 恢复文章
    reduction(articleId) {
      this.$confirm('确定修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.once.delBtn = true

          reductionArticle({ articleId }).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })

            this.getList()
            this.once.delBtn = false
          }).catch(() => {
            this.once.delBtn = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })

          this.once.delBtn = false
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

.btn-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>

