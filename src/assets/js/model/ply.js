import * as THREE from 'three'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'

const plyLoader = new PLYLoader()

export default {
  loader: (plyPath) => {
    const onProgress = xhr => {
      var percentComplete = xhr.loaded / xhr.total * 100
      console.log(`${Math.round(percentComplete, 2)}% 已经加载`)
    }
    const onError = xhr => {
      console.log(xhr, 'model载入出错')
    }
    const wait = new Promise((resolve, reject) => {
      plyLoader.load(plyPath, object => {
        object.computeVertexNormals()
        const material = new THREE.MeshStandardMaterial()
        const mesh = new THREE.Mesh(object, material)
        mesh.rotation.x = -Math.PI / 2
        resolve(mesh)
      }, onProgress, onError)
    })
    return wait
  }
}
