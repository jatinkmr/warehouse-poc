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
    }
}));
