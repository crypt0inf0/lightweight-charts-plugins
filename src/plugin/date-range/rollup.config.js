// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const FILENAME = 'lightweight-charts-line-tools-date-range';
const GLOBAL_VAR_NAME = 'LightweightChartsLineToolsDateRange';

const GLOBALS = {
    'lightweight-charts': 'LightweightCharts',
    'lightweight-charts-line-tools-core': 'LightweightChartsLineToolsCore'
};

const EXTERNAL = [
    'lightweight-charts',
    'lightweight-charts-line-tools-core'
];

export default {
    input: 'src/index.ts',
    output: [
        // ESM (Modern Bundlers like Vite/Webpack)
        {
            file: `dist/${FILENAME}.js`,
            format: 'es',
            sourcemap: true,
        },
        // UMD Development (Browser <script> tag)
        {
            file: `dist/${FILENAME}.umd.js`,
            format: 'umd',
            name: GLOBAL_VAR_NAME,
            globals: GLOBALS,
            sourcemap: true,
            exports: 'named',
        },
        // UMD Production (Minified)
        {
            file: `dist/${FILENAME}.min.js`,
            format: 'umd',
            name: GLOBAL_VAR_NAME,
            globals: GLOBALS,
            sourcemap: true,
            exports: 'named',
            plugins: [terser()]
        },
    ],
    plugins: [
        nodeResolve(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: 'dist/types',
            rootDir: 'src',
        }),
    ],
    external: EXTERNAL,
};
