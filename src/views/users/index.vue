<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>编辑用户信息</span>
        <el-divider content-position="right">人靠衣装，佛靠金装</el-divider>
      </div>
      <el-form ref="form" :model="form" :rules="editRules" label-width="100px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="$store.getters.baseURL + '/admin/upload'"
            :headers="{ Authorization: 'Bearer ' + $store.getters.token }"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.userImgUrl"
              v-imgErr="defaultImg"
              :src="$store.getters.baseURL + form.userImgUrl"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入1-8位中文字符"
            style="width: 30%"
            clearable
          />
        </el-form-item>
        <el-form-item label="微信" prop="weChat">
          <el-input
            v-model="form.weChat"
            placeholder="请输入您的微信号"
            style="width: 30%"
            clearable
          />
        </el-form-item>
        <el-form-item label="qq" prop="qqAcc">
          <el-input
            v-model="form.qqAcc"
            placeholder="请输入您的qq号"
            style="width: 30%"
            clearable
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入您的邮箱地址"
            style="width: 30%"
            clearable
          />
        </el-form-item>
        <el-form-item label="人生格言" prop="lifeMotto">
          <el-input
            v-model="form.lifeMotto"
            placeholder="请输入1-50位中文字符"
            style="width: 50%"
            clearable
          />
        </el-form-item>
        <el-form-item label="用户性别" prop="userGender">
          <el-select v-model="form.userGender" placeholder="请选择性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-col :span="5">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="hobby">
          <el-checkbox-group v-model="form.hobby">
            <el-checkbox label="阅读" name="type" />
            <el-checkbox label="旅游" name="type" />
            <el-checkbox label="游戏" name="type" />
            <el-checkbox label="电影" name="type" />
            <el-checkbox label="音乐" name="type" />
            <el-checkbox label="编程" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="个人简介" prop="personalDes">
          <el-input
            v-model="form.personalDes"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 8 }"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="updateInfo"
          >确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  validateNickName,
  validateQqAcc,
  validateEmail,
  validateLifeMotto
} from '@/utils/validate'
import { editUserInfo } from '@/api/user'

export default {
  data() {
    const validateUserName = (rule, value, callback) => {
      validateNickName(value)
        ? callback()
        : callback(new Error('请输入1-8位中文字符'))
    }
    const validQqAcc = (rule, value, callback) => {
      validateQqAcc(parseInt(value))
        ? callback()
        : callback(new Error('请输入5 到 11 个数字且不能已零开头'))
    }
    const validEmail = (rule, value, callback) => {
      validateEmail(value)
        ? callback()
        : callback(new Error('请输入正确的邮箱地址'))
    }
    const validLifeMotto = (rule, value, callback) => {
      validateLifeMotto(value)
        ? callback()
        : callback(new Error('请输入1-50个中文字符'))
    }
    const users = JSON.parse(sessionStorage.users)
    return {
      form: {
        userImgUrl: users.avatar,
        userName: users.name || '',
        qqAcc: users.qqAcc || '',
        weChat: users.weChat || '',
        email: users.email || '',
        lifeMotto: users.lifeMotto || '',
        userGender: users.userGender || '',
        birthday: users.birthday || '',
        hobby: users.hobby || [],
        personalDes: users.personalDes || ''
      },
      editRules: {
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
        weChat: [
          { required: true, message: '请输入您的微信号', trigger: 'blur' },
          {
            min: 1,
            max: 18,
            message: '长度在 1 到 18 个字符',
            trigger: 'blur'
          }
        ],
        qqAcc: [
          { required: true, message: '请输入您的qq号', trigger: 'blur' },
          {
            min: 5,
            max: 11,
            message: '长度在 5 到 11 个数字',
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validQqAcc }
        ],
        email: [
          { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
          { trigger: 'blur', validator: validEmail }
        ],
        lifeMotto: [
          { required: true, message: '请输入您的人生格言', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个中文字符',
            trigger: 'blur'
          },
          { trigger: 'blur', validator: validLifeMotto }
        ],
        userGender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        hobby: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个兴趣爱好',
            trigger: 'change'
          }
        ],
        personalDes: [
          { required: true, message: '请输入您的个人简介', trigger: 'blur' },
          {
            min: 10,
            max: 300,
            message: '长度在 10 到 300 个字符',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      defaultImg: require('@/assets/common/you1.jpeg')
    }
  },
  methods: {
    updateInfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(sessionStorage.users)
          data.userName = data.name
          data.userImgUrl = data.avatar

          // eslint-disable-next-line prefer-const
          let param = null
          for (const [key, value] of Object.entries(this.form)) {
            // 将修改了的值保存到一个对象中
            if (key !== 'hobby' && value !== data[key]) {
              if (param === null) { param = {} }
              param[key] = value
            }
          }

          // 如果修改了爱好，则将爱好保存到param对象中
          if (data.hobby.length !== this.form.hobby.length) {
            if (param === null) { param = {} }
            param.hobby = this.form.hobby
          } else {
            const hobbyArr = this.form.hobby
            const temp = hobbyArr.every((item) => {
              return data.hobby.indexOf(item) > -1
            })

            if (!temp) {
              if (param === null) { param = {} }
              param.hobby = hobbyArr
            }
          }

          if (!param) {
            this.$message({
              type: 'warning',
              message: '您没有修改任何信息'
            })
            return
          }

          this.loading = true
          editUserInfo(param).then(() => {
            this.$store.dispatch('user/getInfo')
            this.loading = false
            this.$message.success('修改成功')
          }).catch(() => { this.loading = false })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      if (res.success) {
        this.form.userImgUrl = res.data.imgUrl
      } else {
        this.$message.error(res.message || '头像上传失败')
      }
    },
    beforeAvatarUpload(file) {
      const isImage = file.type.search(/^image/i) !== -1
      const isLtKb = file.size / 1024 / 1024 < 0.5

      if (!isImage) {
        this.$message.error('只能上传图片')
      }
      if (!isLtKb) {
        this.$message.error('上传头像图片大小不能超过 500kb!')
      }
      return isImage && isLtKb
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
.avatar-uploader {
  display: block;
  width: 60px;
  height: 60px;
  border: 1px dashed #908c8c;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}

::v-deep .el-textarea__inner {
  height: 100px;
  resize: none;
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
