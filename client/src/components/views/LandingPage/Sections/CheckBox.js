import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;



function CheckBox({ handleFilters, sizeList }) {

  const [Checked, setChecked] = useState([])

  const handleToggle = (size) => {

    const currentIndex = Checked.indexOf(size);
    const newChecked = [...Checked];
    console.log(newChecked)

    if (currentIndex === -1) {
      newChecked.push(size);
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
    handleFilters(newChecked)
  }
  
  const renderCheckboxList = () => sizeList.map((size, index) => (
    <React.Fragment key={index}>
      <Checkbox 
        onChange={() => handleToggle(size._id)}
        type="checkbox"
        checked={Checked.indexOf(size._id) === -1 ? false : true }
      />&nbsp;&nbsp;
      <span>{size.value}</span>
    </React.Fragment>
  ))

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Filter By Size" key="1">
          {renderCheckboxList()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox
