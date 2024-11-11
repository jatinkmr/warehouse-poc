import { registerAs } from "@nestjs/config";
import { CacheOptions } from "@squareboat/nest-cache";

export default registerAs("cache", () => ({
    default: "redis",
    stores: {
        redis: {
            driver: "redis",
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD || undefined,
            port: +process.env.REDIS_PORT,
            database: process.env.REDIS_DB,
            prefix: "warehouse",
        },
    },
} as CacheOptions));
