// module.exports ki jagah export default use karo
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['json', 'js', 'ts', 'vue'],
  globals: {
    'import.meta': {
      env: {
        VITE_SERVICE_KEY: 'test_key',
        VITE_TEMPLATE_KEY: 'test_template',
        VITE_EMAILJS_PUBLIC_KEY: 'test_public_key'
      }
    }
  }
};