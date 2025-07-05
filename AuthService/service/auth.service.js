const { Users } = require("../models");

//Login User
async function login(username) {
    try {
        const user = await Users.findOne({ 
            where: { 
                username: username 
            }
        }
        );
        return user;
    } catch (error) {
        console.error('Error Login In User Service : ',error);
        throw error;
    }
}

module.exports = {
    login,
};