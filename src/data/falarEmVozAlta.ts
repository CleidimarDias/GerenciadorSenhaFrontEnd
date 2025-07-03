export function falarEmVozAlta(texto: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR";
  utterance.rate = 1;
  utterance.pitch = 1;

  synth.speak(utterance);
}
