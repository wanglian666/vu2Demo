<template>
  <tr>
    <td>
      <input type="checkbox" :checked="bugItem.resolve" @change="onChange(bugItem.id)" />
    </td>
    <td class="select">
      <span v-if="!isEdit" @click="onEdit">{{ bugItem.desc }}</span>
      <input ref="txt" v-else type="text" v-model="editData" @keydown.enter="saveEdit(bugItem.id)" />
    </td>
    <td>
      <button @click="delBUG(bugItem.id)">删除</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "BugItem",
  props: ["bugItem"],
  data() {
    return {
      isEdit: false,
      editData: "",
    };
  },
  methods: {
    onEdit() {
      this.isEdit = true;
      this.editData = this.bugItem.desc;
      this.$nextTick(() => {
        this.$refs.txt.focus();
      });
    },
    delBUG(id) {
      this.$bus.$emit("deleteByIdCallback", id);
    },
    onChange(id) {
      this.$bus.$emit("modifyResolveCallback", id);
    },
    // 编辑bug描述内容
    saveEdit(bugId) {
      this.isEdit = false;
      this.$bus.$emit("change", bugId, this.editData);
    },
  },
};
</script>

<style scoped>
.select {
  cursor: pointer;
}
</style>