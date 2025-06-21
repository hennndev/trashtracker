import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Setup ikon default Leaflet
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

const DepokMap = ({setMapLocation}) => {
  const [position, setPosition] = useState([-6.4025, 106.7942]) // default: Depok
  const [search, setSearch] = useState('')

  const handleSearch = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
    )
    const data = await res.json()
    if (data.length > 0) {
      const lat = parseFloat(data[0].lat)
      const lon = parseFloat(data[0].lon)
      setPosition([lat, lon])
      setMapLocation({
        longitude: lon,
        latitude: lat
      })
    } else {
      alert('Lokasi tidak ditemukan!')
    }
  }
  return (
    <>
      <div className='mb-5'>
        <input
          type="text"
          placeholder='Cari lokasi temuan kamu disini'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border border-gray-300 rounded-md p-4 w-full' />
        <button onClick={handleSearch} className="bg-green-800 mt-3 cursor-pointer text-white px-4 py-2 rounded">
          Cari dan tambahkan info lokasi ke form
        </button>
      </div>
      <MapContainer center={position} zoom={13} style={{ height: '700px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position} icon={pinIcon}>
          <Popup>Lokasi ditemukan!</Popup>
        </Marker>
        <ChangeMapView coords={position} />
      </MapContainer>
    </>
  );
};

export default DepokMap;
