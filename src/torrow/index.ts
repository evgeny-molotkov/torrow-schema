import { strings } from "@angular-devkit/core";
import { apply, mergeWith, Rule, SchematicContext, Tree, url, chain, MergeStrategy, move, forEach, FileEntry, template } from "@angular-devkit/schematics";
import { parseName } from "@schematics/angular/utility/parse-name";
import { getWorkspace, buildDefaultPath } from "@schematics/angular/utility/workspace";

export function ttForm(options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const project = workspace.projects.get(options.project);
    if (options.path === undefined && project) {
      options.path = buildDefaultPath(project);
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const sourceTemplate = url("./files");
    const sourceParametrizeTemplate = apply(sourceTemplate, [
      template({
        ...options,
        ...strings,
      }),
      move(parsedPath.path),
      // fix for https://github.com/angular/angular-cli/issues/11337
      forEach((fileEntry: FileEntry) => {
        if (tree.exists(fileEntry.path)) {
          tree.overwrite(fileEntry.path, fileEntry.content);
        }
        return fileEntry;
      }),
    ]);

    return chain([mergeWith(sourceParametrizeTemplate, MergeStrategy.Overwrite)]);
  };
}
