import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';



@Injectable()
export class FirebaseService {
    constructor() {
        
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId:"to-do-list-45bb0",
                    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBfuROhqppWn98\n5bx7igM0GU5VniNP685UMcMoAMyYDOROWjA1db11+jQIR6Cm726qteU4uvD+KeTo\nP+U2zT7FiHHtoUotkCfDsuCtIaxj+gSg2LUWPZSzfJ/9FW97b3rb2FTfe6lTau7D\nziLsUKS7dYy+UvMylmawvIO9GZpMcHHG2IRzw9pN0Jek5y3uEXO/MDACfhO385eq\n5Gdcp1yC52mE2MKIoFw2+/XzhEKBwdnslvZEPf00v7X+fM2LBEaK8l0TErp1QZ+0\npZMuwNZ0LnBmXxqdUJHUjxhRkmtdo4KC8cAiXPSf7BTrvBK5ePCHyf+xIqvIrmv1\ndpRLyUadAgMBAAECggEAHIAJNrvFG/F1d7sK8RNZ93GGxTuereXopSQTP7Amcnrr\nodLM6QLnnhn1Ugbi1dPMdB6InbuDRZx8F+1ZYKIIjeXUChFIsL9b7ApL55RfJPat\nedeRjK4TWgCQPCHNItw/t2P81FINlbjZZEPXhwE10lq1GU90fM4EYCHUMaU0we9I\nNXbqdJsHFOs1+HFtO/4oGJyWKdp9/2P2lz/5E4M60tvLfPj11f83q+0yxF6Ytnyp\nDxX/rYP+wgDt7VqkcykvN+AsNMJSqrnc2psfbOqOHAa8eIEOXqG/tellLZSI4dkR\nzfajt0uu9C3jb08VwntLRcsamDZ+yslF6Ogy/u/ULQKBgQDyW5RPxo5UW9HZTjxp\n+OlD3nX8AxpxiCunugwhhO6XsuCEjXUep2cdGnSP0UQz0MaxzCSnsgXOA7Z+VHUH\nKbMv9HpfYJXyLJTHJBS7kh7Y32ib8unZ500TeDe8ajd+6Mkj6qpIGIw6P1ikckJz\npEQ31hXFPJnFmj6AX1hQOVlpTwKBgQDMYzNydHgtSh033Q+oNNJdeOiy9wSWwnBk\n+BHkhugLpVbllR6qgs9i771ZamAr1bpuz1iWqoVMSMepRPkdSs+NorXwrXYI8GAN\n8ANGuw1RPLP+vpNvqP0y/8hizLW+RkjjfKjprel9yDik7SSEH4wjg/JUF4aeRwvX\nRGFCNkU+UwKBgQC7M53l2RsLcjkvv0zPFmMn92fvF36Pf30o+35vTbz2FEd0W8fB\nu9DcHBk5FY228Gbp4yPVHJ97OEb4YchblgxA2HjFv1dTTrhE8kvJbt7A6iBlhUa4\n9/8DMPLsaKchMjJbueF5+uwl+dRAgblulc3Ty1vZlCu7BJ+OjRcsMIAt5QKBgBAv\nkvVvb8z2X5X69bB2bmpkltkFYuGliE0WsCQO4vV5JIaN5p3OOio1niMkn3UZOeho\nlzVnT6MY6GbpRWkicYlf51SmCADxOEoiRcAmNAnI6uAzq21eTp7pTq80Uvg8jK0n\nRCEtWp5Ratr0xL2J2gk9+8TZEBocuj1T9vfNYHJtAoGATGTX8kGf7ca65es/C7EA\nT4GTH11e5zkZ/GbumhT41Wv+6ZSyW70EjRevWs7rkBeLxSoJPVZ/sNpNHKVfDQ7G\n92C2/mKqBUu/833CvdNE7IDqsJXXyXfAdZGe/Mbhb2yErvPYbX/JdXefCSIG9c1Q\noEKdqAfpEBPVjRhkcaOKmEE=\n-----END PRIVATE KEY-----\n",
                     clientEmail: "firebase-adminsdk-h3mqt@to-do-list-45bb0.iam.gserviceaccount.com",
                }),
            });
        }
    }

    getAuth() {
        return admin.auth();
    }
}