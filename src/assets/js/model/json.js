import * as THREE from 'three'
const jsonLoader = new THREE.ObjectLoader()

export default {
  loader: (stlPath) => {
    const onProgress = xhr => {
      var percentComplete = xhr.loaded / xhr.total * 100
      console.log(`${Math.round(percentComplete, 2)}% 已经加载`)
    }
    const onError = xhr => {
      console.log(xhr, 'model载入出错')
    }
    const wait = new Promise((resolve, reject) => {
      jsonLoader.load(stlPath, object => {
        console.log(object)
        if (modelOpt.shadow) {
          object.castShadow = true
          object.receiveShadow = true
        }
        resolve(object)
      }, onProgress, onError)
    })
    return wait
  }
}
