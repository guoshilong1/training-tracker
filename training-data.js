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
        if (day.items.length > 0 || day.shift) {
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
