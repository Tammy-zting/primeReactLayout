import React from 'react';
import ToolBarDemo from './Demo/ToolBarDemo/index';
import StepsDemo from './Demo/StepsDemo/index'
import GanttDemo from './Demo/GanttDemo/index'
import { Divider } from 'primereact/divider';



export const CusComponentsPage = () => {

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">

                    <ToolBarDemo />
                    <Divider/>
                    <h4>步骤条</h4>
                    <StepsDemo/>
                    <Divider/>
                    <GanttDemo/>
                </div>
            </div>
        </div>
    );
}
