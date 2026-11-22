// Training Calendar Data - Parsed from Excel files
// 前厅→后厨 & 后厨→前厅 带训月历

const TRAINING_DATA = {
  routes: [
    {
      id: 'front_to_back',
      name: '前厅→后厨',
      description: '前厅员工学习后厨工作站',
      months: [
        {
          month: '第一个月·前厅',
          phases: [
            {
              phase: '第一阶段',
              focus: '基础知识+撤桌',
              days: [
                {
                  day: 1, shift: '中班',
                  items: [
                    { content: '企业文化', student_hours: '1H', teacher_hours: '店长1H' },
                    { content: '员工手册', student_hours: '0.5H', teacher_hours: '店长0.5H' },
                    { content: '产品简介', student_hours: '1H', teacher_hours: '1H' },
                    { content: '前厅设备设施', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '撤桌服务', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '撤桌服务 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '中班',
                  items: [
                    { content: '食品安全', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '危机管理', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '客诉管理', student_hours: '1H', teacher_hours: '1H' },
                    { content: '食品安全 练习', student_hours: '0.5H', teacher_hours: '' },
                    { content: '撤桌服务 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '撤桌服务 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 3, shift: '中班',
                  items: [
                    { content: '接待点餐', student_hours: '1H', teacher_hours: '1H' },
                    { content: '餐中服务', student_hours: '1H', teacher_hours: '1H' },
                    { content: '接待点餐 练习', student_hours: '1H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '中班',
                  items: [
                    { content: '餐中服务', student_hours: '1H', teacher_hours: '1H' },
                    { content: '餐中服务 练习', student_hours: '1H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '中班',
                  items: [
                    { content: '上菜', student_hours: '2H', teacher_hours: '2H' },
                    { content: '餐中服务 练习', student_hours: '1H', teacher_hours: '' },
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 6, shift: '中班',
                  items: [
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                }
              ]
            },
            {
              phase: '第二阶段',
              focus: '打烊+上菜+打包',
              days: [
                {
                  day: 1, shift: '晚班',
                  items: [
                    { content: '打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '晚班',
                  items: [
                    { content: '打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '晚班',
                  items: [
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '打烊 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '上菜 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 4, shift: '晚班',
                  items: [
                    { content: '打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '晚班',
                  items: [
                    { content: '打包', student_hours: '2H', teacher_hours: '2H' },
                    { content: '打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 6, shift: '晚班',
                  items: [
                    { content: '打包', student_hours: '2H', teacher_hours: '2H' },
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                }
              ]
            },
            {
              phase: '第三阶段',
              focus: '打包+开店+迎宾',
              days: [
                {
                  day: 1, shift: '中班',
                  items: [
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '中班',
                  items: [
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '中班',
                  items: [
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '打包 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 4, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1H', teacher_hours: '1H' },
                    { content: '迎宾', student_hours: '2H', teacher_hours: '2H' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1H', teacher_hours: '1H' },
                    { content: '迎宾', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 6, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1H', teacher_hours: '' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                }
              ]
            },
            {
              phase: '第四阶段',
              focus: '迎宾认证+岗位认证',
              days: [
                {
                  day: 1, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1H', teacher_hours: '' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1H', teacher_hours: '' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '早班',
                  items: [
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '迎宾 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 4, shift: '中班',
                  items: [
                    { content: '岗位认证（理论+实操）', student_hours: '0.5H', teacher_hours: '4H' }
                  ]
                },
                { day: 5, shift: '中班', items: [] },
                { day: 6, shift: '中班', items: [] }
              ]
            }
          ]
        },
        {
          month: '第二个月·后厨',
          phases: [
            {
              phase: '第一阶段',
              focus: '后厨基础+配菜',
              days: [
                {
                  day: 1, shift: '中班',
                  items: [
                    { content: '后厨设备设施', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '原料储存标准', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '配菜', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 2, shift: '中班',
                  items: [
                    { content: '配菜', student_hours: '2H', teacher_hours: '2H' },
                    { content: '菜品备份标准', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '中班',
                  items: [
                    { content: '原料（煮锅） 初加工标准', student_hours: '1H', teacher_hours: '1H' },
                    { content: '配菜', student_hours: '2H', teacher_hours: '2H' },
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '中班',
                  items: [
                    { content: '原料解冻标准', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '中班',
                  items: [
                    { content: '煮锅', student_hours: '2H', teacher_hours: '2H' },
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '配菜 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 6, shift: '中班',
                  items: [
                    { content: '煮锅', student_hours: '2H', teacher_hours: '2H' }
                  ]
                }
              ]
            },
            {
              phase: '第二阶段',
              focus: '煮锅+打烊+拌饭',
              days: [
                {
                  day: 1, shift: '晚班',
                  items: [
                    { content: '煮锅', student_hours: '2H', teacher_hours: '2H' },
                    { content: '煮锅 打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '晚班',
                  items: [
                    { content: '煮锅 打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '晚班',
                  items: [
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '煮锅打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '晚班',
                  items: [
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '煮锅打烊 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '煮锅 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 5, shift: '早班',
                  items: [
                    { content: '原料（拌饭） 初加工标准', student_hours: '1H', teacher_hours: '1H' },
                    { content: '开店', student_hours: '1.5H', teacher_hours: '1.5H' },
                    { content: '拌饭', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 6, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1.5H', teacher_hours: '1.5H' },
                    { content: '拌饭', student_hours: '2H', teacher_hours: '2H' }
                  ]
                }
              ]
            },
            {
              phase: '第三阶段',
              focus: '拌饭+洗碗+开店',
              days: [
                {
                  day: 1, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1.5H', teacher_hours: '1.5H' },
                    { content: '拌饭', student_hours: '2H', teacher_hours: '2H' },
                    { content: '拌饭 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1.5H', teacher_hours: '' },
                    { content: '拌饭 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '拌饭 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '拌饭 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 3, shift: '早班',
                  items: [
                    { content: '洗碗', student_hours: '2H', teacher_hours: '2H' },
                    { content: '开店 练习', student_hours: '1.5H', teacher_hours: '' },
                    { content: '洗碗 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1.5H', teacher_hours: '' },
                    { content: '洗碗 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '洗碗 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 5, shift: '晚班',
                  items: [
                    { content: '拌饭 打烊', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 6, shift: '晚班',
                  items: [
                    { content: '拌饭 打烊', student_hours: '2H', teacher_hours: '2H' }
                  ]
                }
              ]
            },
            {
              phase: '第四阶段',
              focus: '拌饭打烊+岗位认证',
              days: [
                {
                  day: 1, shift: '晚班',
                  items: [
                    { content: '拌饭打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '晚班',
                  items: [
                    { content: '拌饭打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                { day: 3, shift: '晚班', items: [] },
                {
                  day: 4, shift: '中班',
                  items: [
                    { content: '岗位认证（理论+实操）', student_hours: '0.5H', teacher_hours: '4H' }
                  ]
                },
                { day: 5, shift: '', items: [] },
                { day: 6, shift: '', items: [] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'back_to_front',
      name: '后厨→前厅',
      description: '后厨员工学习前厅工作站',
      months: [
        {
          month: '第一个月·后厨',
          phases: [
            {
              phase: '第一阶段',
              focus: '基础知识+配菜',
              days: [
                {
                  day: 1, shift: '中班',
                  items: [
                    { content: '企业文化', student_hours: '1H', teacher_hours: '店长1H' },
                    { content: '员工手册', student_hours: '0.5H', teacher_hours: '店长0.5H' },
                    { content: '产品简介', student_hours: '1H', teacher_hours: '1H' },
                    { content: '后厨设备设施', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '食品安全', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '危机管理', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '配菜', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 2, shift: '中班',
                  items: [
                    { content: '原料储存标准', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '菜品备份标准', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '配菜', student_hours: '2H', teacher_hours: '2H' },
                    { content: '食品安全 练习', student_hours: '0.5H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '中班',
                  items: [
                    { content: '原料（煮锅）初加工标准', student_hours: '1H', teacher_hours: '1H' },
                    { content: '配菜', student_hours: '2H', teacher_hours: '2H' },
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '中班',
                  items: [
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '中班',
                  items: [
                    { content: '原料解冻标准', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '配菜 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '配菜 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 6, shift: '中班',
                  items: [
                    { content: '煮锅', student_hours: '2H', teacher_hours: '2H' }
                  ]
                }
              ]
            },
            {
              phase: '第二阶段',
              focus: '煮锅+打烊+拌饭',
              days: [
                {
                  day: 1, shift: '中班',
                  items: [
                    { content: '煮锅', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 2, shift: '晚班',
                  items: [
                    { content: '煮锅', student_hours: '2H', teacher_hours: '2H' },
                    { content: '煮锅打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '晚班',
                  items: [
                    { content: '煮锅打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '晚班',
                  items: [
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '煮锅打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '晚班',
                  items: [
                    { content: '煮锅 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '煮锅打烊 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '煮锅 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 6, shift: '早班',
                  items: [
                    { content: '原料（拌饭）初加工标准', student_hours: '1H', teacher_hours: '1H' },
                    { content: '开店', student_hours: '1.5H', teacher_hours: '1.5H' },
                    { content: '拌饭', student_hours: '2H', teacher_hours: '2H' }
                  ]
                }
              ]
            },
            {
              phase: '第三阶段',
              focus: '拌饭+洗碗+开店',
              days: [
                {
                  day: 1, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1.5H', teacher_hours: '1.5H' },
                    { content: '拌饭', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 2, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1.5H', teacher_hours: '1.5H' },
                    { content: '拌饭', student_hours: '2H', teacher_hours: '2H' },
                    { content: '拌饭 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1.5H', teacher_hours: '' },
                    { content: '拌饭 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '拌饭 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '拌饭 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 4, shift: '早班',
                  items: [
                    { content: '洗碗', student_hours: '2H', teacher_hours: '2H' },
                    { content: '开店 练习', student_hours: '1.5H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1.5H', teacher_hours: '' },
                    { content: '洗碗 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '洗碗 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '洗碗 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 6, shift: '晚班',
                  items: [
                    { content: '拌饭打烊', student_hours: '2H', teacher_hours: '2H' }
                  ]
                }
              ]
            },
            {
              phase: '第四阶段',
              focus: '拌饭打烊+岗位认证',
              days: [
                {
                  day: 1, shift: '晚班',
                  items: [
                    { content: '拌饭打烊', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 2, shift: '晚班',
                  items: [
                    { content: '拌饭打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '晚班',
                  items: [
                    { content: '拌饭打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '晚班',
                  items: [
                    { content: '岗位认证（理论+实操）', student_hours: '0.5H', teacher_hours: '4H' }
                  ]
                },
                { day: 5, shift: '', items: [] },
                { day: 6, shift: '', items: [] }
              ]
            }
          ]
        },
        {
          month: '第二个月·前厅',
          phases: [
            {
              phase: '第一阶段',
              focus: '前厅基础+撤桌',
              days: [
                {
                  day: 1, shift: '中班',
                  items: [
                    { content: '前厅设备设施', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '撤桌服务', student_hours: '0.5H', teacher_hours: '0.5H' },
                    { content: '撤桌服务 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '中班',
                  items: [
                    { content: '客诉管理', student_hours: '1H', teacher_hours: '1H' },
                    { content: '撤桌服务 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '撤桌服务 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 3, shift: '中班',
                  items: [
                    { content: '接待点餐', student_hours: '1H', teacher_hours: '1H' },
                    { content: '餐中服务', student_hours: '1H', teacher_hours: '1H' },
                    { content: '接待点餐 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 4, shift: '中班',
                  items: [
                    { content: '餐中服务', student_hours: '1H', teacher_hours: '1H' },
                    { content: '餐中服务 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '中班',
                  items: [
                    { content: '上菜', student_hours: '2H', teacher_hours: '2H' },
                    { content: '餐中服务 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 6, shift: '中班',
                  items: [
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                }
              ]
            },
            {
              phase: '第二阶段',
              focus: '打烊+上菜+打包',
              days: [
                {
                  day: 1, shift: '晚班',
                  items: [
                    { content: '打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '晚班',
                  items: [
                    { content: '打烊', student_hours: '2H', teacher_hours: '2H' },
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '晚班',
                  items: [
                    { content: '上菜 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '打烊 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '上菜 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 4, shift: '晚班',
                  items: [
                    { content: '打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '晚班',
                  items: [
                    { content: '打包', student_hours: '2H', teacher_hours: '2H' },
                    { content: '打烊 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 6, shift: '晚班',
                  items: [
                    { content: '打包', student_hours: '2H', teacher_hours: '2H' },
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                }
              ]
            },
            {
              phase: '第三阶段',
              focus: '打包+开店+迎宾',
              days: [
                {
                  day: 1, shift: '中班',
                  items: [
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '中班',
                  items: [
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '中班',
                  items: [
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '打包 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '打包 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 4, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1H', teacher_hours: '1H' },
                    { content: '迎宾', student_hours: '2H', teacher_hours: '2H' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 5, shift: '早班',
                  items: [
                    { content: '开店', student_hours: '1H', teacher_hours: '1H' },
                    { content: '迎宾', student_hours: '2H', teacher_hours: '2H' }
                  ]
                },
                {
                  day: 6, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1H', teacher_hours: '' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                }
              ]
            },
            {
              phase: '第四阶段',
              focus: '迎宾认证+岗位认证',
              days: [
                {
                  day: 1, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1H', teacher_hours: '' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 2, shift: '早班',
                  items: [
                    { content: '开店 练习', student_hours: '1H', teacher_hours: '' },
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' }
                  ]
                },
                {
                  day: 3, shift: '中班',
                  items: [
                    { content: '迎宾 练习', student_hours: '2H', teacher_hours: '' },
                    { content: '迎宾 认证', student_hours: '1.5H', teacher_hours: '1H' }
                  ]
                },
                {
                  day: 4, shift: '中班',
                  items: [
                    { content: '岗位认证（理论+实操）', student_hours: '0.5H', teacher_hours: '4H' }
                  ]
                },
                { day: 5, shift: '中班', items: [] },
                { day: 6, shift: '中班', items: [] }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'part_time',
      name: '兼职',
      description: '兼职员工基础岗位认证',
      subRoutes: [
        {
          id: 'front_part_time',
          name: '前厅兼职',
          description: '前厅兼职岗位认证',
          months: [
            {
              month: '前厅兼职',
              phases: [
                {
                  phase: '第一阶段',
                  focus: '基础知识',
                  days: [
                    {
                      day: 1, shift: '中班',
                      items: [
                        { content: '企业文化', student_hours: '1H', teacher_hours: '店长1H' },
                        { content: '员工手册', student_hours: '0.5H', teacher_hours: '店长0.5H' },
                        { content: '产品简介', student_hours: '1H', teacher_hours: '1H' },
                        { content: '前厅设备设施', student_hours: '0.5H', teacher_hours: '0.5H' },
                        { content: '食品安全', student_hours: '0.5H', teacher_hours: '0.5H' },
                        { content: '危机管理', student_hours: '0.5H', teacher_hours: '0.5H' },
                        { content: '客诉管理', student_hours: '1H', teacher_hours: '1H' }
                      ]
                    }
                  ]
                },
                {
                  phase: '第二阶段',
                  focus: '撤桌',
                  days: [
                    {
                      day: 2, shift: '中班',
                      items: [
                        { content: '撤桌服务', student_hours: '0.5H', teacher_hours: '0.5H' },
                        { content: '撤桌服务 练习', student_hours: '2H', teacher_hours: '' },
                        { content: '撤桌服务 认证', student_hours: '1.5H', teacher_hours: '1H' }
                      ]
                    }
                  ]
                },
                {
                  phase: '第三阶段',
                  focus: '岗位三选一',
                  days: [
                    {
                      day: 3, shift: '中班',
                      items: [
                        {
                          content: '岗位三选一：打包 / 上菜 / 迎宾',
                          student_hours: '2H',
                          teacher_hours: '2H',
                          choices: ['打包', '上菜', '迎宾']
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'back_part_time',
          name: '后厨兼职',
          description: '后厨兼职岗位认证',
          months: [
            {
              month: '后厨兼职',
              phases: [
                {
                  phase: '第一阶段',
                  focus: '基础知识',
                  days: [
                    {
                      day: 1, shift: '中班',
                      items: [
                        { content: '企业文化', student_hours: '1H', teacher_hours: '店长1H' },
                        { content: '员工手册', student_hours: '0.5H', teacher_hours: '店长0.5H' },
                        { content: '产品简介', student_hours: '1H', teacher_hours: '1H' },
                        { content: '后厨设备设施', student_hours: '0.5H', teacher_hours: '0.5H' },
                        { content: '食品安全', student_hours: '0.5H', teacher_hours: '0.5H' },
                        { content: '原料储存标准', student_hours: '0.5H', teacher_hours: '0.5H' },
                        { content: '菜品备份标准', student_hours: '0.5H', teacher_hours: '0.5H' }
                      ]
                    }
                  ]
                },
                {
                  phase: '第二阶段',
                  focus: '洗碗',
                  days: [
                    {
                      day: 2, shift: '早班',
                      items: [
                        { content: '洗碗', student_hours: '2H', teacher_hours: '2H' },
                        { content: '洗碗 练习', student_hours: '2H', teacher_hours: '' },
                        { content: '洗碗 认证', student_hours: '1.5H', teacher_hours: '1H' }
                      ]
                    }
                  ]
                },
                {
                  phase: '第三阶段',
                  focus: '岗位三选一',
                  days: [
                    {
                      day: 3, shift: '中班',
                      items: [
                        {
                          content: '岗位三选一：配菜 / 煮锅 / 拌饭',
                          student_hours: '2H',
                          teacher_hours: '2H',
                          choices: ['配菜', '煮锅', '拌饭']
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'master',
      name: '师傅带教',
      description: '师傅带教｜第一责任人：门店主管（主管缺岗或饱和时店长替补）｜原表总带训 125H',
      stageRule: { learnDays: 7, practiceDays: 7, note: '每阶段7天内学完，再7天内完成刻意练习与认证' },
      months: [
        {
          month: '第一个月·师傅带教',
          phases: [
            {
              phase: '第一阶段',
              focus: '企业文化/食安/订货收货退货/日盘/设备/行政/生产',
              days: [
                    {
                      day: 1, shift: '早班',
                      items: [
                      { content: '企业文化', student_hours: '0.5H', teacher_hours: '0.5H' },
                      { content: '角色职责', student_hours: '', teacher_hours: '' },
                      { content: '食安管理', student_hours: '0.5H', teacher_hours: '0.5H', note: '原表标注暂无指南' },
                      { content: '危机管理', student_hours: '1H', teacher_hours: '1H' },
                      { content: '食安管理 理论认证', student_hours: '0.5H', teacher_hours: '' },
                      { content: '危机管理 理论认证', student_hours: '0.5H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 2, shift: '早班',
                      items: [
                      { content: '订货+收货+退货', student_hours: '1.5H', teacher_hours: '1.5H', note: '练习要求：完成当天订货任务5次；有质量问题执行商品问题反馈5次', drills: [{ name: '完成当天订货任务', count: 5 }, { name: '有质量问题执行商品问题反馈', count: 5 }] },
                      { content: '订货+收货+退货 认证（理论+实操）', student_hours: '0.5H', teacher_hours: '1.5H' }
                      ]
                    },
                    {
                      day: 3, shift: '晚班',
                      items: [
                      { content: '外卖管理视频', student_hours: '1H', teacher_hours: '', note: '原表标注暂无指南' },
                      { content: '调拨+报损', student_hours: '0.5H', teacher_hours: '0.5H', note: '练习要求：有借货情况完成调拨手续3次', drills: [{ name: '有借货情况完成调拨手续', count: 3 }] },
                      { content: '日盘', student_hours: '0.5H', teacher_hours: '0.5H', note: '练习要求：完成当天日盘5次；当班完成食材报损5次', drills: [{ name: '完成当天日盘', count: 5 }, { name: '当班完成食材报损', count: 5 }] },
                      { content: '调拨+报损 认证（理论+实操）', student_hours: '0.5H', teacher_hours: '0.5H' },
                      { content: '日盘 认证（理论+实操）', student_hours: '0.5H', teacher_hours: '0.5H' }
                      ]
                    },
                    {
                      day: 4, shift: '随机',
                      items: [
                      { content: '设备设施（清洁+保养）', student_hours: '2H', teacher_hours: '2H', note: '练习要求：按《清洁计划》分配执行并检查当天清洁5次；清洁不合格对伙伴辅导5次', drills: [{ name: '按《清洁计划》分配执行并检查当天清洁', count: 5 }, { name: '清洁不合格对伙伴辅导', count: 5 }] },
                      { content: '设备设施（清洁+保养）认证（理论+实操）', student_hours: '0.5H', teacher_hours: '0.5H' }
                      ]
                    },
                    {
                      day: 5, shift: '早班',
                      items: [
                      { content: '行政工作（开票+考勤）', student_hours: '2H', teacher_hours: '2H', note: '练习要求：前一日考勤核对3次；发票开具3次；模拟开票并红冲3次；原表标注暂无指南', drills: [{ name: '前一日考勤核对', count: 3 }, { name: '发票开具', count: 3 }, { name: '模拟开票并红冲', count: 3 }] },
                      { content: '行政工作（开票+考勤）理论认证', student_hours: '0.5H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 6, shift: '晚班',
                      items: [
                      { content: '生产管理（缓化+备份）', student_hours: '1H', teacher_hours: '1H', note: '练习要求：完成食材缓制+高峰期备份3次', drills: [{ name: '完成食材缓制+高峰期备份', count: 3 }] },
                      { content: '生产管理（缓化+备份）认证（理论+实操）', student_hours: '0.5H', teacher_hours: '1H' }
                      ]
                    }
              ]
            },
            {
              phase: '第二阶段',
              focus: '早值班 + 带训他人',
              days: [
                    {
                      day: 1, shift: '早班',
                      items: [
                      { content: '值班管理-师傅-早值班', student_hours: '4H', teacher_hours: '4H' },
                      { content: '早值班 练习', student_hours: '4H', teacher_hours: '', note: '练习要求：按《能源管理》开关照明3次、设备状态3次', drills: [{ name: '按《能源管理》开关照明', count: 3 }, { name: '设备状态', count: 3 }] }
                      ]
                    },
                    {
                      day: 2, shift: '早班',
                      items: [
                      { content: '值班管理-师傅-早值班 练习', student_hours: '4H', teacher_hours: '', note: '练习要求：巡视驻足点发现问题及时辅导5次', drills: [{ name: '巡视驻足点发现问题及时辅导', count: 5 }] }
                      ]
                    },
                    {
                      day: 3, shift: '早班',
                      items: [
                      { content: '带训他人', student_hours: '2H', teacher_hours: '2H' },
                      { content: '值班管理-师傅-早值班 练习', student_hours: '4H', teacher_hours: '', note: '练习要求：工作站压力大时做好人员协调5次', drills: [{ name: '工作站压力大时做好人员协调', count: 5 }] }
                      ]
                    },
                    {
                      day: 4, shift: '早班',
                      items: [
                      { content: '值班管理-师傅-早值班 练习', student_hours: '4H', teacher_hours: '', note: '练习要求：高峰期巡视完成正向激励5次', drills: [{ name: '高峰期巡视完成正向激励', count: 5 }] }
                      ]
                    },
                    {
                      day: 5, shift: '早班',
                      items: [
                      { content: '带训他人', student_hours: '2H', teacher_hours: '2H', note: '练习要求：带训新员工3次；无新员工需模拟带训', drills: [{ name: '带训新员工', count: 3 }] },
                      { content: '值班管理-师傅-早值班 练习', student_hours: '4H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 6, shift: '早班',
                      items: [
                      { content: '值班管理-师傅-早值班 练习', student_hours: '4H', teacher_hours: '' },
                      { content: '值班管理-师傅-早值班 认证（理论+实操）', student_hours: '0.5H', teacher_hours: '4H' },
                      { content: '带训他人 认证（理论+实操）', student_hours: '0.5H', teacher_hours: '1H' }
                      ]
                    }
              ]
            },
            {
              phase: '第三阶段',
              focus: '晚值班',
              days: [
                    {
                      day: 1, shift: '晚班',
                      items: [
                      { content: '值班管理-师傅-晚值班', student_hours: '4H', teacher_hours: '4H' }
                      ]
                    },
                    {
                      day: 2, shift: '晚班',
                      items: [
                      { content: '值班管理-师傅-晚值班 练习', student_hours: '4H', teacher_hours: '', note: '练习要求：巡视辅导5次；调度5次；预打烊+阶梯下班5次；打烊全流程5次；正向激励5次；打烊卫生5次；次日分工5次', drills: [{ name: '巡视辅导', count: 5 }, { name: '调度', count: 5 }, { name: '预打烊+阶梯下班', count: 5 }, { name: '打烊全流程', count: 5 }, { name: '正向激励', count: 5 }, { name: '打烊卫生', count: 5 }, { name: '次日分工', count: 5 }] }
                      ]
                    },
                    {
                      day: 3, shift: '晚班',
                      items: [
                      { content: '值班管理-师傅-晚值班 练习', student_hours: '4H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 4, shift: '晚班',
                      items: [
                      { content: '值班管理-师傅-晚值班 练习', student_hours: '4H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 5, shift: '晚班',
                      items: [
                      { content: '值班管理-师傅-晚值班 练习', student_hours: '4H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 6, shift: '晚班',
                      items: [
                      { content: '值班管理-师傅-晚值班 练习', student_hours: '4H', teacher_hours: '' },
                      { content: '值班管理-师傅-晚值班 认证（理论+实操）', student_hours: '0.5H', teacher_hours: '4H' }
                      ]
                    }
              ]
            },
            {
              phase: '第四阶段',
              focus: '理论+实操总认证',
              days: [
                    {
                      day: 7, shift: '随机',
                      items: [
                      { content: '理论+实操总认证（岗位认证）', student_hours: '1H', teacher_hours: '7H' }
                      ]
                    }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'supervisor',
      name: '门店主管',
      description: '门店主管｜第一责任人：门店店长（实操总认证小区经理到店）｜原表总带训 62.5H',
      stageRule: { learnDays: 7, practiceDays: 7, note: '每阶段7天内学完，再7天内完成刻意练习与认证' },
      months: [
        {
          month: '第一个月·门店主管',
          phases: [
            {
              phase: '第一阶段',
              focus: '周报/预估营业额/存放/排班/报修/广宣/周盘',
              days: [
                    {
                      day: 1, shift: '随机',
                      items: [
                      { content: '企业文化 / 角色职责', student_hours: '0.5H', teacher_hours: '0.5H' },
                      { content: '周报（损耗）', student_hours: '2H', teacher_hours: '2H', note: '练习要求：撰写周报5次（须安排在周一学习、练习）', drills: [{ name: '撰写周报（须安排在周一学习、练习）', count: 5 }] }
                      ]
                    },
                    {
                      day: 2, shift: '随机',
                      items: [
                      { content: '预估营业额', student_hours: '1.5H', teacher_hours: '1.5H', note: '练习要求：模拟练习预估营业额调整（时段+总营业额）5次；预估周营业额5次', drills: [{ name: '模拟练习预估营业额调整（时段+总营业额）', count: 5 }, { name: '预估周营业额', count: 5 }] },
                      { content: '广宣', student_hours: '1H', teacher_hours: '1H' }
                      ]
                    },
                    {
                      day: 3, shift: '随机',
                      items: [
                      { content: '存放管理', student_hours: '3H', teacher_hours: '3H', note: '练习要求：整理冰箱定位库存3次；主动肯定伙伴规范操作5次', drills: [{ name: '整理冰箱定位库存', count: 3 }, { name: '主动肯定伙伴规范操作', count: 5 }] }
                      ]
                    },
                    {
                      day: 4, shift: '随机',
                      items: [
                      { content: '排班管理', student_hours: '2H', teacher_hours: '2H' }
                      ]
                    },
                    {
                      day: 5, shift: '随机',
                      items: [
                      { content: '设备设施（报修）', student_hours: '2H', teacher_hours: '2H', note: '练习要求：操作一次报修流程5次', drills: [{ name: '操作一次报修流程', count: 5 }] }
                      ]
                    },
                    {
                      day: 6, shift: '晚班',
                      items: [
                      { content: '货物管理（含周盘）', student_hours: '1.5H', teacher_hours: '1.5H', note: '练习要求：完成周盘任务5次（须安排在周日学习、练习）', drills: [{ name: '完成周盘任务（须安排在周日学习、练习）', count: 5 }] },
                      { content: '预估营业额 理论认证', student_hours: '0.5H', teacher_hours: '' },
                      { content: '存放管理 理论认证', student_hours: '0.5H', teacher_hours: '' },
                      { content: '广宣 理论认证', student_hours: '0.5H', teacher_hours: '' },
                      { content: '设备设施（维修）理论认证', student_hours: '0.5H', teacher_hours: '' }
                      ]
                    }
              ]
            },
            {
              phase: '第二阶段',
              focus: '练习 + 分项认证',
              days: [
                    {
                      day: 1, shift: '随机',
                      items: [
                      { content: '周报练习', student_hours: '1H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 4, shift: '随机',
                      items: [
                      { content: '排班练习', student_hours: '2H', teacher_hours: '', note: '练习要求：值班练习6次（刻意练习表第二阶段）', drills: [{ name: '值班练习（刻意练习表第二阶段）', count: 6 }] }
                      ]
                    },
                    {
                      day: 6, shift: '晚班',
                      items: [
                      { content: '周盘练习', student_hours: '1H', teacher_hours: '' },
                      { content: '理论+实操认证', student_hours: '3.5H', teacher_hours: '6H' }
                      ]
                    }
              ]
            },
            {
              phase: '第三阶段',
              focus: '练习（复训）',
              days: [
                    {
                      day: 1, shift: '随机',
                      items: [
                      { content: '周报练习', student_hours: '1H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 4, shift: '随机',
                      items: [
                      { content: '排班练习', student_hours: '2H', teacher_hours: '' }
                      ]
                    },
                    {
                      day: 6, shift: '晚班',
                      items: [
                      { content: '周盘练习', student_hours: '1H', teacher_hours: '' }
                      ]
                    }
              ]
            },
            {
              phase: '第四阶段',
              focus: '分项认证 + 总认证',
              days: [
                    {
                      day: 1, shift: '随机',
                      items: [
                      { content: '周报认证（理论+实操）', student_hours: '1.5H', teacher_hours: '1H' }
                      ]
                    },
                    {
                      day: 4, shift: '随机',
                      items: [
                      { content: '排班认证（理论+实操）', student_hours: '1.5H', teacher_hours: '1H' }
                      ]
                    },
                    {
                      day: 6, shift: '晚班',
                      items: [
                      { content: '货物管理-周盘认证（理论+实操）', student_hours: '1.5H', teacher_hours: '1H' }
                      ]
                    },
                    {
                      day: 7, shift: '晚班',
                      items: [
                      { content: '理论+实操总认证（岗位认证）', student_hours: '1H', teacher_hours: '' }
                      ]
                    }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Helper: flatten all days in a route/sub-route into a sequential list
function getAllDays(routeId, subRouteId) {
  const route = TRAINING_DATA.routes.find(r => r.id === routeId);
  if (!route) return [];
  let months = route.months;
  if (route.subRoutes) {
    if (subRouteId) {
      const sub = route.subRoutes.find(s => s.id === subRouteId);
      if (sub) months = sub.months;
    } else {
      // Part-time route requires a sub-route; return empty if not selected yet
      return [];
    }
  }
  if (!months) return [];
  const allDays = [];
  const keyPrefix = route.subRoutes ? `${routeId}_${subRouteId || ''}_` : '';
  // 只追踪第一个月的内容
  months.slice(0, 1).forEach((month, mi) => {
    month.phases.forEach((phase, pi) => {
      phase.days.forEach((day, di) => {
        // 只保留有内容的 day（空架子天不计入进度，避免 22/24 这种卡死）
        if (day.items.length > 0) {
          allDays.push({
            key: `${keyPrefix}${mi}-${pi}-${di}`,
            routeId,
            subRouteId,
            monthIndex: mi,
            monthName: month.month,
            phaseIndex: pi,
            phaseName: phase.phase,
            phaseFocus: phase.focus,
            dayIndex: di,
            day: day.day,
            shift: day.shift,
            items: day.items
          });
        }
      });
    });
  });
  return allDays;
}

// Helper: get total days count for a route
function getTotalDays(routeId, subRouteId) {
  return getAllDays(routeId, subRouteId).length;
}

// Helper: get display name for a route/sub-route
function getRouteName(routeId, subRouteId) {
  const route = TRAINING_DATA.routes.find(r => r.id === routeId);
  if (!route) return routeId;
  if (route.subRoutes && subRouteId) {
    const sub = route.subRoutes.find(s => s.id === subRouteId);
    return sub ? `${route.name} · ${sub.name}` : route.name;
  }
  return route.name;
}
