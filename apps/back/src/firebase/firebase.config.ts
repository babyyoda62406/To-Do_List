import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { envVars } from 'src/config';



@Injectable()
export class FirebaseService {
    constructor() {
        
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: envVars.FIREBASE_PROYECT_ID,
                    privateKey: envVars.FIREBASE_PRIVATE_KEY,
                    clientEmail: envVars.FIREBASE_CLIENT_EMAIL,                    
                }),
            });
        }
    }

    getAuth() {
        return admin.auth();
    }
}