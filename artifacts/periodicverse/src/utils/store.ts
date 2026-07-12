export function getFavourites(): string[] {
    const stored = localStorage.getItem('periodicverse-favs');
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
}

export function toggleFavourite(symbol: string) {
    let favs = getFavourites();
    if (favs.includes(symbol)) {
        favs = favs.filter(f => f !== symbol);
    } else {
        favs.push(symbol);
    }
    localStorage.setItem('periodicverse-favs', JSON.stringify(favs));
}