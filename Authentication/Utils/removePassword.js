const removedPassword =(user) => {
    const {password, ...rest} = user._doc;
    return rest;
}

module.exports = removedPassword;