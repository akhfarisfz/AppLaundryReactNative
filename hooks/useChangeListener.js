
const useChangeListener = () => {

    const onChangeText = (field, value, getter, setter) => {
      setter({...getter, [field]: value})
    }
  
    const onChangeNumber = (field, value, getter, setter) => {
      let num = Math.abs(Number(value));
      num = num ? num : 0
      setter({...getter, [field]: num.toString()})
    }
  
    return {onChangeText, onChangeNumber}
  }
  
  export default useChangeListener;