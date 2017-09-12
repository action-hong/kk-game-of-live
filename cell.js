const random = () => Math.random() * 100 < config.threshold ? 1 : 0
const style = ['gray', 'red']
const calFuncTime = function (func, callback) {
  let time = new Date().getTime()
  func()
  let costTime = new Date().getTime() - time
  callback(costTime)
}

class Cell {
  constructor(ctx, state, row, col) {
    this.state = state
    this.row = row
    this.col = col
    this.preState = null
  }

  changeState(state) {
    if (state != 1 || state != 0) {
      throw new Exception()
    }
    // 记录上一个状态, 优化绘制, 相同的话就不需要绘制了
    this.preState = this.state
    this.state = state
  }

  drawCell(w, h) {
    // 优化绘制
    if (this.state === this.preState) {
      return
    }
    this.ctx.fillStyle = style[this.state]
    this.ctx.fillRect(this.row * w, this.col * h, w - 1, h - 1)
  }
}

class CellGonup {
  constructor(row, col, ctx, w, h) {
    this.row = row
    this.col = col
    this.cells = []
    for (let i = 0; i < row; i++) {
      let cs = []
      for (let j = 0; j < col; j++) {
        cs.push(random())
      }
      this.cells.push(cs)
    }

    this.ctx = ctx
    this.canvasW = w
    this.canvasH = h
    this.w = w / col
    this.h = h / row
    this.style = ['gray', 'red']
  }

  nextRound(callback) {
    calFuncTime(() => {
      this._nextRound()
    }, callback)
  }

  draw(callback) {
    calFuncTime(() => {
      this._draw()
    }, callback)
  }

  _nextRound() {
    let nextCells = []
    for (let i = 0; i < this.row; i++) {
      let cs = []
      for (let j = 0; j < this.col; j++) {
        cs.push(this.nextState(i, j))
      }
      nextCells.push(cs)
    }
    this.cells = nextCells
  }

  /**
   * 第i行j列 下一个状态是啥
   * 活细胞(1), 周围有2个或3个活细胞则存活, 否则死掉
   * 死细胞(0), 周围如果有 3个细胞, 则活起来, 变为1
   * @param {*} i 
   * @param {*} j 
   */
  nextState(i, j) {
    let count = this.aroundLiveCells(i, j)
    // console.log(i, j, count)
    let state = this.cells[i][j]
    if (state) {
      if (count == 2 || count == 3) {
        return 1
      } else {
        return 0
      }
    } else if (count === 3) {
      return 1
    }
    return 0
  }

  aroundLiveCells(i, j) {
    //(i-1, j-1), (i-1, j), (i-1, j+1), 
    let count = 0
    let pr = this.cells[i - 1]
    let nr = this.cells[i + 1]
    let cr = this.cells[i]
    if (pr) {
      pr[j - 1] && count++
      pr[j] && count++
      pr[j + 1] && count++
    }

    if (nr) {
      nr[j - 1] && count++
      nr[j] && count++
      nr[j + 1] && count++
    }

    cr[j - 1] && count++
    cr[j + 1] && count++

    return count
  }

  _draw() {
    ctx.clearRect(0, 0, this.canvasW, this.canvasH)
    let w = this.w
    let h = this.h
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.ctx.fillStyle = this.style[this.cells[i][j]]
        this.ctx.fillRect(i * w, j * h, w - 1, h - 1)
      }
    }
  }
}