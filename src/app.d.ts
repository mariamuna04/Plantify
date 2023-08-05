declare namespace App {

}

interface Credentials {
    email: string
    password: string
}

interface UserProperties {
    firstName: string
    lastName: string
    email: string
    password: string
}

interface UserSession {
    id: string,
    user: User
}

interface SessionCookie {
    token: string
}

type User = UserProperties | undefined | null
type Cookie = SessionCookie | undefined | null