import React from 'react';
import ToolBar from '../components/ToolBar/index';

export const CusComponentsPage = () => {

    const dataSource = {
        leftContent: [
            {
                type: "button",  //按钮型控件
                label: "新增",
                value: 0,
                icon: "pi-plus",
                color: "danger",

            },
            {
                type: "button",
                label: "success",
                value: 0,
                icon: "pi-user-edit",
                color: "secondary",

            },
            {
                type: "button",
                label: "默认主题色按钮",
                value: 0,
                icon: "pi-plus",
                color: "",

            },
            {
                type: "button",
                label: "success",
                value: 0,
                icon: "pi-user-edit",
                color: "success",

            },
            {
                type: "button",
                label: "info",
                value: 0,
                icon: "pi-plus",
                color: "info",

            },
            {
                type: "button",
                label: "新增",
                value: 0,
                icon: "pi-plus",
                color: "danger",

            },
            {
                type: "link",  //链接型控件
                label: "链接",
                value: 1,
                icon: "pi-user-edit",
                color: "",
            },
            {
                type: "input", //输入框型控件
                label: "编辑2",
                value: 2,
                icon: "pi-user-edit",
                color: "",
            },
            {
                type: "select",  //下拉框型控件
                label: "请选择",
                value: 'New York',
                optionsLabel: "name",  //指定下拉选择的label
                icon: "",
                color: "",
                editable: true,  //是否可编辑
                children: [
                    { name: 'New York', code: 'NY' },
                    { name: 'Rome', code: 'RM' },
                    { name: 'London', code: 'LDN' },
                    { name: 'Istanbul', code: 'IST' },
                    { name: 'Paris', code: 'PRS' }
                ]
            },

        ],
        rightConent: [

            {
                type: "input",
                value: "",
                label: "Search",
                icon: "",
                color: "",
            },
            {
                type: "icon",   //图标型控件
                value: 5,
                label: "",
                icon: "pi-moon",
                color: "",
            },
            {
                type: "icon",
                value: 5,
                label: "",
                icon: "pi-star",
                color: "warning",
            },
            {
                type: "icon",
                value: 5,
                label: "",
                icon: "pi-exclamation-circle",
                color: "success",
            },
        ]
    }
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>自定义工具栏</h5>

                    <ToolBar
                        data={dataSource}
                        overlayWidth={300}  //设置弹出面板的宽度
                        border //增加边框
                    />
                </div>
            </div>
        </div>
    );
}
