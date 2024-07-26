import { promises as fs } from 'fs';
import path from 'path';

export interface Config {
  BASE_URL: string;
  BROSWER: 'chromium' | 'firefox' | 'webkit' | 'chrome' | 'edge';
}

// Load configuration from JSON file
export async function loadConfig(): Promise<Config> {
  const filePath = path.join(__dirname, '../../resources/config.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data) as Config;
}
