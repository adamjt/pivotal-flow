import { resolve } from 'path';

import { readFile } from '../utils/fs';

const getVersion = async () => {
  const packageJsonPath = resolve(__dirname, '../..', 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, { encoding: 'utf-8' }));
  return packageJson.version;
};

export default getVersion;
