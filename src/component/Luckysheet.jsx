import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import "./index.css";

// 需要确认问题
// 1、保护工作表功能
// 2、排序功能
// 3、过滤功能


const queryData = {
    bucketNames:  ["2022-04-04","2022-04-11","2022-04-18","2022-04-25","2022-05-02","2022-05-09","2022-05-16","2022-05-23","2022-05-30","2022-06-06","2022-06-13","2022-06-20","2022-06-27","2022-07-04","2022-07-11","2022-07-18","2022-07-25","2022-08-01","2022-08-08","2022-08-15"],
    canNotEditMeasures: ["test333333333", "test55555555", "COMMON4", "test222222", "test44444444", "COMMON6", "test111111", "COMMON5","COMMON7","test66666666666"],
    currentBucketName: "2022-06-13",
    measures: ["COMMON6", "COMMON3", "COMMON2", "COMMON7", "COMMON1"],
    planId: 111,
    totalCount: 2,
    rows: [
        {
            measureCells: {
                COMMON1: {
                    cells: [{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0}]
                },
                COMMON2: {
                    cells: [{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0}]
                },
                COMMON3: {
                    cells: [{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0}]
                },
                COMMON4: {
                    cells: [{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0}]
                },
                COMMON5: {
                    cells: [{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0}]
                },
                COMMON6: {
                    cells: [{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0}]
                },
                COMMON7: {
                    cells: [{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0},{editable: 0}]
                },
            },
            memberTupleVO: {
                itemHierarchy: {ITEM: "5031909000", item_name: "植物智慧舒缓特护安肤洁面乳100g"},
                toSiteHierarchy: {TO_SITE: "青浦工厂", toSite_name: "青浦工厂n"},
            }
        }
    ]
}

