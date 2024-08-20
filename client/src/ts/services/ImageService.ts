export class ImageService {
  imageUrlMap: Map<string, string> = new Map();
  static instance = new ImageService();
  private async getHash(string: string) {
    const stringUint8 = new TextEncoder().encode(string); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest(
      "SHA-256",
      stringUint8
    ); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
  }

  private async convertToBlob(value: string | Blob) {
    if (value instanceof Blob) return value;
    const response = await fetch(value);
    const blobFromBaseStr = await response.blob();
    return blobFromBaseStr;
  }

  public async invokeUrl(value: string): Promise<string> {
    const hash = await this.getHash(value);

    const mappedUrl = this.imageUrlMap.get(hash);
    if (mappedUrl) {
      return mappedUrl;
    }

    const blobUrl = URL.createObjectURL(await this.convertToBlob(value));
    this.imageUrlMap.set(hash, blobUrl);
    return blobUrl;
  }

  private async revokeUrl(value: string) {
    const hash = await this.getHash(value);
    const objectUrl = this.imageUrlMap.get(hash);
    if (!objectUrl) return;
    URL.revokeObjectURL(objectUrl);
    this.imageUrlMap.delete(hash);
  }
}
