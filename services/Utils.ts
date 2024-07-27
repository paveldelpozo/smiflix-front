export const generateUniqueHash = (): string => {
    const now = Date.now();
    const hexString = now.toString(16);
    const random = Math.floor(Math.random() * 0xFFFF).toString(16);
    return `${hexString}-${random}`;
}
