<template>
<div class="3d">
    <model-obj src="models/obj/显微镜.obj"></model-obj>
    <model-gltf src="models/gltf/1.glb"></model-gltf>
</div>
</template>

<script>
import { ModelObj, ModelGltf } from 'vue-3d-model'

export default {
  components: { ModelObj, ModelGltf },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
