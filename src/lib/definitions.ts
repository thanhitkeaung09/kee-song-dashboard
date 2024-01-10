export type Auth = {
    email: string;
    password : string
}

export type TokenType = {
    data: string;
  } | null;

export type PasswordType = {
    email : string;
    password : string;
    passwordConfirm : string
}