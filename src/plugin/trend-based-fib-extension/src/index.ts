// /lightweight-charts-line-tools-trend-based-fib-extension/src/index.ts

/**
 * This is the main entry point for the 'lightweight-charts-line-tools-trend-based-fib-extension' plugin.
 * It exports the LineToolTrendBasedFibExtension class and a registration function for the core plugin.
 */

// Import the main LineToolTrendBasedFibExtension class
import { LineToolTrendBasedFibExtension } from './model/LineToolTrendBasedFibExtension';
import { ILineToolsPlugin } from 'lightweight-charts-line-tools-core';

// Define the name under which this specific tool will be registered
const TREND_BASED_FIB_EXTENSION_NAME = 'TrendBasedFibExtension';

/**
 * Registers the Trend-Based Fibonacci Extension tool with the provided Core Plugin instance.
 *
 * @param corePlugin - The instance of the Core Line Tools Plugin.
 * @returns void
 *
 * @example
 * ```ts
 * registerTrendBasedFibExtensionPlugin(corePlugin);
 * ```
 */
export function registerTrendBasedFibExtensionPlugin<HorzScaleItem>(corePlugin: ILineToolsPlugin & { registerLineTool: <H>(type: string, toolClass: new (...args: any[]) => any) => void }): void {

    // Register the LineToolTrendBasedFibExtension Class
    corePlugin.registerLineTool(TREND_BASED_FIB_EXTENSION_NAME, LineToolTrendBasedFibExtension);

    console.log(`Registered Line Tool: ${TREND_BASED_FIB_EXTENSION_NAME}`);
}

// Export the class itself for direct use/type referencing if necessary
export {
    LineToolTrendBasedFibExtension,
};

// Re-export types (use 'export type' for TypeScript interfaces)
export type { TrendBasedFibExtensionLevel } from './model/LineToolTrendBasedFibExtension';
export { TrendBasedFibExtensionOptionDefaults } from './model/LineToolTrendBasedFibExtension';

// Export the registration function as the primary way to use the plugin
export default registerTrendBasedFibExtensionPlugin;
