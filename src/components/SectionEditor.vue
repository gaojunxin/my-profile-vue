<template>
    <div class="section-editor">
        <ul class="ez-list" ref="listRef">
            <li class="ez-item" v-for="(item, index) in items">
                <el-form :model="dataState" v-if="currentEditRowId == index">
                    <el-button size="small" @click="() => updateData(true)">收起</el-button>
                    <el-row :gutter="20">
                        <el-col :span="item.type == 'edit' ? 24 : 12" v-for="item in config[type]">
                            <el-form-item :label="item.label">
                                <template #label>
                                    <span>{{ item.label }}</span>
                                    <el-switch class="ml-1" active-text="至今" v-if="item.type == 'date'"
                                        @change="dateSwitchChange" v-model:model-value="dateSwitchStatus" />
                                </template>
                                <el-input v-if="item.type == 'text'" v-model="dataState[item.name]" clearable />
                                <el-date-picker v-model="startEndDate"
                                    v-else-if="item.type == 'date' && dateSwitchStatus" type="month"
                                    start-placeholder="开始月份" />
                                <el-date-picker v-model="startEndDate" v-else-if="item.type == 'date'" type="monthrange"
                                    range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" />
                                <div class="flex flex-col w-full" v-else-if="item.type == 'edit'">
                                    <QuillEditor :options="editorOption" ref="myQuillEditor" theme="snow"
                                        v-model:content="dataState[item.name]" contentType="html" />
                                </div>

                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button type="success" size="small" @click="() => updateData(true)">关闭并继续</el-button>
                </el-form>
                <div class="flex justify-between item-option" v-else>
                    <div class="flex flex-row items-center">
                        <el-tooltip content="拖动重新排序" placement="top-start">
                            <div>
                                <svg-icon className="my-handle" name="drag" />
                            </div>
                        </el-tooltip>

                        <div class="flex flex-col">
                            <h6 class="item-title">{{ item.title }}</h6>
                            <p class="item-date" v-if="item.city"><span>{{ item.city }}</span> {{ item.startDate }} - {{
                item.endDate == 'PRESENT' ? '至今' : item.endDate }}</p>
                        </div>
                    </div>
                    <div>
                        <el-button size="small" type="primary" @click="edit(index)">编辑</el-button>
                        <el-button size="small" type="danger" @click="remove(index)">删除</el-button>
                    </div>
                </div>
            </li>
        </ul>

        <el-button link type="primary" @click="add()"><el-icon><i-ep-Plus /></el-icon>添加新的内容</el-button>
    </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import moment from 'moment';
import Sortable from 'sortablejs'
import cloneDeep from 'lodash/cloneDeep';

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

const listRef = ref()

const dataState = ref({});
const currentEditRowId = ref()
const startEndDate = ref()

const dateSwitchStatus = ref()

const myQuillEditor = ref()

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

onMounted(() => {
    const sortableHtml = new Sortable(listRef.value, {
        animation: 150,
        sort: true,
        // 拖拽时预览图样式
        ghostClass: 'blue-background-class',
        handle: ".my-handle",
        // 具体配置见http://www.sortablejs.com/options.html
        onEnd: async (evt) => {
            // 通过index更改数据，获取拖拽排序之后的数据
            const newData = cloneDeep(props.items);
            const changeData = newData.splice(evt.oldIndex || 0, 1)
            newData.splice(evt.newIndex || 0, 0, changeData[0])
            props.onUpdate([])
            await nextTick()
            props.onUpdate(newData)
        }
    })

})


function edit(index) {
    if (props.items[index]) {
        currentEditRowId.value = index
        dataState.value = props.items[index]
        if (dataState.value?.endDate == 'PRESENT') {
            startEndDate.value = dataState.value.startDate
            dateSwitchStatus.value = true
        } else {
            startEndDate.value = [dataState.value.startDate, dataState.value.endDate]
            dateSwitchStatus.value = false
        }
    }

}

async function add() {
    let index = props.onAdd({})
    await nextTick()
    edit(index)
}

function remove(dataIndex) {
    props.onUpdate(props.items.filter((item, index) => index != dataIndex))
}

async function dateSwitchChange(val) {
    if(val){
        if (Array.isArray(startEndDate.value)) {
            startEndDate.value = startEndDate.value[0]
        }
    }else{
        if (!Array.isArray(startEndDate.value)) {
            startEndDate.value = [startEndDate.value, new Date()]
        }
    }
}

