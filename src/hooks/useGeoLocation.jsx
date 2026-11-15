import { useState } from 'react';
export function useGeolocation() {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPosition = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition(pos);
                setLoading(false);
            },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );
    }

    return { position: { lat: position?.coords.latitude, lng: position?.coords.longitude }, error, loading, getPosition };
}
