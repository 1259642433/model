<template>
<div class="model">
    <!-- <model-obj src="models/水草_01.FBX"></model-obj> -->
    <div id="model" class="model-container"></div>
    <div class="controls">
      <!--后续-->
      <!-- <div class="light">
        <p>灯光控制</p>
        <div class="main">
          <div id="bar" class="bar">
            <div id="bar-btn" class="bar-btn"></div>
            <div class="bar-border"></div>
            <div id="bar-circle" class="bar-circle"></div>
          </div>
          <div class="angel"></div>
        </div>
      </div> -->
    </div>
</div>
</template>

<script>
import * as THREE from 'three'
import { modelLoader } from '@a/js/model'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Model',
  props: {
    option: {
      type: Object
    }
  },
  data () {
    return {
      mixers: [], // 动画数据
      skeleton: '', // 骨骼
      angel: '' // 灯光角度
    }
  },
  mounted () {
    if (this.judge()) {
      this.init()
    }
  },
  methods: {
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
      // const cubeMap = new THREE.CubeTextureLoader()
      //   .load([
      //     require('@a/img/skybox/rt.png'),
      //     require('@a/img/skybox/lf.png'),
      //     require('@a/img/skybox/up.png'),
      //     require('@a/img/skybox/dn.png'),
      //     require('@a/img/skybox/bk.png'),
      //     require('@a/img/skybox/ft.png')
      //   ])
      // this.scene.background = cubeMap

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
      const planeGeometry = new THREE.CircleGeometry(5, 40, 3, 2 * Math.PI)
      const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -0.5 * Math.PI
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
      const ambiLight = new THREE.AmbientLight(0xffffff, 0.85)
      this.scene.add(ambiLight)
      const direLight = new THREE.DirectionalLight(0xffffff, 0.4)
      direLight.position.set(0, 100, -100)
      direLight.castShadow = true
      this.scene.add(direLight)
      // // topDireLight
      // const topDireLight = new THREE.DirectionalLight(0xffffff, 0.1)
      // topDireLight.position.set(-50, 0, 0)
      // this.scene.add(topDireLight)
      // // bottomDireLight
      // const bottomDireLight = new THREE.DirectionalLight(0xffffff, 0.1)
      // topDireLight.position.set(50, 0, 0)
      // this.scene.add(bottomDireLight)
    },
    loader () {
      modelLoader.loader(this.option.source).then(model => {
        this.scene.add(model)
      })
    },
    initControls (el) {
      this.controls = new OrbitControls(this.camera, el)
      this.controls.rotateSpeed = 0.3
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.03
      this.controls.enablePan = false
    },
    render () {
      this.controls.update()
      this.camera.lookAt(0, 0, 0)
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    init () {
      const container = document.getElementById('model')
      this.initScene()
      this.initCamera(container)
      this.initRenderer(container)
      this.initPlane()
      this.initlight()
      this.loader()
      this.initControls(container)
      this.render()
      // this.addMouseEvent() //灯光鼠标事件
      // window.addEventListener('resize', function () {
      //   this.onWindowResize(container)
      // }.bind(this))
    },
    judge () {
      if (!this.option) {
        console.log('请传入option')
      } else if (!this.option.source) {
        console.log('请传入模型源')
      } else if (!this.option.source.url) {
        console.log('请传入模型源地址')
      } else {
        return true
      }
    }
    // initContent () {
    //   const r = 20
    //   var geometry = new THREE.SphereBufferGeometry(r, 90, 90)
    //   //   var texture = new THREE.Texture()
    //   //   texture.minFilter = THREE.LinearFilter
    //   //   texture.format = THREE.RGBFormat
    //   //   var material = new THREE.MeshLambertMaterial({ // 创建材料
    //   //     color: 0xF4F4F4,
    //   //     wireframe: true
    //   //   })
    //   var material = new THREE.MeshLambertMaterial({ envMap: this.scene.background })
    //   this.mesh = new THREE.Mesh(geometry, material)
    //   this.mesh.position.set(0, r, 0)
    //   this.mesh.castShadow = true
    //   this.scene.add(this.mesh)
    // },
    // addMouseEvent () {
    //   const lightBar = document.getElementById('bar')
    //   const lightBarBtn = document.getElementById('bar-btn')
    //   const lightBarCircle = document.getElementById('bar-circle')
    //   // 原点坐标
    //   const origin = getOrigin(lightBarCircle)
    //   let preAxis = {
    //     x: 0,
    //     y: 0
    //   }
    //   let afterAxis = {
    //     x: 0,
    //     y: 0
    //   }
    //   let angle = 0
    //   let deg = 0
    //   lightBarBtn.addEventListener('mousedown', mouseDown)
    //   document.addEventListener('mousemove', mousemove)
    //   document.addEventListener('mouseup', mouseUp)
    //   // lightBar.style.transform = 'rotate(180deg)'
    //   // lightBarCircle.addEventListener('mousedown', (e) => {
    //   //   console.log(e)
    //   // })
    //   let down
    //   console.log(origin)
    //   function mouseDown (e) {
    //     down = true
    //     preAxis = getRelativeAxis([e.clientX, e.clientY], origin)
    //   }
    //   function mousemove (e) {
    //     if (down) {
    //       afterAxis = getRelativeAxis([e.clientX, e.clientY], origin)
    //       deg = getDeg(getAngle(origin, preAxis, afterAxis))
    //       console.log(deg)
    //       lightBar.style.transform = `rotate(${deg}deg)`
    //       preAxis.x = e.clientX
    //       preAxis.y = e.clientY
    //     }
    //   }
    //   function mouseUp () {
    //     down = false
    //   }
    //   function getOrigin (el) {
    //     const origin = [0, 0]
    //     do {
    //       origin.x += el.offsetLeft
    //       origin.y += el.offsetTop
    //       el = el.offsetParent
    //     } while (el.offsetParent)
    //     return origin
    //   }
    //   function getRelativeAxis (Axis, referenceAxis) {
    //     Axis.x -= referenceAxis.x
    //     Axis.y -= referenceAxis.y
    //     Axis.y = -Axis.y
    //     return Axis
    //   }
    //   function getDeg (l) {
    //     angle = l * 180 / Math.PI
    //     return angle
    //   }
    //   function getAngle (cen, first, second) {
    //     // cen  : 中心点 [0,0]
    //     // first : 开始点 [1,3]
    //     // second : 结束位置 [3,4]
    //     var fcx = first.x - cen.x
    //     var fcy = cen.y - first.y
    //     var scx = second.x - cen.x
    //     var scy = cen.y - second.y
    //     var c = Math.sqrt(fcx * fcx + fcy * fcy) * Math.sqrt(scx * scx + scy * scy)
    //     if (c === 0) return -1
    //     var angle = Math.acos((fcx * scx + fcy * scy) / c)
    //     // 第一象限
    //     if (cen.x - second.x < 0 && cen.y - second.y < 0) {
    //       return angle
    //       // 第二象限
    //     } else if (cen.x - second.x < 0 && cen.y - second.y > 0) {
    //       return angle
    //       // 第三象限
    //     } else if (cen.x - second.x > 0 && cen.y - second.y < 0) {
    //       return 2 * Math.PI - angle
    //       // 第四象限
    //     } else if (cen.x - second.x > 0 && cen.y - second.y > 0) {
    //       return 2 * Math.PI - angle
    //     }
    //   }
    // },

  }
}
</script>

