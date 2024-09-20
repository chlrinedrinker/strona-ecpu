import type {PageServerLoad, Actions} from "../$types"
import { redirect, fail } from "@sveltejs/kit";
import { client } from "$db/mongo";
import { ENCRYPTION_KEY } from "$env/static/private";

const crypto = require('crypto');

const encryptSymmetric = (key: string, plaintext: string) => {
  const iv = crypto.randomBytes(12).toString('base64');
  const cipher = crypto.createCipheriv(
    "aes-256-gcm", 
    Buffer.from(key, 'base64'), 
    Buffer.from(iv, 'base64')
  );
  let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
  ciphertext += cipher.final('base64');
  const tag = cipher.getAuthTag()
  
  return { ciphertext, tag, iv }
}

const plaintext = "encrypt me";

const { ciphertext, iv, tag } = encryptSymmetric(ENCRYPTION_KEY, plaintext);

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user){
        throw redirect(308, "/login");
      }
}


export const actions: Actions = {
    addNewDevice: async (event) => {
        
    }
}