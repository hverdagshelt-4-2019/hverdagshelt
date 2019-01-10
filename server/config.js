import _ from "lodash"

let config =
{
    mysql: {
        connectionLimit: 2,
        host: 'mysql.stud.iie.ntnu.no',
        user: 'sindrtho',
        password: 'set password in private.config.js',
        database: 'sindrtho',
        debug: false
    },

    port: 3000,


    test: {
        mysql: {
            connectionLimit: 2,
            host: 'mysql.stud.iie.ntnu.no',
            user: 'aleksjoh',
            password: 'set password in private.config.js',
            database: 'aleksjoh',
            debug: false
        },

        port: 3001
    }

};

import privateconfig from "./private.config"

_.merge(config, privateconfig);
export default config;