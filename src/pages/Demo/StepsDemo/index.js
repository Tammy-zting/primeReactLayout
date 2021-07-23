import React, { useState } from 'react';
import Steps from '../../../components/Steps/index';


import './index.css';


function StepsDemo() {

  const [current, setCurrent ] = useState(0)
  const [secondaryCurrent, setSecondaryCurrent] = useState(0)
  const [labelPlacement, setLabelPlacement] = useState("vertical")
  const [direction, setDirection] = useState("horizontal")
  const [secondaryCurrentActive, setSecondaryCurrentActive] = useState(false)


  const handleStepClick = (stepNumber) => {

    if (secondaryCurrentActive) {
      setSecondaryCurrent(stepNumber)
    } else {
      setCurrent(stepNumber)
    }
  };


  const toggleSecondaryCurrent = () => {
    setSecondaryCurrentActive(!secondaryCurrentActive)
  };

  const toggleDirection = () => {
    const newDirection = direction === 'horizontal' ? 'vertical' : 'horizontal';
    setDirection(newDirection)
  };

  const toggleLabelPlacement = () => {
    const newlabelPlacement = labelPlacement === 'horizontal' ? 'vertical' : 'horizontal';
    setLabelPlacement(newlabelPlacement)
  };


  return (
    <div className="p-pt-3">
      <Steps current={current}
        secondaryCurrent={secondaryCurrent}
        labelPlacement={labelPlacement}
        direction={direction}>

        <Steps.Step title="First"
          description="Large description can be placed here..."
          upperTitle="Upper title 1"
          onClick={() => handleStepClick(0)}
        />
        <Steps.Step title="Sub1"
          onClick={() => handleStepClick(0.01)}
          subStep
        />
        <Steps.Step title="Sub2"
          onClick={() => handleStepClick(0.02)}
          subStep
        />
        <Steps.Step title="Second"
          description="Description"
          upperTitle="Upper title 2"
          onClick={() => handleStepClick(1)}
        />
        <Steps.Step title="Third"
          description="Description"
          upperTitle="Upper title 3"
          onClick={() => handleStepClick(2)}
        />
        <Steps.Step title="Sub3"
          onClick={() => handleStepClick(2.01)}
          subStep
        />
        <Steps.Step title="Fourth"
          description="Description"
          onClick={() => handleStepClick(3)}
        />
        <Steps.Step title="Sub4"
          onClick={() => handleStepClick(3.01)}
          subStep
        />
      </Steps>


      <br /><br /><br />


      Horizontal label: <input
        name="horizontalLabel"
        type="checkbox"
        checked={labelPlacement === "horizontal"}
        onChange={toggleLabelPlacement} />

      <br /><br />

      Vertical direction: <input
        name="VerticalDirection"
        type="checkbox"
        checked={direction === "vertical"}
        onChange={toggleDirection} />

      <br /><br />

      Secondary click: <input
        name="secondaryCurrent"
        type="checkbox"
        checked={secondaryCurrentActive}
        onChange={toggleSecondaryCurrent} />


    </div>
  );
}

export default StepsDemo;
