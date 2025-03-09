// enforces IFileNode typing on content-data.json.
declare module "*.json" {
  const value: import("../../app/core/models/file-node.model").IFileNode[];
  export default value;
}
