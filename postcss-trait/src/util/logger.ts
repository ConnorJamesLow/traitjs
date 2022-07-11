class Logger {
    private shouldLog = false;
    private indent = 0;
    private logs: any[] = [];
    constructor() {
        if (/development/i.test(process?.env.NODE_ENV ?? '')) {
            this.shouldLog = true;
        }
    }

    debug(...params: any[]) {
        const { shouldLog, indent } = this;
        if (!shouldLog) return;
        this.logs.push([[...Array(indent + 1)].join(` |  `), ...params]);
        this.indent = 0;
    }

    tab() {
        this.indent++;
        return this;
    }

    dump() {
        const {logs} = this;
        console.debug(...logs.flatMap(l => [l, '\n']).flat());
    }
}

export default new Logger();