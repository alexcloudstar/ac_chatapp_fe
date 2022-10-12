import React, { useState } from 'react'
import './search.css'

type SearchTypeProps = {
  query: string
  icon?: JSX.Element
}

export const Search = ({ query, icon }: SearchTypeProps) => {
  const [value, setValue] = useState(query)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const onSearch = () => console.log('Search for', value)

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search..."
        value={value || query}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        className="search-input"
      />
      {icon && (
        <button className="icon-container" onClick={onSearch}>
          <span className="icon">{icon}</span>
        </button>
      )}
    </div>
  )
}
