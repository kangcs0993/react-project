import {useState, useEffect} from "react"
import {Map, MapMarker} from "react-kakao-maps-sdk"
import PhotoContainer from "./PhotoContainer"
const {kakao} = window

export default function MapContainer({
    search
}){
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()

    const place = new kakao.maps.services.Places()
    const geo = new kakao.maps.services.Geocoder()

    function closePhotos(){
        setInfo()
    }

    async function searchGeo(){
        geo.addressSearch(search, (data, status) => {
            if(status === "ZERO_RESULT"){
                place.keywordSearch(search, (data, status, _pagination) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const bounds = new kakao.maps.LatLngBounds()
                        let markers = [{
                            position: {
                            lat: data[0].y,
                            lng: data[0].x,
                            },
                            content: data[0].place_name,
                        }]

                        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x))

                        setMarkers(markers)
        
                        map.setBounds(bounds)
                    }
                })
            }
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds()
                let markers = [{
                    position: {
                    lat: data[0].y,
                    lng: data[0].x,
                    },
                    content: data[0].place_name,
                }]

                bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x))

                setMarkers(markers)

                map.setBounds(bounds)
            }
        })
    }
    useEffect(() => {
        if (!map){
            return
        }
        
        searchGeo()
        setInfo()
    }, [search])

    return (
        <>
            <Map center={{lat: 37.566826, lng: 126.9786567}}
                level={5}
                onCreate={setMap}
            >
                {markers.map((marker) => (
                    <MapMarker key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                            position={marker.position}
                            onClick={() => setInfo(marker)}
                    >
                    </MapMarker>
                ))}
            </Map>
        
            {info && (
                <div id="photoContainer">
                    <img id="xSign" src="/img/x-sign.png" onClick={closePhotos}></img>
                    <PhotoContainer search={search}></PhotoContainer>
                </div>
            )}
        </>

        
    )
}