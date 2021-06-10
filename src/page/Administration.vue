<template>
  <div>
    <a-form
      style="background:#fff;padding:30px"
      layout="inline"
      ref="searchRef"
      :model="searchForm"
      :colon="true"
      labelAlign="right"
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >
      <a-row>
        <a-col :span="8">
          <a-form-item label="姓名" name="name">
            <a-input v-model:value="searchForm.name" style="width:200px" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="年龄" name="select">
            <a-select v-model:value="searchForm.select" style="width:200px">
            <a-select-option value="18">
              18
            </a-select-option>
            <a-select-option value="30">
              30
            </a-select-option>
          </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="时间" name="times">
            <a-range-picker
              v-model:value="searchForm.times"
              format="YYYY/MM/DD"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
            <a-form-item label="时间" name="tree" style="width:220px">
              <a-tree-select
              v-model:value="searchForm.tree"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeList"
              style="width:200px"
              placeholder="Please select"
              tree-default-expand-all
            />
            </a-form-item>
          </a-col>
      </a-row>
      <div style="width:100%;textAlign:center;marginTop:20px">
        <a-button type="primary" @click="query">查询</a-button>
        <a-button type="primary" style="marginLeft:10px" @click="reset(searchRef)">重置</a-button>
      </div>
    </a-form>

    <a-table style="marginTop:15px" :columns="columns" :data-source="data" :pagination="false">
      <template #operation="{ text, record, index }">
        <span @click="showAdd(text, record, index)">添加</span>
        <span @click="showChange(text, record, index)" style="marginLeft:10px">编辑</span>
      </template>
    </a-table>

    <div style="width:100%;padding:20px;textAlign:right">
      <a-pagination
        show-size-changer
        v-model:current="searchForm.current"
        v-model:pageSize="searchForm.size"
        :total="totals"
        @showSizeChange="changeSize"
        @change="changeCurrent"
      />
    </div>
  </div>

  <a-modal v-model:visible="addModal" title="添加" :footer="null" >
    <a-form :model="addFrom" :label-col="labelCol" :wrapper-col="wrapperCol" ref="addRef" :rules="addRule">
      <a-form-item label="Activity name" name="name">
        <a-input v-model:value="addFrom.name" />
      </a-form-item>
      <a-form-item label="Activity zone" name="region">
        <a-select v-model:value="addFrom.region" placeholder="please select your zone">
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity time" name="date1">
        <a-date-picker
          v-model:value="addFrom.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="Activity type" name="type">
        <a-checkbox-group v-model:value="addFrom.type">
          <a-checkbox value="1" name="type">
            Online
          </a-checkbox>
          <a-checkbox value="2" name="type">
            Promotion
          </a-checkbox>
          <a-checkbox value="3" name="type">
            Offline
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="Resources" name="resource">
        <a-radio-group v-model:value="addFrom.resource">
          <a-radio value="1">
            Sponsor
          </a-radio>
          <a-radio value="2">
            Venue
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-input v-model:value="addFrom.desc" type="textarea" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" style="textAlign:center">
        <a-button type="primary" @click="Add">
          确定
        </a-button>
        <a-button style="margin-left: 10px;" @click="addModal=false">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal v-model:visible="changeModal" title="编辑" :footer="null" >
    <a-form :model="changeForm" :label-col="labelCol" :wrapper-col="wrapperCol" ref="changeRef" :rules="changeRule">
      <a-form-item label="Activity name" name="customerName">
        <a-input v-model:value="changeForm.customerName" />
      </a-form-item>
      <a-form-item label="Activity zone" name="region">
        <a-select v-model:value="changeForm.region" placeholder="please select your zone">
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity time" name="date1">
        <a-date-picker
          v-model:value="changeForm.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="Activity type" name="type">
        <a-checkbox-group v-model:value="changeForm.type">
          <a-checkbox value="1" name="type">
            Online
          </a-checkbox>
          <a-checkbox value="2" name="type">
            Promotion
          </a-checkbox>
          <a-checkbox value="3" name="type">
            Offline
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="Resources" name="resource">
        <a-radio-group v-model:value="changeForm.resource">
          <a-radio value="1">
            Sponsor
          </a-radio>
          <a-radio value="2">
            Venue
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-input v-model:value="changeForm.desc" type="textarea" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" style="textAlign:center">
        <a-button type="primary" @click="Change">
          确定
        </a-button>
        <a-button style="margin-left: 10px;" @click="changeModal=false">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { ref,reactive,toRefs, onBeforeMount,watchEffect } from 'vue';
