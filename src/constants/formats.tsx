export function currency(value: number, n: number, x: number, s: string, c: string) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = value.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

export function boxID(value: string): string {
    let format = value.split(' ')
    let char0 = format[0].substring(0, 1);
    let char1 = format[1]?.substring(0, 1)
    
    if (format[1] == 'DA' || format[1] == 'DE')
        char1 = format[2].substring(0, 1)
    return `${char0}${char1 ?? ''}`
}