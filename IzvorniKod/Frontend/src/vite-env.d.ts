/// <reference types="vite/client" />

// Define custom types for your environment variables
interface ImportMetaEnv {
    VITE_BACKEND_API_URL: string;
    VITE_API_KEY: string;
    // Add more environment variables as needed
  }
  
interface ImportMeta {
  readonly env: ImportMetaEnv;
}