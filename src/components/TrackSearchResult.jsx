import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="flex m-2 items-center cursor-pointer"
      onClick={handlePlay}
    >
      <img src={track.albumUrl} className="w-16 h-16 rounded-md" />
      <div className="ml-3">
        <div className="text-gray-200">{track.title}</div>
        <div className="text-gray-500">{track.artist}</div>
      </div>
    </div>
  )
}
