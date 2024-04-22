<template>
    <div class="tag-section-editor">
        <el-input v-model="inputValue" placeholder="输入技能，回车确认" @change="(value) => {
            onAdd({
                title: value
            }), inputValue = null
        }" />
        <el-tag v-for="(tag, index) in items" @close="tagRemove(index)" closable>
            {{ tag.title }}
        </el-tag>
    </div>
</template>

<script lang="ts" setup>

const inputValue = ref('')

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

function tagRemove(tagIndex) {
    props.items.splice(tagIndex, 1)
    props.onUpdate(props.items)
}


</script>
<style>
.tag-section-editor .el-input {
    width: 50%;
    display: block;
    margin-bottom: 15px;
}

.tag-section-editor .el-input__wrapper {
    display: flex;
}

.tag-section-editor .el-tag {
    margin-right: 5px;
}
</style>