module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};
