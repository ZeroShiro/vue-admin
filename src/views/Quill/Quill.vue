<template>
  <div class="quill-box" v-loading="isLoad">
    <label for="input">
      <span class="title">标题</span>
    </label>
    <el-input
      class="input"
      v-model="content.title"
      placeholder="请输入标题"
    ></el-input>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      name="img"
      :on-change="handleChange"
      :on-success="uploadDone"
      :before-upload="beforeUpload"
      :file-list="fileList"
      v-loading="quillUpdateImg"
    ></el-upload>
    <!-- 图片上传组件辅助-->
    <quill-editor
      class="editor"
      v-model="content.value"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <div class="btn">
      <el-button type="primary" @click="submitForm">提交</el-button>
    </div>
  </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      isLoad: false,
      content: {
        value: "",
        title: ""
      },
      fileList: [
        {
          name: "",
          url: ""
        }
      ],
      quillUpdateImg: false, // 图片上传显示loading动画
      editorOption: {
        theme: "snow", // or 'bubble'
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              link: function(value) {
                if (value) {
                  var href = prompt("请输入url");
                  this.quill.format("link", href);
                } else {
                  this.quill.format("link", false);
                }
              }
            }
          }
        }
      }
    };
  },

  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content.value);
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
      setTimeout(() => {
        this.quillUpdateImg = false;
      }, 500);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    uploadDone() {},
    submitForm() {
      if (this.content.title !== "") {
        this.isLoad = true;
        setTimeout(() => {
          this.isLoad = false;
        }, 500);
        this.$message({
          type: "success",
          message: "提交成功"
        });
      } else {
        this.$message.error("标题不能为空");
      }
    }
  }
};
</script>

<style lang="scss">
.quill-box {
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 18px;
  height: 610px;
  position: relative;
  .input {
    margin-top: 5px;
  }
  .title {
    margin-left: 5px;
    font-size: 16px;
    color: #69aff0;
  }
  .btn {
    position: absolute;
    bottom: 10px;
  }
}
.editor {
  line-height: normal !important;
  height: 300px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
