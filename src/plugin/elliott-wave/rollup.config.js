import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const packageName = 'lightweight-charts-line-tools-elliott-wave';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: `dist/${packageName}.js`,
            format: 'esm',
            sourcemap: true,
        },
        {
            file: `dist/${packageName}.umd.js`,
            format: 'umd',
            name: 'ElliottWavePlugin',
            globals: {
                'lightweight-charts': 'LightweightCharts',
                'lightweight-charts-line-tools-core': 'LineToolsCore',
            },
            sourcemap: true,
        },
    ],
    external: ['lightweight-charts', 'lightweight-charts-line-tools-core'],
    plugins: [
        resolve(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: './dist/types',
        }),
        terser(),
    ],
};
