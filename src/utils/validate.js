export const validateForm = ({ email, password, isSignInForm, name = "" }) => {
    const errors = {};

    const trimmedEmail = email.trim() || '';
    const trimmedPassword = password.trim() || '';
    const trimmedName = name.trim() || '';

    if (!trimmedEmail) {
        errors.email = "email is required"
    } else {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = pattern.test(trimmedEmail);
        if (!isValidEmail) {
            errors.email = 'Invalid email format';
        }
    }

    // if(!trimmedPassword){
    //     errors.email = "Password is required";
    // }else{
    //     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    //     const isValidpassword = passwordRegex.test(trimmedPassword);
    //     if(!isValidpassword){
    //         errors.password = 'Password must be 8+ characters, include a capital letter and a special character';
    //     }
    // }

    if (!trimmedPassword) {
        errors.password = 'Password is required';
    } else if (trimmedPassword.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(trimmedPassword)) {
        errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
        errors.password = 'Password must include a special character';
    }

    if (!isSignInForm) {
        if (!trimmedName) {
            errors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
            errors.name = 'Name must only contain letters';
        }
    }
    return errors;
}