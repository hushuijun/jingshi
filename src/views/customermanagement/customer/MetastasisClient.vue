<template>
  <div class="metastasis-main">
    <el-card class="card" shadow="never">
      <div slot="header" class="clearfix">
        <span>选择员工</span>
      </div>
      <!-- <el-card class="card" shadow="never">
        <el-row :gutter="20">
          <el-col :span="5">
            人员姓名：<el-select v-model="seach.principal" placeholder="请选择负责人">
              <el-option v-for="item in userList" :key="item.userId" :label="item.realname" :value="item.userId"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-card> -->
      <el-card class="table-card" shadow="never">
        <div slot="header" class="clearfix">
          <el-row :gutter="20">
            <el-col :span="6">
              人员姓名：<el-input v-model="seach.name" placeholder="请输入人员姓名"></el-input>
            </el-col>
            <el-col :span="6">
              手机号：<el-input v-model="seach.tel" placeholder="请输入手机号"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small">搜索</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :data="personnelList" border style="width: 55%">
          <el-table-column prop="realname" label="姓名" width="200">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" width="180">
          </el-table-column>
          <el-table-column prop="deptName" label="部门" width="360">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="transfer(scope.$index, scope.row)">确认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { usersList } from "@/api/common";
import { crmCustomerTransfer,crmCustomerDistribute } from "@/api/customermanagement/customer";
export default {
  name: "Metastasis",
  data() {
    return {
      seach: {
        name: "",
        tel: "",
        principal: ""
      },
      customerIds: "",
      personnelList: [],
      id: []
    };
  },
  computed: {},
  created() {
    this.customerIds = this.$route.query.ids;
    this.id = this.$route.query.id;
    this.getUserList();
  },
  mounted() {},
  watch: {},
  methods: {
    // 负责人列表
    getUserList() {
      usersList({ m: "crm", c: "customer", a: "index", pageType: 0 }).then(
        res => {
          this.personnelList = res.data;
        }
      );
    },
    // 确认
    transfer(index, row) {
      if (this.customerIds) {
        let id = this.customerIds.join(",");
        crmCustomerTransfer({
          newOwnerUserId: row.userId,
          customerIds: id,
          transferType: 1
        }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "转移成功",
              type: "success",
              duration: 1500
            });
            var vm = this;
            setTimeout(() => {
              vm.$router.go(-1);
            }, 1500);
          }
        });
      } else {
        let ids = this.id.join(",");
        crmCustomerDistribute({
          userId: row.userId,
          ids:ids
        }).then(res=>{
           if (res.code == 0) {
            this.$message({
              message: "分配成功",
              type: "success",
              duration: 1500
            });
            var vm = this;
            setTimeout(() => {
              vm.$router.go(-1);
            }, 1500);
          }
        })
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.metastasis-main {
  .card {
    margin: 20px;
    .el-input {
      width: 200px;
    }
  }
}
</style>