const defaultCelldata = [
    { "r": 0, "c": 0, "v": { ct: {fa: "General", t: "g"},"bg": "#f8f8f8", ht: 0, m:"ITEM", v:"ITEM" } }, 
    { "r": 0, "c": 1, "v": { ct: {fa: "General", t: "g"},"bg": "#f8f8f8", ht: 0, m:"SITE", v:"SITE" } }, 
    { "r": 0, "c": 2, "v": { ct: {fa: "General", t: "g"},"bg": "#f8f8f8", ht: 0, m:"计划指标", v:"计划指标" } }, 
    { "r": 0, "c": 3, "v": { ct: {fa: "General", t: "g"},"bg": "#f8f8f8", ht: 0, m:"2022-04-04", v:"2022-04-04" } }, 
    { "r": 0, "c": 4, "v": { ct: {fa: "General", t: "g"},"bg": "#ABAEF5", ht: 0, m:"2022-04-11", v:"2022-04-11" } }, 
    { "r": 0, "c": 5, "v": { ct: {fa: "General", t: "g"},"bg": "#f8f8f8", ht: 0, m:"2022-04-18", v:"2022-04-18" } }, 
    { "r": 0, "c": 6, "v": { ct: {fa: "General", t: "g"},"bg": "#f8f8f8", ht: 0, m:"2022-04-25", v:"2022-04-25" } }, 
    { "r": 0, "c": 7, "v": { ct: {fa: "General", t: "g"},"bg": "#f8f8f8", ht: 0, m:"2022-05-02", v:"2022-05-02" } }, 

    { "r": 1, "c": 0, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"ITEM_Level_1", v:"ITEM_Level_1" } }, 
    { "r": 1, "c": 1, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"SITE_Level_1", v:"SITE_Level_1" } },
    { "r": 1, "c": 2, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"计划指标1", v:"计划指标1" } },
    { "r": 1, "c": 3, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"1", v:"1" } },
    { "r": 1, "c": 4, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"2", v:"2" } },
    { "r": 1, "c": 5, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"3", v:"3" } },
    { "r": 1, "c": 6, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"4", v:"4" } },
    { "r": 1, "c": 7, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"5", v:"5" } },

    { "r": 2, "c": 0, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"ITEM_Level_1", v:"ITEM_Level_1" } }, 
    { "r": 2, "c": 1, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"SITE_Level_1", v:"SITE_Level_1" } }, 
    { "r": 2, "c": 2, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"计划指标2", v:"计划指标2" } },
    { "r": 2, "c": 3, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"1", v:"1" } },
    { "r": 2, "c": 4, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"2", v:"2" } },
    { "r": 2, "c": 5, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"3", v:"3" } },
    { "r": 2, "c": 6, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"4", v:"4" } },
    { "r": 2, "c": 7, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"5", v:"5" } },
    
    { "r": 3, "c": 0, "v": "ITEM_Level_2" }, 
    { "r": 3, "c": 1, "v": "SITE_Level_2" },
    { "r": 3, "c": 2, "v": "计划指标3" },
    { "r": 3, "c": 3, "v": "1" },
    { "r": 3, "c": 4, "v": "2" },
    { "r": 3, "c": 5, "v": "3" },
    { "r": 3, "c": 6, "v": "4" },
    { "r": 3, "c": 7, "v": "5" },

    { "r": 4, "c": 0, "v": "ITEM_Level_2" }, 
    { "r": 4, "c": 1, "v": "SITE_Level_2" }, 
    { "r": 4, "c": 2, "v": "计划指标4" },
    { "r": 4, "c": 3, "v": "1" },
    { "r": 4, "c": 4, "v": "2" },
    { "r": 4, "c": 5, "v": "3" },
    { "r": 4, "c": 6, "v": "4" },
    { "r": 4, "c": 7, "v": "5" },

    { "r": 5, "c": 0, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"ITEM_Level_1", v:"ITEM_Level_1" } }, 
    { "r": 5, "c": 1, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"SITE_Level_1", v:"SITE_Level_1" } },
    { "r": 5, "c": 2, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"计划指标5", v:"计划指标5" } },
    { "r": 5, "c": 3, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"1", v:"1" } },
    { "r": 5, "c": 4, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"2", v:"2" } },
    { "r": 5, "c": 5, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"3", v:"3" } },
    { "r": 5, "c": 6, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"4", v:"4" } },
    { "r": 5, "c": 7, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"5", v:"5" } },

    { "r": 6, "c": 0, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"ITEM_Level_1", v:"ITEM_Level_1" } }, 
    { "r": 6, "c": 1, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"SITE_Level_1", v:"SITE_Level_1" } }, 
    { "r": 6, "c": 2, "v": { ct: {fa: "General", t: "g"}, ht: 0, m:"计划指标6", v:"计划指标6" } },
    { "r": 6, "c": 3, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"1", v:"1" } },
    { "r": 6, "c": 4, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"2", v:"2" } },
    { "r": 6, "c": 5, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"3", v:"3" } },
    { "r": 6, "c": 6, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"4", v:"4" } },
    { "r": 6, "c": 7, "v": { ct: {fa: "General", t: "g"},"bg": "#40a9ff42", ht: 0, m:"5", v:"5" } },

    { "r": 7, "c": 0, "v": "ITEM_Level_2" }, 
    { "r": 7, "c": 1, "v": "SITE_Level_2" },
    { "r": 7, "c": 2, "v": "计划指标7" },
    { "r": 7, "c": 3, "v": "1" },
    { "r": 7, "c": 4, "v": "2" },
    { "r": 7, "c": 5, "v": "3" },
    { "r": 7, "c": 6, "v": "4" },
    { "r": 7, "c": 7, "v": "5" },

    { "r": 8, "c": 0, "v": "ITEM_Level_2" }, 
    { "r": 8, "c": 1, "v": "SITE_Level_2" }, 
    { "r": 8, "c": 2, "v": "计划指标8" },
    { "r": 8, "c": 3, "v": "1" },
    { "r": 8, "c": 4, "v": "2" },
    { "r": 8, "c": 5, "v": "3" },
    { "r": 8, "c": 6, "v": "4" },
    { "r": 8, "c": 7, "v": "5" },
]

