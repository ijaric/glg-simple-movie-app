import axios, { AxiosInstance } from "axios";
import { MediaDetailStore } from "./MediaDetailStore";

const { REACT_APP_SERVER } = process.env;

export class MediaDetailController {
  private apiInstance: AxiosInstance;

  constructor(private readonly mediaDetailStore: MediaDetailStore) {
    this.apiInstance = axios.create({
      baseURL: `${REACT_APP_SERVER}/api/media`,
    });
  }

  public async getMedia(media_type: string, id: string): Promise<void> {
    const response = await this.apiInstance.get(`${media_type}/${id}`);
    this.mediaDetailStore.setDocument(response.data.media);
  }
}
