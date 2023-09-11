<template>
  <div class="show-viewcom">
    <p>评论:</p>
    <div class="context" >
       <ul v-for="item in content" :key="item.id">
         <li >{{ item.data }} 
          <el-icon style="float: right;" @click="handleDelete"><DeleteFilled /></el-icon>
        </li>
       </ul>
    </div>
  </div>
  <div class="show-viewcom cont">
    <input class="input-use" type="textarea" v-model="contentWrite" />
    <el-button class="button" @click="handlerAdd">发表</el-button>
  </div>
</template>

<script  lang="ts">

import { defineComponent, reactive,ref ,nextTick} from "vue";
export default defineComponent({
  setup() {
    let content = ref([
      {
        id: 1,
        data: '文章很好!'
      },
      {
        id: 2,
        data: '哈哈哈哈哈'
      },
    ])

  let contentData:string=JSON.stringify(content.value)
  localStorage.setItem('ts-demo1',contentData)


   let  jsonKey=ref('ts-demo1')
   let contId=ref('')
   let contentWrite=ref('')

   console.log("contentWrite",contentWrite.value)
  
  const handleDelete =(id:number|string)=>{
          let copyId= contId
      let arr:any=readData()
      let index=arr.findIndex(e =>e[copyId.value]==id )
  }


  //取值
  const readData=()=>{
    let localJson:string|null=localStorage.getItem(jsonKey.value)
     if(localJson !==null){

    
        content.value = JSON.parse(localJson)           
       
      console.log("content",content)
      return JSON.parse(localJson)
     }
  }   
    
    
    


  const setData=(arrData:object[]):void=>{
       //存值
      let localJson:string|null =JSON.stringify(arrData)
      localStorage.setItem(jsonKey.value,localJson)   
      
  }


  const handlerAdd=()=>{
      //1.拿到本地数据
      let arr:any = readData()
      //3自动生成主键id
      let newId=arr.length > 0 ? arr.length+1:1
      let newObj:any={
        "data":contentWrite.value,
        'id':newId
      }
     //4将对象新增到数组中
     arr.push(newObj)
     //5 保存新的数组
     setData(arr)
    
     nextTick(()=>{
      readData()
     })
      
  }

    return {
      content,
      contentWrite,
      handlerAdd,
      handleDelete
    };
  },
});
</script>

<style>
.show-viewcom {
  width: 80%;
  height: 200px;
  margin: 26px;
  padding: 10px;
  border: 1px solid red;
}

p {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

.cont {
  border: 1px solid blue;
}

.context {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid #ccc;
}

.input-use {
  width: 95%;
  height: 140px;
  padding: 10px;
  border: 1px solid grey;
}

button {
  margin-top: 10px;
  float: right;
}
</style>
