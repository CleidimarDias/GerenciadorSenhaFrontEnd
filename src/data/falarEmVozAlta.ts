export async function falarEmVozAlta(texto: string): Promise<void> {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve(); // em caso de erro, continua

    window.speechSynthesis.speak(utterance);
  });
}
