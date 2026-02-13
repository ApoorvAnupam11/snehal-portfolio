import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AssetLoaderService {
    // Base path relative to index.html (which respects base-href)
    // We use document.baseURI to construct absolute URLs for PixiJS / loaders.

    get(filename: string): string {
        // Ensure no leading slash to make it relative to base
        const relPath = `assets/${filename.replace(/^\/+/, '')}`;
        return new URL(relPath, document.baseURI).href;
    }

    getCharacterImage(name: string, mood: string): string {
        return this.get(`${name.toLowerCase()}_${mood.toLowerCase()}.png`);
    }

    getBackgroundImage(name: string): string {
        return this.get(`bg_${name.toLowerCase()}.jpg`);
    }
}
