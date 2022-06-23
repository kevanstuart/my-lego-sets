export class Rebrickable {
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
    await this.setUserToken();

    const response = await fetch(
      `${process.env.REBRICKABLE_BASE_URL}users/${this.userToken}/setlists/`,
      { headers: this.headers }
    );

    const decodedJson = await response.json();
    return decodedJson;
  }

  private async setUserToken() {
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