<template>
  <div class="divided-main">
    <el-card class="card" shadow="never">
      <el-row :gutter="20">
        <el-col :span="10">
          类型：<el-select v-model="seach.type" clearable placeholder="请选择类型">
            <el-option label="员工" value="员工"></el-option>
            <el-option label="合伙人" value="合伙人"></el-option>
            <el-option label="商机" value="商机"></el-option>
            <el-option label="兼职" value="兼职"></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          标题：<el-input v-model="seach.title" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="search">搜索</el-button>
          <el-button type="primary" size="small" @click="newDivided">新建</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="card card-table" shadow="never">
      <el-table :data="dividedList" border style="width: 100%">
        <el-table-column prop="date" label="标题" width="200">
        </el-table-column>
        <el-table-column prop="name" label="分润类型" width="177">
        </el-table-column>
        <el-table-column prop="province" label="分润占比" width="180">
        </el-table-column>
        <el-table-column prop="city" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="address" label="状态" width="300">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="新建分润" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="标题" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="类型" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option label="员工" value="员工"></el-option>
                <el-option label="合伙人" value="合伙人"></el-option>
                <el-option label="商机" value="商机"></el-option>
                <el-option label="兼职" value="兼职"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="分润占比" :label-width="formLabelWidth">
              <el-input v-model="form.proportion" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="启用" value="启用"></el-option>
                <el-option label="停用" value="停用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {dividedList} from "@/api/finance/divided"
export default {
  name: "Divided",
  data() {
    return {
      seach: {},
      dividedList: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        title: "",
        type: "",
        proportion: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    search() {},
    newDivided() {
        this.dialogFormVisible = true
    },
    doSave(){}
  },
  components: {}
};
</script>

<style scoped lang="scss">
.divided-main {
  .card {
    margin: 20px;
    width: 1200px;
    margin: 20 auto 0 !important;
  }
  .el-input {
    width: 220px;
  }
}
</style>
