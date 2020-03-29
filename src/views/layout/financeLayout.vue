<template>
  <el-container>
    <el-header class="nav-container">
      <navbar :navIndex="navActiveIndex"
              @nav-items-click="navClick"></navbar>
    </el-header>
    <el-container>
      <sidebar :items="children"
                 createButtonTitle=""
                 mainRouter="finance">
        </sidebar>
      <el-main id="crm-main-container"
               style="padding:15px;">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { mapGetters } from 'vuex'
import { divideds } from '@/router/modules/finance'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters(['navActiveIndex']),
    ...mapGetters(['finance'])
  },
  data() {
    return {
      children:[]
    }
  },
  methods: {
    navClick(index) {},

    /**
     * 获取消息数
     */
    getcrmMessagNum() {
      this.$store
        .dispatch('GetMessageNum')
        .then(res => {})
        .catch(() => {})
    },

    /**
     * 获取客户管理配置信息
     */
    getcrmSettingConfig() {
      this.$store.dispatch('CRMSettingConfig')
    },

    /**
     * 新建客户同时新建联系人
     */
    // 创建数据页面 保存成功
    createSaveSuccess(data) {
      if (data && data.saveAndCreate) {
        if (data.type == 'customer') {
          this.createCRMType = 'contacts'
          this.createActionInfo = {
            type: 'relative',
            crmType: 'customer',
            data: {}
          }
          this.createActionInfo.data['customer'] = data.data
          this.isCreate = true
        }
      }
    }
  },
  created(){
    this.children = divideds
  }
}
</script>

<style lang="scss" scoped>
@import './styles/common.scss';
.el-container {
  min-height: 0;
}
.aside-container {
  position: relative;
  background-color: #2d3037;
  box-sizing: border-box;
  border-right: solid 1px #e6e6e6;
  overflow: visible;
}

.nav-container {
  padding: 0;
  box-shadow: 0px 1px 2px #dbdbdb;
  z-index: 100;
  min-width: 1200px;
}
.quick-add {
  height: 178px;
}
.aside-container {
  position: relative;
  background-color: #2d3037;
  box-sizing: border-box;
  border-right: solid 1px #e6e6e6;
}

.nav-container {
  padding: 0;
  box-shadow: 0px 1px 2px #dbdbdb;
  z-index: 100;
  min-width: 1200px;
}
</style>