<style lang="scss" scoped>
.model{
  position: relative;
  font-size: 16px;
    height: 100%;
    background: rgba(75,75,75,1);
    &-container{
        height: 100%;
    }
    // .controls{
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   padding: 15px 20px;
    //   background: rgba(0,0,0,0.2);
    //   .light{
    //     p{
    //       text-align: center;
    //       font-size: 1em;
    //       color: white;
    //       font-weight: 300;
    //     }
    //     .main{
    //         width: 10em;
    //         height: 10em;
    //       .bar{
    //         position: relative;
    //         width: 100%;
    //         height: 100%;
    //         border: 0.25em solid white;
    //         border-radius: 50%;
    //         &-circle{
    //           position: absolute;
    //           left: 50%;
    //           top: 50%;
    //           transform: translate(-50%,-50%);
    //           width: 30%;
    //           height: 30%;
    //           background: rgb(138, 138, 138);
    //           border-radius: 50%;
    //         }
    //         &-btn{
    //           position: absolute;
    //           top: 0;
    //           left: 50%;
    //           width: 1.5em;
    //           height: 1.5em;
    //           transform: translate(-50%,-50%);
    //           background: rgb(216, 216, 216);
    //           border-radius: 50%;
    //           &:hover{
    //             cursor: pointer;
    //             background: rgb(172, 172, 172);
    //           }
    //           &:active{
    //             cursor: pointer;
    //             background: rgb(114, 114, 114);
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
}
</style>
