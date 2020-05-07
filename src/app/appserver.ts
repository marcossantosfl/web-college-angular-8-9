export class AppServer {

  public static get server(): string {
    return 'http://localhost:8090/restful';
  }

  public static get serverLogin(): string {
    return this.server + '/login';
  }

  public static get serverAccount(): string {
    return this.server + '/account/';
  }

  public static get serverSubject(): string {
    return this.server + '/subject/';
  }

  public static get serverComing(): string {
    return this.server + '/coming/';
  }
}
