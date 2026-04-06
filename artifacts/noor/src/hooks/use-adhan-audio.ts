import { useEffect, useRef, useState } from 'react';

const AdhanAudioConfig = {
    FAJR: 'path/to/fajr.mp3',
    REGULAR: 'path/to/regular.mp3',
};

const AdhanAudioHook = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [adhanType, setAdhanType] = useState<string>('REGULAR');

    // Load saved settings from localStorage
    useEffect(() => {
        const savedVolume = localStorage.getItem('adhanVolume');
        const savedMuted = localStorage.getItem('adhanMuted');

        if (savedVolume) setVolume(Number(savedVolume));
        if (savedMuted !== null) setIsMuted(JSON.parse(savedMuted));

        // Initialize Audio Element
        audioRef.current = new Audio(AdhanAudioConfig[adhanType]);
        audioRef.current.volume = volume;
        audioRef.current.muted = isMuted;

        // Cleanup on unmount
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, [adhanType]);

    const playAdhan = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset playback position
            audioRef.current.play().catch(err => {
                console.error('Audio playback failed:', err);
                // Optionally handle autoplay restriction here
            });
        }
    };

    useEffect(() => {
        // Setup event listener for volume changes
        audioRef.current && (audioRef.current.volume = isMuted ? 0 : volume);
        localStorage.setItem('adhanVolume', volume.toString());
        localStorage.setItem('adhanMuted', JSON.stringify(isMuted));
    }, [volume, isMuted]);

    return {
        playAdhan,
        setVolume,
        setIsMuted,
        setAdhanType,
        isMuted,
        volume,
    };
};

export default AdhanAudioHook;
