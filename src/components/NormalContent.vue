<script setup>
// 通用片段
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  city: {
    type: String,
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

const icon = computed(() => {
  if (props.type == 'empolyment') {
    return 'location'
  } else if (props.type == 'education') {
    return 'education'
  } else {
    return null;
  }
})
</script>

<template>
  <div class="normal-content">
    <header>
      <div class="flex items-center justify-between mb-2 flex-wrap">
        <div>
          <span class="text-lg font-semibold">{{ title }} - {{ subTitle }}</span><span class="ml-4"> </span><svg-icon
            :name="icon" className="app-icon" />{{ city }}
        </div>
        <h4 class="text-right">{{ startDate }} - {{ endDate == 'PRESENT' ? '至今' : endDate }}</h4>
      </div>
    </header>
    <div class="item-description py-2" v-if="description" v-html="description"></div>
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
