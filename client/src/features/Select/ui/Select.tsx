const Select = ({ state, setState, valueOne, valueTwo, textOne, textTwo }:any) => {
  return (
    <select
      name="name"
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      <option value={valueOne} key={valueOne}>
        {textOne}
      </option>
      <option value={valueTwo} key={valueTwo}>
        {textTwo}
      </option>
    </select>
  )
}

export default Select
