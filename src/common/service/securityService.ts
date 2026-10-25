// import crypto from "node:crypto"

// export class SecurityService {
//     constructor(){}   


//     public decrypt = (encryptedData : string) => {
//         const [iv, encryptedText] = encryptedData.split(':');
//         const key = Buffer.from(ENCRYPTION_SECRET_KEY, 'hex');
//         const binaryLikeIv = Buffer.from(iv, 'hex');
//         const decipher = crypto.createDecipheriv('aes-256-cbc', key, binaryLikeIv);

//         let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
//         decryptedData += decipher.final('utf8');
//         return decryptedData;
//     };


// }