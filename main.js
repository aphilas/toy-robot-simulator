const tbl = {
  w: 5,
  h: 5
}

const place = (r) => {
  const robo = {...r}
  return robo
}

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

const left = (r) => {
  const robo = {...r}

  let pos = dirs.indexOf(robo.f) - 1; pos = pos < 0 ? (pos % 4) + 4: pos
  robo.f = dirs[pos]

  return robo
}

const right = (r) => {
  const robo = {...r}

  robo.f = dirs[(dirs.indexOf(robo.f) + 1) % 4]

  return robo
}

// usage: validate(place)({x: 0, y: 0, f: 'N'})
const validate = (fn) => ({x, y, f} = {}) => {
  let {w: xs, h: ys} = tbl; xs -= 1; ys -= 1 // XSize, YSize - upper bounds

  // ensure first command is place()
  if (( x === undefined || y === undefined || f === undefined ) && fn.name !== 'place') {
    const f = fn.name
    console.log(`I can't find a robot to ${(f === 'left' || f === 'left') ? `turn ${f}` : `${f}`}. Have you tried place(), or passing it in?`) 
    return 
  }

  if (fn.name === 'place') {
    // catch f errors from place()
    if (!dirs.includes(f)) {
      console.log(`Strange direction ... huh!. Try 'N', 'E', 'S', or 'W'`)
      return { x, y, f } // original bot
    }
  }

  ;({x, y, f} = fn({x, y, f}))

  // validate move(), place() coordinates
  if ( x < 0 || x > xs || y < 0 || y > ys ) {
    console.log('Robot will fall off the table!')
  } else {
    return {x, y, f}
  }
} 

const report = ({ x, y, f } = {}) => {
  console.log(`The robot is at position (${ x }, ${ y }), facing ${ f }`)
}

let robot = validate(place)({x: 0, y: 3, f: 'N'})
report(robot)