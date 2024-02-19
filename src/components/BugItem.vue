<template>
    <tr>
      <td>
        <input type="checkbox" :checked="bugItem.resolve" @change="onChange(bugItem.id)"/>
      </td>
      <td class="select">
        <span v-if="!isEdit" @click="isEdit =true">{{ bugItem.desc }}</span>
        <input v-else type="text" v-model="editData" @keydown.enter="saveEdit" />
      </td>
      <td>
        <button @click="delBUG(bugItem.id)">删除</button>
      </td>
    </tr>
</template>

<script>
export default {
  name: "BugItem",
  props:['bugItem','modifyResolveCallback','deleteByIdCallback'],
  data() {
    return{
      isEdit:false,
      editData:''
    }
  },
  methods: {
    delBUG(id) {
      this.deleteByIdCallback(id)
    },
    onChange(id) {
      this.modifyResolveCallback(id)
    },
    // 编辑bug描述内容
    saveEdit() {
      console.log('输入的内容',this.editData);
    }

  },
};
</script>

<style scoped>
.select {
  cursor: pointer;
}
</style>