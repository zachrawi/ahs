exports.canAdd = (user) => {
    return user.merchant_id !== null && user.group_id === 1; // admin of a merchant
}

exports.canView = (user) => {
    return true; // all user can view
}