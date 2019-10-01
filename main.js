const tbl = {
  w: 5,
  h: 5
}

const place = ({x, y, f}) => ({ x, y, f })

const moveMap = new Map([
  ['N', {coord: 'y', diff: 1}],
  ['E', {coord: 'x', diff: 1}],
  ['S', {coord: 'y', diff: -1}],
  ['W', {coord: 'x', diff: -1}],
])

const move = (r) => {
  const robo = {...r}

  const {coord, diff} = moveMap.get(robo.f)
  robo[coord] += diff

  return robo
}

const dirs = ['N', 'E', 'S', 'W']

const left = r => {
  const robo = {...r}

  let pos = dirs.indexOf(robo.f) - 1; pos = pos < 0 ? (pos % 4) + 4: pos
  robo.f = dirs[pos]

  return robo
}

const right = r => {
  const robo = {...r}

  robo.f = dirs[(dirs.indexOf(robo.f) + 1) % 4]

  return robo
}

// usage: validate(place({x: 0, y: 0, f: 'N'}))
validate = ({x, y, f}) => {
  let {w: xs, h: ys} = tbl; xs -= 1; ys -= 1 // XSize, YSize - upper bounds

  // catch f errors from place()
  if (!dirs.includes(f)) throw new Error(`Strange direction ... huh!. Try 'N', 'E', 'S', or 'W'`)

  if (
    x < 0 || 
    x > xs ||
    y < 0 ||
    y > ys ) {
      throw new Error('Robot will fall off the table!')
  } else {
    return {x, y, f}
  }
} 

const robot = validate(place({x: 0, y: 4, f: 'N'}))
