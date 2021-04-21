<template>
  <div class="dashboard-container">
    <el-card :body-style="{ height: '60px', padding: '10px' }">
      <img
        src="~@/assets/common/indextop1.gif"
        alt="欢迎图片"
        class="topimg"
        @click="dialogVisible = true"
      >
      <p class="title">{{ title + name + "，祝您开心每一天！" }}</p>
    </el-card>
    <main>
      <div class="calendar">
        <el-card>
          <el-calendar v-model="value" />
        </el-card>
      </div>
      <div class="message">
        <el-card>
          <h4>待处理事项</h4>
          <div class="process">
            <p v-if="!pendingArticle && !pendingComment && !pendingMsg">您没有任何事项需要处理。</p>
            <p v-if="pendingArticle">您还有<strong>{{ pendingArticle }}</strong>篇文章未审核。</p>
            <p v-if="pendingComment">您还有<strong>{{ pendingComment }}</strong>条评论未审核。</p>
            <p v-if="pendingMsg">您还有<strong>{{ pendingMsg }}</strong>条留言未审核。</p>
          </div>
        </el-card>
      </div>
    </main>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="40%"
      center
    >
      <el-form ref="form" :model="form" :rules="editRules" label-width="100px">
        <el-form-item prop="oldPassword" label="原密码">
          <el-input
            key="passwordType1"
            v-model="form.oldPassword"
            show-password
            placeholder="请输入6-16且以字母开头的旧密码"
            name="oldPassword"
          />
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input
            key="passwordType2"
            v-model="form.newPassword"
            show-password
            placeholder="请输入6-16且以字母开头的新密码"
            name="newPassword"
            @keyup.enter.native="updatePwd"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="updatePwd"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validPassword } from '@/utils/validate'
import { updateUserPwd } from '@/api/user'
import CryptoJS from 'crypto-js'

export default {
  name: 'Dashboard',
  data() {
    const validatePassword = (rule, value, callback) => {
      validPassword(value)
        ? callback()
        : callback(
          new Error(
            '请输入6-16且以字母开头的密码，支持字母、数字、下划线、英文的.?!'
          )
        )
    }
    return {
      value: new Date(),
      dialogVisible: false,
      loading: false,
      form: {
        oldPassword: '',
        newPassword: ''
      },
      editRules: {
        oldPassword: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { trigger: 'blur', min: 6, max: 16, message: '密码长度6-16位' },
          { trigger: 'blur', validator: validatePassword }
        ],
        newPassword: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { trigger: 'blur', min: 6, max: 16, message: '密码长度6-16位' },
          { trigger: 'blur', validator: validatePassword }
        ]
      },
      pendingArticle: 0,
      pendingComment: 0,
      pendingMsg: 0
    }
  },
  computed: {
    ...mapGetters(['name']),
    title() {
      const nowTime = new Date().toTimeString().slice(0, 2)
      const timeNum = Number(nowTime)

      let title = ''

      if (timeNum >= 0 && timeNum < 5) {
        title = '凌晨好，'
      } else if (timeNum >= 5 && timeNum < 7) {
        title = '清晨好，'
      } else if (timeNum >= 7 && timeNum < 12) {
        title = '上午好，'
      } else if (timeNum >= 12 && timeNum < 14) {
        title = '中午好，'
      } else if (timeNum >= 14 && timeNum < 18) {
        title = '下午好，'
      } else if (timeNum >= 18 && timeNum < 24) {
        title = '晚上好，'
      } else {
        title = '您好，'
      }

      return title
    }
  },
  created() {
    this.$store.dispatch('user/getInfo').then((data) => {
      this.pendingArticle = data.pendingArticle || 0
      this.pendingComment = data.pendingComment || 0
      this.pendingMsg = data.pendingMsg || 0
    })
  },
  methods: {
    // 修改密码
    updatePwd() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true

          const key = CryptoJS.MD5(this.form.oldPassword).toString()
          const data = CryptoJS.AES.encrypt(JSON.stringify(this.form), key).toString()

          updateUserPwd({ pwd: data }).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })

            this.dialogVisible = false
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.topimg {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  cursor: pointer;
}

.title {
  margin: 0 0 0 60px;
  padding: 0 10px;
  font-size: 30px;
  line-height: 60px;
}

main {
  margin-top: 20px;

  .calendar {
    float: left;
    width: 65%;
  }

  .message {
    float: right;
    width: 33%;

    h4 {
      margin: 0 0 0 0;
      height: 53px;
      line-height: 53px;
      border-bottom: 1px solid #ebeef5;
    }
  }

  .process {
    padding: 10px;

    p {
      font-size: 24px;
      line-height: 50px;

      strong {
        padding: 0 10px;
        color: red;
      }
    }
  }

  ::v-deep .el-card {
    overflow: auto;
    height: calc(100vh - 200px);

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
}
</style>
