<template>
  <div class="pageone-body">
    <div>
      <el-button type="primary" @click="addUser">新增账户</el-button>
    </div>
    <div class="pageone_table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="账户级别" prop="rank"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="简介" show-overflow-tooltip prop="explication"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope" v-if="scope.row.name !== 'Admin'">
            <el-button size="mini" @click="editUser(scope.$index)">编辑</el-button>
            <el-button size="mini" @click="delUser(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      class="dialog"
      :title="title"
      :visible.sync="show"
      @close="resetForm('ruleForm')"
      append-to-body
      center
    >
      <div>
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.explication"></el-input>
          </el-form-item>
          <el-form-item label="等级">
            <el-select v-model="form.rank" placeholder="选择等级">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="3" style="font-size:16px;">Menus</el-col>
            <el-col :span="21">
              <el-tree
                :data="data"
                ref="tree"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2]"
                @check="handleCheckChange"
              ></el-tree>
            </el-col>
          </el-row>
          <el-form-item class="pageone-btn">
            <el-button @click="resetForm('ruleForm')">取 消</el-button>

            <el-button type="primary" @click="addsubmit('ruleForm')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户列表
      tableData: null,
      form: {
        username: "",
        password: "",
        rank: "",
        explication: "",
        token: ""
      },
      // dialog表头
      title: "",
      // dialog
      show: false,
      // ref
      tree: null,
      // 树形数据
      data: [],
      // 树形展示数组
      keys: [],
      // 需上传的数据
      uersDataInfo: [],
      infoList: {},
      // select
      options: [
        {
          value: "普通用户",
          label: "普通用户"
        },
        {
          value: "管理员",
          label: "管理员"
        }
      ],
      // 编辑or新增
      setFlag: false,
      message: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/login/getInfoMenu").then(res => {
        this.tableData = {};
        this.data = [];
        this.uersDataInfo = [];
        this.keys = [];
        this.tableData = res.data;
        this.setFlag = false;
        this.randerTree();
      });
    },
    // 新增用户
    addUser() {
      this.keys = [];
      this.show = true;
      this.title = "新增人员";
      this.setFlag = true;
      this.setKeys(this.keys);
      this.uersDataInfo = [];
      let token =
        Math.ceil(Math.random() * 1390 * Math.random()) +
        "-" +
        Math.ceil(Math.random() * 1390) +
        "-" +
        Math.ceil(Math.random() * 1390) +
        "-" +
        Math.ceil(Math.random() * 1390);
      this.form = {
        username: "",
        password: "",
        rank: "普通用户",
        explication: "",
        token: token,
        name: ""
      };
    },
    // 删除用户
    delUser(i) {
      this.form.token = this.tableData[i].token;
      let data = {
        id: this.form.token
      };
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post("/login/del", data).then(() => {
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑用户
    editUser(i) {
      this.show = true;
      this.setFlag = false;
      this.title = "编辑权限";
      this.keys = [];
      this.infoList = {};
      this.form = {
        username: "",
        password: "",
        rank: "",
        explication: "",
        token: ""
      };

      let count = 0;

      for (let prop in this.tableData[i].infoList) {
        count++;
        this.keys.push(count);
      }
      this.infoList = this.tableData[i].infoList;
      this.form.username = this.tableData[i].username;
      this.form.name = this.tableData[i].username;
      this.form.password = this.tableData[i].password;
      this.form.rank = this.tableData[i].rank;
      this.form.explication = this.tableData[i].explication;
      this.form.token = this.tableData[i].token;

      this.setKeys(this.keys);
    },
    // 初始化渲染树形组件列表
    randerTree() {
      let count = 1;
      for (let prop in this.tableData[0].infoList) {
        let p = prop;
        this.data.push({
          id: count,
          label: this.tableData[0].infoList[prop],
          is: prop
        });
        count++;
      }
    },
    // 设置选中状态
    setKeys(keys) {
      Promise.resolve().then(() => {
        this.$refs["tree"].setCheckedKeys(keys, true);
      });
    },
    // 保存已选menu列表
    handleCheckChange(data, node) {
      this.uersDataInfo = node.checkedNodes;
    },
    // 提交按钮
    addsubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.setFlag) {
            //新增api
            this.addApi();
          } else {
            //编辑api 是否修改了menu
            this.editApi();
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.show = false;
      this.$refs[formName].resetFields();
    },
    // 新增接口
    addApi() {
      this.message = "添加成功";
      let data = this.userData();
      this.$http.post("/login/setMenu", data).then(() => {
        this.getData();
        this.show = false;
        this.$message({
          message: this.message,
          type: "success",
          duration: 500
        });
      });
    },
    // 编辑接口
    editApi() {
      this.message = "修改成功";
      let data = this.userData();
      this.$http.post("/login/restMenu", data).then(() => {
        this.getData();
        this.show = false;
        this.$message({
          message: this.message,
          type: "success",
          duration: 500
        });
      });
    },
    //设置传递数据
    userData() {
      let infoList = {};
      // 设置infoList tree标签
      if (this.uersDataInfo.length !== 0) {
        this.uersDataInfo.forEach(item => {
          infoList[item.is] = item.label;
        });
      }
      let falg = Object.keys(infoList).length !== 0 ? true : false;
      let data = {
        // 判断是否修改menus
        falg: falg,
        info: {
          edit: infoList.edit,
          username: this.form.username,
          password: this.form.password,
          rank: this.form.rank,
          name: this.form.username,
          explication: this.form.explication,
          infoList:
            Object.keys(infoList).length !== 0 ? infoList : this.infoList,
          token: this.form.token
        }
      };
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.pageone-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  .pageone_table {
    margin-top: 10px;
  }
}
.pageone-btn {
  margin: 0 auto;
  margin-top: 25px;
  .el-form-item__content {
    margin-left: 110px;
  }
}
/deep/ .el-dialog {
  min-width: 357px;
  max-width: 550px;
}
/deep/.el-input__inner {
  margin: 6px;
  min-width: 227px;
}
</style>
