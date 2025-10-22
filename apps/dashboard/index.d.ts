/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
declare module "*.svg" {
	const content: any;
	export const ReactComponent: any;
	export default content;
}
