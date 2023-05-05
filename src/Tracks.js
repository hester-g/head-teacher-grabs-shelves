import React, { useEffect, useState } from 'react'
import { useTopData } from './top-data-context'
import CoverImage from './CoverImage'
import BasicList from './BasicList'
import { useAuthToken } from './auth-context'

const asMultipleTrackComponent =
  Component =>
  ({ tracks }) =>
    tracks.map((track, index) => (
      <Component
        key={index}
        src={track.album.images[0].url}
        title={track.name}
        subtitle={track.artists.map(artist => artist.name).join(', ')}
        position={index + 1}
      />
    ))

const displayModeMap = {
  CoverImage: asMultipleTrackComponent(CoverImage),
  BasicList: asMultipleTrackComponent(BasicList)
}

export function Tracks ({ style }) {
  const { tracks } = useTopData()
  const [displayMode, setDisplayMode] = useState('CoverImage')
  const [spotifyPlayer, setPlayer] = useState(undefined);
  const { token } = useAuthToken()

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      })

      player.resume().then(() => {
        console.log('Resumed!');
      });
    };
  }, []);

  if (!tracks) {
    return
  }

  const DisplayComponent =
    displayModeMap[displayMode] || displayModeMap.CoverImage

  return (
    <div style={style}>
      <DisplayComponent tracks={tracks} />
    </div>
  )
}
