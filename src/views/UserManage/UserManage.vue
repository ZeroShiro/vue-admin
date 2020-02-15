<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isDialog"
      :append-to-body="true"
      center
      width="560px"
    >
      <user-form
        ref="resform"
        :formLabel="operateFormLabel"
        :form="operateForm"
        :isConfig="isConfig"
      ></user-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="header">
      <el-button type="primary" @click="addUser" v-if="$store.state.user.info.edit">新增+</el-button>
      <div class="search">
        <el-input v-model="key" placeholder="请输入姓名搜索"></el-input>
        <el-button class="search-input" type="primary" @click="getTabelList(key)">搜索</el-button>
      </div>
    </div>
    <div class="container">
      <user-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @page="getTabelList()"
        @edit="editUser"
        @delete="delUser"
      ></user-table>
    </div>
  </div>
</template>

<script>
import userForm from "@/components/user/Form.vue";
import userTable from "@/components/user/Table.vue";
export default {
  data() {
    return {
      //dialog
      isDialog: false,
      operateType: "add",
      operateForm: {
        id: "",
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: ""
      },
      operateFormLabel: [
        {
          model: "name",
          label: "姓名"
        },
        {
          model: "age",
          label: "年龄"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        },
        {
          model: "addr",
          label: "地址"
        }
      ],
      //表格数据
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
          width: 100
        },
        {
          prop: "age",
          label: "年龄",
          width: 85
        },
        {
          prop: "sexLabel",
          label: "性别",
          width: 85
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址"
        }
      ],
      //表格参数
      config: {
        page: 1,
        total: 20,
        loading: false
      },
      //搜索数据
      key: "",
      isConfig: 1
    };
  },
  components: {
    userForm,
    userTable
  },
  methods: {
    getTabelList(name = "") {
      this.config.loading = true;
      // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
      name ? (this.config.page = 1) : "";
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
            name
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    addUser() {
      //新增用户
      this.isConfig += 1; // 清除表单规则
      this.operateForm = {};
      this.operateType = "add";
      this.isDialog = true;
    },
    editUser(row) {
      //编辑用户
      this.isConfig += 1; // 清除表单规则
      this.operateType = "edit";
      this.isDialog = true;
      let newrow = JSON.parse(JSON.stringify(row));
      this.operateForm = newrow;
    },
    confirm() {
      // 更新用户
      if (this.$refs.resform.submitForm("form")) {
        if (this.operateType === "edit") {
          this.$http.post("/api/user/edit", this.operateForm).then(() => {
            this.isDialog = false;
            this.getTabelList();
          });
        } else {
          this.$http.post("/api/user/add", this.operateForm).then(() => {
            this.isDialog = false;
            this.getTabelList();
          });
        }
        this.$message({
          type: "success",
          message: "更新成功!",
          duration: 500
        });
      }
    },
    delUser(row) {
      // 删除用户
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("/api/user/del", {
              params: {
                id: row
              }
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
                duration: 500
              });
            })
            .then(() => {
              this.getTabelList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 500
          });
        });
    }
  },
  created() {
    this.getTabelList();
  }
};
</script>

<style lang="scss" scoped>
.manage {
  height: 100%;
  .container {
    padding-bottom: 10px;
    height: calc(100% - 62px);
    .common-table {
      height: 95%;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .search {
      width: 500px;
      display: flex;
      justify-content: space-between;
    }
    margin-bottom: 8px;
  }
}
</style>
