<template>
  <div class="Customer-info-main">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="客户详情" name="first">
        <el-card class="card" shadow="never">
          <div class="order-info table-layout-orientation">
            <div class="common-title">基本信息</div>
            <el-row>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>客户姓名:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.customerName}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>线索来源:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.客户来源}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>客户手机:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.mobile}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>客户公司:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.客户公司}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>地址:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.address}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>客户行业:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.客户行业}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>客户级别:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.客户级别}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>下次联系时间:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.nextTime}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>备注:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{customerInfo.remark}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="跟进详情" name="second">
        <el-card class="card" shadow="never">
          <div slot="header" class="clearfix">
            <span>跟进记录</span>
          </div>
          <div class="order-info table-layout-orientation" v-for="item in recordingList" :key="item.recordId">
            <el-row>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>跟进人:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{item.realname}}</span>
                </div>
              </el-col>
               <el-col :span="24">
                <div class="table-cell-head">
                  <span>跟进时间:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{item.createTime}}</span>
                </div>
              </el-col>
               <el-col :span="24">
                <div class="table-cell-head">
                  <span>跟进描述:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{item.content}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="table-cell-head">
                  <span>下次跟进时间:</span>
                </div>
                <div class="table-cell-body">
                  <span>{{item.nextTime}}</span>
                </div>
              </el-col>
                <el-col :span="24">
                <div class="table-cell-head">
                  <span>相关附件:</span>
                </div>
                <div class="table-cell-body">
                  <span></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { crmCustomerRecordIndex } from "@/api/customermanagement/customer";
export default {
  name: "CustomerInfo",
  data() {
    return {
      activeName: "first",
      customerInfo: {},
      page: {
        page: 1,
        limit: 5
      },
      recordingList: []
    };
  },
  computed: {},
  created() {
    this.customerInfo = this.$route.query.params;
    this.getInfo();
  },
  mounted() {},
  watch: {},
  methods: {
    handleClick() {},
    getInfo() {
      crmCustomerRecordIndex({
        page: this.page.page,
        limit: this.page.limit,
        customerId: this.customerInfo.customerId
      }).then(res => {
        this.recordingList = res.data;
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.Customer-info-main {
  .card {
    margin: 20px;
    width: 1200px;
    margin: 0 auto !important;
  }
  .common-title {
    margin: 30px;
  }
  .table-layout-orientation {
    margin-top: 20px;
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;

    .el-row {
      box-sizing: border-box;
      .el-col {
        display: flex;
        height: 40px;
        line-height: 40px;
        .table-cell-head {
          border: 1px solid #dcdfe6;
          font-size: 14px;
          width: 200px;
          text-align: left;
          text-indent: 1em;
          color: #666;
          background-color: #f5f7fa;
        }
        .table-cell-body {
          width: calc(100% - 200px);
          color: #606266;
          overflow: hidden;
          text-align: left;
          text-indent: 1em;
          border-top: 1px solid #dcdfe6;
          border-right: 1px solid #dcdfe6;
          border-bottom: 1px solid #dcdfe6;
        }
      }
    }
  }
}
</style>
