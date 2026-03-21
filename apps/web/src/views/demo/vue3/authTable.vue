<template>
  <el-table-v2 :columns="columns" :data="data" :width="700" :height="400" fixed />
</template>

<script lang="tsx" setup>
import { ref } from "vue"
import dayjs from "dayjs"
import { ElTooltip, ElIcon, ElTag, ElButton } from "element-plus"
import { Timer } from "@element-plus/icons-vue"

let id = 0

const dataGenerator = () => ({
  id: `random-id-${++id}`,
  name: "Tom",
  date: "2020-10-1",
})

const columns = [
  {
    key: "date",
    title: "Date",
    dataKey: "date",
    width: 150,
    fixed: "left",
    cellRenderer: ({ cellData: date }) => (
      <ElTooltip content={dayjs(date).format("YYYY/MM/DD")}>
        <span class="flex items-center">
          <ElIcon class="mr-3">
            <Timer />
          </ElIcon>
          {dayjs(date).format("YYYY/MM/DD")}
        </span>
      </ElTooltip>
    ),
  },
  {
    key: "name",
    title: "Name",
    dataKey: "name",
    width: 150,
    align: "center",
    cellRenderer: ({ cellData: name }) => <ElTag>{name}</ElTag>,
  },
  {
    key: "operations",
    title: "Operations",
    cellRenderer: () => (
      <>
        <ElButton size="small" v-auth="edit">
          Edit
        </ElButton>
        <ElButton size="small" type="danger" v-auth="delete">
          Delete
        </ElButton>
      </>
    ),
    width: 150,
    align: "center",
  },
]

const data = ref(Array.from({ length: 8 }).map(dataGenerator))
</script>
