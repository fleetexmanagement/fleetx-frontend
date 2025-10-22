const nxPreset = require("@nx/jest/preset").default;

module.exports = {
	...nxPreset,
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.[jt]s?(x)",
		"<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)",
		"<rootDir>/src/**/__tests__/**/*.test.[jt]s?(x)",
		"<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)",
	],
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/dist/",
		"<rootDir>/build/",
		"<rootDir>/.next/",
		"<rootDir>/coverage/",
	],
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.stories.{js,jsx,ts,tsx}",
		"!src/**/*.test.{js,jsx,ts,tsx}",
		"!src/**/*.spec.{js,jsx,ts,tsx}",
		"!src/**/__tests__/**",
		"!src/**/__mocks__/**",
		"!src/**/node_modules/**",
	],
	coverageReporters: ["text", "lcov", "html"],
	coverageDirectory: "coverage",
	setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
	moduleNameMapping: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@frontend/(.*)$": "<rootDir>/src/$1",
	},
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
		"^.+\\.(css|scss|sass)$": "jest-transform-stub",
		"^.+\\.(png|jpg|jpeg|gif|svg)$": "jest-transform-stub",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testEnvironment: "jsdom",
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
};
