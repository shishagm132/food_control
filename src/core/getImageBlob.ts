export default function getImageBlob(): Promise<Blob | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Ограничить выбор только изображениями

    input.addEventListener("change", () => {
      if (input.files && input.files.length === 1) {
        const file = input.files[0];
        const fileReader = new FileReader();

        fileReader.onload = () => {
          const imageBlob = fileReader.result;
          if (imageBlob instanceof ArrayBuffer) {
            resolve(new Blob([imageBlob], { type: file.type }));
          } else {
            resolve(null);
          }
        };

        fileReader.onabort = fileReader.onerror = () => {
          resolve(null);
        };

        fileReader.readAsArrayBuffer(file);
      } else {
        resolve(null); // Если файл не выбран, вернуть null
      }
    });

    input.click();
  });
}
