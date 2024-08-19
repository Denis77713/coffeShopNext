export function handleclick(item) {
  const jsonData = localStorage.getItem("like")
  const arr = JSON.parse(jsonData)
  if (arr !== null) {
    const filterArr = arr.filter((i) => i.id === item.id)
    if (filterArr.length === 0) {
      const newArr = item
      newArr.like = true
      arr.push(newArr)
      localStorage.setItem("like", JSON.stringify(arr))
      // console.log(arr)
    } else {
      filterArr[0].like = !filterArr[0].like
      arr.splice(filterArr[0].id - 1, 1, filterArr[0])
      // console.log(arr)
      localStorage.setItem("like", JSON.stringify(arr))
    }
  } else {
    const newItem = item
    newItem.like = true
    localStorage.setItem("like", JSON.stringify([newItem]))
  }
}
