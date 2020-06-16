import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const gltfLoader = new GLTFLoader()

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
      gltfLoader.load(stlPath, gltf => {
        const model = gltf.scene
        model.traverse(function (object) {
          if (object.isMesh && modelOpt.shadow) {
            object.castShadow = true
            object.receiveShadow = true
          }
        })
        resolve(model)
      }, onProgress, onError)
    })
    return wait
  }
}
