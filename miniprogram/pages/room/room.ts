Page({
  onLoad(query){
    if(query.scene){
      const scene = decodeURIComponent(query.scene)
      console.log(scene);
    }
  },
})