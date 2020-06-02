import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;





function RadioBox({ handleFilters, priceList }) {

  const [Value, setValue] = useState(0);

  const renderRadioBox = () => {
    return priceList.map(price => (
      <Radio key={price._id} value={`${price._id}`}>{price.name}</Radio>
    ))
  }
  
  const handleChange = e => {
    setValue(e.target.value)
    handleFilters(e.target.value)
  }

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Filter By Price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  )
}

export default RadioBox
