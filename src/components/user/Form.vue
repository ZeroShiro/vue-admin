<template>
  <el-row>
    <el-col :xs="12" :sm="12" :lg="12">
      <el-form :inline="inline" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item
          v-for="item in formLabel"
          :key="item.model"
          :label="item.label"
          :prop="item.model"
        >
          <el-input v-model="form[item.model]" v-if="!item.type" style="width:330px;"></el-input>
          <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'">
            <el-option
              v-for="item in item.opts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
          <el-date-picker
            v-model="form[item.model]"
            type="date"
            placeholder="选择日期"
            v-if="item.type === 'date'"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
    isConfig: Number
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        age: [{ required: true, message: "年龄不能为空" }],
        addr: [{ required: true, message: "地址不能为空" }]
      }
    };
  },
  watch: {
    isConfig: {
      handler(val) {
        if (val) {
          this.reset("form");
        }
      }
    }
  },
  methods: {
    reset(formName) {
      this.$refs[formName].resetFields();
      // this.$refs[formName].clearValidate();
    },
    submitForm(formName) {
      let flag = true;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          flag = false;
        } else {
          flag = true;
          this.$refs[formName].clearValidate();
        }
      });
      return flag;
    }
  }
};
</script>

<style lang="scss" scoped></style>
