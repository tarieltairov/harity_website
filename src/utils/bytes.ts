/** Единицы размера файла — общие для форматтера (`useFormat`) и моков */
export const KB = 1024;
export const MB = KB * 1024;

/** 420 → 430080: размер в байтах из килобайт (целое число, как в контракте) */
export const kb = (value: number) => Math.round(value * KB);

/** 2.4 → 2516582: размер в байтах из мегабайт */
export const mb = (value: number) => Math.round(value * MB);
