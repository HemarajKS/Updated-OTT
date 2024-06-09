export class ErrorLogger {
  logError(moduleName: string, errorMessage: any, timestamp: string): void {
    console.error(
      `[${timestamp}] Error in module ${moduleName}: ${errorMessage}`
    );
  }
}
