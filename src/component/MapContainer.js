import {useState, useEffect} from "react"
import {Map, MapMarker} from "react-kakao-maps-sdk"
const {kakao} = window

export default function MapContainer({
    search
}){
    // const places = new kakao.maps.services.Places(search, )

    // return (
	// 	<Map center={{ lat: 40.7128, lng: 74.0060 }}
	// 		 style={{ width: "100%", height: "360px" }}
	// 	>
	// 	</Map>
	// )

    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()

    const place = new kakao.maps.services.Places()
    const geo = new kakao.maps.services.Geocoder()

    const searchGeo = function(){
        geo.addressSearch(search, (data, status) => {
            if(status === "ZERO_RESULT"){
                place.keywordSearch(search, (data, status, _pagination) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const bounds = new kakao.maps.LatLngBounds()
                        let markers = {
                            position: {
                            lat: data[0].y,
                            lng: data[0].x,
                            },
                            content: data[0].place_name,
                        }

                        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x))
                        
                        // data.filter((datum) => datum.category_group_code.length === 0
                        // {
                        //     console.log(datum.category_group_code)
                        //     console.log(datum.category_group_code.length)

                        //     if(datum.category_group_code.length === 0){
                        //         bounds.extend(new kakao.maps.LatLng(datum.y, datum.x))

                        //         return(
                        //             {
                        //                 position: {
                        //                 lat: datum.y,
                        //                 lng: datum.x,
                        //                 },
                        //                 content: datum.place_name,
                        //             }
                        //         )
                        //     }
                        // }
                        // )
                        // for (var i = 0; i < data.length; i++) {
                        //     markers.push({
                        //         position: {
                        //         lat: data[i].y,
                        //         lng: data[i].x,
                        //         },
                        //         content: data[i].place_name,
                        //     })
        
                        //     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                        // }

                        setMarkers(markers)
        
                        map.setBounds(bounds)
                    }
                })
            }
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds()
                let markers = {
                    position: {
                    lat: data[0].y,
                    lng: data[0].x,
                    },
                    content: data[0].place_name,
                }

                bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x))
                
                // data.filter((datum) => {
                //     bounds.extend(new kakao.maps.LatLng(datum.y, datum.x))

                //     if(datum.category_group_code === ""){
                //         return(
                //             {
                //                 position: {
                //                 lat: datum.y,
                //                 lng: datum.x,
                //                 },
                //                 content: datum.place_name,
                //             }
                //         )
                        
                //         markers.push({
                //             position: {
                //             lat: datum.y,
                //             lng: datum.x,
                //             },
                //             content: datum.place_name,
                //         })
                //     }
                // })

                // for (var i = 0; i < data.length; i++) {
                //     markers.push({
                //         position: {
                //         lat: data[i].y,
                //         lng: data[i].x,
                //         },
                //         content: data[i].place_name,
                //     })

                //     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                // }

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
    }, [search])

    return (
        <Map center={{lat: 37.566826, lng: 126.9786567}}
             style={{width: "100%",height: "350px"}}
             level={3}
             onCreate={setMap}
        >
            {/* {markers.map((marker) => (
                <MapMarker key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                           position={marker.position}
                           onClick={() => setInfo(marker)}
                >
                    {info &&info.content === marker.content && (
                        <div style={{color:"#000"}}>{marker.content}</div>
                    )}
                </MapMarker>
            ))} */}
        </Map>
    )
}