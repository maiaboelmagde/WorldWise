import { useSearchParams } from "react-router-dom";

export default function useURLPosition() {
    const [ searchParams ] = useSearchParams();
    const lat = searchParams?.get('lat');
    const lng = searchParams?.get('lng');
    console.log('useURLPosition called with lat:', lat, 'lng:', lng);
    return [parseFloat(lat), parseFloat(lng)];
}
