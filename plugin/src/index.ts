// biome-ignore assist/source/organizeImports: <>
import {
	type CreateNodesContextV2,
	type CreateNodesV2,
	createNodesFromFiles,
} from "@nx/devkit";
import { dirname } from "node:path";

export type BiomeOptions = {
	path: string;
};

export const createNodesV2: CreateNodesV2<BiomeOptions> = [
	"**/package.json",
	async (configFiles, options, context) => {
		return await createNodesFromFiles(
			(configFile, options, context) =>
				createNodesInternal(configFile, options, context),
			configFiles,
			options,
			context,
		);
	},
];

async function createNodesInternal(
	configFilePath: string,
	_options: BiomeOptions | undefined,
	_context: CreateNodesContextV2,
) {
	const root = dirname(configFilePath);

	// Project configuration to be merged into the rest of the Nx configuration
	return {
		projects: {
			[root]: {
				targets: {
					"biome-lint": {
						// Nx target syntax to execute a command. More on {projectRoot} below
						command: "npx @biomejs/biome lint {projectRoot}",
						cache: true,
						inputs: [
							"default",
							"^default",
							"{workspaceRoot}/biome.json",
							{
								externalDependencies: ["@biomejs/biome"],
							},
						],
					},
					"biome:check": {
						command: "npx @biomejs/biome check {projectRoot}",
						cache: true,
						inputs: [
							"default",
							"^default",
							"{workspaceRoot}/biome.json",
							{
								externalDependencies: ["@biomejs/biome"],
							},
						],
					},
					"biome:format": {
						command: "npx @biomejs/biome format --write {projectRoot}",
						cache: true,
						inputs: [
							"default",
							"^default",
							"{workspaceRoot}/biome.json",
							{
								externalDependencies: ["@biomejs/biome"],
							},
						],
					},
				},
			},
		},
	};
}
