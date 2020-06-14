<template>
<div class="model">
    <!-- <model-obj src="models/水草_01.FBX"></model-obj> -->
    <div id="model" class="model-container"></div>
</div>
</template>

<script>
import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { TGALoader } from 'three/examples/jsm/loaders/TGALoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  data () {
    return {
      // scene: '',
      mixers: [], // 动画数据
      skeleton: '' // 骨骼
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const container = document.getElementById('model')
      this.initScene()
      this.initCamera(container)
      this.initRenderer(container)
      this.initPlane()
      this.initlight()
      // this.initContent()
      this.loaderModel()
      this.initControls(container)
      this.render()
      window.addEventListener('resize', function () {
        this.onWindowResize(container)
      }.bind(this))
    },
    initScene () {
      this.scene = new THREE.Scene()
      const textureLoader = new THREE.TextureLoader()
      const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000)
      const skyboxMaterials = [
        new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/rt.png')), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/lf.png')), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/up.png')), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/dn.png')), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/bk.png')), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/ft.png')), side: THREE.DoubleSide })
      ]
      const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterials)
      skyboxMesh.name = 'skyboxMesh'
      this.scene.add(skyboxMesh)
      var axes = new THREE.AxesHelper(40)
      this.scene.add(axes)
    },
    initCamera (el) {
      this.camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 1, 1100)
      this.camera.position.set(0, 50, 50)
    },
    initRenderer (el) {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(el.offsetWidth, el.offsetHeight)
      this.renderer.setClearColor(0xffffff, 1)
      this.renderer.shadowMap.enabled = true
      el.appendChild(this.renderer.domElement)
    },
    initPlane () {
      var planeGeometry = new THREE.PlaneGeometry(100, 100)
      var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })// 转换对光源有渲染的材质
      var plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 0
      plane.position.y = 0
      plane.position.x = 0
      plane.receiveShadow = true
      this.scene.add(plane)
    },
    initlight () {
      // 添加环境光与平行光
      //  SpotLight( color：颜色, intensity：强度, distance：发光距离, angle：角度, penumbra：边缘范围, decay：衰减 )
      const spotLight = new THREE.SpotLight(0xffffff, 1)
      spotLight.position.set(0, 100, -100)
      spotLight.angle = Math.PI / 4
      spotLight.penumbra = 0.05 // 边缘范围，反比
      spotLight.decay = 2 // 衰减系数，反比
      spotLight.distance = 800 // 发光距离
      spotLight.castShadow = true // 阴影
      spotLight.shadow.mapSize.width = 2560
      spotLight.shadow.mapSize.height = 1440
      spotLight.shadow.camera.near = 10 // 近截面
      spotLight.shadow.camera.far = 900
      this.scene.add(spotLight)
      const ambiLight = new THREE.AmbientLight(0x888888)
      console.log(ambiLight)
      this.scene.add(ambiLight)
    //   const direLight = new THREE.DirectionalLight(0xffffff, 1.0) // 平行光 DirectionalLight (光源颜色的RGB数值, 光源强度数值)
    //   direLight.position.set(500, 500, 500)
    //   this.scene.add(direLight)
    },
    initContent () {
      const r = 20
      var geometry = new THREE.SphereBufferGeometry(r, 90, 90)
      //   var texture = new THREE.Texture()
      //   texture.minFilter = THREE.LinearFilter
      //   texture.format = THREE.RGBFormat
      //   var material = new THREE.MeshLambertMaterial({ // 创建材料
      //     color: 0xF4F4F4,
      //     wireframe: true
      //   })
      var material = new THREE.MeshLambertMaterial({ color: 0x1adae7 })
      this.mesh = new THREE.Mesh(geometry, material)
      this.mesh.position.set(0, r, 0)
      this.mesh.castShadow = true
      this.scene.add(this.mesh)
    },
    loaderModel () {
      var mtlLoader = new MTLLoader()
      var objLoader = new OBJLoader()
      mtlLoader.setPath('models/obj/')
      objLoader.setPath('models/obj/')
      mtlLoader.load('显微镜.mtl', function (materials) {
        materials.preload()
        objLoader.setMaterials(materials)
        objLoader.load('显微镜.obj', function (object) {
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
      }.bind(this))
      var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
          var percentComplete = xhr.loaded / xhr.total * 100
          console.log(Math.round(percentComplete, 2) + '% 已经加载')
        }
      }
      var onError = function (xhr) {}
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
    },
    initControls (el) {
      this.controls = new OrbitControls(this.camera, el)
      this.controls.rotateSpeed = 0.3
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.03
    },
    render () {
      // var clock = new THREE.Clock()
      // var delta = clock.getDelta()
      this.controls.update()
      this.camera.lookAt(0, 0, 0)
      requestAnimationFrame(this.render)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="scss" scoped>
.model{
    height: 100%;
    background: rgba(75,75,75,1);
    &-container{
        height: 100%;
    }
}
</style>