export default function Luckysheet({ className, style }) {
    const luckysheet = useRef();
    const subHiddenkeys = useRef(new Set([2, 6]))
    const [cellData, setCellData] = useState(defaultCelldata);
    const options = {
        container: "luckysheet", // 容器ID
        title: "", // 工作簿名称
        lang: "zh", // 语言
        gridKey: 1, // 唯一的key
        // loadUrl: "", // 加载整个工作簿 
        // loadSheetUrl: "", // 加载其它页celldata 
        // allowUpdate: true, // 允许更新 
        // updateUrl: "", // 更新地址 
        // updateImageUrl: "", // 缩略图更新地址 
        // plugins: ['chart'], // 插件
        // allowCopy: true, // 允许复制 
        // showtoolbar: true, //是否显示工具栏
        // showtoolbarConfig: {
        //     undoRedo: true, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
        //     paintFormat: true, //格式刷
        //     currencyFormat: true, //货币格式
        //     percentageFormat: true, //百分比格式
        //     numberDecrease: true, // '减少小数位数'
        //     numberIncrease: true, // '增加小数位数
        //     moreFormats: true, // '更多格式'
        //     font: true, // '字体'
        //     fontSize: true, // '字号大小'
        //     bold: true, // '粗体 (Ctrl+B)'
        //     italic: true, // '斜体 (Ctrl+I)'
        //     strikethrough: true, // '删除线 (Alt+Shift+5)'
        //     underline: true, // '下划线 (Alt+Shift+6)'
        //     textColor: true, // '文本颜色'
        //     fillColor: true, // '单元格颜色'
        //     border: true, // '边框'
        //     mergeCell: true, // '合并单元格'
        //     horizontalAlignMode: true, // '水平对齐方式'
        //     verticalAlignMode: true, // '垂直对齐方式'
        //     textWrapMode: true, // '换行方式'
        //     textRotateMode: true, // '文本旋转方式'
        //     image:true, // '插入图片'
        //     link:true, // '插入链接'
        //     chart: true, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
        //     postil:  true, //'批注'
        //     pivotTable: true,  //'数据透视表'
        //     function: true, // '公式'
        //     frozenMode: true, // '冻结方式'
        //     sortAndFilter: true, // '排序和筛选'
        //     conditionalFormat: true, // '条件格式'
        //     dataVerification: true, // '数据验证'
        //     splitColumn: true, // '分列'
        //     screenshot: true, // '截图'
        //     findAndReplace: true, // '查找替换'
        //     protection:true, // '工作表保护'
        //     print:true, // '打印'
        // }, // 自定义工具栏
        // showsheetbar: false, //是否显示底部sheet页按钮
        // showsheetbarConfig: {
        //     add: false, //新增sheet  
        //     menu: false, //sheet管理菜单
        //     sheet: false //sheet页显示
        // }, // 自定义配置底部sheet页按钮
        // showstatisticBar: true, // 是否显示底部计数栏
        // showstatisticBarConfig: {
        //     count: false, // 计数栏
        //     view: false, // 打印视图
        //     zoom: false, // 缩放
        // }, // 自定义配置底部计数栏
        // enableAddRow: false, // 允许添加行
        // enableAddBackTop: false, // 允许回到顶部
        // userInfo: "Lucky", // 右上角的用户信息展示样式 可以是字符串模板
        // userMenuItem: [
        //     {url:"www.baidu.com", "icon":'<i class="fa fa-folder" aria-hidden="true"></i>', "name":"我的表格"}, 
        //     {url:"www.baidu.com", "icon":'<i class="fa fa-sign-out" aria-hidden="true"></i>', "name":"退出登陆"}
        // ], //点击右上角的用户信息弹出的菜单
        // myFolderUrl: "", // 左上角<返回按钮的链接
        // devicePixelRatio: window.devicePixelRatio, // 设备比例
        // functionButton: "", // 右上角功能按钮，例如'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">下载</button> <button id="" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">分享</button> <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">秀数据</button>'
        // showConfigWindowResize: true, // 图表或数据透视表的配置会在右侧弹出，设置弹出后表格是否会自动缩进
        // forceCalculation: false, // 强制刷新公式
        // cellRightClickConfig: {
        //     copy: false, // 复制
        //     copyAs: false, // 复制为
        //     paste: false, // 粘贴
        //     insertRow: false, // 插入行
        //     insertColumn: false, // 插入列
        //     deleteRow: false, // 删除选中行
        //     deleteColumn: false, // 删除选中列
        //     deleteCell: false, // 删除单元格
        //     hideRow: false, // 隐藏选中行和显示选中行
        //     hideColumn: false, // 隐藏选中列和显示选中列
        //     rowHeight: false, // 行高
        //     columnWidth: false, // 列宽
        //     clear: false, // 清除内容
        //     matrix: false, // 矩阵操作选区
        //     sort: false, // 排序选区
        //     filter: false, // 筛选选区
        //     chart: false, // 图表生成
        //     image: false, // 插入图片
        //     link: false, // 插入链接
        //     data: false, // 数据验证
        //     cellFormat: false // 设置单元格格式
        // }, // 自定义配置单元格右击菜单
        // sheetRightClickConfig: {   
        //     delete: false, // 删除
        //     copy: false, // 复制
        //     rename: false, //重命名
        //     color: false, //更改颜色
        //     hide: false, //隐藏，取消隐藏
        //     move: false, //向左移，向右移
        // }, // 自定义配置sheet页右击菜单
        // rowHeaderWidth: 46, // 行标题区域的宽度
        // columnHeaderHeight: 30, // 列标题区域的高度
        // sheetFormulaBar: false, // 是否显示公式栏
        // defaultFontSize: 12, // 初始化默认字体大小
        // limitSheetNameLength: true, // 工作表重命名等场景下是否限制工作表名称的长度
        // defaultSheetNameMaxLength: 31, // 默认允许的工作表名最大长度
        // // allowEdit: false, // 是否可以编辑
        // pager: {
        //     pageIndex: 1, //当前的页码
        //     pageSize: 10, //每页显示多少行数据
        //     total: 50, //数据总行数
        //     selectOption: [10, 20] //允许设置每页行数的选项
        // }, // 分页器按钮设置，初版方案是直接使用的jquery插件 sPage (opens new window)点击分页按钮会触发钩子函数 onTogglePager，返回当前页码，同sPage的backFun方法，此分页器设置只负责UI部分，具体切换分页后的数据请求和数据渲染，请在onTogglePager钩子行数里自定义处理。
        hook:{
            cellEditBefore:function(range){
                // 进入单元格编辑模式之前触发
            },
            cellUpdateBefore:function(r,c,value,isRefresh){
                // 更新这个单元格值之前触发
                if(r === 2 && c >= 3 && c < 8){
                    return true;
                }
                return false;
            },
            cellUpdated:function(r,c,oldValue, newValue, isRefresh){
                // 更新这个单元格后触发
            },
            cellRenderBefore:function(cell,postion,sheetFile,ctx){
                // 单元格渲染前触发，return false 则不渲染该单元格
            },
            cellRenderAfter:function(cell,postion,sheetFile,ctx){
                // 单元格渲染结束后触发
            },
            cellAllRenderBefore:function(data,sheetFile,ctx){
                // 所有单元格渲染之前执行的方法
            },
            rowTitleCellRenderBefore:function(rowNum,postion,ctx){
                // 行标题单元格渲染前触发
            },
            rowTitleCellRenderAfter:function(rowNum,postion,ctx){
                // 行标题单元格渲染后触发
            },
            columnTitleCellRenderBefore:function(columnAbc,postion,ctx){
                // 列标题单元格渲染前触发
            },
            columnTitleCellRenderAfter:function(columnAbc,postion,ctx){
                // 列标题单元格渲染后触发
            },
            // 鼠标钩子
            cellMousedownBefore:function(cell,postion,sheetFile,ctx){
                // 单元格点击前的事件
            },
            cellMousedown:function(cell,postion,sheetFile,ctx){
                // 单元格点击后的事件
                if((postion?.r == 2 || postion?.r == 6) && postion?.c ==2){
                    if(subHiddenkeys.current.has(postion?.r ?? 0)){
                        luckysheet.current.showRow(postion?.r+1, postion?.r+2);
                        subHiddenkeys.current.delete(postion?.r);
                    } else {
                        luckysheet.current.hideRow(postion?.r+1, postion?.r+2);
                        subHiddenkeys.current.add(postion?.r);
                    }
                }
            },
            sheetMousemove:function(cell,postion,sheetFile,moveState,ctx){
                // 鼠标移动事件，可通过cell判断鼠标停留在哪个单元格
            },
            sheetMouseup:function(cell,postion,sheetFile,moveState,ctx){
                // 鼠标按钮释放事件，可通过cell判断鼠标停留在哪个单元格
            },
            scroll: function(position){
                // 鼠标滚动事件
            },
            cellDragStop: function (cell, postion, sheetFile, ctx, event) {
                // 鼠标拖拽文件到Luckysheet内部的结束事件
            },
            // 选区操作（包括单元格）
            rangeSelect:function(index, sheet){
                // 框选或者设置选区后触发
            },
            rangePasteBefore:function(range,data){
                // 选区粘贴前
            },
            // 工作表
            sheetActivate:function(index, isPivotInitial, isNewSheet){
                // 激活工作表前
            },
            // 工作簿
            workbookCreateBefore:function(options){
                // 表格创建之前触发
            },
            workbookCreateAfter:function(json){
                // 表格创建之后触发
            },
            updated:function(operate){
                // 协同编辑中的每次操作后执行的方法，监听表格内容变化，即客户端每执行一次表格操作，Luckysheet将这次操作存到历史记录中后触发，撤销重做时因为也算一次操作，也会触发此钩子函数
            },
            // 图片
            // 批注
            commentInsertBefore:function(r, c){
                // 插入批注之前
            },
            commentInsertAfter:function(r, c, cell){
                // 插入批注之后
            },
            commentDeleteBefore:function(r, c, cell){
                // 删除批注之前
            },
            commentDeleteAfter:function(r, c, cell){
                // 删除批注之后
            },
            commentUpdateBefore:function(r, c, value){
                // 修改批注之前
            },
            commentUpdateAfter:function(r, c, oldCell, newCell ){
                // 修改批注之后
            },
        },
        data: [
            {
                "name": "补货计划详情", //工作表名称
                "color": "#eee333", //工作表颜色
                "index": 0, //工作表索引
                "status": 1, //激活状态
                "order": 0, //工作表的下标
                "hide": 0,//是否隐藏
                "row": 36, //行数
                "column": 15, //列数
                "defaultRowHeight": 19, //自定义行高
                "defaultColWidth": 73, //自定义列宽
                "celldata": cellData, //初始化使用的单元格数据
                "config": {
                    "merge":{
                        "1_0": { "r": 1, "c": 0, "rs": 2, "cs": 1 },
                        "1_1": { "r": 1, "c": 1, "rs": 2, "cs": 1 },
                        "3_0": { "r": 3, "c": 0, "rs": 2, "cs": 1 },
                        "3_1": { "r": 3, "c": 1, "rs": 2, "cs": 1 },
                        "5_0": { "r": 5, "c": 0, "rs": 2, "cs": 1 },
                        "5_1": { "r": 5, "c": 1, "rs": 2, "cs": 1 },
                        "7_0": { "r": 7, "c": 0, "rs": 2, "cs": 1 },
                        "7_1": { "r": 7, "c": 1, "rs": 2, "cs": 1 },
                    }, //合并单元格
                    "rowlen":{
                        "0": 40,
                        "1": 32,
                        "2": 32,
                        "3": 32,
                        "4": 32,
                        "5": 32,
                        "6": 32,
                        "7": 32,
                        "8": 32
                    }, //表格行高
                    "columnlen":{
                        "0": 170,
                        "1": 170,
                        "2": 120,
                    }, //表格列宽
                    "rowhidden":{
                        "3": 0,
                        "4": 0,
                        "7": 0,
                        "8": 0,
                    }, //隐藏行
                    "colhidden":{}, //隐藏列
                    "borderInfo":[
                        {
                            "rangeType": "range",
                            "borderType": "border-left",
                            "style": "1",
                            "color": "#ABAEF5",
                            "range": [{
                                "row": [0, 35],
                                "column": [4, 4]
                            }]
                        },
                        {
                            "rangeType": "range",
                            "borderType": "border-all",
                            "style": "1",
                            "color": "#FFC544",
                            "range": [{
                                "row": [2, 2],
                                "column": [2, 2]
                            }]
                        },
                        {
                            "rangeType": "range",
                            "borderType": "border-all",
                            "style": "1",
                            "color": "#FFC544",
                            "range": [{
                                "row": [6, 6],
                                "column": [2, 2]
                            }]
                        }
                    ], //边框
                    "authority":{//当前工作表的权限配置
                        // selectLockedCells:1, // 选定锁定单元格
                        // selectunLockedCells:1, // 选定解除锁定的单元格
                        // formatCells:1, //设置单元格格式
                        // formatColumns:1, //设置列格式
                        // formatRows:1, //设置行格式
                        // insertColumns:1, //插入列
                        // insertRows:1, //插入行
                        // insertHyperlinks:1, //插入超链接
                        // deleteColumns:1, //删除列
                        // deleteRows:1, //删除行
                        // sort:1, //排序
                        // filter:1, //使用自动筛选
                        // usePivotTablereports:1, //使用数据透视表和报表
                        // editObjects:1, //编辑对象
                        // editScenarios:1, //编辑方案    
                        // sheet:1, //如果为1或true，则该工作表受到保护；如果为0或false，则该工作表不受保护。
                        // hintText:"", //弹窗提示的文字
                        // algorithmName:"None",//加密方案：MD2,MD4,MD5,RIPEMD-128,RIPEMD-160,SHA-1,SHA-256,SHA-384,SHA-512,WHIRLPOOL
                        // saltValue:null, //密码解密的盐参数，为一个自己定的随机数值
                        // allowRangeList:[{ //区域保护
                        //     name:"area", //名称
                        //     password:"1", //密码
                        //     hintText:"", //提示文字
                        //     algorithmName:"None",//加密方案：MD2,MD4,MD5,RIPEMD-128,RIPEMD-160,SHA-1,SHA-256,SHA-384,SHA-512,WHIRLPOOL
                        //     saltValue:null, //密码解密的盐参数，为一个自己定的随机数值
                        //     sqref:"$C$1:$C$10" //区域范围
                        // }],
                    }, 
                },
                "scrollLeft": 0, //左右滚动条位置
                "scrollTop": 0, //上下滚动条位置
                "luckysheet_select_save": [], //选中的区域
                "calcChain": [],//公式链
                "isPivotTable":false,//是否数据透视表
                "pivotTable":{},//数据透视表设置
                "filter_select": {
                    "row": [ 0, 8 ],
                    "column": [ 0, 2 ]
                },//筛选范围
                "filter": null,//筛选配置
                "luckysheet_alternateformat_save": [], //交替颜色
                "luckysheet_alternateformat_save_modelCustom": [], //自定义交替颜色	
                "luckysheet_conditionformat_save": {},//条件格式
                "frozen": {
                    type: 'rangeBoth',
                    range: {row_focus: 0, column_focus: 2}
                }, //冻结行列配置
                "chart": [], //图表配置
                "zoomRatio":1, // 缩放比例
                "image":[], //图片
                "showGridLines": 1, //是否显示网格线
                "dataVerification":{} //数据验证配置
            },
        ], // 工作表配置
    }
    
    const dataFormat = () => {
        const newSet = [];
        queryData.rows.forEach(ele=>{
            Object.keys(ele.measureCells).forEach(key=>{
                const {memberTupleVO: {itemHierarchy, toSiteHierarchy}} = ele
                const newItemSet = [];
                newItemSet.push(itemHierarchy.ITEM);
                newItemSet.push(toSiteHierarchy.TO_SITE);
                newItemSet.push(key);
                newItemSet.push(...ele.measureCells[key].cells.map(i=>i.value));
                newSet.push(newItemSet)
            })
        });
        setCellData(luckysheet.current.transToCellData(newSet))
    };
    useEffect(() => {
        if (!luckysheet.current) {
            luckysheet.current = window.luckysheet
        }
        luckysheet.current.create(options);
        return () => luckysheet.current?.destroy();
    });
    const luckyCss = {
        margin: '0px',
        padding: '0px',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px'
    }
    
    return <div
        id="luckysheet"
        className={className ? `${className} luckysheet` : "luckysheet"}
        style={{ ...luckyCss, ...style }}
    />
}