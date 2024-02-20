<template>
  <div v-show="bugList.length">
    <button @click="clearResolved">清除已解决</button>
    <span>当前BUG总量{{ total }}个，已解决{{ resolved }}个</span>
  </div>
</template>

<script>
export default {
  name: 'BugFooter',
  props: ['bugList'],
  data() {
    return {};
  },
  computed: {
    total() {
      return this.bugList.length;
    },
    resolved() {
      // 传统计算方法
      // let count = 0;
      // this.bugList.forEach(bug => {
      //   if(bug.resolve) count ++
      // });
      // return count

      // 使用ES6数组统计方法reduce
      const count = this.bugList.reduce((result,bug) => {
          let num =  bug.resolve ? 1 : 0
          return result + num
      },0)
      return count
    },
  },
  methods: {
    clearResolved() {
      this.$emit('clearResolvedCallback');
    },
  },
};
</script>

<style scoped>
span {
  margin-left: 10px;
}
</style>