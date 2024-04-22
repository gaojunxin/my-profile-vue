<template>
  <div ref="scrollTarget">
    <el-alert title="声明" type="info" description="本设计器所有动作都在浏览器上处理，数据也是只保存到浏览器缓存，和后端无任何交互和存储，请放心使用。" show-icon />
    <el-row v-if="dataState">
      <el-col :xs="24" :md="12" class="p-7 normalize">
        <header class="pb-4 space-x-2">
          <el-dropdown @command="addSection">
            <el-button>
              新增模块<el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="single">简单模块</el-dropdown-item>
                <el-dropdown-item command="multiline">多行模块</el-dropdown-item>
                <el-dropdown-item command="tag">标签模块</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button @click="saveData">保存到缓存</el-button>
          <el-button @click="clearData">删除缓存</el-button>
          <el-button class="hidden-xs-only" @click="printDocument">下载PDF</el-button>
          <router-link to="/resume">
            <el-button class="head-toolbar" type="primary">预览</el-button>
          </router-link>
          <el-button class="head-toolbar" type="success" link tag="a" href="https://www.gaojunxin.cn"
            target="_blank">我的博客：www.gaojunxin.cn</el-button>
          <el-button class="head-toolbar" type="success" link tag="a" href="https://github.com/gaojunxin"
            target="_blank">源码地址</el-button>
        </header>
        <div class="basic-info section" id="basic-info">
          <h5>基本信息</h5>
          <p>包含你的个人信息以及联系方式 </p>
          <div class="basic-info-form">
            <el-form v-if="dataState.basicInfo" :model="dataState.basicInfo" label-width="auto" label-position="left">
              <el-form-item label="职位名称">
                <el-input v-model="dataState.basicInfo.title" clearable />
              </el-form-item>
              <el-form-item>
                <el-avatar :size="60" :src="dataState.basicInfo.avatar ? dataState.basicInfo.avatar : defaultAvatar" />
                <div class="ml-4">
                  <el-button type="primary" size="small">{{ dataState.basicInfo.avatar ? '重新上传' : '上传头像' }}</el-button>
                  <el-button type="primary" size="small" v-if="dataState.basicInfo.avatar">裁剪头像</el-button>
                  <el-button type="danger" size="small" v-if="dataState.basicInfo.avatar"
                    @click="dataState.basicInfo.avatar = null">删除头像</el-button>
                </div>

              </el-form-item>

              <el-form-item label="姓名">
                <el-input v-model="dataState.basicInfo.name" clearable />
              </el-form-item>
              <el-form-item label="工作地点">
                <el-input v-model="dataState.basicInfo.location" clearable />
              </el-form-item>

              <el-form-item label="手机号码">
                <el-input v-model="dataState.basicInfo.cellphone" clearable />
              </el-form-item>
              <el-form-item label="电子邮件">
                <el-input v-model="dataState.basicInfo.email" clearable />
              </el-form-item>

              <el-form-item label="出生日期">
                <!-- <el-input v-model="dataState.basicInfo.birth" clearable /> -->
                <el-date-picker v-model="dataState.basicInfo.birth" type="month" />
              </el-form-item>
              <el-form-item label="微信号">
                <el-input v-model="dataState.basicInfo.user" clearable />
              </el-form-item>

            </el-form>
          </div>
        </div>

        <div class="links section">
          <h5>自定义内容</h5>
          <p>你可以在下方区域添加任何链接或者文本，请记住，对于程序员来说，一个优秀的个人网站或者出色的 Github 链接可以让你的简历加分不少， </p>
          <div class="link-editor">
            <ul class="ez-list" ref="linkListRef">
              <li class="ez-item" v-for="(item, index) in dataState.links">
                <el-form :model="dataState.links" class="flex justify-between" v-if="editState.linkId == index">
                  <el-form-item>
                    <el-input v-model="dataState.links[index].name" clearable />
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="dataState.links[index].src" clearable />
                  </el-form-item>
                  <div>
                    <el-button size="small" type="success" @click="editState.linkId = null">更新</el-button>
                    <el-button size="small" type="info" @click="editState.linkId = null">取消</el-button>
                  </div>
                </el-form>
                <div class="flex justify-between item-option" v-else>
                  <div class="flex flex-1 justify-between">
                    <div class="flex flex-row items-center">
                      <el-tooltip content="拖动重新排序" placement="top-start">
                        <div>
                          <svg-icon className="my-handle" name="drag" />
                        </div>
                      </el-tooltip>
                      <span class="link-name">{{ item.name }}</span>
                    </div>

                    <span class="link-src">{{ item.src }}</span>
                  </div>

                  <div class="flex-1 sm:m-1 sm:text-left lg:text-right">
                    <el-button size="small" type="primary" @click="editState.linkId = index">编辑</el-button>
                    <el-button size="small" type="danger" @click="dataState.links.splice(index, 1);">删除</el-button>
                  </div>
                </div>

              </li>
            </ul>
            <el-button link type="primary" size="small"
              @click="dataState.links.push({ name: '', url: '' }), editState.linkId = dataState.links.length - 1"><el-icon><i-ep-Plus /></el-icon>添加新的内容</el-button>
          </div>
        </div>

        <div :class="['section', item.type]" v-for="(item, index) in dataState.sections">
          <div class="inline-edit" v-if="editState.sectionId == index">
            <el-input v-model="currentSectionTitle" style="width: 240px" @change="updateSectionTitle()" />
          </div>
          <div class="inline-edit" v-else>
            <h5>{{ item.name }}</h5>
            <i-ep-Edit @click="editSectionTitle(index, item.name)" />
            <i-ep-Delete @click="deleteSection(index)" v-if="item.type == 'custom'" />
          </div>
          <p v-if="config[item.type]"> {{ config[item.type] }} </p>
          <TagSectionEditor v-if="item.tagStyle" :items="item.data" :type="item.type"
            @add="(item) => addSectionItem(index, item)" @update="(data) => dataState.sections[index].data = data" />
          <OnlyDescSectionEditor v-else-if="item.onlyDesc"
            @update="(data) => dataState.sections[index].data = [data]" />
          <SectionEditor v-else :items="item.data" :type="item.type" @add="(item) => addSectionItem(index, item)"
            @update="(data) => dataState.sections[index].data = data" />
        </div>

      </el-col>
      <el-col :xs="24" :md="12" class="pl-4 pr-4 preview-area hidden-sm-and-down">
        <div class="resume-container">
          <ResumeStandard :data="dataState" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, getCurrentInstance } from 'vue'
