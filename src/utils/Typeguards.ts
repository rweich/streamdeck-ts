/**
 * Returns a typeguard for the passed enum that checks if the token passed is included in that enum
 */
export const isInEnum = <T>(e: T) => (token: any): token is T[keyof T] => Object.values(e).includes(token);
