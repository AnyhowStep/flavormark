import * as glob from "glob";
import * as _ from "underscore";
import * as fs from "fs";
import * as path from "path";

function copy (src : string, dst : string) {
    return new Promise((resolve, reject) => {
        const inStream = fs.createReadStream(src);
        inStream.on("error", (err) => {
            reject(err);
        });
        const outStream = fs.createWriteStream(dst);
        outStream.on("error", (err) => {
            reject(err);
        });
        outStream.on("close", () => {
            resolve();
        });
        inStream.pipe(outStream);
    })
}

function hackyUniqueFilename () : Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(new Date().getTime().toString());
        }, 100);
    });
}

function matchSingleLineImportOrExportStatement (row : string) {
    const match = /^\s*((import|export).+)\"([a-zA-Z0-9\-\_\/\.]+)\"\s*\;?\s*$/.exec(row);
    if (match == null) {
        return undefined;
    }
    const importOrExportText  = match[1];
    const matchedRelativePath = match[3];
    if (matchedRelativePath.indexOf("/") < 0) {
        return undefined;
    }

    const matchedRelativeDir  = path.dirname(matchedRelativePath);
    const matchedRelativeName = path.basename(matchedRelativePath);
    return {
        fullText : match[0],
        importOrExportText  : importOrExportText,
        relativePath : matchedRelativePath,
        relativeDir  : matchedRelativeDir,
        relativeName : matchedRelativeName,
    };
}

function readCode (f : string) {
    return fs.readFileSync(f).toString().split(/\n|\r\n?/);
}

async function moveRefactorFile (backupFolder : string, src : string, dst : string) {
    console.log(`== Moving '${src}' to '${dst}' and refactoring`);
    const code = readCode(src);
    for (let i=0; i<code.length; ++i) {
        const row = code[i];
        const match = matchSingleLineImportOrExportStatement(row);
        if (match == undefined) {
            continue;
        }
        const matchedActualDir  = path.normalize(path.dirname(src) + "/" + match.relativeDir);
        const transformedPath = "./" + path.normalize(
            path.relative(path.dirname(dst), matchedActualDir) +
            "/" +
            match.relativeName
        ).replace(/^\.\/\//, "");

        const transformedMatch = `${match.importOrExportText}"${transformedPath}";`;
        code[i] = transformedMatch;

        console.log(`Old: ${match.fullText}`);
        console.log(`New: ${transformedMatch}`);
    }
    const prefix = await hackyUniqueFilename();
    const backupPath = `${backupFolder}/${prefix}-${path.basename(src)}`;
    console.log(`Backing up ${src} to ${backupPath}`);
    await copy(src, backupPath);
    console.log(`Writing to ${dst}`);
    fs.writeFileSync(dst, code.join("\n"));
    console.log(`Deleting ${src}`);
    fs.unlinkSync(src);
}
async function updateReference (f : string, backupFolder : string, src : string, dst : string) {
    const code = readCode(f);
    let changed = false;
    for (let i=0; i<code.length; ++i) {
        const row = code[i];
        const match = matchSingleLineImportOrExportStatement(row);
        if (match == undefined) {
            continue;
        }
        const matchedActualDir  = path.normalize(path.dirname(f) + "/" + match.relativeDir);
        const matchedActualPath = path.normalize(matchedActualDir + "/" + match.relativeName);
        if (matchedActualPath != path.normalize(src.replace(/\.[^\.]+$/, ""))) {
            continue;
        }
        const transformedPath = "./" + path.normalize(path.relative(path.dirname(f), dst)
            .replace(/\.[^\.]+$/, ""))
            .replace(/^\.\/\//, "");
        const transformedMatch = `${match.importOrExportText}"${transformedPath}";`;
        code[i] = transformedMatch;
        changed = true;

        console.log(`Old: ${match.fullText}`);
        console.log(`New: ${transformedMatch}`)
    }
    if (changed) {
        const prefix = await hackyUniqueFilename();
        const backupPath = `${backupFolder}/${prefix}-${path.basename(f)}`;
        console.log(`Backing up ${f} to ${backupPath}`);
        await copy(f, backupPath);
        console.log(`Overwriting ${f}`);
        fs.writeFileSync(f, code.join("\n"));
    }
}
async function moveRefactorProject (projectGlobs : string[], backupFolder : string, src : string, dst : string) {
    let files : string[] = [];
    for (let projectGlob of projectGlobs) {
        files.push(...glob.sync(projectGlob));
    }
    files = _.unique(files);

    console.log(files, src, dst);

    if (files.indexOf(src) < 0) {
        console.log(`Could not find source ${src}`);
        return;
    }
    if (files.indexOf(dst) >= 0) {
        console.log(`Destination already exists ${dst}`);
        return;
    }

    await moveRefactorFile(backupFolder, src, dst);

    files.splice(files.indexOf(src), 1);
    for (let f of files) {
        await updateReference(f, backupFolder, src, dst);
    }
}
async function moveRefactorProjectMulti (
    projectGlobs : string[],
    backupFolder : string,
    srcGlob : string,
    dstDirectory : string
) {
    const files = glob.sync(srcGlob);
    for (let f of files) {
        const src = f;
        const dst = dstDirectory + "/" + path.basename(src);
        await moveRefactorProject(
            projectGlobs,
            backupFolder,
            src,
            dst
        );
    }
}
const projectGlobs = [
    "./src/main/**/*.ts",
    "./src/test/**/*.ts",
];
const backupFolder = "./src/dev/backup";
moveRefactorProject(
    projectGlobs,
    backupFolder,
    "./src/main/refactored-inline/EntityParser.ts",
    "./src/main/commonmark/inline/parser/EntityParser.ts"
);

/*moveRefactorProjectMulti(
    projectGlobs,
    backupFolder,
    "./src/main/commonmark/render/html/inline/*.ts",
    "./src/main/commonmark/inline/render/html"
);
*/
