export const data = {
    "code": 0,
    "data": {
        "data": {
            "basicInfo": {
                "title": "全栈开发工程师",
                "name": "雷小军",
                "avatar": "http://image.gaojunxin.cn/i/2024/04/03/660cc29bd87e1.jpeg",
                "location": "北京",
                "cellphone": "18811111234",
                "email": "leijun@xiaomi.com",
                "birth": "1969-11-30T16:00:00.000Z"
            },
            "sections": [
                {
                    "id": "59dGrl",
                    "name": "工作经历",
                    "type": "empolyment",
                    "data": [
                        {
                            "title": "金山软件股份有限公司",
                            "subTitle": "全栈开发工程师",
                            "city": "北京",
                            "description": "<p><strong>负责祥云内部管理系统的开发和维护工作：</strong></p><p><strong>前端：</strong></p><ul><li>使用 Vue3 进行开发</li><li>在 vue-element-admin 上进行二次封装</li><li>解决复杂权限配置问题</li></ul><p><strong>后端：</strong></p><ul><li>使用 Nest.js 作为框架。</li><li>使用 MongoDB + Redis 作为数据库以及缓存服务。</li><li>使用 Casl 完成复杂权限的验证与实现。</li></ul><p><br></p>",
                            "startDate": "2024/03",
                            "endDate": "2025/01"
                        },
                        {
                            "title": "小米科技有限公司",
                            "subTitle": "高级全栈开发工程师",
                            "city": "深圳",
                            "description": "<p><strong>腾讯星盘 </strong>- 低代码海报生成平台(<a href=\"https://fakeurl.com\" rel=\"noopener noreferrer\" target=\"_blank\">https://fakeurl.com</a>) 负责星盘系统 Web 端/ 小程序端的前后端的开发工作：</p><ul><li>需求分析，技术架构设计。</li></ul><h3>撰写技术文档以及设定编码规范。</h3><ul><li>日常功能开发维护以及 Code Review。</li></ul><p><strong>前端：</strong></p><ul><li>使用 Vue3 以及 Typescript 作为开发框架和语言。</li><li>使用 类JSONForm方案解决表单自动生成，相互依赖，以及实时更新的功能。</li></ul><p>支持多种复杂交互，拖动，缩放，快捷键，回滚，重做等功能。</p><p>使用多种第三方库实现高级功能 - cropper.js （图片裁剪），html2canvas（截图），qrcode.js （二维码生成）等等。</p><ul><li>封装内部组件库供前后端多端使用。</li></ul><p><strong>后端：</strong></p><ul><li>以 Node.js 为主要开发平台，设计并开发高性能（低延迟、高可用）的微服务和 API。</li><li>使用 Egg.js + Typescript 作为开发框架和语言。</li><li>使用 PostgreSQL + Redis 作为数据库。</li><li>配合 devops 完成整个系统的docker 部署以及 CI/CD 的过程。</li></ul>",
                            "startDate": "2022/03",
                            "endDate": "PRESENT"
                        }
                    ],
                    "columns": "one"
                },
                {
                    "id": "Z_5S-c",
                    "name": "专业技能",
                    "type": "skills",
                    "data": [
                        {
                            "title": "使用 Javascript（ES6）/ Typescript 进行前端开发，并且熟练掌握以下框架",
                            "description": "<ul><li>使用 Vue3 以及周边工具：Vite、Vue-Router、Pinia 以及 Element-Plus 进行 Web 开发</li><li>使用 React 以及周边工具；Redux, React-Router, Mobx 进行 Web 开发</li></ul>"
                        },
                        {
                            "title": "熟练使用 CSS3 以及周边工具 ",
                            "description": "<ul><li>Tailwind.css 和 Bootstrap5 作为样式库</li><li>Sass 以及 PostCSS 作为预处理器</li></ul>"
                        },
                        {
                            "title": "使用 Node.js(Typescript) 进行开发，并且熟练掌握以下框架以及知识点",
                            "description": "<ul><li>熟悉 API 或微服务的工作</li><li>Egg.js</li><li>Express</li><li>Nest.js</li></ul>"
                        },
                        {
                            "title": "熟悉多种数据库的基本原理和异同，掌握以下数据库的操作和使用",
                            "description": "<ul><li>关系型：MySQL,&nbsp;PostgreSQL</li><li>非关系型：MongoDB</li><li>缓存： Redis</li></ul>"
                        },
                        {
                            "title": "熟悉 Docker 和现代 DevOps - CI/CD 的工作流程",
                            "description": "<ul><li>Docker</li><li>Docker Compose</li><li>Github Actions</li><li>Jenkins</li></ul>"
                        }
                    ],
                    "columns": "one",
                    "tagStyle": false
                },
                {
                    "id": "ci71lX",
                    "name": "教育经历",
                    "type": "education",
                    "data": [
                        {
                            "title": "武汉大学",
                            "subTitle": "学士",
                            "city": "计算机科学与技术",
                            "description": "",
                            "startDate": "1984/06",
                            "endDate": "1985/06"
                        }
                    ],
                    "columns": "one",
                    "position": "side"
                },
                {
                    "id": "P1P4IW",
                    "name": "个人项目",
                    "type": "custom",
                    "data": [
                        {
                            "title": "Vue3 EasyMDE",
                            "description": "<p>EasyMDE 在 vue3 中的实现，使用 Typescript 编写，Rollup 完成打包。</p><ul><li>Github 地址：<a href=\"https://github.com/vikingmute/vue3-easymde\" rel=\"noopener noreferrer\" target=\"_blank\">https://github.com/vikingmute/vue3-easymde</a></li><li>Star 数：450</li></ul>"
                        },
                        {
                            "title": "EggSession",
                            "description": "<p>为 Egg.js 服务的插件，基于 koa-session，可以使用多种方式（Cookie, 外部储存等）实现用户的会话信息。</p><ul><li>Github 地址：https://github.com/eggjs/egg-session</li><li>Star 数：450</li></ul><p><br></p>"
                        }
                    ],
                    "columns": "one",
                    "position": "main"
                },
                {
                    "id": "XlgcVu",
                    "name": "个人项目/文章",
                    "type": "custom",
                    "data": [
                        {
                            "title": "项目：EasyCV 组件库",
                            "description": "<p>EasyCV 组件库是基于 vue3 实现，使用 Typescript 编写，Rollup 完成打包。</p>"
                        },
                        {
                            "title": "演讲：Node.js 线上环境最佳实践",
                            "description": "在 2020 Archsummit 的演讲"
                        }
                    ],
                    "columns": "two",
                    "position": "main"
                },
                {
                    "id": "1jtK2H",
                    "name": "语言水平",
                    "type": "custom",
                    "data": [
                        {
                            "title": "普通话：母语"
                        },
                        {
                            "title": "粤语：母语"
                        },
                        {
                            "title": "英语：熟练"
                        },
                        {
                            "title": "中文",
                            "description": ""
                        }
                    ],
                    "columns": "two",
                    "position": "main",
                    "tagStyle": true
                }
            ],
            "links": [
                {
                    "name": "个人网站",
                    "src": "https://www.gaojunxin.cn"
                },
                {
                    "name": "Github",
                    "src": "https://github.com/gaojunxin"
                },
                {
                    "name": "LinkedIn",
                    "src": "https://linkedin.com/gaojunxin"
                }
            ]
        },
        "config": {
            "lang": "ch",
            "templateName": "TemplateStandard",
            "templateTheme": "blue",
            "isPublic": true,
            "customURL": "Dw46BR",
            "addToExamples": false,
            "printerMode": true
        },
        "createdAt": "2024-03-22T08:28:08.898Z",
        "updatedAt": "2024-03-30T03:53:44.591Z",
        "__v": 0,
        "coverImg": ""
    },
    "message": "请求成功"
}