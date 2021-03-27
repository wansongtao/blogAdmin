<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>用户列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
      <div style="margin-left: 5%">
        <el-button type="primary" @click="openDialog">添加用户</el-button>
      </div>
      <el-table
        :data="userList"
        border
        stripe
        style="margin: 30px auto; width: 90%"
      >
        <el-table-column
          fixed
          align="center"
          prop="userAccount"
          label="用户账号"
        />
        <el-table-column fixed align="center" prop="userName" label="用户名" />
        <el-table-column
          fixed
          align="center"
          prop="userGender"
          label="用户性别"
        />
        <el-table-column
          fixed
          align="center"
          prop="powerName"
          label="用户权限"
        />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :loading="once.reset"
              @click="resetPwd(scope.row.userAccount)"
            >重置密码</el-button>
            <el-button
              size="mini"
              type="danger"
              :loading="once.delbtn"
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

    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="40%"
      center
    >
      <el-form ref="form" :model="form" :rules="editRules" label-width="100px">
        <el-form-item label="用户账号" prop="userAccount">
          <el-input
            ref="userAccount"
            v-model="form.userAccount"
            placeholder="请输入2-6位且以字母开头的账号"
            name="userAccount"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item label="用户权限" prop="powerId">
          <el-radio
            v-for="item in powerList"
            :key="item.powerId"
            v-model="form.powerId"
            :label="item.powerId"
            border
            size="medium"
          >
            {{ item.powerName }}
          </el-radio>
        </el-form-item>
        <el-form-item label="用户昵称" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入1-8位中文字符"
            clearable
          />
        </el-form-item>
        <el-form-item label="用户性别" prop="userGender">
          <el-select v-model="form.userGender" placeholder="请选择性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="once.addbtn"
          @click="addUser"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  delUser,
  resetUserPwd,
  getPowerList,
  insertUser
} from '@/api/user'
import { validateNickName, validUsername } from '@/utils/validate'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      validUsername(value)
        ? callback()
        : callback(
          new Error(
            '请输入2-6位且以字母开头的账号，支持字母、数字、下划线组合'
          )
        )
    }

    const validateUserName = (rule, value, callback) => {
      validateNickName(value)
        ? callback()
        : callback(new Error('请输入1-8位中文字符'))
    }

    return {
      userList: [],
      count: 0,
      search: {
        currentPage: 1,
        pageSize: 10
      },
      powerList: [],
      once: {
        reset: false,
        delbtn: false,
        addbtn: false
      },
      dialogVisible: false,
      form: {
        userAccount: '',
        userName: '',
        userGender: '0',
        powerId: ''
      },
      editRules: {
        userAccount: [
          { required: true, trigger: 'blur', message: '账号不能为空' },
          { trigger: 'blur', min: 2, max: 6, message: '账号长度2-6位' },
          { trigger: 'blur', validator: validateUsername }
        ],
        powerId: [
          { required: true, message: '请选择用户权限', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请1-8位中文字符', trigger: 'blur' },
          {
            min: 1,
            max: 8,
            message: '长度在 1 到 8 个中文字符',
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validateUserName }
        ],
        userGender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
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
      this.once.reset = true
      this.$confirm('确定重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resetUserPwd({ userAccount })
            .then(() => {
              this.$message({
                type: 'success',
                message: '重置密码成功!'
              })
              this.once.reset = false
            })
            .catch(() => {
              this.once.reset = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
          this.once.reset = false
        })
    },
    // 删除用户
    delArticleHandler(userAccount) {
      this.once.delbtn = true

      this.$confirm('此操作将永久删除该用户, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUser({ userAccount })
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
              this.once.delbtn = false
            })
            .catch(() => {
              this.once.delbtn = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
          this.once.delbtn = false
        })
    },
    // 打开添加用户的弹窗
    openDialog() {
      this.dialogVisible = true

      if (this.powerList.length === 0) {
        // 获取权限列表
        getPowerList().then((data) => {
          this.powerList = data.powerList
        })
      }
    },
    addUser() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 开启登录加载
          this.once.addbtn = true

          insertUser(this.form)
            .then(() => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.getList()
              this.once.addbtn = false
              this.dialogVisible = false
            })
            .catch(() => {
              this.once.addbtn = false
            })
        }
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
