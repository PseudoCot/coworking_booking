export default function getFileLocalURL(file: File) {
  return window.URL.createObjectURL(new Blob([file]));
}
