<!-- 需求：  点击一级就禁用其他的  剩下随便点  但是点击二级的时候如果有三级的时候那么三级就全部中 -->
<template>
  <div class="block">
    <span class="demonstration">默认 click 触发子菜单</span>
    <el-cascader ref="refCascader" v-model="value" :options="options" @change="handleChange" :props="{
      multiple: true,
      checkStrictly: true,
      value: 'value',
      label: 'label',
      children: 'children',
    }">
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
      </template>
    </el-cascader>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      first: [],
      value: [],
      flag: true,

      options: [
        {
          label: "缴税",
          value: "jiaoshui",
          disabled: false,
        },
        {
          label: "生活缴费",
          value: "shenghuojiaofei",
          disabled: false,
          children: [
            {
              label: "通用缴费-数币支付",
              value: "shubizhifu",
              disabled: false,
            },
            {
              label: "通用缴费-账户支付",
              value: "zhanghuzhifu",
              disabled: false,
            },
          ],
        },
        {
          label: "数币",
          value: "shubi",
          disabled: false,
          children: [
            {
              label: "充钱包",
              value: "chongqianbao",
              disabled: false,
            },
            {
              label: "存银行",
              value: "cunyinhang",
              disabled: false,
            },
            {
              label: "绑定本行卡",
              value: "bangding",
              disabled: false,
            },
            {
              label: "扫码支付",
              value: "saomazhifu",
              disabled: false,
              children: [
                {
                  label: "扫码支付-主扫/被扫组合支付",
                  value: "111",
                  disabled: false,
                },
                {
                  label: "扫码支付-被扫免密",
                  value: "222",
                  disabled: false,
                },
                {
                  label: "扫码支付-被扫验客支付",
                  value: "333",
                  disabled: false,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    getCheckedNodes (data) {
      console.log("data", data);
    },

    handleChange (v) {
      let selectValue;
      if (v.length === 1) {
        selectValue = v[0][0]
        this.options.forEach((item, index) => {
          if (item.value === selectValue) {
            item.disabled = false;
          } else {
            item.children?.forEach((item2, index2) => {
              item2.disabled = true;
              item2.children?.forEach((item3, index3) => {
                item3.disabled = true;
              })
            })
            item.disabled = true;
          }
        })
      } else if (v.length === 0) {
        this.options.forEach((item, index) => {
          item.disabled = false;

          item.children?.forEach((item2, index3) => {
            item2.disabled = false;
            item2.children?.forEach((item3, index3) => {
              item3.disabled = false;
            })
          })
        })

      }
      const arr = this.$refs["refCascader"].getCheckedNodes();
      this.value = []
      arr.map(item => {
        let newDat = item.pathValues
        if (item.children.length > 0) {
          if (newDat.length === 2) {
            item.children.map(v => {
              const tempArray = [...newDat, v.value];
              this.value.push(tempArray);
            })
            this.value.push(item.pathValues)
          } else if (newDat.length === 1) {
            this.value.push(item.pathValues)
          }
        } else {
          if (newDat.length === 3) {
          } else if (newDat.length === 2) {
            this.value.push(item.pathValues)
          } else {
            this.value.push(item.pathValues)
          }
        }
      })
    },
  }
};
</script>
<style lang="less" scoped></style>