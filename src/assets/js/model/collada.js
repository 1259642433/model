import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'

const colladaLoader = new ColladaLoader()

export default {
  loader: (colladaPath) => {
    const onProgress = xhr => {
      var percentComplete = xhr.loaded / xhr.total * 100
      console.log(`${Math.round(percentComplete, 2)}% 已经加载`)
    }
    const onError = xhr => {
      console.log(xhr, 'model载入出错')
    }
    const wait = new Promise((resolve, reject) => {
      colladaLoader.load(colladaPath, object => {
        const mesh = object.scene.children[0].clone()
        mesh.rotation.x = 0

        if (modelOpt.shadow) {
          mesh.castShadow = true
          mesh.receiveShadow = true
        }

        resolve(mesh)
      }, onProgress, onError)
    })
    return wait
  }
}
