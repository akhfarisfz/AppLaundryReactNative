const useArray = () => {

    const isDuplicated = (list, value, field) => {
      console.log("itemExist", list)
      const itemExist = list.find((obj) => obj[field] === value[field]);
      if (!itemExist) {
        return false;
      } else if (itemExist[field]) {
        return true;
      }
    }
  
    const removeItem = (list, value, field, setter) => {
      const temps = list.filter((obj) => obj[field] !== value[field]);
      setter(temps)
    }
  
    return { isDuplicated, removeItem }
  }
  
  export default useArray;