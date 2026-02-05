export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';


export class Task {
    constructor(
        public readonly taskId: string,
        public readonly title: string,
        public readonly description: string | null,
        public readonly status: TaskStatus,
        public readonly userId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ){}
}