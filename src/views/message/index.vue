<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>留言列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
      <el-table
        :data="messageList"
        border
        stripe
        style="margin: 30px auto; width: 90%"
      >
        <el-table-column
          fixed
          align="center"
          prop="msgId"
          label="编号"
        />
        <el-table-column fixed align="center" prop="msgContent" label="内容" min-width="200" />
        <el-table-column
          fixed
          align="center"
          prop="addTime"
          label="时间"
        />
        <el-table-column
          fixed
          align="center"
          prop="checkAcc"
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
                :loading="onceBtn"
                @click="checkCommentHandler(scope.row.msgId, 2)"
              >通过</el-button>
              <el-button
                size="mini"
                :loading="onceBtn"
                @click="checkCommentHandler(scope.row.msgId, 3)"
              >不通过</el-button>
            </template>
            <el-button
              size="mini"
              type="danger"
              :loading="onceBtn"
              @click="delCommentHandler(scope.row.msgId)"
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
import { getMessageList, checkMessage, delMessage } from '@/api/message'

export default {
  data() {
    return {
      messageList: [],
      count: 0,
      search: {
        currentPage: 1,
        pageSize: 10
      },
      onceBtn: false
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
      getMessageList(this.search).then((data) => {
        this.messageList = data.messageList
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
    // 评论审核
    checkCommentHandler(msgId, stateId) {
      this.onceBtn = true
      checkMessage({ msgId, stateId }).then(() => {
        this.$message({
          type: 'success',
          message: '审核成功!'
        })

        this.onceBtn = false
        this.getList()
      }).catch(() => {
        this.onceBtn = false
      })
    },
    // 删除评论
    delCommentHandler(msgId) {
      this.$confirm('此操作将永久删除该评论, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.onceBtn = true

          delMessage({ msgId }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            this.onceBtn = false
            this.getList()
          }).catch(() => {
            this.onceBtn = false
          })
        })
        .catch(() => {
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

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>

