import React, { useState } from 'react'

import { Button } from '../Button'

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
    <div className={`relative ${classes ? classes : ''}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value || query}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="relative w-full h-10 py-0 px-3 text-[#ffffff99]/[60%] bg-[#1f232f] placeholder:text-[#ffffff99] rounded-xl outline-none"
        />
        {icon && (
          <Button
            icon={icon}
            onClick={onSearch}
            classes="absolute top-0 right-0"
          />
        )}
      </div>
    </div>
  )
}
