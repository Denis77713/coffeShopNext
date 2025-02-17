export function inputSecurity(value: any) {
  const arr = value.split("")
  const symbols = ["<", ">", "&", "'", "\n", "\r"]
  let result = arr
  symbols.forEach((inner) => {
    let filter = false
    filter = arr.find((item: any) => item === inner)
    if (filter) result = arr.filter((item: any) => item !== filter)
  })
  return result.join("")
}
