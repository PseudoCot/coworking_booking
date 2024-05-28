import { ApiRoutes, BACKEND_URL } from '../consts';

export default function getImageURL(imageName: string) {
  if (process.env.NODE_ENV === 'development') {
    return `img/${imageName}`;
  }
  return `${BACKEND_URL}${ApiRoutes.FetchImage}${imageName}`;
}
