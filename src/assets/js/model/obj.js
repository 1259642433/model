import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

const mtlLoader = new MTLLoader()
const objLoader = new OBJLoader()

export default {
  loader: (objPath, mtlPath, shadow = true) => {
    const onProgress = xhr => {
      var percentComplete = xhr.loaded / xhr.total * 100
      console.log(`${Math.round(percentComplete, 2)}% 已经加载`)
    }
    const onError = xhr => {
      console.log(xhr, 'model载入出错')
    }

    const wait = new Promise((resolve, reject) => {
      if (mtlPath) {
        mtlLoader.load(mtlPath, materials => {
          materials.preload()
          objLoader
            .setMaterials(materials)
            .load(objPath, object => {
              if (shadow) {
                for (const i in object.children) {
                  object.children[i].castShadow = true
                  object.children[i].receiveShadow = true
                }
              }
              resolve(object)
            }, onProgress, onError)
        }, () => {}, onError)
      } else {
        objLoader.load(objPath, object => {
          object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshStandardMaterial({ color: modelOpt.color })
            }
          })
          if (modelOpt.shadow) {
            for (const i in object.children) {
              object.children[i].castShadow = true
              object.children[i].receiveShadow = true
            }
          }

          resolve(object)
        }, onProgress, onError)
      }
    })
    return wait
  }
}
