import { registerAs } from '@nestjs/config';

// all third-party services' configurations to go here
export default registerAs('services', () => ({
    pagination: {
        limit: process.env.LIMIT,
        page: process.env.PAGE
    },
    shipRelay: {
        shipRelayApiUrl: process.env.SHIPRELAY_API_URL,
        shipRelayUserName: process.env.SHIPRELAY_USER_EMAIL,
        shipRelayPassWord: process.env.SHIPRELAY_USER_PASSWORD
    },
    mintSoft: {
        mintSoftApiUrl: process.env.MINTSOFT_API_URL,
        // mintSoftUserName: process.env.MINSTFOT_USER_NAME,
        // minSoftPassWord: process.env.MINSTOFT_USER_PASSWORD,
        mintSoftApiKey: process.env.MINTSOFT_API_KEY
    }
}));
