<template>
  <div class="obj">

  </div>
</template>

<script>
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
export default {
  name: 'ModelObj',
  data () {
    return {

    }
  },
  created () {
    this.loaderModel()
  },
  methods: {
    loaderModel () {
      const onLoad = (object) => {
        if (this.process) {
          this.process(object)
        }
        console.log(this.object)
      }
      const onProgress = function (xhr) {
        if (xhr.lengthComputable) {
          var percentComplete = xhr.loaded / xhr.total * 100
          console.log(Math.round(percentComplete, 2) + '% 已经加载')
        }
      }
      const onError = function (xhr) {}
      var mtlLoader = new MTLLoader()
      var objLoader = new OBJLoader2()
      mtlLoader.setPath('models/export/')
      objLoader.setPath('models/obj/')
      objLoader.load('1.obj', function (object) {
        console.log(object)
        object.position.y = 0
        object.rotation.y = 0
        object.scale.set(5, 5, 5)
        object.castShadow = true
        for (const i in object.children) {
          object.children[i].castShadow = true
          object.children[i].receiveShadow = true
        }
        this.scene.add(object)
      }.bind(this), onProgress, onError)
      // mtlLoader.load('显微镜.mtl', function (materials) {
      //   materials.preload()
      //   objLoader.setMaterials(materials)
      // })

      // fbx
      //   var tga_loader = new TGALoader()
      //   var material = new THREE.MeshPhongMaterial({
      //     map: tga_loader.load('./models/mooncake/Diffuse.tga'),
      //     normalMap: tga_loader.load('./models/mooncake/Normal.tga'),
      //     specularMap: tga_loader.load('./models/mooncake/S.tga'),
      //     bumpMap: tga_loader.load('./models/mooncake/Bump.tga')
      //   })
      // var manager = new THREE.LoadingManager()
      // var loader = new FBXLoader(manager)
      // loader.load('/models/水草_01.FBX', function (object) {
      //   console.log(object)
      //   object.scale.multiplyScalar(0.1)
      //   object.mixer = new THREE.AnimationMixer(object)// 获取对象的动画
      //   this.mixers.push(object.mixer)
      //   if (object.animations[0]) {
      //     var action = object.mixer.clipAction(object.animations[0])
      //     action.play()
      //     object.traverse(function (child) {
      //       if (child.isMesh) {
      //         child.castShadow = true
      //         child.receiveShadow = true
      //       }
      //     })
      //     object.scale.set(0.5, 0.5, 0.5)
      //     // 骨骼显示助手
      //     this.skeleton = new THREE.SkeletonHelper(object)
      //     this.scene.add(object, this.skeleton)
      //   }
      // }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
