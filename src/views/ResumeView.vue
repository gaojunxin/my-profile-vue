<script setup>
import { ref, onMounted } from "vue";
import { data } from '../data'
// 简历组件

const dataState = ref();

onMounted(() => {
  dataState.value = data.data.data;
});

/**
 * 显示打印弹窗
 */
function printDocument() {
  window.print();
}

</script>
<template>
  <div>
    <header class="hidden-xs-only resume-header p-2 bg-slate-50 space-x-2 float-left">
      <router-link to="/">
        <el-button type="primary">返回</el-button>
      </router-link>
      <el-button @click="printDocument">下载PDF</el-button>
    </header>
    <ResumeStandard :data="dataState" />
  </div>
</template>

<style scoped></style>
<style>
@media print {
  body {
    print-color-adjust: exact;
    /* 标准属性 */
    -webkit-print-color-adjust: exact;
    /* Webkit 浏览器 */
    -moz-print-color-adjust: exact;
    /* Firefox 浏览器 */
    -o-print-color-adjust: exact;
    /* Opera 浏览器 */
    -ms-print-color-adjust: exact;
    /* IE 浏览器 */
  }

  .resume-header {
    display: none !important;
  }
}

@media only screen and (max-width: 991px) {
    .resume-header {
        float: none !important;
    }
}
</style>