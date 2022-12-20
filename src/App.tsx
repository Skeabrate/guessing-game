import { useEffect, useState } from 'react'

type TTile = { id: number; value: number; isPicked: boolean }

function App() {
  const [playBoard, setPlayBoard] = useState<TTile[]>([
    {
      id: 0,
      value: 0,
      isPicked: false,
    },
    {
      id: 1,
      value: 0,
      isPicked: false,
    },
    {
      id: 2,
      value: 1,
      isPicked: false,
    },
    {
      id: 3,
      value: 1,
      isPicked: false,
    },
    {
      id: 4,
      value: 2,
      isPicked: false,
    },
    {
      id: 5,
      value: 2,
      isPicked: false,
    },
    {
      id: 6,
      value: 3,
      isPicked: false,
    },
    {
      id: 7,
      value: 3,
      isPicked: false,
    },
    {
      id: 8,
      value: 4,
      isPicked: false,
    },
    {
      id: 9,
      value: 4,
      isPicked: false,
    },
    {
      id: 10,
      value: 5,
      isPicked: false,
    },
    {
      id: 11,
      value: 5,
      isPicked: false,
    },
  ])

  const [pickedTile, setPickedTile] = useState<{ first: TTile | null; second: TTile | null }>({
    first: null,
    second: null,
  })

  const changeTileVisibility = (tile: TTile) =>
    setPlayBoard((state) =>
      state.map((t) => {
        if (t.id === tile.id) {
          t.isPicked = true
        }
        return t
      }),
    )

  const handlePickedTile = (tile: TTile) => {
    if (!pickedTile.first) {
      setPickedTile({
        first: tile,
        second: null,
      })

      changeTileVisibility(tile)
    } else if (pickedTile.first && !pickedTile.second) {
      setPickedTile((pickedFirstTile) => ({
        ...pickedFirstTile,
        second: tile,
      }))

      changeTileVisibility(tile)
    }
  }

  const resetPlayBoard = () => {
    setPlayBoard((state) =>
      state
        .map((t) => {
          if (t.isPicked) t.isPicked = false
          return t
        })
        .sort(() => Math.random() - 0.5),
    )
  }

  useEffect(() => {
    if (pickedTile.first && pickedTile.second) {
      if (pickedTile.first.value !== pickedTile.second.value) {
        setTimeout(() => {
          setPlayBoard((state) =>
            state.map((t) => {
              if (t === pickedTile.first || t === pickedTile.second) {
                t.isPicked = false
              }
              return t
            }),
          )

          setPickedTile({
            first: null,
            second: null,
          })
        }, 1000)
      } else {
        setPickedTile({
          first: null,
          second: null,
        })
      }
    }
  }, [pickedTile])

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full bg-slate-800 p-6 text-white'>
      <h1 className='mb-6 text-3xl font-bold'>Guessing game!</h1>

      <div className='mb-6 grid w-72	grid-cols-4 gap-3'>
        {playBoard.map((tile) => (
          <button
            key={tile.id}
            className={`${
              tile.isPicked ? 'bg-slate-400' : 'bg-slate-500'
            } flex justify-center items-center aspect-square rounded  hover:bg-slate-400 transition-all`}
            onClick={() => handlePickedTile(tile)}
            disabled={tile.isPicked}
          >
            <span className={`${tile.isPicked ? 'visible' : 'hidden'}`}>{tile.value}</span>
          </button>
        ))}
      </div>

      <button
        onClick={resetPlayBoard}
        className='py-3 px-5 rounded bg-red-500 hover:bg-red-400 transition-all font-bold tracking-wider'
      >
        RESET
      </button>
    </div>
  )
}

export default App
