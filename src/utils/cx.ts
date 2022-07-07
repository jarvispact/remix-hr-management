export const cx = (input: Array<string | boolean | undefined | null>) =>
    input.filter(Boolean).join(' ');
