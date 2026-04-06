// AdhanAudioService.ts

class AdhanAudioService {
    private static instance: AdhanAudioService;
    private audio: HTMLAudioElement;
    private isAutoplayAllowed: boolean;

    private constructor() {
        this.audio = new Audio();
        this.isAutoplayAllowed = false;
    }

    public static getInstance(): AdhanAudioService {
        if (!AdhanAudioService.instance) {
            AdhanAudioService.instance = new AdhanAudioService();
        }
        return AdhanAudioService.instance;
    }

    public setAutoplayPermission(allowed: boolean): void {
        this.isAutoplayAllowed = allowed;
    }

    public playAdhan(url: string): void {
        if (!this.isAutoplayAllowed) {
            console.error('Autoplay is restricted.');
            return;
        }
        try {
            this.audio.src = url;
            this.audio.load();
            this.audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } catch (error) {
            console.error('Error during playback:', error);
        }
    }

    public stopAdhan(): void {
        try {
            if (!this.audio.paused) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    }

    public isPlaying(): boolean {
        return !this.audio.paused;
    }
}

export default AdhanAudioService;
