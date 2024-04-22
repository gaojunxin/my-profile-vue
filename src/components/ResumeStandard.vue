<script setup>
import moment from 'moment';
// 简历组件 
const props = defineProps({
    data: {
        type: Object,
    },

});

</script>
<template>
  <div class="bg-slate-50" v-if="data">
    <div class="resume-standard container mx-auto max-w-screen-lg">
      <main class="p-8 bg-white text-zinc-800">
        <div class="header">
          <div class="flex flex-col">
            <div class="div basic-info text-center md:mx-auto">
              <div class="div md:flex md:justify-center md:items-center">
                <h1 class="text-3xl font-semibold mb-2 mr-2">
                  {{ data.basicInfo.name }}
                </h1>
                <h2 class="text-xl mb-2">{{ data.basicInfo.title }}</h2>
              </div>
            </div>
            <ul class="text-left flex justify-center mb-2 flex-wrap">
              <li class="flex flex-row mr-5 items-center">
                <svg-icon name="location" className="app-icon" />{{
                  data.basicInfo.location
                }}
              </li>
              <li class="flex flex-row mr-5 items-center">
                <svg-icon name="email" className="app-icon" />{{
                  data.basicInfo.email
                }}
              </li>
              <li class="flex flex-row mr-5 items-center">
                <svg-icon name="phone" className="app-icon" />{{
                  data.basicInfo.cellphone
                }}
              </li>
              <li class="flex flex-row mr-5 items-center">
                <svg-icon name="birthday" className="app-icon" />{{
                  moment(data.basicInfo.birth).format('YYYY/MM')
                }}
              </li>
            </ul>
            <ul
              class="text-left flex justify-center first-line text-left flex-wrap"
            >
              <li class="flex mr-5 items-center" v-for="item in data.links">
                <a :href="item.url" target="_blank"
                  ><svg-icon className="app-icon" :name="['Github'].indexOf(item.name) > 0 ? item.name : 'link'" />{{
                    item.name
                  }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <ContentSection :name="item.name" :type="item.type" :tagStyle="item.tagStyle" :items="item.data" v-for="item in data.sections"/>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

a {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}
</style>

<style>
*,
:after,
:before {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}

.app-icon {
  font-size: 12px;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
.resume-standard{
  font-family: IBM Plex Sans, Source Han Sans SC VF, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
</style>
