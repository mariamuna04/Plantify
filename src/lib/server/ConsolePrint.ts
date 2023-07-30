export function ConsolePrintOK(message: string) {
    console.log(`\x1b[32m-> ${new Date().toLocaleTimeString()} [ ${message} ] \x1b[0m`);
}

export function ConsolePrintError(message: string) {
    console.error(`\x1b[31m-!> ${new Date().toLocaleTimeString()} [ ${message} ] \x1b[0m`);
}

export default function ConsolePrintWarn(message: string) {
    console.warn(`\x1b[33m-~> ${new Date().toLocaleTimeString()} [ ${message} ] \x1b[0m`);
}
