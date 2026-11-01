// Next 16 static export nests segment-prefetch files (about/__next.about/__PAGE__.txt)
// while the client router requests them flat (about/__next.about.__PAGE__.txt).
// Write a flat copy next to each nested file so prefetching works on any static host.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let n = 0;

function files(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory() || name === "_next") continue;
    if (name.startsWith("__next.")) {
      for (const f of files(p)) {
        copyFileSync(f, join(dir, name + "." + relative(p, f).split(sep).join(".")));
        n++;
      }
    } else walk(p);
  }
}

walk(OUT);
console.log(`flatten-prefetch: wrote ${n} files`);
