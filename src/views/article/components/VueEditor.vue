<template>
  <el-card>
    <div class="title">
      <span>写文章</span>
      <el-divider content-position="right">不积跬步无以至千里</el-divider>
    </div>
    <div class="article-item">
      <span>文章标题：</span>
      <div>
        <el-input
          v-model="title"
          placeholder="请输入1-50位字符"
          maxlength="50"
        />
      </div>
    </div>

    <div class="article-item">
      <span>文章分类：</span>
      <div>
        <div>
          <el-radio
            v-for="item in categories"
            :key="item.categoryType"
            v-model="selectCategory"
            :label="item.categoryId"
            border
          >{{ item.categoryType }}</el-radio>
        </div>
      </div>
    </div>

    <div class="editor_wrap">
      <span style="height: 30px; line-height: 30px">文章内容：</span>
      <!-- 图片上传组件辅助-->
      <el-upload
        id="editorimg"
        class="avatar-uploader"
        :action="$store.getters.baseURL + '/admin/upload'"
        :headers="{ Authorization: 'Bearer ' + $store.getters.token }"
        :multiple="false"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
      />
      <quill-editor
        ref="myQuillEditor"
        v-model="content"
        v-loading="quillUpdateImg"
        class="editor"
        :options="editorOption"
        @change="onEditorChange($event)"
      />
    </div>

    <div class="btn">
      <el-button
        type="primary"
        :loading="loading"
        round
        @click="submitArticle"
      >确认</el-button>
      <el-button type="info" round @click="resetContent">取消</el-button>
    </div>
  </el-card>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { getCategory, addArticle } from '@/api/article'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进  2
  [
    {
      color: [
        // 字体颜色
        '#ffffff',
        '#ffd7d5',
        '#ffdaa9',
        '#fffed5',
        '#d4fa00',
        '#73fcd6',
        '#a5c8ff',
        '#ffacd5',
        '#ff7faa',
        '#d6d6d6',
        '#ffacaa',
        '#ffb995',
        '#fffb00',
        '#73fa79',
        '#00fcff',
        '#78acfe',
        '#d84fa9',
        '#ff4f79',
        '#b2b2b2',
        '#d7aba9',
        '#ff6827',
        '#ffda51',
        '#00d100',
        '#00d5ff',
        '#0080ff',
        '#ac39ff',
        '#ff2941',
        '#888888',
        '#7a4442',
        '#ff4c00',
        '#ffa900',
        '#3da742',
        '#3daad6',
        '#0052ff',
        '#7a4fd6',
        '#d92142',
        '#000000',
        '#7b0c00',
        '#ff0000',
        '#d6a841',
        '#407600',
        '#007aaa',
        '#021eaa',
        '#797baa',
        '#ab1942'
      ]
    },
    {
      background: [
        // 背景颜色
        '#ffffff',
        '#ffd7d5',
        '#ffdaa9',
        '#fffed5',
        '#d4fa00',
        '#73fcd6',
        '#a5c8ff',
        '#ffacd5',
        '#ff7faa',
        '#d6d6d6',
        '#ffacaa',
        '#ffb995',
        '#fffb00',
        '#73fa79',
        '#00fcff',
        '#78acfe',
        '#d84fa9',
        '#ff4f79',
        '#b2b2b2',
        '#d7aba9',
        '#ff6827',
        '#ffda51',
        '#00d100',
        '#00d5ff',
        '#0080ff',
        '#ac39ff',
        '#ff2941',
        '#888888',
        '#7a4442',
        '#ff4c00',
        '#ffa900',
        '#3da742',
        '#3daad6',
        '#0052ff',
        '#7a4fd6',
        '#d92142',
        '#000000',
        '#7b0c00',
        '#ff0000',
        '#d6a841',
        '#407600',
        '#007aaa',
        '#021eaa',
        '#797baa',
        '#ab1942'
      ]
    }
  ],
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小 2
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ font: [] }], // 字体种类 2
  [{ direction: 'rtl' }], // 文本方向  2
  [{ align: [] }], // 对齐方式 2
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'] // 链接、图片、视频
]

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      title: '',
      categories: [{ categoryId: 101, categoryType: '错了' }],
      selectCategory: '',
      content: '',
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        theme: 'snow', // or 'bubble'
        placeholder: '您想说点什么？',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('#editorimg input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      loading: false
    }
  },
  created() {
    // 获取文章分类列表
    getCategory().then((data) => {
      this.categories = data.categories
      this.selectCategory = this.categories[0].categoryId
    })
  },
  methods: {
    onEditorChange({ html, text }) {
      this.content = html
      // 内容改变事件
      //   this.$emit('textareaData', this.content)
    },
    // 富文本图片上传前
    beforeUpload(file) {
      // 显示loading动画
      this.quillUpdateImg = true
      const isImage = file.type.search(/^image/i) !== -1
      const isLtKb = file.size / 1024 / 1024 < 0.5

      if (!isImage) {
        this.quillUpdateImg = false
        this.$message.error('只能上传图片')
      }

      if (!isLtKb) {
        this.quillUpdateImg = false
        this.$message.error('上传头像图片大小不能超过 500kb!')
      }
      return isImage && isLtKb
    },
    uploadSuccess(res) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.success) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(
          length,
          'image',
          this.$store.getters.baseURL + res.data.imgUrl
        )
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    // 确定添加文章
    submitArticle() {
      if (this.title.length === 0 || this.title.length > 50) {
        this.$message.error('请输入1-50位字符的文章标题')
        return false
      } else if (!this.content.length) {
        this.$message.error('请输入文章内容')
        return false
      }

      const data = {
        articleTitle: this.title,
        articleImgUrl: this.avatar,
        articleContent: this.content,
        categoryId: this.selectCategory
      }

      addArticle(data).then(() => {
        this.$message.success('添加成功')

        this.resetContent()
      })
    },
    // 取消添加，清空内容
    resetContent() {
      this.title = ''
      this.selectCategory = this.categories[0].categoryId
      this.content = ''
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

.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;

  span {
    width: 100px;
  }

  div {
    flex: 1;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  display: block;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
 <style scoped>
.editor_wrap /deep/ .avatar-uploader {
  display: none;
}
.editor_wrap /deep/ .editor {
  line-height: normal !important;
  height: 520px;
  margin-bottom: 60px;
}
.editor_wrap /deep/ .editor .ql-bubble .ql-editor a {
  color: #136ec2;
}
.editor_wrap /deep/ .editor img {
  max-width: 720px;
  margin: 10px;
}
.editor_wrap /deep/ .ql-snow .ql-color-picker .ql-picker-options {
  padding: 3px 5px;
  width: 192px;
}
.editor_wrap /deep/ .ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.editor_wrap /deep/ .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.editor_wrap /deep/ .ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.editor_wrap /deep/ .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="small"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="large"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="huge"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-label::before,
.editor_wrap /deep/ .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="1"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="2"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="3"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="4"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="5"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-label[data-value="6"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-header
  .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-label::before,
.editor_wrap /deep/ .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="serif"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="monospace"]::before,
.editor_wrap
  /deep/
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
