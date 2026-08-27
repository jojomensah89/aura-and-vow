/// <reference types="vite/client" />

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'gifshot' {
  const gifshot: any;
  export default gifshot;
}

declare module '*.webp' {
  const content: string;
  export default content;
}
