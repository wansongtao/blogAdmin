<template>
  <div class="app-container">
    <el-card>
      <div class="title">
        <span>文章详情</span>
        <el-divider content-position="right">你有成为大师的潜质</el-divider>
      </div>
      <div class="article-details">
        <h4>{{ title }}</h4>
        <div class="content" v-html="articleContent" />
      </div>
      <div class="btn">
        <el-button type="primary" round @click="$router.back()">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleContent } from '@/api/article'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      articleContent: ''
    }
  },
  created() {
    getArticleContent({ id: Number(this.id) }).then((data) => {
      this.articleContent = data.articleContent
    })
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

.article-details {
  background: #c7edcc;
  overflow: auto;

  h4 {
    font-size: 24px;
    line-height: 50px;
    text-align: center;
  }

  .content {
    overflow: auto;
    padding: 10px;
    height: calc(100vh - 360px);
    border-radius: 5px;

    &::-webkit-scrollbar {
      width: 8px;
      background: #eed1ac;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #91cfca;
      border-radius: 4px;
    }

    ::v-deep p {
      text-indent: 2em;
      text-align: left;
      line-height: 2em;
    }

    ::v-deep img {
      display: block;
      margin: 10px auto;
      max-width: 100%;
    }

    ::v-deep pre {
      padding: 0 10px;
      text-align: left;
      line-height: 2em;
      background: #eee;
      overflow-x: auto;
    }

    ::v-deep blockquote {
      text-align: center;
    }

    ::v-deep h1 {
      text-align: center;
      line-height: 1.6em;
    }

    ::v-deep h2 {
      text-align: center;
      line-height: 1.6em;
    }

    ::v-deep h3 {
      text-align: center;
      line-height: 1.6em;
    }

    ::v-deep h4 {
      text-align: center;
      line-height: 1.6em;
    }

    ::v-deep h5 {
      text-align: center;
      line-height: 1.6em;
    }

    ::v-deep h6 {
      text-align: center;
      line-height: 1.6em;
    }
  }

}
  .btn {
    padding: 10px 0;
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
