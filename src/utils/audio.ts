/**
 * Native HTML5 Audio Player for Indila - Love Story MP3
 * Handles playback, storage, and server syncing for the attached MP3.
 */

const DB_NAME = 'BetrothalAudioDB';
const STORE_NAME = 'audio_files';
const DB_VERSION = 1;

function openAudioDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveBlobToDB(key: string, blob: Blob): Promise<void> {
  try {
    const db = await openAudioDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore storage failure
  }
}

async function getBlobFromDB(key: string): Promise<Blob | null> {
  try {
    const db = await openAudioDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as Blob) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export type AudioStateListener = (isPlaying: boolean, trackName: string, hasAudio: boolean) => void;

class NativeMp3AudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private hasAudio = false;
  private trackName = 'Indila — Love Story';
  private listeners: Set<AudioStateListener> = new Set();
  private defaultSrc = '/audio/love-story.mp3';
  private currentObjectUrl: string | null = null;
  private hasUnlocked = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.checkAndRestoreAudio();
      this.setupAutoplayUnblockers();
    }
  }

  private initAudioElement() {
    if (this.audio) return;
    this.audio = new Audio(this.defaultSrc);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.hasAudio = true;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notifyListeners();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notifyListeners();
    });

    this.audio.addEventListener('canplay', () => {
      this.hasAudio = true;
      this.notifyListeners();
    });

    this.audio.addEventListener('error', () => {
      // Source might not be loaded yet
      this.isPlaying = false;
      this.notifyListeners();
    });
  }

  private async checkAndRestoreAudio() {
    // 1. First check IndexedDB cache
    try {
      const blob = await getBlobFromDB('custom_love_story_mp3');
      if (blob && this.audio) {
        if (this.currentObjectUrl) {
          URL.revokeObjectURL(this.currentObjectUrl);
        }
        this.currentObjectUrl = URL.createObjectURL(blob);
        this.audio.src = this.currentObjectUrl;
        this.trackName = 'Indila — Love Story';
        this.hasAudio = true;
        this.notifyListeners();
        this.play().catch(() => {});
        return;
      }
    } catch {
      // Continue to server check
    }

    // 2. Check if file exists on server at /public/audio/love-story.mp3 or any audio folder
    try {
      const res = await fetch('/api/audio-status');
      if (res.ok) {
        const data = await res.json();
        if (data.exists && this.audio) {
          this.audio.src = data.url || '/api/audio';
          this.hasAudio = true;
          this.trackName = 'Indila — Love Story';
          this.notifyListeners();
          this.play().catch(() => {});
          return;
        }
      }
    } catch {
      // Continue to static check
    }

    // Static hosting fallback (Vercel, Netlify, GitHub Pages, Cloudflare)
    try {
      const staticCheck = await fetch('/audio/love-story.mp3', { method: 'HEAD' });
      if (staticCheck.ok && this.audio) {
        this.audio.src = '/audio/love-story.mp3';
        this.hasAudio = true;
        this.trackName = 'Indila — Love Story';
        this.notifyListeners();
        this.play().catch(() => {});
        return;
      }
    } catch {
      // Ignore
    }

    // 3. Check custom URL in localStorage
    try {
      const customUrl = localStorage.getItem('custom_love_story_url');
      if (customUrl && this.audio) {
        this.audio.src = customUrl;
        this.hasAudio = true;
        this.trackName = 'Indila — Love Story';
        this.notifyListeners();
        this.play().catch(() => {});
        return;
      }
    } catch {
      // Ignore
    }

    // 4. Periodically check server until audio file is detected
    const interval = setInterval(async () => {
      if (this.hasAudio && this.isPlaying) {
        clearInterval(interval);
        return;
      }
      try {
        const res = await fetch('/api/audio-status');
        const data = await res.json();
        if (data.exists && this.audio) {
          this.audio.src = data.url || '/api/audio';
          this.hasAudio = true;
          this.notifyListeners();
          this.play().catch(() => {});
          clearInterval(interval);
        }
      } catch {
        // Ignore network check failure
      }
    }, 2500);

    window.addEventListener('focus', () => {
      if (!this.hasAudio) {
        this.checkAndRestoreAudio();
      }
    });
  }

  private setupAutoplayUnblockers() {
    const tryUnlock = () => {
      if (this.isPlaying) {
        cleanup();
        return;
      }

      this.play().then((started) => {
        if (started) {
          cleanup();
        }
      }).catch(() => {});
    };

    const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'scroll', 'keydown'];

    const cleanup = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, tryUnlock);
        document.removeEventListener(evt, tryUnlock);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, tryUnlock, { passive: true });
      document.addEventListener(evt, tryUnlock, { passive: true });
    });
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.trackName, this.hasAudio);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isPlaying, this.trackName, this.hasAudio));
  }

  public getTrackName(): string {
    return this.trackName;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getHasAudio(): boolean {
    return this.hasAudio;
  }

  public async play(): Promise<boolean> {
    this.initAudioElement();
    if (!this.audio || !this.audio.src) return false;

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notifyListeners();
      return true;
    } catch {
      this.isPlaying = false;
      this.notifyListeners();
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notifyListeners();
    }
  }

  public toggle(): boolean {
    if (!this.hasAudio) {
      return false;
    }
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  /**
   * Set custom audio from uploaded file:
   * 1. Plays immediately via blob URL
   * 2. Saves to IndexedDB for offline persistence
   * 3. Sends to backend /api/upload-audio to write to /public/audio/love-story.mp3
   */
  public async setAudioFromFile(file: File): Promise<boolean> {
    this.initAudioElement();
    if (!this.audio) return false;

    try {
      if (this.currentObjectUrl) {
        URL.revokeObjectURL(this.currentObjectUrl);
      }
      this.currentObjectUrl = URL.createObjectURL(file);
      this.audio.src = this.currentObjectUrl;
      this.trackName = 'Indila — Love Story';
      this.hasAudio = true;

      // Cache in IndexedDB
      await saveBlobToDB('custom_love_story_mp3', file);

      // Post to backend server endpoint to write to /public/audio/love-story.mp3
      fetch('/api/upload-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: file,
      }).catch((err) => console.log('Server audio upload note:', err));

      // Play immediately
      await this.audio.play();
      this.isPlaying = true;
      this.notifyListeners();
      return true;
    } catch (err) {
      console.error('Failed to set audio from file:', err);
      return false;
    }
  }

  /**
   * Set audio from a public URL
   */
  public async setAudioFromUrl(url: string): Promise<boolean> {
    this.initAudioElement();
    if (!this.audio) return false;

    try {
      this.audio.src = url;
      this.trackName = 'Indila — Love Story';
      this.hasAudio = true;
      localStorage.setItem('custom_love_story_url', url);

      await this.audio.play();
      this.isPlaying = true;
      this.notifyListeners();
      return true;
    } catch (err) {
      console.error('Failed to play audio from URL:', err);
      return false;
    }
  }
}

export const audioEngine = new NativeMp3AudioEngine();
