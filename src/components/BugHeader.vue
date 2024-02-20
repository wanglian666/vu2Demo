<template>
  <div>
    <textarea
      cols="50"
      rows="10"
      placeholder="请输入bug的描述信息"
      v-model="description"
    ></textarea>
    <button @click="onSave">保存</button>
  </div>
</template>

<script>
export default {
  name: "BugHeader",
  data() {
    return {
      description: '',
    };
  },
  methods: {
    onSave() {
      if(this.description.trim() != '') {
        let obj = {
          id:new Date().getTime(),
          desc:this.description,
          resolve:false
        }
        this.$emit('saveBugCallback',obj);
        this.description = '';
      }
    }
  },
};
</script>

<style scoped>
button {
  display: block;
}
</style>