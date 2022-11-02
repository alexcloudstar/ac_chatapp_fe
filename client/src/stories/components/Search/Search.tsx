import React, { useState } from 'react'

import { Button } from '../Button'
import './search.css'

type SearchTypeProps = {
  query: string
  icon?: JSX.Element
  classes?: string
  placeholder?: string
}

export const Search = ({
  query,
  icon,
  placeholder = 'Search...',
  classes,
}: SearchTypeProps) => {
  const [value, setValue] = useState(query)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const onSearch = () => console.log('Search for', value)

  return (
    <div className={`search_container ${classes ? classes : ''}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value || query}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="search_search-input"
        />
        {icon && <Button icon={icon} onClick={onSearch} />}
      </div>
    </div>
  )
}
