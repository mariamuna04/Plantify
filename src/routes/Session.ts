export const Session = {
    getToken: (): string | undefined | null => {
        const session: UserSession = JSON.parse(sessionStorage.getItem('session') || '{}');
        return session.token;
    },

    setToken: (token: string) => {
        const session: UserSession = JSON.parse(sessionStorage.getItem('session') || '{}');
        session.token = token;
        sessionStorage.setItem('session', JSON.stringify(session));
    },

    getName: () => {
        const session: UserSession = JSON.parse(sessionStorage.getItem('session') || '{}');
        return session.name;

    },
    setName: (name: string) => {
        const session: UserSession = JSON.parse(sessionStorage.getItem('session') || '{}');
        session.name = name;
        sessionStorage.setItem('session', JSON.stringify(session));
    },

    getEmail: () => {
        const session: UserSession = JSON.parse(sessionStorage.getItem('session') || '{}');
        return session.email;

    },
    setEmail: (email: string) => {
        const session: UserSession = JSON.parse(sessionStorage.getItem('session') || '{}');
        session.email = email;
        sessionStorage.setItem('session', JSON.stringify(session));

    }
}