import { ApiRoutes, BACKEND_URL, COWORKING_DEFAULT_IMAGE } from '../consts';

export default function getImageURL(imageName?: string) {
  if (!imageName) {
    return `img/${COWORKING_DEFAULT_IMAGE}`;
  }
  return `${BACKEND_URL}${ApiRoutes.FetchImage}${imageName}`;
}
