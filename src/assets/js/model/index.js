import gltf from './gltf'
import json from './json'
import collada from './collada'
import obj from './obj'
import ply from './ply'
import stl from './stl'

const utils = {
  keySync: (obj1, obj2) => {
    const result = Object.keys(obj2).forEach(key => {
      if (obj1[key]) {
        obj2[key] = obj1[key]
      }
    })
    return result
  },
  getSuffix: function (fileName) {
    const suffixIndex = fileName.lastIndexOf('.')
    const length = fileName.length
    const suffix = fileName.substring(suffixIndex + 1, length)
    return suffix
  }
}
function install (opt) {
  const modelOpt = {
    color: 0x777777,
    shadow: true,
    crossOrigin: 'anonymous'
  }
  if (opt) {
    utils.keySync(opt, modelOpt)
  }
  window.modelOpt = modelOpt
}
install()

function loader (source) {
  return new Promise((resolve, reject) => {
    if (!source || !source.url) {
      reject(new Error('请输入模型地址'))
    }
    const type = utils.getSuffix(source.url)
    switch (type) {
      case 'glb':
      case 'gltf':
        gltf.loader(source.url).then(model => {
          resolve(model)
        })
        break
      case 'json':
        json.loader(source.url).then(model => {
          resolve(model)
        })
        break
      case 'dae':
        collada.loader(source.url).then(model => {
          resolve(model)
        })
        break
      case 'obj':
        obj.loader(source.url, source.mtl).then(model => {
          resolve(model)
        })
        break
      case 'stl':
        stl.loader(source.url).then(model => {
          resolve(model)
        })
        break
      case 'ply':
        ply.loader(source.url).then(model => {
          resolve(model)
        })
        break
      default:
        reject(new Error('模型导入失败，请检查地址是否正确'))
    }
  })
}
const modelLoader = {
  loader
}
export {
  modelLoader
}
