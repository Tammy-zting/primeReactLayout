import ToolBar from '../../../components/ToolBar/index'

function ToolBarDemo() {

    const dataSource = {
        leftContent: [
            {
                type: "button",  //按钮型控件
                label: "新增",
                value: 0,
                icon: "pi-plus",
                color: "danger",
                key: 0,
            },
            {
                type: "button",
                label: "success",
                value: 0,
                icon: "pi-user-edit",
                color: "secondary",
                key: 1,
            },
            {
                type: "button",
                label: "默认主题色按钮",
                value: 0,
                icon: "pi-plus",
                color: "",
                key: 2,
            },
            {
                type: "button",
                label: "success",
                value: 0,
                icon: "pi-user-edit",
                color: "success",
                key: 3,
            },
            {
                type: "button",
                label: "info",
                value: 0,
                icon: "pi-plus",
                color: "info",
                key: 4,
            },
            {
                type: "button",
                label: "新增",
                value: 0,
                icon: "pi-plus",
                color: "danger",
                key: 5,
            },
            {
                type: "link",  //链接型控件
                label: "链接",
                value: 1,
                icon: "pi-user-edit",
                color: "",
                key: 6,
            },
            {
                type: "input", //输入框型控件
                label: "编辑2",
                value: 2,
                icon: "pi-user-edit",
                color: "",
                key: 7,
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
                ],
                key: 8,
            },

        ],
        rightConent: [

            {
                type: "input",
                value: "",
                label: "Search",
                icon: "",
                color: "",
                key: 9,
            },
            {
                type: "icon",   //图标型控件
                value: 5,
                label: "",
                icon: "pi-moon",
                color: "",
                key: 10,
            },
            {
                type: "icon",
                value: 5,
                label: "",
                icon: "pi-star",
                color: "warning",
                key: 11,
            },
            {
                type: "icon",
                value: 5,
                label: "",
                icon: "pi-exclamation-circle",
                color: "success",
                key: 12,
            },
        ]
    }
    return (
        <>
            <h4>自定义自适应工具栏</h4>
            <ToolBar
                data={dataSource}
                overlayWidth={300}  //设置弹出面板的宽度
                border //增加边框
            />
        </>
    )
}

export default ToolBarDemo;


