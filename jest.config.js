module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testRegex: '(/__tests__/.*).test.(ts|js)x?$',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1'
	},
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	}
};
