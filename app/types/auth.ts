
export interface SinUpFormData {
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    userType: 'buyer' | 'vendor' | 'admin';
    companyName?: string;
    fullname: string;
    acceptTerms: boolean;
}

export interface OPTVerificationProvider {
    code: string;
    contact:'email' | 'phone';
}

export interface SocialAuthProvider {
    name: 'google' | 'facebool' | 'linkedin';
    icon: string;
}