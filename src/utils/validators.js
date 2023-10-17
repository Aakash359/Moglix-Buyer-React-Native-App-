const VALID_NAME = '^[a-zA-Z]{1,60}$'
const VALID_EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'
export const isValid = (validator, value) => {
    let newValue = value
    const inputVal = newValue && newValue.toString() && newValue.toString().trim()
    return (new RegExp(validator)).test(inputVal)
}


export const VALIDATORS = {
    VALID_NAME,
    VALID_EMAIL,
}

