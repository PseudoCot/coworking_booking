import { ApiRoutes, BACKEND_URL } from '../consts';

export default function getImageURL(imageName: string) {
  return `${BACKEND_URL}${ApiRoutes.FetchImage}${imageName}`;
}
