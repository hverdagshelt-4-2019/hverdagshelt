#!/usr/bin/env bash
echo "export default
{
    mysql: {
        password: \""${SINDRTHO_MYSQL_PASS}"\"
    },
    email: {
        user:  \"hverdagsheltene4@gmail.com\",
        pass: \""${MAIL_PASSWORD}"\"
    },
    mapskey: \""${MAPS_KEY}"\",
    test: {
        mysql: {
            password: \""${ALEKSJOH_MYSQL_PASS}"\"
        },
        email: {
            user: \"hverdagsheltene4@gmail.com\",
            pass: \""${MAIL_TEST_PASSWORD}"\"
        }
    }
}
" > private.config.js;