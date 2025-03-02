export {}; // Para que TypeScript lo considere un módulo

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}