import { data } from '../data'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { cloneDeep } from 'lodash';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';


const dataState = ref()
const router = useRouter()

const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const currentSectionTitle = ref('')
const linkListRef = ref(null)
const { appContext } = getCurrentInstance()!

const scrollTarget = ref(null);

const scrollToBottom = () => {
  if (scrollTarget.value) {
    window.scrollTo({
      top: scrollTarget.value.scrollHeight,
      behavior: 'smooth',
    });
  }
};

const editState = reactive({
  linkId: null,
  sectionId: null
});

/**
 * 设置当前section的标题为编辑状态
 * @param index 当前编辑的section id
 * @param name 当前编辑的section name
 */
function editSectionTitle(index, name) {
  editState.sectionId = index;
  currentSectionTitle.value = name;
}

/**
 * 删除指定的模块
 * @param index 
 */
function deleteSection(index) {
  dataState.value.sections.splice(index, 1);
}

/**
 * 新增
 * @param params 
 */
async function addSection(key) {
  switch (key) {
    case 'single':
      dataState.value.sections.push({
        id: uuidv4(),
        name: "未命名模块",
        type: "custom",
        data: [
          { title: '', description: '' }
        ],
        onlyDesc: true
      });
      break;
    case 'multiline':
      dataState.value.sections.push({
        id: uuidv4(),
        name: "未命名模块",
        type: "custom",
        data: [
        ],
      });
      break;
    case 'tag':
      dataState.value.sections.push({
        id: uuidv4(),
        name: "未命名模块",
        type: "custom",
        data: [

        ],
        tagStyle: true
      });
      break;
    default:
      break;
  }
  await nextTick();
  scrollToBottom();
}


/**
 * section标题输入框失去焦点或者按回车后更新状态数据
 */
function updateSectionTitle() {
  const sections = unref(dataState.value.sections)
  dataState.value.sections = sections.map((item, index) => {
    if (index === editState.sectionId) {
      return { ...item, name: currentSectionTitle.value }
    } else {
      return item;
    }
  });
  editState.sectionId = null
}

