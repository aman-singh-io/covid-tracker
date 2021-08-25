import React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import './Map.css'
import numeral from 'numeral'

import { mapHandler } from './utils'

function ChangeView({ center, zoom }) {
  const map = useMap()
  map.flyTo(center, zoom)
  map.closePopup()
  return null
}

function Map({ center, zoom, countries, casesType }) {
  console.log('render map')
  console.log(casesType)

  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {mapHandler(countries, casesType)}
      </MapContainer>
    </div>
  )
}

export default Map
