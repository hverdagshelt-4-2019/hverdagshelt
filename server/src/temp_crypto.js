import argon2 from "argon2"

export async function create_password(password: string){
    try {
        return await argon2.hash(password, {
            type: argon2.argon2id,
            hashLength: 64,
            saltLength: 64,
            timeCost: 3,
            memoryCost: 4096,
            parallellism: 1,
        });
    }catch (err) {
        console.log(err)
    }
}

export async function validate_password(password: string, hash: string){
    try {
        return await argon2.verify(hash, password)
    }catch (err) {
        console.log(err);
    }
}

