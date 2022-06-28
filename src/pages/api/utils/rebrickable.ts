export class RebrickableClient {
  private userToken: string | undefined = undefined;

  private headers = new Headers({
    'Authorization': `key ${process.env.REBRICKABLE_TOKEN}`,
    'Accept': 'application/json',
  });

  private body = new URLSearchParams({
    'username': process.env.REBRICKABLE_USERNAME!,
    'password': process.env.REBRICKABLE_PASSWORD!
  });

  public async getSetLists() {
    const response = await fetch(
      `${process.env.REBRICKABLE_BASE_URL}users/${this.userToken}/setlists/`,
      { headers: this.headers }
    );

    return (await response.json());
  }

  public async getSetsByListId(listId: number) {
    const response = await fetch(
      `${process.env.REBRICKABLE_BASE_URL}users/${this.userToken}/setlists/${listId}/sets`,
      { headers: this.headers }
    );

    return (await response.json());
  }

  public async getSetById(setNum: string) {
    const response = await fetch(
      `${process.env.REBRICKABLE_BASE_URL}lego/sets/${setNum}`,
      { headers: this.headers }
    );

    return (await response.json());
  }

  public async setUserToken() {
    if (this.userToken === undefined) {
      this.headers.set('Content-Type', 'application/x-www-form-urlencoded');

      const response = await fetch(
        `${process.env.REBRICKABLE_BASE_URL}users/_token/`,
        {
          method: 'POST',
          body: this.body,
          headers: this.headers,
        }
      );

      const decodedJson = await response.json();
      this.userToken = decodedJson.user_token;
    }
  }
}