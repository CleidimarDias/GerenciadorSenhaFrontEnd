export async function tocarBip(): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio("/fart.mp3");
    audio.play();
    audio.onended = () => resolve();
    audio.onerror = () => resolve(); // continua mesmo se der erro
  });
}
