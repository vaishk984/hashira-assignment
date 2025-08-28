import { readFileSync } from "fs";

function decodePoint(key, obj) {
    const base = parseInt(obj.base);
    const value = obj.value.trim();
    const y = parseInt(value, base); 
    const x = parseInt(key);
    return [x, y];
}

// Lagrange interpolation at x=0
function lagrangeAtZero(points) {
    let c = 0;
    for (let i = 0; i < points.length; i++) {
        const [xi, yi] = points[i];
        let L = 1;
        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;
            const [xj, _yj] = points[j];
            L *= (0 - xj) / (xi - xj);
        }
        c += yi * L;
    }
    return c;
}

function recoverSecret(data) {
    const n = parseInt(data.keys.n);
    const k = parseInt(data.keys.k);

    const pts = [];
    for (const key in data) {
        if (key === "keys") continue;
        pts.push(decodePoint(key, data[key]));
    }
    if (pts.length !== n) {
        throw new Error(`Expected n=${n} points, but found ${pts.length}.`);
    }

    const chosen = pts.slice(0, k);
    return lagrangeAtZero(chosen);
}

const path = process.argv[2];
const raw = readFileSync(path, "utf8");
const data = JSON.parse(raw);

const c = recoverSecret(data);
console.log("Value of c = ", Number.isInteger(c) ? c : c.toFixed(6));