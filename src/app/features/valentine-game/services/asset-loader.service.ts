import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AssetLoaderService {
    // Base URL for assets.
    private readonly basePath = 'assets/';

    get(filename: string): string {
        return `${this.basePath}${filename}`;
    }

    getCharacterImage(name: string, mood: string): string {
        // e.g., assets/snehal_soft.png
        // If mood is 'idle', we might just have snehal_idle.png
        // The file naming convention in assets seems to be name_mood.png
        return `${this.basePath}${name.toLowerCase()}_${mood.toLowerCase()}.png`;
    }

    getBackgroundImage(name: string): string {
        // e.g., assets/bg_start.png
        return `${this.basePath}bg_${name.toLowerCase()}.jpg`;
    }
}
