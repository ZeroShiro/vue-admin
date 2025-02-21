<template>
  <div class="common-table">
    <el-table :data="tableData" border stripe height="90%" v-loading="config.loading">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{
            (config.page - 1) * 20 + scope.$index + 1
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="145">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col :xs="12" :sm="12" :lg="8">
        <el-pagination
          id="pagination"
          :total="config.total"
          :page-size="20"
          :pager-count="5"
          :current-page.sync="config.page"
          :background="background"
          layout="prev, pager, next, jumper"
          @current-change="changePage"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  data() {
    return {
      background: true
    };
  },
  computed: {
    total() {
      return this.config.total;
    }
  },
  watch: {
    total() {
      if (
        this.config.total == (this.config.page - 1) * 20 &&
        this.config.total !== 0
      ) {
        this.changePage((this.config.page -= 1));
      }
    }
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete", row.id);
    },
    changePage(page) {
      console.log(page);
      this.$emit("page", page);
    }
  }
};
</script>

<style lang="scss" scoped>
#pagination {
  margin-top: 16px;
}
</style>
