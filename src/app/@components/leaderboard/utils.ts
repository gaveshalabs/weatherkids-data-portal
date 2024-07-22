export function getImageUrl(imgUrl: string): string {
    if (imgUrl.startsWith('assets/avatars/Avatar_Icons/')) {
        return imgUrl;
    }

    const filename = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
    return `assets/avatars/Avatar_Icons/${filename}`;
}
