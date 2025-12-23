<template>
  <h1>vue3</h1>
  <div>vue3传过来的id{{ routerId }}</div>
  <button @click="goBack">回到首页方法1</button>
  <button @click="router.go(-1)">回到首页方法2</button>
  <div>
    <h3>{{ state.counter }}</h3>
    <el-button @click="addCounter">++</el-button>
  </div>

  <div>
    {{ fullName }}
  </div>

  <div>
    {{ name }}--{{ age }}
    <button @click="changeName">changeName</button>
    <button @click="changeAge">changeAge</button>
  </div>

  <div>
    {{ info.name }}
    <button @click="changeNameData">changeName厉害</button>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  computed,
  watchEffect,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup(props, { attrs, slots, emit }) {
    const router = useRouter();
    const route = useRoute();
    //ref的使用
    let firstName = ref("花田一路");
    let lastName = ref("花田二路");
    //reactive的使用
    const state = reactive({
      counter: 1,
    });

    const dataMap = reactive({
      routeId: 0,
    });
    //goback
    const goBack = () => {
      router.go(-1);
    };

    //生命周期
    onMounted(() => {
      dataMap.routeId = route.query.id;
    });

    //reactive的使用
    const addCounter = () => {
      state.counter++;
    };

    //complate的使用
    // const fullName = computed(() => {
    //   return firstName.value + "" + lastName.value;
    // });

    // const fullName = computed(() => firstName.value + " " + lastName.value);

    const fullName = computed({
      get: () => firstName.value + " " + lastName.value,
      set(newValues) {
        const names = newValues.split(" ");
        firstName.value = names[0];
        lastName.value = names[1];
      },
    });
    //watchEffect的使用
    let name = ref("科比");
    let age = ref(20);
    const changeName = () => {
      name.value = "礼拜";
    };
    const changeAge = () => {
      age.value++;
      if (age.value > 25) {
        stop();
      }
    };
    //当大于某个点就符合某个条件再调用就停止了
    const stop = watchEffect((onInvalidate) => {
  

      const timer = setTimeout(() => {
      }, 200);
      //可以使用stop清楚副作用
      // 根据name和age两个变量发送网络请求
      onInvalidate(() => {
        // 在这个函数中清除额外的副作用
        // request.cancel()
        clearTimeout(timer);
      });
    });

    const info = reactive({ name: "张静", age: "29" });

    watch(
      () => info.name,
      (newValue, oldValue) => {
        console.log("newValue", newValue, "oldValue", oldValue);
      }
    );

    const changeNameData = () => {
      info.name = "佩服";
    };
    //生命周期

    //render函数
    return {
      name,
      age,
      info,
      changeName,
      changeAge,
      changeNameData,
      ...toRefs(dataMap),
      goBack,
      router,
      state,
      addCounter,
      fullName,
    };
  },
});
</script>

<style lang="scss" scoped></style>
