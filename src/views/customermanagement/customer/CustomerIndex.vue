<template>
  <div class="customer-main">
    <el-tabs v-model="activeName" type="card" tab-position="center" @tab-click="handleClick">
      <el-tab-pane label="私有客户" name="first">
        <el-card class="card" shadow="never">
          <el-row :gutter="20">
            <el-col :span="4">
              客户姓名: <el-input v-model="seach.name" placeholder="请输入客户姓名"></el-input>
            </el-col>
            <el-col :span="5">
              客户手机号: <el-input v-model="seach.tel" placeholder="请输入客户手机号"></el-input>
            </el-col>
            <el-col :span="4">
              负责人: <el-select v-model="seach.principal" clearable placeholder="请选择负责人">
                <el-option v-for="item in userList" :key="item.userId" :label="item.realname" :value="item.userId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              创建时间:
              <el-date-picker v-model="seach.time" value-format="yyyy-MM-dd hh-mm-ss" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click="search">搜索</el-button>
              <el-button type="primary" size="small" @click="newCustomer">新建</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="card" shadow="never">
          <div slot="header" class="clearfix">
            <el-button type="primary" size="small" @click="toSeas">放入公海</el-button>
            <el-button type="primary" @click="metastasis" size="small">转移</el-button>
            <el-button type="primary" size="small">新建商机</el-button>
          </div>
          <el-table :data="privateList" border style="width: 100%" v-loading="loading1" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed prop="客户来源" label="客户来源" width="150">
            </el-table-column>
            <el-table-column prop="customerName" label="客户姓名" width="150">
            </el-table-column>
            <el-table-column prop="客户公司" label="客户公司" width="150">
            </el-table-column>
            <el-table-column prop="telephone" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="客户级别" label="客户级别" width="120">
            </el-table-column>
            <el-table-column prop="客户行业" label="客户行业" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="180">
            </el-table-column>
            <el-table-column prop="ownerUserName" label="负责人" width="120">
            </el-table-column>
            <el-table-column prop="createUserName" label="创建人" width="120">
            </el-table-column>
            <el-table-column prop="nextTime" label="下次跟进时间" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
                <el-button type="text" size="small" @click="toInfo(scope.$index, scope.row)">详情</el-button>
                <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="addFollow(scope.$index, scope.row)">添加跟进</el-button>
              </template>
            </el-table-column>
          </el-table>

          </el-pagination>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[15, 20]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-card>

      </el-tab-pane>
      <el-tab-pane label="公海客户" name="second">
        <el-card class="card" shadow="never">
          <el-row :gutter="20">
            <el-col :span="4">
              客户姓名: <el-input v-model="publicSeach.name" placeholder="请输入客户姓名"></el-input>
            </el-col>
            <el-col :span="5">
              客户手机号: <el-input v-model="publicSeach.tel" placeholder="请输入客户手机号"></el-input>
            </el-col>
            <el-col :span="4">
              负责人: <el-select v-model="publicPage.principal" clearable placeholder="请选择负责人">
                <el-option v-for="item in userList" :key="item.userId" :label="item.realname" :value="item.userId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              创建时间:
              <el-date-picker v-model="publicSeach.time" value-format="yyyy-MM-dd hh-mm-ss" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click="publicseach">搜索</el-button>
              <el-button type="primary" size="small" @click="newCustomer">新建</el-button>
            </el-col>
          </el-row>
          <el-card class="card" shadow="never">
            <div slot="header" class="clearfix">
              <el-button type="primary" size="small" @click="receive">领取</el-button>
              <el-button type="primary" size="small" @click="distribution">分配</el-button>
            </div>
            <el-table :data="publicList" border style="width: 100%" v-loading="loading" @selection-change="handleSelection">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column fixed prop="客户来源" label="客户来源" width="150">
              </el-table-column>
              <el-table-column prop="customerName" label="客户姓名" width="150">
              </el-table-column>
              <el-table-column prop="客户公司" label="客户公司" width="150">
              </el-table-column>
              <el-table-column prop="telephone" label="手机号" width="150">
              </el-table-column>
              <el-table-column prop="客户级别" label="客户级别" width="120">
              </el-table-column>
              <el-table-column prop="客户行业" label="客户行业" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址" width="180">
              </el-table-column>
              <el-table-column prop="ownerUserName" label="负责人" width="120">
              </el-table-column>
              <el-table-column prop="createUserName" label="创建人" width="120">
              </el-table-column>
              <el-table-column prop="nextTime" label="下次跟进时间" width="180">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="toInfo(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination @size-change="publicSizeChange" @current-change="publicCurrentChange" :current-page="1" :page-sizes="[10, 15, 20]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="publicTotal">
            </el-pagination>
          </el-card>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="新建客户" :visible.sync="dialogFormVisible">
      <el-form :model="customer" :rules="rules" ref="customer">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="客户姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="customer.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户手机" :label-width="formLabelWidth" prop="tel">
              <el-input v-model="customer.tel" autocomplete="off" placeholder="请输入客户手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="客户来源" :label-width="formLabelWidth">
              <el-select v-model="customer.source" placeholder="请选择客户来源">
                <el-option v-for="(item,index) in source" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户行业" :label-width="formLabelWidth" prop="客户行业">
              <el-select v-model="customer.客户行业" placeholder="请选择客户行业">
                <el-option v-for="(item,index) in industry" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="业务类别" :label-width="formLabelWidth">
              <el-select v-model="customer.业务类别" placeholder="请选择活动区域">
                <el-option label="专利" value="专利"></el-option>
                <el-option label="商标" value="商标"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户级别" :label-width="formLabelWidth" prop="客户级别">
              <el-select v-model="customer.客户级别" placeholder="请选择客户级别">
                <el-option v-for="(item,index) in level" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="客户公司" :label-width="formLabelWidth">
              <el-input v-model="customer.company" autocomplete="off" placeholder="请输入客户公司"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户地址" :label-width="formLabelWidth">
              <el-cascader size="large" :options="options" v-model="customer.clientAddress" @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="下次联系时间" :label-width="formLabelWidth">
              <el-date-picker v-model="customer.next_time" value-format="yyyy-MM-dd hh:mm:ss" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="customer.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSave('customer')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="是否删除" :visible.sync="isDel" width="20%" :before-close="handleClose">
      <span>确定要删除此条客户信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDel = false">取 消</el-button>
        <el-button type="primary" @click="delet">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建跟进记录" :visible.sync="isFollow">
      <el-form :model="follow">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="跟进方式" label-width="80px">
              <el-select v-model="follow.category" placeholder="请选择跟进方式">
                <el-option label="电话" value="打电话"></el-option>
                <el-option label="邮件" value="发邮件"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下次联系时间" :label-width="formLabelWidth">
              <el-date-picker v-model="follow.nextTime" value-format="yyyy-MM-dd hh:mm:ss" type="datetime" placeholder="选择日期时间">

              </el-date-picker>
              <!-- <el-date-picker
      v-model="follow.nextTime"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"> -->
              <!-- </el-date-picker> -->
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="跟进内容" :label-width="formLabelWidth">
              <el-input v-model="follow.content" autocomplete="off" placeholder="请输入跟进内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isFollow = false">取 消</el-button>
        <el-button type="primary" @click="doFollow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  crmCustomerIndex,
  crmCustomerSave,
  crmCustomerPutInPool,
  crmCustomerPool,
  crmCustomerReceive,
  crmCustomerDelete,
  crmCustomerRecordSave
} from "@/api/customermanagement/customer";
import { usersList } from "@/api/common";
import { regionDataPlus, CodeToText } from "element-china-area-data";
import qs from "qs";
export default {
  name: "Customer",
  data() {
    return {
      activeName: "first",
      customer: {
        name: "",
        tel: "",
        业务类别: "",
        next_time: "",
        remark: "",
        source: "",
        客户行业: "",
        company: "",
        客户级别: "",
        clientAddress: "",
        address: "",
        customerId:""
      },
      dialogFormVisible: false,
      formLabelWidth: "130px",
      options: regionDataPlus,
      userList: [],
      loading: false,
      loading1: false,
      // 跟进
      follow: {
        content: "",
        category: "",
        nextTime: ""
      },
      isFollow: false,
      // 客户来源
      source: [
        "促销",
        "搜索引擎",
        "广告",
        "转介绍",
        "线上注册",
        "线上询价",
        "预约上门",
        "陌拜",
        "电话咨询",
        "邮件咨询"
      ],
      // 客户行业
      industry: [
        "IT",
        "金融业",
        "房地产",
        "商业服务",
        "运输/物流",
        "生产",
        "政府",
        "文化传媒"
      ],
      delId: "",
      isDel: false,
      // 客户级别
      level: ["A（重点客户）", "B（普通客户）", "C（非优先客户）"],
      // 私有
      seach: {
        name: "",
        tel: "",
        principal: "",
        time: ""
      },
      page: {
        page: 1,
        limit: 15,
        type: 2
      },
      total: 0,
      privateList: [],
      ids: [],
      // 公海
      publicSeach: {
        name: "",
        tel: "",
        principal: "",
        time: ""
      },
      publicPage: {
        page: 1,
        limit: 15,
        type: 2
      },
      publicTotal: 0,
      publicList: [],
      id: [],
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        tel: [
          { required: true, message: "请输入客户手机号", trigger: "blur" },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|18[0-9]|199)[0-9]{8}$/,
            message: "手机号格式有误",
            trigger: "blur"
          }
        ],
        客户行业: [
          { required: true, message: "请选择客户行业", trigger: "change" }
        ],
        客户级别: [
          { required: true, message: "请选择客户级别", trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  created() {
    this.getUserList();
    this.getPrivateList();
    this.getSeasList();
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {},
    // 用户地址
    handleChange(val) {
      this.customer.address =
        CodeToText[val[0]] +
        "," +
        CodeToText[val[1]] +
        "," +
        CodeToText[val[2]];
      console.log(this.customer.address);
    },
    // 负责人列表
    getUserList() {
      usersList({ m: "crm", c: "customer", a: "index", pageType: 0 }).then(
        res => {
          this.userList = res.data;
        }
      );
    },
    // 编辑
    edit(index, row) {
      console.log(row)
      var params = {
        name: row.customerName,
        tel: row.mobile,
        业务类别: "",
        next_time: row.nextTime,
        remark: row.remark,
        source: row.客户来源,
        客户行业: row.客户行业,
        company: row.客户公司,
        客户级别: row.客户级别,
        clientAddress: row.address,
        address: "",
        customerId:row.customerId
      }
      this.customer = params
      this.dialogFormVisible = true
    },

    // 删除
    del(index, row) {
      this.isDel = true;
      this.delId = row.customerId;
    },
    handleClose(done) {
      done();
    },
    delet() {
      crmCustomerDelete({
        customerIds: this.delId
      }).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.isDel = false;
          this.delId = "";
          this.getPrivateList();
          this.getSeasList();
        }
      });
    },
    // 跟进
    addFollow(index, row) {
      this.isFollow = true;
      this.delId = row.customerId;
    },
    doFollow() {
      var params = {
        typesId: this.delId,
        content: this.follow.content,
        category: this.follow.category,
        nextTime: this.follow.nextTime,
        isEvent: 0
      };
      crmCustomerRecordSave(params).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.isFollow = false;
          this.delId = "";
        }
      });
    },
    /*
     * 私有
     */
    // 获取私有客户列表
    getPrivateList() {
      var params = null;
      if (
        this.seach.time ||
        this.seach.name ||
        this.seach.tel ||
        this.seach.principal
      ) {
        params = {
          page: this.page.page,
          limit: this.page.limit,
          type: 2,
          data: {
            customer_name: {
              condition: "is" /**匹配条件**/,
              value: this.seach.name /**值**/,
              formType: "text" /**字段类型**/,
              name: "customer_name" /**字段名**/
            },
            mobile: {
              condition: "is",
              value: this.seach.tel,
              formType: "text",
              name: "telephone"
            },
            owner_user_id: {
              condition: "is",
              value: this.seach.principal,
              formType: "user",
              name: "owner_user_id"
            },
            create_time: {
              start: this.seach.time[0],
              end: this.seach.time[1],
              formType: "datetime",
              name: "create_time"
            }
          }
        };
      } else {
        params = {
          page: this.page.page,
          limit: this.page.limit,
          type: 2
        };
      }
      this.loading1 = true;
      crmCustomerIndex(params).then(res => {
        this.total = res.data.totalRow;
        this.privateList = res.data.list;
        this.loading1 = false;
      });
    },
    handleSelectionChange(val) {
      val.forEach(ele => {
        this.ids.push(ele.customerId);
      });
      this.ids = [...new Set(this.ids)];
    },
    // 搜索
    search() {
      this.getPrivateList();
    },
    // 转移客户
    metastasis() {
      if (this.ids.length == 0) {
        this.$message({
          message: "请先选择客户",
          type: "warning"
        });
      } else {
        this.$router.push({ name: "metastasis", query: { ids: this.ids } });
      }
    },
    // 放入公海
    toSeas() {
      if (this.ids.length == 0) {
        this.$message({
          message: "请先选择客户",
          type: "warning"
        });
      } else {
        var ids = this.ids.join(",");
        crmCustomerPutInPool({ ids }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "放入公海成功",
              type: "success"
            });
            this.getPrivateList();
            this.getSeasList();
            this.ids = [];
          }
        });
      }
    },
    // 新建客户
    newCustomer() {
      this.dialogFormVisible = true;
    },
    // 新建提交
    doSave(customer) {
      var id = null
      if(this.customer.customerId){
         id = this.customer.customerId
      }
      this.$refs[customer].validate(valid => {
        if (valid) {
          

          let params = {
            entity: {
              customer_name: this.customer.name,
              telephone: this.customer.tel,
              业务类别: this.customer.业务类别,
              next_time: this.customer.next_time,
              remark: this.customer.remark,
              address: this.customer.address,
              customerId:id
            },
            field: [
              {
                fieldId: 18,
                formType: "select",
                isNull: 0,
                name: "客户来源",
                options:
                  "促销,搜索引擎,广告,转介绍,线上注册,线上询价,预约上门,陌拜,电话咨询,邮件咨询",
                isUnique: 0,
                inputTips: null,
                type: 3,
                value: this.customer.source,
                fieldType: 0,
                fieldName: "客户来源",
                setting: this.source
              },
              {
                fieldId: 19,
                formType: "select",
                isNull: 0,
                name: "客户行业",
                options:
                  "IT,金融业,房地产,商业服务,运输/物流,生产,政府,文化传媒",
                isUnique: 0,
                inputTips: null,
                type: 3,
                value: this.customer.industry,
                fieldType: 0,
                fieldName: "客户行业",
                setting: this.industry
              },
              {
                fieldId: 17,
                formType: "select",
                isNull: 0,
                name: "客户级别",
                options: "A（重点客户）,B（普通客户）,C（非优先客户）",
                isUnique: 0,
                inputTips: null,
                type: 3,
                value: this.customer.value,
                fieldType: 0,
                fieldName: "客户级别",
                setting: this.level
              },
              {
                fieldId: 207,
                formType: "text",
                isNull: 0,
                name: "客户公司",
                options: "",
                isUnique: 0,
                inputTips: "",
                type: 1,
                value: this.customer.company,
                fieldType: 0,
                fieldName: "客户公司",
                setting: []
              }
            ]
          };
          crmCustomerSave(params).then(res => {
            if (res.code == 0) {
              this.$message({
                message: "新建成功",
                type: "success"
              });
              (this.customer = {
                name: "",
                tel: "",
                业务类别: "",
                next_time: "",
                remark: "",
                source: "",
                客户行业: "",
                company: "",
                客户级别: "",
                clientAddress: "",
                address: ""
              }),
                (this.dialogFormVisible = false);
              this.getPrivateList();
            }
          });
        } else {
          return false;
        }
      });
    },
    // 去详情页
    toInfo(index, row) {
      this.$router.push({ name: "CustomerInfo", query: { params: row } });
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getPrivateList();
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.getPrivateList();
    },
    /*
     * 公海
     */
    // 获取列表
    getSeasList() {
      var params = null;
      if (
        this.publicSeach.time ||
        this.publicSeach.name ||
        this.publicSeach.tel ||
        this.publicSeach.principal
      ) {
        params = {
          page: this.publicPage.page,
          limit: this.publicPage.limit,
          type: 2,
          data: {
            customer_name: {
              condition: "is" /**匹配条件**/,
              value: this.publicSeach.name /**值**/,
              formType: "text" /**字段类型**/,
              name: "customer_name" /**字段名**/
            },
            mobile: {
              condition: "is",
              value: this.publicSeach.tel,
              formType: "text",
              name: "telephone"
            },
            owner_user_id: {
              condition: "is",
              value: this.publicSeach.principal,
              formType: "user",
              name: "owner_user_id"
            },
            create_time: {
              start: this.publicSeach.time[0],
              end: this.publicSeach.time[1],
              formType: "datetime",
              name: "create_time"
            }
          }
        };
      } else {
        params = {
          page: this.publicPage.page,
          limit: this.publicPage.limit,
          type: 2
        };
      }
      this.loading = true;
      crmCustomerPool(params).then(res => {
        this.publicTotal = res.data.totalRow;
        this.publicList = res.data.list;
        this.loading = false;
      });
    },
    // 搜索
    publicseach() {
      this.getSeasList();
    },
    // 列表勾选
    handleSelection(val) {
      val.forEach(ele => {
        this.id.push(ele.customerId);
      });
      this.id = [...new Set(this.id)];
    },
    // 领取
    receive() {
      if (this.id.length == 0) {
        this.$message({
          message: "请先选择客户",
          type: "warning"
        });
      } else {
        var ids = this.id.join(",");
        crmCustomerReceive({ ids }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "领取成功",
              type: "success"
            });
            this.getSeasList();
            this.id = [];
          }
        });
      }
    },
    distribution() {
      if (this.id.length == 0) {
        this.$message({
          message: "请先选择客户",
          type: "warning"
        });
      } else {
        this.$router.push({ name: "metastasis", query: { id: this.id } });
      }
    },
    publicSizeChange(val) {},
    publicCurrentChange(val) {}
  },
  components: {}
};
</script>

<style scoped lang="scss">
.customer-main {
  .card {
    margin: 20px;
    .el-input {
      width: 180px;
    }
  }
  .el-input {
    width: 200px;
  }
  .el-pagination {
    float: right;
  }
}
</style>
