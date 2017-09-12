var config = {
  fps: 500,
  die_color: 'gray',
  live_color: 'red',

  // 0 - 100 , 值越大, 生成的细胞越多
  threshold: 50
}

var debugConfig = [
  {
    name: 'fps',
    show: '演变速度',
    type: 'range',
    value: 500,
    min: 10,
    max: 1000
  },
  {
    name: 'threshold',
    show: '生成细胞阈值',
    type: 'range',
    value: 50,
    min: 0,
    max: 100
  }
]