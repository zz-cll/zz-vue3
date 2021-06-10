let permiss = [1,2,3]
// if(sessionStorage.getItem("permissList")){
//   permiss = sessionStorage.getItem("permissList").split(',')
// } 

function checkArray(key) {
    // permiss = sessionStorage.getItem("permissList").split(',')
    let arr = permiss
    let index = arr.indexOf(key)
    if (index > -1) {
      return true // 有权限
    } else {
      return false // 无权限
    }
  }
   
export const permission = {
  mounted: function (el, binding) {
    let permission = binding.value
    if (permission) {
      let hasPermission =checkArray(permission)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  },
}