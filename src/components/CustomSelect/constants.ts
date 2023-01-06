/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export const defaultSelectStyle = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'white',
    backgroundColor: '#03a9f1 ',
    fontSize: 18,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multiValue: (provided: any, _state: any) => ({
    ...provided,
    color: '#fff',
    fontSize: 18,
  }),
}