function addSectionItem(index, item) {
  const sectionData = dataState.value.sections[index].data;
  sectionData.push(item)
  return (sectionData.length - 1)
}

/**
 * 保存数据到浏览器
 */
function saveData() {
  localStorage.setItem('data', JSON.stringify(dataState.value));
  ElMessage.success({
    message: '保存到浏览器缓存成功！',
    type: 'success',
  }, appContext)
}
/**
 * 删除缓存
 */
function clearData() {
  localStorage.removeItem('data')
  ElMessage.success({
    message: '清除浏览器缓存成功！',
    type: 'success',
  })
}

/**
 * 先跳转到预览然后显示打印弹窗
 */
async function printDocument() {
  // 先进行路由导航到 test 路由
  await router.push('/resume');
  // 路由导航完成后执行打印操作
  window.print();
}

onMounted(async () => {
  const dataJson = localStorage.getItem('data');
  let localData = JSON.parse(dataJson)
  if (localData) {
    dataState.value = localData;
  } else {
    dataState.value = data.data.data;
  }
  await nextTick()

  const sortableHtml = new Sortable(linkListRef.value, {
    animation: 150,
    sort: true,
    // 拖拽时预览图样式
    ghostClass: 'blue-background-class',
    handle: ".my-handle",
    // 具体配置见http://www.sortablejs.com/options.html
    onEnd: async (evt) => {
      const newData = cloneDeep(dataState.value.links);
      const changeData = newData.splice(evt.oldIndex || 0, 1)
      newData.splice(evt.newIndex || 0, 0, changeData[0])
      dataState.value.links = []
      await nextTick()
      dataState.value.links = newData
    }
  })

});

const config = {
  empolyment: '列出你认为最重要最近十年的工作经历，最新放在最前面，工作经验是简历中很重要的一部分，要充分突出工作以及项目中的亮点',
  skills: '列出最近你的专业技能，强烈建议这里不要仅仅罗列技术名词，而是通过主次分明的方式详细介绍技能的应用，可以多提供对应的链接',
  education: '列出最近你的教育经历，并不是所有经历都要写入，而需要选取该过程中的亮点',
};

</script>

<style>
.basic-info-form>.el-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between
}

.basic-info-form .el-form-item {
  flex: 100%;
  flex-grow: 0;
  padding-right: 15px
}

@media (min-width: 640px) {
  .basic-info-form .el-form-item {
    flex: 45%
  }
}

.section {
  background: #fff;
  transition: background .5s ease-out;
  margin-bottom: 30px;
}

.ez-list li.ez-item {
  border: 1px solid #EBEEF5;
  border-radius: 5px;
  padding: 1rem;
  background: #fff;
  margin-bottom: 1rem;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.ez-list li.ez-item:hover {
  border: 1px solid #0c66ff;
}

.link-editor .ez-item:hover {
  cursor: pointer;
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


.normalize h6 {
  font-size: 1rem;
}

.normalize h6,
.normalize h5,
.normalize h4,
.normalize h3,
.normalize h2,
.normalize h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}

.normalize p {
  margin-top: 0;
  margin-bottom: 1rem;
}


.link-editor .ez-item .link-name {
  font-weight: 700;
}

.link-editor .ez-item .link-src {
  color: #909399;
}

.preview-area {
  background: #efefef;
  position: fixed;
  right: 0;
  height: 100%;
  width: 100%;
  padding: 0 15px;
}

.preview-area .resume-container {
  height: calc(100% - 40px);
  overflow-y: auto;
  min-width: 960px;
}

.preview-area .resume-container .container {
  transform: scale(.7);
  transform-origin: top left;
  width: 1024px;
  padding: 0;
}

.inline-edit {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: auto;
}

.inline-edit svg {
  margin-left: 10px;
  color: #909399;
}

.section .inline-edit h5 {
  margin: 1rem 0;
}

@media only screen and (max-width: 991px) {
  .hidden-sm-and-down {
    display: none !important;
  }

  .head-toolbar {
    margin-top: 10px;
  }
}

.basic-info-form .el-form-item .el-date-editor.el-input,
.basic-info-form .el-form-item .el-date-editor.el-input__wrapper {
  width: 100%;
}
</style>
<style>
@import '@vueup/vue-quill/dist/vue-quill.snow.css'
</style>