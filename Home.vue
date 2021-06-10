<template>
  <a-layout id="app" class="laybg">
    <a-layout-sider>
      <!-- <div class="logo">
        <img style="height:100%;width:100%" src="../../../HC.png" alt="">
      </div> -->
      <a-menu theme="dark"
       mode="inline" 
       :openKeys="openKeys"
        v-model:selectedKeys="selectedKeys" 
        @click="goroute" 
        @openChange="onOpenChange">
        <template
          v-for="(firstItem) in routerList"
          :key="firstItem.index"
        >
          <template v-if="firstItem.subs">
            <a-sub-menu :key="firstItem.index">
              <template #title>
                <span>{{ firstItem.title }}</span>
              </template>
              <template
                v-for="(secItem) in firstItem.subs"
                :key="secItem.index"
              >
                <template v-if="secItem.subs">
                  <a-sub-menu :key="secItem.index">
                    <template #title>
                      <span>{{ secItem.title }}</span>
                    </template>
                    <template
                      v-for="(thrItem) in secItem.subs"
                      :key="thrItem.index"
                    >
                      <template v-if="thrItem.subs">
                        <a-sub-menu :key="thrItem.index">
                          <template #title>
                            <span>{{ thrItem.title }}</span>
                          </template>
                          <template
                            v-for="(fourItem) in thrItem.subs"
                            :key="fourItem.index"
                          >
                            <template v-if="fourItem.subs">
                              <a-sub-menu :key="fourItem.index">
                                <template #title>
                                  <span>{{ fourItem.title }}</span>
                                </template>
                                <a-menu-item  v-for="fiveItem in fourItem.subs" :key="fiveItem.index" >{{
                                  fiveItem.title
                                }}</a-menu-item>
                              </a-sub-menu>
                            </template>
                            <template v-else>
                              <a-menu-item :key="fourItem.index">{{
                                fourItem.title
                              }}</a-menu-item>
                            </template>
                          </template>
                        </a-sub-menu>
                      </template>
                      <template v-else>
                        <a-menu-item :key="thrItem.index" >{{ thrItem.title }}</a-menu-item>
                      </template>
                    </template>
                  </a-sub-menu>
                </template>
                <template v-else>
                  <a-menu-item :key="secItem.index" >{{ secItem.title }}</a-menu-item>
                </template>
              </template>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="firstItem.index" >{{
              firstItem.title
            }}</a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layheader">
        <div class="headertop">
          <div class="otherope">
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">{{username}}  <DownOutlined /> </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <div>个人中心</div>
                  </a-menu-item>
                  <a-menu-item>
                    <div @click="showout">退出登录</div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <tagview></tagview>
        
        <!-- <menu-unfold-outlined
          style="margin: auto; marginLeft: 10px; fontSize: 20px"
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          style="margin: auto; marginLeft: 10px; fontSize: 20px"
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        /> -->
      </a-layout-header>

      <a-layout-content class="laybody">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <a-modal v-model:visible="outModal" title="提示" footer="" :zIndex="1500">
    <div class="outModalText">是否确认退出系统？</div>
    <div class="outModalButton">
      <a-button type="danger" @click="outModal = false" >取 消</a-button>
      <a-button type="primary" @click="out" style="marginLeft:10px" >确 定</a-button>
    </div>  
  </a-modal>
</template>
<script>
import { DownOutlined  } from "@ant-design/icons-vue";
// import {ref,reactive,computed,watch} from 'vue'
import tagview from '../components/Tags'
export default {
  name: "Home",
  components: {
    // MenuUnfoldOutlined,
    // MenuFoldOutlined,
    DownOutlined,
    tagview
  },
  data() {
    return {
      username:"",
      selectedKeys: [String(this.$route.name)],
      openKeys: [],
      collapsed: false,
      outModal:false,
      
      routerList: [
        {
          icon: "iconfont iconleft-icon-home",
          index: "home",
          title: "首页",
          subs:[{
            icon: "iconfont iconleft-icon-home",
            index: "ceshi",
            title: "测试",
          }]
        },
        {
          icon: "iconfont iconleft-icon-home",
          index: "Administration",
          title: "管理",
        },
        {
          icon: "iconfont iconleft-icon-home",
          index: "Setting",
          title: "设置",
        },
        {
          icon: "iconfont iconleft-icon-home",
          index: "one",
          title: "一级",
          subs:[
            {
              icon: "iconfont iconleft-icon-home",
              index: "two",
              title: "二级路由",
            },
            {
              icon: "iconfont iconleft-icon-home",
              index: "two",
              title: "二级",
              subs:[
                {
                  icon: "iconfont iconleft-icon-home",
                  index: "three",
                  title: "三级路由",
                },
                {
                  icon: "iconfont iconleft-icon-home",
                  index: "three",
                  title: "三级",
                  subs:[
                    {
                      icon: "iconfont iconleft-icon-home",
                      index: "four",
                      title: "四级路由",
                    },
                    {
                      icon: "iconfont iconleft-icon-home",
                      index: "four",
                      title: "四级",
                      subs:[
                        {
                          icon: "iconfont iconleft-icon-home",
                          index: "five",
                          title: "五级路由",
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
      ],
    };
  },
  computed: {
    rootSubmenuKeys: (vm) => {
      let keys = []
      vm.routerList.forEach(item => {
        keys.push(item.index)
      })
      return keys
    }
  },
  watch:{
    $route(){
        this.selectedKeys = [String(this.$route.name)]
    }
  },
  created(){
    this.username = sessionStorage.getItem('username')
  },
  methods:{
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    async goroute(gopath){
      this.$router.push(gopath.key)
    },
    showout() {
      this.outModal = true
    },
    out(){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('permissList');
      this.$router.push('login');
    },
  },
};
</script>

<style>
  .laybg{
    background: #ddd
  }
  .logo{
    height:60px;
    width:80px;
    margin:0 auto
  }
  .layheader{
    background: #fff;
    padding: 0px;
    position: absolute;
    width: calc(100% - 200px);
    top: 0;
    left: 200px;
    z-index: 200;
  }
  .headertop{
    display: flex;
    background: #fff;
    height: 64px;
    width:100%;
  }
  .otherope{
    margin:auto 0 auto auto;
    height:100%;
    padding:0 20px
  }
  .laybody{
    padding: 24px;
    width: 100%;
    height: 100%;
    position: relative;
    top:104px;
    left:0
  }
  .outModalText{
    width:100%;
    text-align:center;
    margin:20px 0
  }
  .outModalButton{
    width:100%;
    text-align:center
  }
</style>