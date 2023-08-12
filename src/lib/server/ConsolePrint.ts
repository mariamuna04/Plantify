// Write terminal output with colors

// Ok message, write in green
export function ConsolePrintOK(message: string) {
    console.log(`\x1b[32m-> ${new Date().toLocaleTimeString()} [ ${message} ] \x1b[0m`);
}

// Error message, write in red
export function ConsolePrintError(message: string) {
    console.error(`\x1b[31m-!> ${new Date().toLocaleTimeString()} [ ${message} ] \x1b[0m`);
}

// Warning message, write in yellow
export function ConsolePrintWarn(message: string) {
    console.warn(`\x1b[33m-~> ${new Date().toLocaleTimeString()} [ ${message} ] \x1b[0m`);
}
