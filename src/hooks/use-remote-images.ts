import { useState } from 'react';
import { ApiRoutes } from '../consts';
import { api } from '../store';

async function getRemoteImage(imageName: string): Promise<File> {
  const { data } = await api.get<ArrayBuffer>(`${ApiRoutes.FetchImage}${imageName}`, {
    responseType: 'arraybuffer'
  });
  return new File([new Blob([data])], imageName);
}

export default function useRemoteImages(imageNames: string[]) {
  const [images, setImages] = useState<File[]>([]);

  for (const imageName of imageNames) {
    new Promise<File>((resolve) => {
      resolve(getRemoteImage(imageName));
    }).then((file) => {
      setImages([...images, file]);
    });
  }

  return [images, setImages];
}
