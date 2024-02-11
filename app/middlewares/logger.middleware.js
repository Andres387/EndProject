export function logger(req, res, next) {
    console.log(
        `New request | method: ${req.method} | path: ${
        req.path
        } | date: ${new Date()}`
    );
    next();
    }