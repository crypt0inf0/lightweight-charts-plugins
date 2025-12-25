// lightweight-charts-line-tools-elliott-wave/src/index.ts

/**
 * Main entry point for the Elliott Wave plugin.
 * Registers both ElliottImpulse (12345) and ElliottCorrection (ABC) tools.
 */

import { ILineToolsPlugin } from 'lightweight-charts-line-tools-core';
import { LineToolElliottImpulse } from './model/LineToolElliottImpulse';
import { LineToolElliottCorrection } from './model/LineToolElliottCorrection';

const ELLIOTT_IMPULSE_NAME = 'ElliottImpulse';
const ELLIOTT_CORRECTION_NAME = 'ElliottCorrection';

/**
 * Registers the Elliott Wave tools with the provided Core Plugin instance.
 *
 * @param corePlugin - The instance of the Core Line Tools Plugin.
 * @returns void
 *
 * @example
 * ```ts
 * registerElliottWavePlugin(corePlugin);
 * ```
 */
export function registerElliottWavePlugin<HorzScaleItem>(
    corePlugin: ILineToolsPlugin & { registerLineTool: <H>(type: string, toolClass: new (...args: any[]) => any) => void }
): void {
    // Register Elliott Impulse Wave (12345)
    corePlugin.registerLineTool(ELLIOTT_IMPULSE_NAME, LineToolElliottImpulse);
    console.log(`Registered Line Tool: ${ELLIOTT_IMPULSE_NAME}`);

    // Register Elliott Correction Wave (ABC)
    corePlugin.registerLineTool(ELLIOTT_CORRECTION_NAME, LineToolElliottCorrection);
    console.log(`Registered Line Tool: ${ELLIOTT_CORRECTION_NAME}`);
}

// Export classes for direct use
export { LineToolElliottImpulse, LineToolElliottCorrection };

// Export the registration function as default
export default registerElliottWavePlugin;
