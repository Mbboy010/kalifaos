import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_APPWRITE_ENDPOINT is not defined in environment variables');
}
if (!projectId) {
  throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined in environment variables');
}

client.setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };