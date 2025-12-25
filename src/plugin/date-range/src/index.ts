// lightweight-charts-line-tools-date-range/src/index.ts

/**
 * This is the main entry point for the 'lightweight-charts-line-tools-date-range' plugin.
 * It exports the LineToolDateRange class for registration with the core line tools plugin.
 */

import { ILineToolsPlugin } from 'lightweight-charts-line-tools-core';
import { LineToolDateRange } from './model/LineToolDateRange';

const DATE_RANGE_LINE_NAME = 'DateRange';

/**
 * Registers the Date Range tool with the provided Core Plugin instance.
 *
 * @param corePlugin - The instance of the Core Line Tools Plugin.
 * @returns void
 *
 * @example
 * ```ts
 * registerDateRangePlugin(corePlugin);
 * ```
 */
export function registerDateRangePlugin<HorzScaleItem>(corePlugin: ILineToolsPlugin & { registerLineTool: <H>(type: string, toolClass: new (...args: any[]) => any) => void }): void {

    corePlugin.registerLineTool(DATE_RANGE_LINE_NAME, LineToolDateRange);

    console.log(`Registered Line Tool: ${DATE_RANGE_LINE_NAME}`);
}

// Export the class itself for direct use/type referencing
export {
    LineToolDateRange
};

// Export the registration function as the primary way to use the plugin
export default registerDateRangePlugin;
