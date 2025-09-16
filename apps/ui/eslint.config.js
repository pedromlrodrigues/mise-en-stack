import { defineConfig, globalIgnores } from 'eslint/config';

import { baseConfig } from '../../tools/eslint-base.config.js';

export default defineConfig([globalIgnores(['dist']), ...baseConfig]);
