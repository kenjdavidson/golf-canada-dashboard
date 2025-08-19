import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jest-fixed-jsdom',
  roots: ['<rootDir>/app'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        verbatimModuleSyntax: false
      }
    }]
  },
  setupFilesAfterEnv: ['<rootDir>/app/test/setup.ts'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.ts', '.tsx']
}

export default config;
