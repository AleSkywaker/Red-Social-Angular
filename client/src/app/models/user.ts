export class User {
  constructor(
    public _id: String,
    public name: String,
    public surname: String,
    public nick: String,
    public password: String,
    public password2: String,
    public role: String,
    public image: String
  ) { }
}
