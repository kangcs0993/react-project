import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"
import API_KEY from "../config";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: API_KEY,
    libraries: ["clusterer", "drawing", "services"],
  })
}