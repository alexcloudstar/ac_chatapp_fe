import { FC } from 'react'

type ToggleProps = {
  isOn: boolean
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>
  showText?: boolean
}

export const Toggle: FC<ToggleProps> = ({ isOn, setIsOn, showText }) => {
  const onClick = () => setIsOn(!isOn)

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isOn}
            readOnly
          />
          <div
            onClick={onClick}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
          {showText && (
            <span className="ml-2 text-sm font-medium text-gray-900">
              {isOn ? 'ON' : 'OFF'}
            </span>
          )}
        </label>
      </div>
    </div>
  )
}
