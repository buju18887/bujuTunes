import { useState, useEffect } from "react"
import useAuth from "../components/UseAuth"
import Player from "../components/Player"
import TrackSearchResult from "../components/TrackSearchResult"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: "b7a585475c4847eb87196c1ae984624e",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("https://bujutunes-server.onrender.com/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <div className="flex-column py-2 w-1/2 mx-auto my-5">
      <input
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='input'
      />
      <div className="flex-grow my-2 overflow-y-auto">
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center whitespace-pre text-gray-300" >
            {lyrics}
          </div>
        )}
      </div>
      <div className="rounded-lg overflow-hidden">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  )
}
