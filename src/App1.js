// import {Map, MapMarker} from "react-kakao-maps-sdk"

// export default function App(){
// 	return (
// 		<Map center={{ lat: 33.5563, lng: 126.79581 }}
// 			 style={{ width: "100%", height: "360px" }}
// 		>
// 			<MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
// 				<div style={{color:"#000"}}>
// 					Hello World!
// 				</div>
// 			</MapMarker>
// 		</Map>
// 	)
// }

// import { Map } from "react-kakao-maps-sdk"
// import useKakaoLoader from "./component/useKakaoLoader"

// export default function App() {
//   useKakaoLoader()

//   return (
//     <Map // 지도를 표시할 Container
//       id="map"
//       center={{
//         // 지도의 중심좌표
//         lat: 33.450701,
//         lng: 126.570667,
//       }}
//       style={{
//         // 지도의 크기
//         width: "100%",
//         height: "350px",
//       }}
//       level={3} // 지도의 확대 레벨
//     />
//   )
// }

// import {useRef, useState} from "react"
// import {Map} from "react-kakao-maps-sdk"
// import useKakaoLoader from "./component/useKakaoLoader"

// export default function ChangeLevel() {
// 	useKakaoLoader()

// 	const mapRef = useRef(null)
// 	const defaultLevel = 3
// 	const [level, setLevel] = useState(defaultLevel)

// 	function handleLevel(adjustLevel){
// 		const map = mapRef.current

// 	    if(!map){
// 			return
// 		}

// 		if(adjustLevel === "increase"){
// 			map.setLevel(map.getLevel() + 1)
// 			setLevel(map.getLevel())
// 			// setLevel(level + 1)
// 		}else{
// 			map.setLevel(map.getLevel() - 1)
//       		setLevel(map.getLevel())
// 			// setLevel(level - 1)
// 		}
// 	}

// 	return(
// 		<>
// 			<Map center={{
// 					lat: 33.450701,
// 					lng: 126.570667,
// 				}}
// 				style={{
// 					width: "100%",
// 					height: "350px",
// 				}}
// 				level={defaultLevel}
// 				zoomable={true}
// 				ref={mapRef}
//     		>
// 				<p>
// 					<button onClick={() => handleLevel("increase")}>
// 						zoom-out
// 					</button>

// 					{" "}
					
// 					<button onClick={() => handleLevel("decrease")}>
// 						zoom-in
// 					</button>
					
// 					{" "}
					
// 					<span>current level is {level}</span>
// 				</p>
// 			</Map>
// 		</>
// 	)
// }


import React from 'react';
import {Player} from 'video-react';
import "../src/App.css"

export default App => {
  return (
	<div id="testId" className="testClass">
		<Player>
			<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
		</Player>
	</div>
  );
};

///////////////////////////////////

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
            console.log("geo")
            console.log(status)
            console.log(data)

            if(status === "ZERO_RESULT"){
                place.keywordSearch(search, (data, status, _pagination) => {
                    console.log("place")
                    console.log(status)
                    console.log(data)
                    if (status === kakao.maps.services.Status.OK) {
                        const bounds = new kakao.maps.LatLngBounds()
                        let markers = data.filter((datum) => datum.category_group_code.length === 0
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
                        )
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

                        console.log(markers)

                        setMarkers(markers)
        
                        map.setBounds(bounds)
                    }
                })
            }
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds()
                let markers = data.filter((datum) => {
                    bounds.extend(new kakao.maps.LatLng(datum.y, datum.x))

                    if(datum.category_group_code === ""){
                        return(
                            {
                                position: {
                                lat: datum.y,
                                lng: datum.x,
                                },
                                content: datum.place_name,
                            }
                        )
                        
                        markers.push({
                            position: {
                            lat: datum.y,
                            lng: datum.x,
                            },
                            content: datum.place_name,
                        })
                    }
                })

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

//////////////////////////////////////////////

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>키워드로 장소검색하기</title>
    
</head>
<body>
<div id="map" style="width:100%;height:350px;"></div>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 사용하세요&libraries=services"></script>
<script>
// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 

// 키워드로 장소를 검색합니다
ps.keywordSearch('이태원 맛집', placesSearchCB); 

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}
</script>
</body>
</html>