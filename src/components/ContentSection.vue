<script setup>
import CustomContent from "./CustomContent.vue";
import NormalContent from "./NormalContent.vue";
// 简历片段
defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  tagStyle: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="content-section">
    <div class="content-section-holder mt-7">
      <header class="section-title-header">
        <h2 class="text-xl font-semibold mb-2 border-l-4 pl-3 py-1">
          {{ name }}
        </h2>
      </header>
      <div :class="['content-section-container', { 'tag-style mt-4': tagStyle }]">
        <div :class="['section-detail-item', tagStyle ? 'mb-5' : 'mt-5']" v-for="(item, index) in items">
          <CustomContent :key="'custom' + index" v-bind="item" v-if="type == 'custom' || type == 'skills'" />
          <NormalContent :key="index" v-bind="item" :type="type" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-title-header h2 {
  --tw-border-opacity: 1;
  --tw-bg-opacity: 1;
  --tw-text-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity));
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
</style>

<style>
*,
:after,
:before {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}

.resume-artist .tag-style,
.resume-column .tag-style,
.resume-future .tag-style,
.resume-intro .tag-style,
.resume-modern .tag-style,
.resume-mono .tag-style,
.resume-monotwo .tag-style,
.resume-neno .tag-style,
.resume-paper .tag-style,
.resume-pure .tag-style,
.resume-read .tag-style,
.resume-standard .tag-style,
.resume-timeline .tag-style {
  display: flex;
  flex-wrap: wrap;
}

.tag-style .custom-content h3 {
  --tw-border-opacity: 1;
  --tw-text-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
  border-radius: 0.25rem;
  border-width: 1px;
  color: rgb(37 99 235 / var(--tw-text-opacity));
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 0.25rem 0.5rem;
}


.resume-artist .tag-style .section-detail-item,
.resume-column .tag-style .section-detail-item,
.resume-future .tag-style .section-detail-item,
.resume-intro .tag-style .section-detail-item,
.resume-modern .tag-style .section-detail-item,
.resume-mono .tag-style .section-detail-item,
.resume-monotwo .tag-style .section-detail-item,
.resume-neno .tag-style .section-detail-item,
.resume-paper .tag-style .section-detail-item,
.resume-pure .tag-style .section-detail-item,
.resume-read .tag-style .section-detail-item,
.resume-standard .tag-style .section-detail-item,
.resume-timeline .tag-style .section-detail-item {
  margin-bottom: 0;
  margin-right: 1rem;
  margin-top: 0;
}
</style>
