import * as THREE from 'three'
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const manager = new THREE.LoadingManager()
manager.addHandler(/\.tga$/i, new TGALoader())
const fbxLoader = new FBXLoader(manager)

export default {
  loader: (fbxPath) => {
    console.log(manager)
    const onProgress = xhr => {
      var percentComplete = xhr.loaded / xhr.total * 100
      console.log(`${Math.round(percentComplete, 2)}% 已经加载`)
    }
    const onError = xhr => {
      console.log(xhr, 'model载入出错')
    }
    const wait = new Promise((resolve, reject) => {
      fbxLoader.load(fbxPath, object => {
        // const mesh = object.scene.children[0].clone()
        // mesh.rotation.x = 0
        console.log(object)
        if (modelOpt.shadow) {
          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
            // if (child instanceof THREE.Mesh) {
            //   child.material = new THREE.MeshStandardMaterial({ color: modelOpt.color })
            // }
          })
        }

        resolve(object)
      }, onProgress, onError)
    })
    return wait
  }
}
