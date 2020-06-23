<template>
    <div class="model">
      <model :option="opt"></model>
    </div>
</template>

<script>
import model from '../components/Model'
export default {
  components: {
    model
  },
  data () {
    return {
      opt: {
        // 目前支持格式,在url中输入模型地址就行了
        // gltf,
        // json,
        // collada,
        // obj, 此格式如有材质，需带上mtl材质
        // stl,
        // ply
        source: {
          url: 'models/fbx/1.fbx'
          // mtl: 'https://www.wangwentehappy.tk/assets/models/obj/1.mtl'
        }
      }
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.model{
  height: 100%;
}
</style>
