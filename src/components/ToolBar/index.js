import React, { useRef } from 'react';
import classnames from 'classnames';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';

import Overflow from 'rc-overflow';

import './index.css';


function ToolBar(props) {
    const ellipsis = useRef(null)
    console.log("ToolBar")
    // 渲染左区域每项
    const renderItem = (item) => {

        const { type, color, label, value, icon,key } = item
        //按钮 | 链接 | 图标
        if (type === "button" || type === "link" || type === "icon") {
            let colorClass = "";
            if (color) {
                colorClass = `p-button-${color}`
            }
            console.log({key})
            return (
                <Button
                    key={key}
                    label={label}
                    icon={`pi ${icon}`}
                    className={classnames("p-mr-1", colorClass, {
                        "p-button-text": type === "link",
                        "p-button-rounded": type === "icon"
                    })}
                />
            );
        }
        //输入框
        if (type === "input") {
            return (
                <InputText  key={key} placeholder={label} type="text" value={value} className="p-mr-1" />
            )
        }
        //下拉框
        if (type === "select") {

            return <Dropdown  key={key} value={value} options={item.children} optionLabel={item.optionsLabel} editable={item.editable} className="p-mr-1" />
        }
    }

    //渲染隐藏部分
    const renderRest = (items) => {
        const { overlayWidth } = props
        return (
            <>
                {/* 省略按钮 */}
                <Button   icon="pi pi-ellipsis-h" className="p-button-text p-mr-2" onClick={(e) => ellipsis.current.toggle(e)} />
                {/* 弹出面板 */}
                <OverlayPanel ref={ellipsis} style={{ maxWidth: overlayWidth }}>
                    <div className="p-d-flex p-flex-wrap">
                        {items.map(item => <div className="p-mb-2 p-mr-2">{renderItem(item)}</div>)}
                    </div>
                </OverlayPanel>
            </>
        )
    }

    return (
        <div className={
            classnames(
                "p-grid p-align-center toolbar", {
                "border": props.border   //控制边框
            })} >
            {/* 左区域 */}
            <div className="p-col">
                <Overflow
                    data={props.data.leftContent}  //数据源
                    renderItem={renderItem}  //渲染每一项
                    renderRest={renderRest}  //渲染隐藏部分
                    maxCount={'responsive'}

                />
            </div>
            {/* 右区域 */}
            <div className="p-col p-col-fixed p-d-flex p-align-center" >
                {/* {props.data.rightConent && props.data.rightConent.map(item => renderItem(item))} */}
            </div>
        </div>
    )
}

export default ToolBar;
