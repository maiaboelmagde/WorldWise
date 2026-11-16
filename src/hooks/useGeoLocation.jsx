import { useState } from 'react';
export function useGeolocation() {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPosition = (callback) =>{
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const newPos = { lat: pos?.coords.latitude, lng: pos?.coords.longitude }
                setPosition(newPos);
                setLoading(false);
                callback?.(newPos);
            },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    }
    return { position, error, loading, getPosition };
}
