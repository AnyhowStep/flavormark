import * as e from "export-generator";

const flavorGlobs : string[] = [];

function generateFlavorExport (folder : string, name : string) {
    e.generateExport({
        sourceGlobs : [`${__dirname}/../main/${folder}/block/**/*.ts`],
        outputDirectory : `${__dirname}/../main/generated/export/${folder}`,
        outputFileName  : `Block.ts`,
    });
    e.generateExport({
        sourceGlobs : [`${__dirname}/../main/${folder}/inline/**/*.ts`],
        outputDirectory : `${__dirname}/../main/generated/export/${folder}`,
        outputFileName  : `Inline.ts`,
    });
    e.generateMixedExport({
        exportSourceGlobs : [`${__dirname}/../main/${folder}/*.ts`],
        namespacedExportSourceGlobs : [`${__dirname}/../main/generated/export/${folder}/*.ts`],
        outputDirectory : `${__dirname}/../main/generated/export/${folder}`,
        outputFileName  : `${name}.ts`,
    });
    flavorGlobs.push(`${__dirname}/../main/generated/export/${folder}/${name}.ts`);
}

generateFlavorExport("commonmark", "CommonMark");
generateFlavorExport("flavormark", "FlavorMark");
generateFlavorExport("gfm", "Gfm");
generateFlavorExport("misc", "Misc");
e.generateNamespacedExport({
    sourceGlobs : flavorGlobs,
    outputDirectory : `${__dirname}/../main/generated/export`,
    outputFileName  : `flavor.ts`,
});

e.generateMixedExport({
    exportSourceGlobs : [
        `${__dirname}/../main/*.ts`,
        `${__dirname}/../main/render/**/*.ts`,
        `${__dirname}/../main/generated/export/flavor.ts`,
    ],
    namespacedExportSourceGlobs : [],
    outputDirectory : `${__dirname}/../main`,
    outputFileName  : `index.ts`,
});
