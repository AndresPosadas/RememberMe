/*
    Function for comparing two strings
    Returns
        0: if the strings are equal
        -1: if b comes before a in an alphabetical sort
        1: if a comes before b in an alphabetical sort
*/
export function strcmp(a, b) {
    a = a.toString(), b = b.toString();
    for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
    if (i === n) return 0;
    return a.charAt(i) > b.charAt(i) ? -1 : 1;
}