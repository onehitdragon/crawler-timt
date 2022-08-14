const regExp = /^https:\/\/www.tienichmaytinh.net\/[\w\d-]+$/i;

export default (s: string): boolean => {
    return regExp.test(s);
}