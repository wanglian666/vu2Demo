<template>
  <div>
    <BugHeader @saveBugCallback="saveBugCallback"></BugHeader>
    <BugList
      :bugList="bugList"
      @selectAllCallback="selectAllCallback"
    ></BugList>
    <BugFooter
      :bugList="bugList"
      @clearResolvedCallback="clearResolvedCallback"
    ></BugFooter>
  </div>
</template>

<script>
import BugHeader from "./components/BugHeader.vue";
import BugList from "./components/BugList.vue";
import BugFooter from "./components/BugFooter.vue";
export default {
  name: "App",
  components: {
    BugHeader,
    BugList,
    BugFooter,
  },
  mounted(){
    this.$bus.$on('modifyResolveCallback',this.modifyResolveCallback);
    this.$bus.$on('deleteByIdCallback',this.deleteByIdCallback);
    this.$bus.$on('change',this.onDataChange);
  },
  beforeDestroy() {
    // 非常重要的行为习惯
    this.$bus.$off(['modifyResolveCallback','deleteByIdCallback','change']);
  },
  data() {
    return {
      bugList: [
        { id: "111", desc: "BUG描述信息1", resolve: false },
        { id: "222", desc: "BUG描述信息2", resolve: false },
        { id: "333", desc: "BUG描述信息3", resolve: true },
        { id: "444", desc: "BUG描述信息4", resolve: false },
      ],
    };
  },
  methods: {
    // 编辑bug描述内容
    onDataChange(bugId,data){
      this.bugList.forEach((bug) => {
        if(bug.id === bugId) {
          bug.desc = data;
        }
      })
    },
    saveBugCallback(bug) {
      this.bugList.unshift(bug);
    },

    // 勾选框
    modifyResolveCallback(bugId) {
      this.bugList.forEach((bug) => {
        if (bug.id === bugId) {
          bug.resolve = !bug.resolve;
        }
      });
    },

    // 单条数据删除
    deleteByIdCallback(bugId) {
      this.bugList = this.bugList.filter((bug) => bug.id !== bugId);
    },

    // 全选/全不选
    selectAllCallback(flag) {
      this.bugList.forEach((bug) => {
        bug.resolve = flag;
      });
    },

    // 清除已解决Bug
    clearResolvedCallback() {
      this.bugList = this.bugList.filter((bug) => !bug.resolve);
    },
  },
};
</script>

<style>
button {
  background-color: #eb3030;
  color: #fff;
}

table {
  width: 700px;
  border-collapse: collapse;
  margin: 10px 0;
}

table,
th,
td {
  border: 1px solid;
  padding: 5px;
}

table tr {
  /* display: flex; */
}

tr>td:first-child, tr>th:first-child {
  /* width: 30px; */
}

tr>td:last-child, tr>th:last-child {
  /* width: 100px; */
}

tr>td,th {
  /* flex: 1; */
  text-align: center;
}

table thead tr {
  background-color: skyblue;
}

table tbody tr:nth-child(even) {
  background-color: #ccc;
}
</style>