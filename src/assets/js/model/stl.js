import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const stlLoader = new STLLoader()

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
      stlLoader.load(stlPath, object => {
        const material = new THREE.MeshStandardMaterial({ color: modelOpt.color })
        const mesh = new THREE.Mesh(object, material)
        mesh.rotation.x = -Math.PI / 2
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
