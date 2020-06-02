import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchBox({ handleSearch, SearchTerm }) {
  return (
    <div>
      <Search
        value={SearchTerm}
        onChange={e => handleSearch(e.target.value)}
        placeholder='Search'
      />
    </div>
  )
}

export default SearchBox
