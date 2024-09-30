import * as fs from "fs";
import path from "path";

export function copyBaseAddonFiles(source: string, target: string) {
    if (!fs.existsSync(source)) return;

    const items = fs.readdirSync(source);
    items.forEach(item => {
        const currentSource = path.join(source, item);
        const currentTarget = path.join(target, item);

        if (fs.lstatSync(currentSource).isDirectory()) {

            if (!fs.existsSync(currentTarget)) {
                fs.mkdirSync(currentTarget, { recursive: true });
            }
            copyBaseAddonFiles(currentSource, currentTarget);
        } else {
            fs.copyFileSync(currentSource, currentTarget);
        }
    });
}