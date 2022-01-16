var tree = [
    {
        "auth_id": 118,
        "title": "工作台",
        "auth_pid": 0,
        "auth_sort": 1,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [

        ]
    },
    {
        "auth_id": 1,
        "title": "用户管理",
        "auth_pid": 0,
        "auth_sort": 2,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [
            {
                "auth_id": 3,
                "title": "用户列表",
                "auth_pid": 1,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "/backend/user/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 213,
                        "title": "查看",
                        "auth_pid": 3,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 6,
                        "title": "禁用",
                        "auth_pid": 3,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/user/status",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 7,
                        "title": "查看实时数据",
                        "auth_pid": 3,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/goods_report_minutes/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 8,
                        "title": "设置",
                        "auth_pid": 3,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/user/editAddTaskStatus",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 260,
                        "title": "清除余额",
                        "auth_pid": 3,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "/backend/user/clearUserWallet",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 4,
                "title": "用户日记",
                "auth_pid": 1,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "/backend/userOperateLog/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 36,
                "title": "充值记录",
                "auth_pid": 1,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "/backend/recharge_record/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 214,
                        "title": "查看",
                        "auth_pid": 36,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 37,
                        "title": "充值明细",
                        "auth_pid": 36,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/recharge_record/detail",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 39,
                "title": "消费报表",
                "auth_pid": 1,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "/backend/user_wallet/consumptionDayReport",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 38,
                "title": "消费记录",
                "auth_pid": 1,
                "auth_sort": 5,
                "type": 1,
                "auth_url": "/backend/user_wallet/userConsumeRecord",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 40,
                "title": "充值报表",
                "auth_pid": 1,
                "auth_sort": 6,
                "type": 1,
                "auth_url": "/backend/recharge_record/getRechargeDayReport",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 266,
                "title": "测试用户",
                "auth_pid": 1,
                "auth_sort": 7,
                "type": 2,
                "auth_url": "1321",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 267,
                "title": "测试用户1",
                "auth_pid": 1,
                "auth_sort": 8,
                "type": 2,
                "auth_url": "2321",
                "level": 2,
                "select": 1,
                "checked": false,
                "children": [

                ]
            }
        ]
    },
    {
        "auth_id": 100,
        "title": "销售管理",
        "auth_pid": 0,
        "auth_sort": 3,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [
            {
                "auth_id": 102,
                "title": "客户管理",
                "auth_pid": 100,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "/backend/customer/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 215,
                        "title": "查看",
                        "auth_pid": 102,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 120,
                        "title": "查看详情",
                        "auth_pid": 102,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/customer/customerDetail",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 103,
                        "title": "添加客户",
                        "auth_pid": 102,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 104,
                        "title": "编辑",
                        "auth_pid": 102,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/customer/edit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 105,
                        "title": "查看订单",
                        "auth_pid": 102,
                        "auth_sort": 5,
                        "type": 1,
                        "auth_url": "/backend/customerOrder/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [
                            {
                                "auth_id": 239,
                                "title": "查看",
                                "auth_pid": 105,
                                "auth_sort": 1,
                                "type": 1,
                                "auth_url": "",
                                "level": 4,
                                "select": 1,
                                "checked": true,
                                "children": [

                                ]
                            },
                            {
                                "auth_id": 106,
                                "title": "下载",
                                "auth_pid": 105,
                                "auth_sort": 2,
                                "type": 2,
                                "auth_url": "",
                                "level": 4,
                                "select": 1,
                                "checked": true,
                                "children": [

                                ]
                            },
                            {
                                "auth_id": 107,
                                "title": "在线预览",
                                "auth_pid": 105,
                                "auth_sort": 3,
                                "type": 2,
                                "auth_url": "",
                                "level": 4,
                                "select": 1,
                                "checked": true,
                                "children": [

                                ]
                            },
                            {
                                "auth_id": 108,
                                "title": "复制订单",
                                "auth_pid": 105,
                                "auth_sort": 4,
                                "type": 2,
                                "auth_url": "/backend/customerOrder/detail",
                                "level": 4,
                                "select": 1,
                                "checked": true,
                                "children": [

                                ]
                            }
                        ]
                    },
                    {
                        "auth_id": 109,
                        "title": "录入订单",
                        "auth_pid": 102,
                        "auth_sort": 6,
                        "type": 2,
                        "auth_url": "/backend/customerOrder/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 110,
                        "title": " 删除",
                        "auth_pid": 102,
                        "auth_sort": 7,
                        "type": 2,
                        "auth_url": "/backend/customer/delete",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 111,
                        "title": "绑定用户",
                        "auth_pid": 102,
                        "auth_sort": 8,
                        "type": 2,
                        "auth_url": "/backend/customer/setBinDing",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 101,
                "title": "添加客户",
                "auth_pid": 100,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 216,
                        "title": "查看",
                        "auth_pid": 101,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 122,
                        "title": "行业标签设置",
                        "auth_pid": 101,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/customerTargetType/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 121,
                        "title": "职级标签设置",
                        "auth_pid": 101,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/customerTargetType/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 123,
                        "title": "来源标签设置",
                        "auth_pid": 101,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/customerTargetType/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 124,
                        "title": " 没有标签设置权限（只有录入客户功能）",
                        "auth_pid": 101,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 132,
                "title": "订单管理",
                "auth_pid": 100,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 217,
                        "title": "查看",
                        "auth_pid": 132,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 133,
                        "title": "查看详情",
                        "auth_pid": 132,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/customerOrder/customerOrderLists",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 119,
                "title": "订单留存",
                "auth_pid": 100,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "/backend/accountRetentionFansReport/officialAccountReportDayList",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 241,
                        "title": "查看",
                        "auth_pid": 119,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 242,
                        "title": "查看历史留存",
                        "auth_pid": 119,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 113,
                "title": "客户跟进",
                "auth_pid": 100,
                "auth_sort": 5,
                "type": 1,
                "auth_url": "/backend/customer/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 218,
                        "title": "查看",
                        "auth_pid": 113,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 114,
                        "title": "立即处理",
                        "auth_pid": 113,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/communicationRecord/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 115,
                        "title": "沟通记录",
                        "auth_pid": 113,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/communicationRecord/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 116,
                "title": "跟进记录",
                "auth_pid": 100,
                "auth_sort": 6,
                "type": 1,
                "auth_url": "/backend/customer/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 219,
                        "title": "查看",
                        "auth_pid": 116,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 117,
                        "title": " 沟通记录",
                        "auth_pid": 116,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/communicationRecord/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 125,
                "title": "订单结算",
                "auth_pid": 100,
                "auth_sort": 7,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 220,
                        "title": "查看",
                        "auth_pid": 125,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 126,
                        "title": "收款",
                        "auth_pid": 125,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/customerAccount/list",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 127,
                        "title": "退款",
                        "auth_pid": 125,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/customerAccount/list",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 130,
                        "title": "结算",
                        "auth_pid": 125,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/customerOrder/detail",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 128,
                        "title": "产品费",
                        "auth_pid": 125,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "/backend/customerAccount/list",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 129,
                        "title": "业务费",
                        "auth_pid": 125,
                        "auth_sort": 6,
                        "type": 2,
                        "auth_url": "/backend/customerAccount/list",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 131,
                        "title": "查看详情",
                        "auth_pid": 125,
                        "auth_sort": 7,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 254,
                        "title": "消耗",
                        "auth_pid": 125,
                        "auth_sort": 8,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 262,
                        "title": "订单导出",
                        "auth_pid": 125,
                        "auth_sort": 9,
                        "type": 2,
                        "auth_url": "/backend/customerOrder/exportCustomerOrders",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 263,
                        "title": "销售数据统计",
                        "auth_pid": 125,
                        "auth_sort": 10,
                        "type": 1,
                        "auth_url": "/backend/customerOrder/findVocationalWorkerProfitStatistics",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 23,
                "title": "销售管理",
                "auth_pid": 100,
                "auth_sort": 8,
                "type": 1,
                "auth_url": "/backend/vocational_worker/chooseVocationalWorker",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 221,
                        "title": "查看",
                        "auth_pid": 23,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 24,
                        "title": "查看客户",
                        "auth_pid": 23,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/user/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 25,
                        "title": "生成二维码",
                        "auth_pid": 23,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/vocational_worker/makeQrCode",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 26,
                        "title": "编辑",
                        "auth_pid": 23,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/vocational_worker/edit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 27,
                        "title": "启用",
                        "auth_pid": 23,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "/backend/vocational_worker/status",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 28,
                        "title": "添加合伙人",
                        "auth_pid": 23,
                        "auth_sort": 6,
                        "type": 2,
                        "auth_url": "/backend/vocational_worker/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 29,
                        "title": "删除",
                        "auth_pid": 23,
                        "auth_sort": 7,
                        "type": 2,
                        "auth_url": "/backend/vocational_worker/deletes",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 30,
                "title": "商务管理",
                "auth_pid": 100,
                "auth_sort": 9,
                "type": 1,
                "auth_url": "/backend/commerces/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 222,
                        "title": "查看",
                        "auth_pid": 30,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 31,
                        "title": "添加商务人员",
                        "auth_pid": 30,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/commerces/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 32,
                        "title": "查看合伙人",
                        "auth_pid": 30,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/vocational_worker/finds",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 33,
                        "title": "编辑",
                        "auth_pid": 30,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/commerces/edit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 34,
                        "title": "删除",
                        "auth_pid": 30,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "/backend/commerces/deletes",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 249,
                "title": "投放报表",
                "auth_pid": 100,
                "auth_sort": 10,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 250,
                        "title": "查看",
                        "auth_pid": 249,
                        "auth_sort": 1,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 251,
                        "title": "投放支出",
                        "auth_pid": 249,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 257,
                        "title": "批量导出",
                        "auth_pid": 249,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 258,
                        "title": "批量导入",
                        "auth_pid": 249,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 253,
                "title": "订单款项记录",
                "auth_pid": 100,
                "auth_sort": 11,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            }
        ]
    },
    {
        "auth_id": 246,
        "title": "绩效管理",
        "auth_pid": 0,
        "auth_sort": 4,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [
            {
                "auth_id": 247,
                "title": "绩效月报",
                "auth_pid": 246,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 248,
                "title": "个人绩效",
                "auth_pid": 246,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 255,
                "title": "团队绩效",
                "auth_pid": 246,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 256,
                "title": "客户来源",
                "auth_pid": 246,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            }
        ]
    },
    {
        "auth_id": 41,
        "title": "公众号管理",
        "auth_pid": 0,
        "auth_sort": 5,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [
            {
                "auth_id": 42,
                "title": "公众号列表",
                "auth_pid": 41,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "/backend/official_account/findsToBackend",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 223,
                        "title": "查看",
                        "auth_pid": 42,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 43,
                        "title": "禁用",
                        "auth_pid": 42,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/official_account/isForbid",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 98,
                        "title": "设置涨粉标签",
                        "auth_pid": 42,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/officialAccount/setFansTag",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 44,
                        "title": "VIP",
                        "auth_pid": 42,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/official_account/isVip",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 45,
                        "title": "设置业务类型",
                        "auth_pid": 42,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "/backend/official_account/editBusinessType",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 46,
                        "title": "上传广告图",
                        "auth_pid": 42,
                        "auth_sort": 6,
                        "type": 2,
                        "auth_url": "/backend/officialAccount/uploadAdverPi",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 47,
                "title": "公众号统计",
                "auth_pid": 41,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "/backend/official_account/getAccountReportDay",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 48,
                "title": "个人号审核",
                "auth_pid": 41,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "/backend/official_account/findsToBackend",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 50,
                "title": "公众号任务",
                "auth_pid": 41,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "/backend/goods/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 224,
                        "title": "查看",
                        "auth_pid": 50,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 51,
                        "title": "出价记录",
                        "auth_pid": 50,
                        "auth_sort": 2,
                        "type": 1,
                        "auth_url": "/backend/goods/detail",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "auth_id": 80,
        "title": "合作商管理",
        "auth_pid": 0,
        "auth_sort": 6,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [
            {
                "auth_id": 81,
                "title": "合作商列表",
                "auth_pid": 80,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "/backend/commercial_user/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 225,
                        "title": "查看",
                        "auth_pid": 81,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 82,
                        "title": "添加合作商",
                        "auth_pid": 81,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/commercial_user/register",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 83,
                        "title": "收益记录",
                        "auth_pid": 81,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/commercial_user/register",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [
                            {
                                "auth_id": 240,
                                "title": "查看",
                                "auth_pid": 83,
                                "auth_sort": 1,
                                "type": 1,
                                "auth_url": "",
                                "level": 4,
                                "select": 1,
                                "checked": true,
                                "children": [

                                ]
                            },
                            {
                                "auth_id": 84,
                                "title": "申请提现",
                                "auth_pid": 83,
                                "auth_sort": 2,
                                "type": 2,
                                "auth_url": "/backend/commercialUser/settlementInformation",
                                "level": 4,
                                "select": 1,
                                "checked": true,
                                "children": [

                                ]
                            },
                            {
                                "auth_id": 85,
                                "title": "粉丝",
                                "auth_pid": 83,
                                "auth_sort": 3,
                                "type": 2,
                                "auth_url": "/backend/commercialUser/settlementInformation",
                                "level": 4,
                                "select": 1,
                                "checked": true,
                                "children": [

                                ]
                            }
                        ]
                    },
                    {
                        "auth_id": 86,
                        "title": "其他",
                        "auth_pid": 81,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 87,
                        "title": "删除",
                        "auth_pid": 81,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "/backend/commercial_user/deletes",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 244,
                "title": "地区拉取量",
                "auth_pid": 80,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 88,
                "title": "提现记录",
                "auth_pid": 80,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "/backend/settle_accounts/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 89,
                "title": "提现审核",
                "auth_pid": 80,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "/backend/commercialUser/findsSettlementApplication",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 226,
                        "title": "查看",
                        "auth_pid": 89,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 90,
                        "title": "审核通过",
                        "auth_pid": 89,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/commercialUser/SettlementAudit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 91,
                        "title": "审核不通过",
                        "auth_pid": 89,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/commercialUser/SettlementAudit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "auth_id": 64,
        "title": "系统管理",
        "auth_pid": 0,
        "auth_sort": 7,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [
            {
                "auth_id": 54,
                "title": "文章管理",
                "auth_pid": 64,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "/backend/article/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 227,
                        "title": "查看",
                        "auth_pid": 54,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 55,
                        "title": "分类管理",
                        "auth_pid": 54,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/articleType/father",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 56,
                        "title": "编辑",
                        "auth_pid": 54,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/article/detail",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 57,
                        "title": "删除",
                        "auth_pid": 54,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/article/deletes",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 58,
                "title": "文章发布",
                "auth_pid": 64,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "/backend/articleType/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 228,
                        "title": "查看",
                        "auth_pid": 58,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 59,
                        "title": "新建分类",
                        "auth_pid": 58,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/articleType/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 60,
                "title": "热点搜索",
                "auth_pid": 64,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "/backend/hotSearch/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 229,
                        "title": "查看",
                        "auth_pid": 60,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 61,
                        "title": "添加",
                        "auth_pid": 60,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/hotSearch/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 62,
                        "title": "重命名",
                        "auth_pid": 60,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/hotSearch/edit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 63,
                        "title": "删除",
                        "auth_pid": 60,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/hotSearch/delete",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 243,
                "title": "TDK设置",
                "auth_pid": 64,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 65,
                "title": "地区管理",
                "auth_pid": 64,
                "auth_sort": 5,
                "type": 1,
                "auth_url": "/backend/area/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 230,
                        "title": "查看",
                        "auth_pid": 65,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 66,
                        "title": "保存",
                        "auth_pid": 65,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/area_setting/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 67,
                "title": "标签管理",
                "auth_pid": 64,
                "auth_sort": 6,
                "type": 1,
                "auth_url": "/backend/label/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 231,
                        "title": "查看",
                        "auth_pid": 67,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 68,
                        "title": "添加场景标签",
                        "auth_pid": 67,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/label/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 69,
                        "title": "是否显示",
                        "auth_pid": 67,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/label/status",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 70,
                        "title": "删除",
                        "auth_pid": 67,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/label/delete",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 71,
                "title": "出价设置",
                "auth_pid": 64,
                "auth_sort": 7,
                "type": 1,
                "auth_url": "/backend/sex_price_setting/detail",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 232,
                        "title": "查看",
                        "auth_pid": 71,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 72,
                        "title": "确定",
                        "auth_pid": 71,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/sex_price_setting/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 73,
                "title": "友情链接",
                "auth_pid": 64,
                "auth_sort": 8,
                "type": 1,
                "auth_url": "/backend/friendly_link/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 233,
                        "title": "查看",
                        "auth_pid": 73,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 74,
                        "title": "添加友情链接",
                        "auth_pid": 73,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/friendly_link/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 75,
                        "title": "删除",
                        "auth_pid": 73,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/friendly_link/deletes",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 76,
                "title": "通知设置",
                "auth_pid": 64,
                "auth_sort": 9,
                "type": 1,
                "auth_url": "/backend/operative/managerFinds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 234,
                        "title": "查看",
                        "auth_pid": 76,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 77,
                        "title": "添加微信",
                        "auth_pid": 76,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/operative/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 78,
                        "title": "删除",
                        "auth_pid": 76,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/operative/editAction",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 79,
                        "title": "禁用",
                        "auth_pid": 76,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/operative/editAction",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            }
        ]
    },
    {
        "auth_id": 2,
        "title": "权限管理",
        "auth_pid": 0,
        "auth_sort": 8,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [
            {
                "auth_id": 9,
                "title": "管理员列表",
                "auth_pid": 2,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "/backend/manager/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 235,
                        "title": "查看",
                        "auth_pid": 9,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 10,
                        "title": "编辑",
                        "auth_pid": 9,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/manager/edit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 11,
                        "title": "禁用",
                        "auth_pid": 9,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/manager/status",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 12,
                        "title": "删除",
                        "auth_pid": 9,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/manager/delete",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 95,
                        "title": "添加",
                        "auth_pid": 9,
                        "auth_sort": 5,
                        "type": 2,
                        "auth_url": "/backend/manager/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 13,
                "title": "用户组",
                "auth_pid": 2,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "/backend/role/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 236,
                        "title": "查看",
                        "auth_pid": 13,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 14,
                        "title": "编辑",
                        "auth_pid": 13,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/role/edit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 15,
                        "title": "添加",
                        "auth_pid": 13,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/role/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 16,
                        "title": "删除",
                        "auth_pid": 13,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/role/delete",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 17,
                "title": "权限列表",
                "auth_pid": 2,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "/backend/auth/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 237,
                        "title": "查看",
                        "auth_pid": 17,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 18,
                        "title": "添加",
                        "auth_pid": 17,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/auth/create",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 19,
                        "title": "编辑",
                        "auth_pid": 17,
                        "auth_sort": 3,
                        "type": 2,
                        "auth_url": "/backend/auth/edit",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 20,
                        "title": "删除",
                        "auth_pid": 17,
                        "auth_sort": 4,
                        "type": 2,
                        "auth_url": "/backend/auth/delete",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 21,
                "title": "操作日记",
                "auth_pid": 2,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "/backend/managerLog/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            }
        ]
    },
    {
        "auth_id": 252,
        "title": "财务报表",
        "auth_pid": 0,
        "auth_sort": 9,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": true,
        "children": [

        ]
    },
    {
        "auth_id": 206,
        "title": "其他",
        "auth_pid": 0,
        "auth_sort": 10,
        "type": 1,
        "auth_url": "",
        "level": 1,
        "select": 1,
        "checked": false,
        "children": [
            {
                "auth_id": 92,
                "title": "工单列表",
                "auth_pid": 206,
                "auth_sort": 1,
                "type": 1,
                "auth_url": "/backend/work_order/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [
                    {
                        "auth_id": 238,
                        "title": "查看",
                        "auth_pid": 92,
                        "auth_sort": 1,
                        "type": 1,
                        "auth_url": "",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    },
                    {
                        "auth_id": 93,
                        "title": "回复",
                        "auth_pid": 92,
                        "auth_sort": 2,
                        "type": 2,
                        "auth_url": "/backend/work_order/managerReply",
                        "level": 3,
                        "select": 1,
                        "checked": true,
                        "children": [

                        ]
                    }
                ]
            },
            {
                "auth_id": 94,
                "title": "合作意向",
                "auth_pid": 206,
                "auth_sort": 2,
                "type": 1,
                "auth_url": "/backend/cooperation/finds",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 96,
                "title": "销售全部权限（查看）",
                "auth_pid": 206,
                "auth_sort": 3,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": true,
                "children": [

                ]
            },
            {
                "auth_id": 97,
                "title": "销售个人权限（销售人员）",
                "auth_pid": 206,
                "auth_sort": 4,
                "type": 1,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": false,
                "children": [

                ]
            },
            {
                "auth_id": 245,
                "title": "销售团队权限（商务人员）",
                "auth_pid": 206,
                "auth_sort": 5,
                "type": 2,
                "auth_url": "",
                "level": 2,
                "select": 1,
                "checked": false,
                "children": [

                ]
            }
        ]
    }
]

