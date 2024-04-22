<template>
    <div class="section-editor">
        <div class="flex flex-col w-full">
            <QuillEditor :options="editorOption" ref="myQuillEditor" theme="snow" v-model:content="content"
                contentType="html" @blur="onEditorBlur($event)" />
        </div>

    </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
const myQuillEditor = ref()
const content = ref()

const editorOption = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ]
    },
    placeholder: '请输入内容...'
}

function onEditorBlur(quill) {
    props.onUpdate({ title: '', description: content.value })
}

onMounted(() => {

})


// 简历片段
const props = defineProps({
    type: {
        type: String,
    },
    items: {
        type: Array,
        required: true,
    },
    onAdd: Function,
    onUpdate: Function
});



</script>
<style></style>