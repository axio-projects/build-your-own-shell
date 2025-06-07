import { inject, Injectable } from '@angular/core';
import { ANGULAR_VERSION } from './version.interface';

const Qualifier = {
    NONE: 0,
    ANY_PATCH: 1,
    ANY_MINOR: 2
} as const;

type Qualifier = typeof Qualifier[keyof typeof Qualifier];

@Injectable()
export class VersionService {
    private ngVersion = inject(ANGULAR_VERSION);

    constructor() { }

    current(): string {
        return this.ngVersion.full;
    }

    matches(version: string): boolean {
        if (!version || !version.length) {
            return false;
        }

        let i = 0;
        let qualifier: Qualifier = Qualifier.NONE;
        if (version[i] === '^') {
            qualifier = Qualifier.ANY_MINOR;
            i += 1;
        } else if (version[i] === '~') {
            qualifier = Qualifier.ANY_PATCH;
            i += 1;
        }

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

            if (i !== version.length && qualifier < Qualifier.ANY_MINOR) {
                parsed.minor = parseNumericIdentifier();
            }

            if (i !== version.length && qualifier < Qualifier.ANY_PATCH) {
                parsed.patch = parseNumericIdentifier();
            }
        } catch (e) {
            console.error(e);
            return false;
        }

        return this.ngVersion.major === parsed.major && (parsed.minor === 'x' || this.ngVersion.minor === parsed.minor) && (parsed.patch === 'x' || this.ngVersion.patch === parsed.patch);
    }
}
