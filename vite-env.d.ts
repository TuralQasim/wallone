/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    // Добавьте другие переменные среды, которые вы используете
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob: (pattern: string) => Record<string, () => Promise<any>>;
}
