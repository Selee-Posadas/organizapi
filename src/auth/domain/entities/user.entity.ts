export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public passwordHash: string,
        public readonly createdAt: Date,
        public updatedAt: Date,
        public readonly avatarId?: string,
    ) {
        if (passwordHash.length < 8) throw new Error('Domain Error: Insecure Hash');
    }

    //patron factory
    static createNew(email: string, passwordHash: string, name?: string): User {
        return new User(
            crypto.randomUUID(),
            name || 'New User',
            email,
            passwordHash,
            new Date(),
            new Date(),
        );
    }
}