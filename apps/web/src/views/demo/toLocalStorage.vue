<template>
  <div class="show-viewcom">
    <p>评论:</p>
    <div class="context">
      <ul v-for="item, index in content" :key="item.id">
        <li style="display: block">{{ item.data }}
          <el-icon style="float: right;" @click="handleDelete(index)">
            <DeleteFilled />
          </el-icon>
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

import { defineComponent, reactive, ref, nextTick } from "vue";
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

    let contentData: string = JSON.stringify(content.value)
    localStorage.setItem('ts-demo1', contentData)


    let jsonKey = ref('ts-demo1')
    let contId = ref('')
    let contentWrite = ref('')
    const handleDelete = (id: number | string) => {
      let arr: any = readData()
      //  使用aplice
      arr.splice(id, 1)
      // content.value=arr.filter((item,index)=>index !== id)
      //使用slice
      content.value = arr
      setData(arr)
    }


    //取值
    const readData = () => {
      let localJson: string | null = localStorage.getItem(jsonKey.value)
      if (localJson !== null) {
        content.value = JSON.parse(localJson)
        return JSON.parse(localJson)
      }
    }

    //存值
    const setData = (arrData: object[]): void => {
      let localJson: string | null = JSON.stringify(arrData)
      localStorage.setItem(jsonKey.value, localJson)
    }


    const handlerAdd = () => {
      //1.拿到本地数据
      let arr: any = readData()
      //3自动生成主键id
      let newId = arr.length > 0 ? arr.length + 1 : 1
      let newObj: any = {
        "data": contentWrite.value,
        'id': newId
      }
      //4将对象新增到数组中
      arr.push(newObj)
      //5 保存新的数组
      setData(arr)

      nextTick(() => {
        readData()
      })
      contentWrite.value = ''
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
  overflow: auto;
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
