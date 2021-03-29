<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>分类列表</span>
        <el-divider content-position="right">大梦一场空</el-divider>
      </div>
      <div style="margin-left: 5%">
        <el-button type="primary" @click="openDialog">添加分类</el-button>
      </div>
      <el-table
        :data="categoryList"
        border
        stripe
        style="margin: 30px auto; width: 90%"
      >
        <el-table-column
          fixed
          align="center"
          prop="categoryId"
          label="分类编号"
        />
        <el-table-column fixed align="center" prop="categoryType" label="分类名称" />
        <el-table-column
          fixed
          align="center"
          prop="ADDACC"
          label="添加人账号"
        />
        <el-table-column
          fixed
          align="center"
          prop="ADDTIME"
          label="添加时间"
        />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :loading="onceBtn"
              @click="updateCategory(scope.row.categoryId)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              :loading="onceBtn"
              @click="delCatetgory(scope.row.categoryId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="form" :rules="editRules" label-width="100px">
        <el-form-item label="分类名称" prop="categoryType">
          <el-input
            v-model="form.categoryType"
            placeholder="请输入1-10位字符"
            clearable
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="onceBtn"
          @click="submitHandler"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategory, updateCategoryName, addCategory, delCategory } from '@/api/article'

export default {
  data() {
    return {
      categoryList: [],
      onceBtn: false,
      dialogVisible: false,
      title: '添加分类',
      updateId: '',
      form: {
        categoryType: ''
      },
      editRules: {
        categoryType: [
          { required: true, trigger: 'blur', message: '分类名称不能为空' },
          { trigger: 'blur', min: 1, max: 10, message: '分类名称长度1-10位' }
        ]
      }
    }
  },
  created() {
    // 获取分类列表
    this.getList()
  },
  methods: {
    /**
     * @description 获取分类列表
     */
    getList() {
      getCategory().then((data) => {
        this.categoryList = data.categories
      })
    },
    openDialog() {
      this.title = '添加分类'
      this.dialogVisible = true
      this.updateId = ''
    },
    // 修改分类
    updateCategory(id) {
      this.title = '修改分类'
      this.dialogVisible = true
      this.updateId = id
    },
    // 删除分类
    delCatetgory(categoryId) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.onceBtn = true

        delCategory(categoryId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })

          this.onceBtn = false
          this.getList()
        }).catch(() => {
          this.onceBtn = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加/修改分类
    submitHandler() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onceBtn = true

          if (this.updateId) {
            // 修改栏目名称
            updateCategoryName({ categoryId: this.updateId, categoryType: this.form.categoryType }).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })

              this.onceBtn = false
              this.dialogVisible = false

              this.getList()
            }).catch(() => {
              this.onceBtn = false
            })
          } else {
            // 添加栏目
            addCategory({ categoryType: this.form.categoryType }).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功'
              })

              this.onceBtn = false
              this.dialogVisible = false
              this.getList()
            }).catch(() => {
              this.onceBtn = false
            })
          }
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
