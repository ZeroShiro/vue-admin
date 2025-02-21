<template>
  <div class="login">
    <div class="login-box">
      <el-form
        :model="login"
        ref="login"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h4>系统登陆</h4>
        <el-input
          type="text"
          size="large"
          class="item-input"
          v-model.number="login.username"
          autocomplete="off"
          prefix-icon="el-icon-user"
          placeholder="请输入用户名"
        ></el-input>
        <el-input
          type="password"
          size=" large"
          class="item-input"
          v-model.number="login.password"
          autocomplete="off"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
        ></el-input>
        <el-button
          class="login-btn"
          type="primary"
          @click="submitForm('login')"
          @keyup.enter="submitForm('login')"
          >提交</el-button
        >
        <!-- <el-button @click="resetForm('login')">重置</el-button> -->
        <p>管理员: admin 密码: admin</p>
        <p>普通用户: test1 密码: 123</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: "admin",
        password: "admin"
      }
    };
  },
  methods: {
    submitForm() {
      this.$http.post("/login/getMenu", this.login).then(res => {
        res = res.data;
        if (res.code === 20000) {
          //菜单栏
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("addMenu", this.$router);
          //用户信息
          this.$store.commit("clearInfo");
          this.$store.commit("setInfo", res.data.info);
          //token
          this.$store.commit("setToken", res.data.info.token);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning("账户或密码错误");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  min-height: 100%;
  width: 100%;
  background-color: #69aff0;
  overflow: hidden;

  .login-box {
    background-color: white;
    position: relative;
    width: 320px;
    max-width: 100%;
    padding: 35px;
    margin: 0 auto;
    margin-top: 100px;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    -webkit-box-shadow: 1px 1px 2px #eee;
    box-shadow: 1px 1px 2px #eee;
    h4 {
      text-align: center;
      line-height: 40px;
      height: 40px;
      font-size: 16px;
      margin-bottom: 20px;
      color: #5a9cf8;
    }
    .item-input {
      margin-bottom: 20px;
    }
    .login-btn {
      width: 100%;
      margin-top: 10px;
    }
    p {
      color: #666666;
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>