function updateData(closeEdit) {
    let newData = props.items.map((item, index) => {
        if (index === currentEditRowId.value) {
            if (!startEndDate.value) {
                dataState.value.startDate = '';
                dataState.value.endDate = '';
                return dataState.value
            }
            if (Array.isArray(startEndDate.value)) {
                dataState.value.startDate = moment(startEndDate.value[0]).format('YYYY/MM');
                dataState.value.endDate = dateSwitchStatus.value ? 'PRESENT' : moment(startEndDate.value[1]).format('YYYY/MM');
            } else {
                dataState.value.startDate = moment(startEndDate.value).format('YYYY/MM');
                dataState.value.endDate = dateSwitchStatus.value ? 'PRESENT' : moment(new Date()).format('YYYY/MM');
            }
            return dataState.value;
        } else {
            return item;
        }
    });
    props.onUpdate(newData)
    if (closeEdit) {
        currentEditRowId.value = null
    }
}

// 不同片段编辑时的字段配置
const config = {
    // 工作经历
    empolyment: [
        {
            label: '公司名称',
            type: 'text',
            name: 'title'
        },
        {
            label: '职位名称',
            type: 'text',
            name: 'subTitle'
        },
        {
            label: '所在城市',
            type: 'text',
            name: 'city'
        },
        {
            label: '开始&结束时间',
            type: 'date',
            name: 'startDate'
        },
        {
            label: '描述',
            type: 'edit',
            name: 'description'
        }
    ],
    // 专业技能
    skills: [
        {
            label: '技能名称',
            type: 'text',
            name: 'title'
        },
        {
            label: '开始&结束时间',
            type: 'date',
            name: 'startDate'
        },
        {
            label: '描述',
            type: 'edit',
            name: 'description'
        }
    ],
    // 教育经历
    education: [
        {
            label: '学校名称',
            type: 'text',
            name: 'title'
        },
        {
            label: '最高学历',
            type: 'text',
            name: 'subTitle'
        },
        {
            label: '专业',
            type: 'text',
            name: 'city'
        },
        {
            label: '开始&结束时间',
            type: 'date',
            name: 'startDate'
        },
        {
            label: '描述',
            type: 'edit',
            name: 'description'
        }
    ],
    // 自定义
    custom: [
        {
            label: '名称',
            type: 'text',
            name: 'title'
        },
        {
            label: '开始&结束时间',
            type: 'date',
            name: 'startDate'
        },
        {
            label: '描述',
            type: 'edit',
            name: 'description'
        }
    ]
}
</script>
<style>
.basic-info-form>.el-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.basic-info-form .el-form-item {
    flex: 100%;
    flex-grow: 0;
    padding-right: 15px;
}

@media (min-width: 640px) {
    .basic-info-form .el-form-item {
        flex: 45%;
    }
}

.section {
    background: #fff;
    transition: background 0.5s ease-out;
    margin-bottom: 30px;
}

.ez-list li.ez-item {
    border: 1px solid #ebeef5;
    border-radius: 5px;
    padding: 1rem;
    background: #fff;
    margin-bottom: 1rem;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ez-list li.ez-item:hover {
    border: 1px solid #0c66ff;
}

.normalize h5 {
    font-size: 1.25rem;
}

.section>h5 {
    margin: 1rem 0;
}

.section>p {
    color: #909399;
}

.section-editor.isDragging .ez-list {
    display: none;
}

.section-editor .ez-item .el-col-1 {
    display: flex;
    align-items: center;
    justify-content: start;
}

.section-editor .handle {
    cursor: pointer;
}

.section-editor .item-title {
    margin: 0.5rem 0;
}

.section-editor .item-date {
    color: #909399;
    margin: 0;
}

.section-editor .item-date span {
    font-weight: 500;
    margin-right: 5px;
}

.section-editor .el-form-item {
    display: block;
}

.section-editor .bottom-btn {
    margin-bottom: 0;
}

.section-editor .hide-up-button {
    text-align: right;
}

.section-editor .hide-up-button .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.section-editor .hide-up-button .config-section span svg {
    margin-right: 5px;
}

.section-editor .time-range .el-form-item__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-editor .time-range .el-form-item__content .el-date-editor {
    width: 100%;
}

.section-editor .time-range .el-range-separator {
    width: 15%;
}

.section-editor .el-form-item__label {
    float: none;
    color: #909399;
}

.section-editor .ql-container {
    margin-bottom: 1.5rem;
}

.section-editor .ql-editor {
    min-height: 200px;
}

.section-editor .item-title {
    margin: 0.5rem 0;
}

.section-editor .item-date {
    color: #909399;
    margin: 0;
}

@media only screen and (max-width: 991px) {
    .item-option {
        flex-direction: column;
    }
}

.my-handle {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: #81899b;
    cursor: pointer;
}
</style>