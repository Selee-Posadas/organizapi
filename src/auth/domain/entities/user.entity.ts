export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public passwordHash: string,
        public readonly createdAt: Date,
        public updatedAt: Date,
    ) {
        if (!email.includes('@')) throw new Error('Domain Error: Invalid Email');
        if (passwordHash.length < 8) throw new Error('Domain Error: Insecure Hash');
    }

    //patron factory
    static createNew(email: string, passwordHash: string, name?: string): User {
        return new User(
            crypto.randomUUID(),
            email,
            passwordHash,
            name || 'New User',
            new Date(),
            new Date(),
        );
    }
}