import { message } from 'ant-design-vue';
// import { fetch } from '../utils/GlobalFun'
export default {
  setup(){
    onBeforeMount(() => {
      publicFun.query()
    })
    const tableMain = reactive({
      columns:[
        {
          title: '用户名',
          dataIndex: 'customerName',
        },
        {
          title: '角色名称',
          dataIndex: 'roleName',
          ellipsis: true,
          // customRender:({text})=>{
          //   return (
          //     <div style={{color:'red'}}>{text}</div>
          //   )
          // }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          slots: { customRender: 'operation' },
        },
      ],
      data:[{
        customerName:"111",
        roleName:"222"
      }]
    })
    
    // 公用方法
    const publicFun = {
      changeCurrent:(page)=>{
        search.searchForm.current = page
        publicFun.query()
      },
      changeSize:(current,size)=>{
        search.searchForm.current = 1
        search.searchForm.size = size
        publicFun.query()
      },
      reset:(e) => {
        e.resetFields()
        publicFun.query()
      },
      query: async() => {
        // const res = await fetch("/api/users/query",search.searchForm)
        // tableMain.data = res.tabledata
        // totals.value = res.total
      },
    }

    // 查询
    const searchRef = ref(null)
    let totals = ref(0) 
    const search = reactive({
      treeList : [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Node1-1',
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
        },
      ],
      searchForm:{
        name:"",
        select:"",
        tree:"",
        times:[],
        current:1,
        size:10
      },
    })

    // 添加弹窗
    const addRef = ref(null)
    const addFun = {
      showAdd:(text, record, index)=>{
        add.addModal = true
        addRef.value.resetFields()
        console.log(text, record, index);
      },
      Add:()=>{
        addRef.value
        .validate()
        .then(() => {
          message.success("提交成功")
          console.log('values', this.form);
        })
        .catch(error => {
          message.error("提交失败")
          console.log('error', error);
        });
      }
    }
    
    const add = reactive({
      addModal:false,
      addFrom:{
        name: '',
        region: undefined,
        date1: undefined,
        type: [],
        resource: '',
        desc: '',
      },
      addRule:{
        name: [
          {
            required: true,
            message: 'Please input name',
          },
        ],
      },
    }) 

    const { addFrom } = add
    watchEffect(()=>{
      console.log(addFrom.name);
      debugger
    })

    // 编辑弹窗
    const changeRef = ref(null)
    const changeFun = {
      showChange:(text, record, index)=>{
        change.changeModal = true
        changeRef.value.resetFields()
        change.changeForm = JSON.parse(JSON.stringify(record))
        console.log(text, record, index);
      },
      Change:()=>{
        changeRef.value
        .validate()
        .then(() => {
          message.success("提交成功")
        })
        .catch(error => {
          message.error("提交失败")
          console.log('error', error);
        });
      }
    }
    const change = reactive({
      changeModal:false,
      changeForm:{
        customerName: '',
        region: undefined,
        date1: undefined,
        type: [],
        resource: '',
        desc: '',
      },
      changeRule:{
        customerName: [
          {
            required: true,
            message: 'Please input name',
          },
        ],
      },
    }) 

    return {
      labelCol: { span: 6 },    //表单label布局
      wrapperCol: { span: 16 }, //表单控件布局
      totals,                   //总数
      searchRef,                //查询表单实例
      addRef,                   //添加表单实例
      changeRef,                //编辑表单实例
      ...toRefs(search),        //查询数据
      ...toRefs(add),           //添加数据
      ...addFun,                //添加方法
      ...toRefs(change),        //编辑数据
      ...changeFun,             //编辑方法
      ...toRefs(tableMain),     //主界面表格
      ...publicFun,             //公用方法
    }
  },
}
</script>

<style>
</style>