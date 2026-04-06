// adhan-audio-service.ts

// This service manages the playback of Adhan audio for prayer times.

class AdhanAudioService {
    private audio: HTMLAudioElement;
    private isPlaying: boolean;

    constructor(audioSrc: string) {
        this.audio = new Audio(audioSrc);
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.audio.play();
            this.isPlaying = true;
            this.audio.onended = () => this.isPlaying = false;
        }
    }

    pause() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        }
    }

    stop() {
        this.pause();
        this.audio.currentTime = 0;
    }

    setAudioSource(audioSrc: string) {
        this.audio.src = audioSrc;
    }
}

export default AdhanAudioService;
