function validateRequest(req, requiredBodyArr) {
    for (let i = 0; i < requiredBodyArr.length; i++) {
        const element = requiredBodyArr[i];
        if (req.method == 'GET') {
            if (!req.query.hasOwnProperty(element)) {
                return {
                    isValid: false,
                    requiredField: element
                };
            }
        } else if (req.method == 'POST') {
            if (!req.body.hasOwnProperty(element)) {
                return {
                    isValid: false,
                    requiredField: element
                };
            }
        }
    }

    return {
        isValid: true,
        requiredField: ''
    };
}

export default validateRequest;