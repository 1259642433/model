import gltf from './gltf'
import json from './json'
import collada from './collada'
import obj from './obj'
import ply from './ply'
import stl from './stl'
const modelLoader = {
  gltf,
  json,
  collada,
  obj,
  stl,
  ply
}
function install (opt) {
  const modelOpt = opt ? JSON.parse(JSON.stringify(opt)) : {}

  modelOpt.color = modelOpt.color ? modelOpt.color : 0x767676
  modelOpt.shadow = true

  window.modelOpt = modelOpt
}
install()

const utils = {
  lightPositionComputed: (angel) => {

  }
}
export {
  modelLoader,
  utils
}
