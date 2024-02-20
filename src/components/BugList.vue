<template>
  <div v-show="bugList.length">
    <table>
      <thead>
        <tr>
          <!-- 方法一 -->
          <!-- <th>全选<input type="checkbox" :checked="isAll" @change="selectAll"/></th> -->
          <!-- 方法二  -->
          <th style="width:120px;">全选<input type="checkbox" v-model="isAll" /></th>
          <th>bug描述</th>
          <th  style="width:190px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <BugItem v-for="bug in bugList" :key="bug.id" :bugItem="bug"></BugItem>
      </tbody>
    </table>
  </div>
</template>

<script>
import BugItem from "./BugItem.vue";
export default {
  name: "BugList",
  props:['bugList'],
  components: {
    BugItem,
  },
  computed:{
    resolved() {
      const count = this.bugList.reduce((result,bug) => {
          let num =  bug.resolve ? 1 : 0
          return result + num
      },0)
      return count
    },
    // isAll() {
    //   return this.bugList.length === this.resolved && this.bugList.length > 0
    // }

    // 代码改进
    isAll: {
      get() {
        return this.bugList.length === this.resolved && this.bugList.length > 0
      },
      set(flag) {
        this.$emit('selectAllCallback',flag);
      }
    }
  },
  methods:{
    // 全选/全不选
    // selectAll(e) {
    //   this.$emit('selectAllCallback',e.target.checked);
    // }
  }
};
</script>

<style scoped>

</style>