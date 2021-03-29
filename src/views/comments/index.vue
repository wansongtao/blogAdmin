<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>评论列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
      <el-table
        :data="commentList"
        border
        stripe
        style="margin: 30px auto; width: 90%"
      >
        <el-table-column
          fixed
          align="center"
          prop="commentId"
          label="评论编号"
        />
        <el-table-column fixed align="center" prop="commentContent" label="评论内容" min-width="200" />
        <el-table-column
          fixed
          align="center"
          prop="commentTime"
          label="评论时间"
        />
        <el-table-column
          fixed
          align="center"
          prop="articleTitle"
          label="评论的文章"
        />
        <el-table-column
          fixed
          align="center"
          prop="auditor"
          label="审核员"
        />
        <el-table-column
          fixed
          align="center"
          prop="stateDes"
          label="状态"
        />
        <el-table-column align="center" label="操作" min-width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.stateDes === '待审核'">
              <el-button
                size="mini"
                :loading="once.reset"
                @click="passComment(scope.row.commentId)"
              >通过</el-button>
              <el-button
                size="mini"
                :loading="once.reset"
                @click="noPassComment(scope.row.commentId)"
              >不通过</el-button>
            </template>
            <el-button
              size="mini"
              type="danger"
              :loading="once.delbtn"
              @click="delArticleHandler(scope.row.commentId)"
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
import { getAllCommentList } from '@/api/comment'

export default {
  data() {
    return {
      commentList: [],
      count: 0,
      search: {
        currentPage: 1,
        pageSize: 10
      },
      once: {
        reset: false,
        delbtn: false
      }
    }
  },
  created() {
    // 获取评论列表
    this.getList()
  },
  methods: {
    /**
     * @description 获取评论列表
     */
    getList() {
      getAllCommentList(this.search).then((data) => {
        this.commentList = data.comment
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
    passComment(commentId) {

    },
    noPassComment(commentId) {

    },
    // 删除用户
    delArticleHandler(commentId) {
      this.once.delbtn = true

      this.$confirm('此操作将永久删除该用户, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
          this.once.delbtn = false
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

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>

