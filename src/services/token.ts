import { ExtendedCol, RawCol } from "./db/Columns";

class TokenService {
  public static encode(data: ExtendedCol[]): string {
    return encodeURI(btoa(JSON.stringify(data)));
  }
  public static decode(token: string): RawCol[] {
    return JSON.parse(decodeURI(atob(token)));
  }
}

export default TokenService;
