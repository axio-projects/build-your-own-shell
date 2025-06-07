import { inject, Injectable } from '@angular/core';
import { ANGULAR_VERSION } from './version.interface';

@Injectable()
export class VersionService {
    private current = inject(ANGULAR_VERSION);

    constructor() { }

    matches(version: string): boolean {
        if (!version || !version.length) {
            return false;
        }

        let i = 0;
        let parsed = {
            major: '',
            minor: 'x',
            patch: 'x'
        };

        let parseNumericIdentifier = () => {
            let builder: string[] = [];
            if ((version[i] === 'x' || version[i] === '*') && (i + 1 === version.length || version[i + 1] === '.')) {
                return version[i];
            }

            while (i < version.length) {
                let char = version[i++];
                if (char === '.') {
                    break;
                }

                if (Number.isFinite(+char)) {
                    builder.push(char);
                } else {
                    throw new Error(`unexpected character ${char}`);
                }
            }
            return builder.join("");
        }

        try {
            parsed.major = parseNumericIdentifier();
            if (parsed.major === 'x' || parsed.major === '*') {
                return true;
            }

            if (i !== version.length) {
                parsed.minor = parseNumericIdentifier();
            }

            if (i !== version.length) {
                parsed.patch = parseNumericIdentifier();
            }
        } catch (e) {
            console.error(e);
            return false;
        }

        return this.current.major === parsed.major && (parsed.minor === 'x' || this.current.minor === parsed.minor) && (parsed.patch === 'x' || this.current.patch === parsed.patch);
    }
}
