<template>
  <el-row class="dataform">
    <el-col :xs="24" :sm="24" :lg="12">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="选泽类别">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="账户提升等级" value="shanghai"></el-option>
            <el-option label="新增商品" value="beijing"></el-option>
            <el-option label="商品不足" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="紧急申请">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="其他">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="1" name="type"></el-checkbox>
            <el-checkbox label="2" name="type"></el-checkbox>
            <el-checkbox label="3" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="其他物品">
          <el-radio-group v-model="form.resource">
            <el-radio label="家具"></el-radio>
            <el-radio label="汽车"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注建议">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      if (!this.form.name == "") {
        this.$message({
          type: "success",
          message: "提交成功!"
        });
      } else {
        this.$message.error("名称不能为空");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dataform {
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #fff;
}
</style>
