// /lightweight-charts-line-tools-date-and-price-range/src/index.ts

import { LineToolDateAndPriceRange } from './model/LineToolDateAndPriceRange';
import { ILineToolsPlugin } from 'lightweight-charts-line-tools-core';

const DATE_AND_PRICE_RANGE_NAME = 'DateAndPriceRange';

export function registerDateAndPriceRangePlugin<HorzScaleItem>(corePlugin: ILineToolsPlugin & { registerLineTool: <H>(type: string, toolClass: new (...args: any[]) => any) => void }): void {
    corePlugin.registerLineTool(DATE_AND_PRICE_RANGE_NAME, LineToolDateAndPriceRange);
    console.log(`Registered Line Tool: ${DATE_AND_PRICE_RANGE_NAME}`);
}

export { LineToolDateAndPriceRange };
export { DateAndPriceRangeOptionDefaults } from './model/LineToolDateAndPriceRange';
export default registerDateAndPriceRangePlugin;
