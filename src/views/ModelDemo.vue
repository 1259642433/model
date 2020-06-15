<template>
<div class="model">
    <!-- <model-obj src="models/水草_01.FBX"></model-obj> -->
    <div id="model" class="model-container"></div>
</div>
</template>

<script>
import * as THREE from 'three'
import { gltf, collada, obj, ply, stl } from '@a/js/model'
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
    async init () {
      const container = document.getElementById('model')
      this.initScene()
      this.initCamera(container)
      this.initRenderer(container)
      this.initPlane()
      this.initlight()
      // this.initContent()
      obj.loader('models/obj/1.obj').then(model => {
        this.scene.add(model)
      })
      this.initControls(container)
      this.render()
      window.addEventListener('resize', function () {
        this.onWindowResize(container)
      }.bind(this))
    },
    initScene () {
      this.scene = new THREE.Scene()
      // const textureLoader = new THREE.TextureLoader()
      // const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000)
      // const skyboxMaterials = [
      //   new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/rt.png')), side: THREE.DoubleSide }),
      //   new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/lf.png')), side: THREE.DoubleSide }),
      //   new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/up.png')), side: THREE.DoubleSide }),
      //   new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/dn.png')), side: THREE.DoubleSide }),
      //   new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/bk.png')), side: THREE.DoubleSide }),
      //   new THREE.MeshBasicMaterial({ map: textureLoader.load(require('@a/img/skybox/ft.png')), side: THREE.DoubleSide })
      // ]
      // const skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterials)
      // skyboxMesh.name = 'skyboxMesh'
      // this.scene.add(skyboxMesh)
      const cubeMap = new THREE.CubeTextureLoader()
        .load([
          require('@a/img/skybox/rt.png'),
          require('@a/img/skybox/lf.png'),
          require('@a/img/skybox/up.png'),
          require('@a/img/skybox/dn.png'),
          require('@a/img/skybox/bk.png'),
          require('@a/img/skybox/ft.png')
        ])
      this.scene.background = cubeMap

      // var axes = new THREE.AxesHelper(20)
      // this.scene.add(axes)
    },
    initCamera (el) {
      this.camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 1, 1100)
      this.camera.position.set(0, 10, 10)
    },
    initRenderer (el) {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(el.offsetWidth, el.offsetHeight)
      this.renderer.setClearColor(0xffffff, 1)
      this.renderer.shadowMap.enabled = true
      el.appendChild(this.renderer.domElement)
    },
    initPlane () {
      var planeGeometry = new THREE.PlaneGeometry(500, 500)
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
      // const spotLight = new THREE.SpotLight(0xffffff, 1)
      // spotLight.position.set(0, 100, -100)
      // spotLight.angle = Math.PI / 4
      // spotLight.penumbra = 0.05 // 边缘范围，反比
      // spotLight.decay = 1 // 衰减系数，反比
      // spotLight.distance = 900 // 发光距离
      // spotLight.castShadow = true // 阴影 马赛克太多了,弃用?
      // spotLight.shadow.mapSize.width = 2560
      // spotLight.shadow.mapSize.height = 1440
      // spotLight.shadow.camera.near = 10 // 近截面
      // spotLight.shadow.camera.far = 250
      // this.scene.add(spotLight)
      const ambiLight = new THREE.AmbientLight(0xffffff, 0.75)
      this.scene.add(ambiLight)
      const direLight = new THREE.DirectionalLight(0xffffff, 0.2)
      direLight.position.set(0, 100, -100)
      direLight.castShadow = true
      this.scene.add(direLight)
      // topDireLight
      const topDireLight = new THREE.DirectionalLight(0xffffff, 0.1)
      topDireLight.position.set(-50, 0, 0)
      this.scene.add(topDireLight)
      // bottomDireLight
      const bottomDireLight = new THREE.DirectionalLight(0xffffff, 0.1)
      topDireLight.position.set(50, 0, 0)
      this.scene.add(bottomDireLight)
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
      var material = new THREE.MeshLambertMaterial({ envMap: this.scene.background })
      this.mesh = new THREE.Mesh(geometry, material)
      this.mesh.position.set(0, r, 0)
      this.mesh.castShadow = true
      this.scene.add(this.mesh)
    },

    initControls (el) {
      this.controls = new OrbitControls(this.camera, el)
      this.controls.rotateSpeed = 0.3
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.03
    },
    render () {
      this.controls.update()
      this.camera.lookAt(0, 0, 0)
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
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
