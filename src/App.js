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

import {useRef, useState} from "react"
import {Map} from "react-kakao-maps-sdk"
import useKakaoLoader from "./component/useKakaoLoader"

export default function ChangeLevel() {
	useKakaoLoader()

	const mapRef = useRef(null)
	const defaultLevel = 3
	const [level, setLevel] = useState(defaultLevel)

	function handleLevel(adjustLevel){
		const map = mapRef.current

	    if(!map){
			return
		}

		if(adjustLevel === "increase"){
			map.setLevel(map.getLevel() + 1)
			setLevel(map.getLevel())
			// setLevel(level + 1)
		}else{
			map.setLevel(map.getLevel() - 1)
      		setLevel(map.getLevel())
			// setLevel(level - 1)
		}
	}

	return(
		<>
			<Map center={{
					lat: 33.450701,
					lng: 126.570667,
				}}
				style={{
					width: "100%",
					height: "350px",
				}}
				level={defaultLevel}
				zoomable={true}
				ref={mapRef}
    		>
				<p>
					<button onClick={() => handleLevel("increase")}>
						zoom-out
					</button>

					{" "}
					
					<button onClick={() => handleLevel("decrease")}>
						zoom-in
					</button>
					
					{" "}
					
					<span>current level is {level}</span>
				</p>
			</Map>
		</>
	)
}

