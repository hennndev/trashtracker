import React from 'react'
import Layout from '../../components/admin/Layout'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pinIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // pin map icon
  iconSize: [32, 32],
  iconAnchor: [16, 32], // posisi titik bawah yang menunjukkan lokasi sebenarnya
  popupAnchor: [0, -32],
})

const ChangeMapView = ({ coords }) => {
  const map = useMap()
  map.setView(coords, 13)
  return null
}

const LocationTrashReport = ({ title, longitude, latitude }) => {
  return (
    <Layout title={title} navbarTitle="Titik Lokasi Sampah">
      <main className='p-5 mt-5'>
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '700px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[latitude, longitude]} icon={pinIcon}>
            <Popup>Lokasi ditemukan!</Popup>
          </Marker>
          <ChangeMapView coords={[latitude, longitude]} />
        </MapContainer>
      </main>
    </Layout>
  )
}

export default LocationTrashReport