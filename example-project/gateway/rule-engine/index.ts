export class RuleEngine {
    static filter(updates) {
        const meta = {};
        const regular = {};
        Object.entries(updates)
            .forEach(([k, v]) => {
                if (k.indexOf('_') === 0) {
                    meta[k] = v;
                } else {
                    regular[k] = v;
                }
            });
        return {
            update: regular, metaUpdate: meta
        }
    }
}