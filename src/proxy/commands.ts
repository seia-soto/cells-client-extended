import {run} from './utils.js';

export const ls = (args: string[]) => run('cec', ['ls', args.join('/')]);

export const scp = (from: string[], to: string[]) => run('cec', ['scp', from.join('/'), to.join('/')]);
