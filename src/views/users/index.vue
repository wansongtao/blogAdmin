<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>用户列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
      <el-table
        :data="userList"
        border
        stripe
        style="margin: 30px auto; width: 90%; "
      >
        <el-table-column
          fixed
          align="center"
          prop="userAccount"
          label="用户账号"
        />
        <el-table-column
          fixed
          align="center"
          prop="userName"
          label="用户名"
        />
        <el-table-column fixed align="center" prop="userGender" label="用户性别" />
        <el-table-column fixed align="center" prop="powerName" label="用户权限" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="resetPwd(scope.row.userAccount)"
            >重置密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delArticleHandler(scope.row.userAccount)"
            >删除用户</el-button>
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
import { getUserList } from '@/api/user'

export default {
  data() {
    return {
      userList: [],
      count: 0,
      selectedIndex: -1,
      search: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created() {
    // 获取用户列表
    this.getList()
  },
  methods: {
    /**
     * @description 获取用户列表
     */
    getList() {
      getUserList(this.search).then((data) => {
        this.userList = data.userList.map((item) => {
          return {
            ...item,
            userGender: item.userGender === '1' ? '男' : '女'
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
    // 重置密码
    resetPwd(userAccount) {

    },
    // 删除用户
    delArticleHandler(userAccount) {
      this.$confirm('此操作将永久删除该用户, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
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
