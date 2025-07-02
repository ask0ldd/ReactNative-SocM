export default class NumberUtils{
    static safeParseInt(str : string) : number{
        return parseInt(str.replace(/[^0-9]/g, '').replace('', '0'))
    }
}