<script setup>
// 自定义片段
defineProps({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>

<template>
  <div class="custom-content">
    <header>
      <div class="md:flex md:items-center md:justify-between flex-wrap">
        <h3 class="text-l font-semibold mb-2">{{ title }}</h3>
        <h4 v-if="startDate" class="md:text-right">{{ startDate }} - {{ endDate == 'PRESENT' ? '至今' : endDate  }}</h4>
      </div>
    </header>
    <div class="item-description py-2" v-if="description"  v-html="description">
    </div>
  </div>
</template>

<style>
.item-description ul {
  list-style-position: inside;
  list-style-type: disc;
}

.item-description ul ::marker {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
</style>
